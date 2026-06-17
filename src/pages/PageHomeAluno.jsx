import { useEffect, useRef, useState } from "react";
import {useDispatch, useSelector} from "react-redux";
import PageTemplate from "../components/PageTemplate.jsx";
import Navbar from "../components/Navbar.jsx";
import CardCursoAluno from "../components/cursos/CardCursoAluno.jsx";
import CardSemCursosAluno from "../components/cursos/CardSemCursosAluno.jsx";
import matriculaService from "../services/matriculaService.js";
import cursoService from "../services/cursoService.js";
import CardCursoCatalogo from "../components/cursos/CardCursoCatalogo.jsx";
import {
    setCarregando,
    setCarregandoMatriculas,
    setCursos,
    setMatriculas,
} from "../store.js";
import CardCursoCatalogoSkeleton from "../components/cursos/CardCursoCatalogoSkeleton.jsx";

function PageHomeAluno() {

    const matriculas = useSelector(state => state.matriculas.lista);
    const cursos = useSelector(state => state.cursos.lista);
    const dispatch = useDispatch();
    const cursosInscritosIds = matriculas.map(m => m.curso.codigo);
    const cursosRecomendados = cursos.filter(curso => curso.publicado && !cursosInscritosIds.includes(curso.codigo)).slice(0, 4);
    const usuario = useSelector(state => state.auth.usuarioLogado);

    const carregandoCursos = useSelector(state => state.cursos.carregando);
    const carregandoMatriculas = useSelector(state => state.matriculas.carregando);

    async function carregarMatriculas() {

        try {
            dispatch(setCarregandoMatriculas(true));

            if (!usuario?.id) return;
            const dados = await matriculaService.listarPorAluno(usuario.id);

            dispatch(setMatriculas(dados));
        } finally {
            dispatch(setCarregandoMatriculas(false));
        }
    }

    async function carregarCursos() {

        try {
            dispatch(setCarregando(true));

            const dados = await cursoService.listarTodos();

            dispatch(setCursos(dados));
        } finally {
            dispatch(setCarregando(false));
        }
    }

    useEffect(() => {
        document.title = "Meus Cursos";

        if (!usuario?.id) return;

        carregarMatriculas();
        carregarCursos();
    }, [usuario?.id]);


    function renderMeusCursos() {

        if (carregandoMatriculas) {
            return (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {[...Array(4)].map((_, i) => (<CardCursoCatalogoSkeleton key={i} />))}
                </div>
            );
        }

        if (matriculas.length === 0) {
            return <CardSemCursosAluno />;
        }

        return (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {matriculas.map(matricula => (
                    <CardCursoAluno
                        key={matricula.codigo}
                        matricula={matricula}
                    />
                ))}
            </div>
        );
    }

    function renderCursosRecomendados() {

        if (carregandoCursos) {
            return (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {[...Array(4)].map((_, i) => (
                        <CardCursoCatalogoSkeleton key={i} />
                    ))}
                </div>
            );
        }

        if (cursosRecomendados.length === 0) {
            return (
                <div className="text-center text-base-content/60">
                    Nenhuma recomendação disponível.
                </div>
            );
        }

        return (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {cursosRecomendados.map(curso => (
                    <CardCursoCatalogo
                        curso={curso}
                        usuario={usuario}
                        carregarCursos={carregarCursos}
                        carregarMatriculas={carregarMatriculas}
                    />
                ))}
            </div>
        );
    }

    return (
        <PageTemplate>

            <Navbar />

            <div className="bg-base-300 min-h-screen p-4">

                <div className="space-y-4 max-w-5xl mx-auto">

                    <div className="py-4">
                        <h1 className="text-2xl font-bold">
                            Meus Cursos
                        </h1>
                        <p className="text-base text-base-content/60">
                            Acompanhe seu progresso de aprendizado
                        </p>
                    </div>

                    {renderMeusCursos()}

                    <div className="py-4">
                        <h1 className="text-2xl font-bold">
                            Cursos recomendados
                        </h1>
                        <p className="text-base text-base-content/60">
                            Procurando o que aprender em seguida?
                        </p>
                    </div>

                    {renderCursosRecomendados()}

                </div>

            </div>

        </PageTemplate>
    );
}

export default PageHomeAluno;
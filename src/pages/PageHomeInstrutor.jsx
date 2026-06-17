
import PageTemplate from "../components/PageTemplate.jsx";
import Navbar from "../components/Navbar.jsx";
import Botao from "../components/Botao.jsx";
import CardCurso from "../components/cursos/CardCurso.jsx";
import {useEffect, useRef, useState} from "react";
import CardSemCursos from "../components/cursos/CardSemCursos.jsx";
import { FaPlus } from "react-icons/fa";
import cursoService from "../services/cursoService.js";
import alertas from "../util/Alertas.jsx";
import CriarCurso from "../components/cursos/CriarCurso.jsx";
import {useDispatch, useSelector} from "react-redux";
import {setCarregando, setCursos} from "../store.js";
import CardCursoSkeleton from "../components/cursos/CardCursoSkeleton.jsx";

function PageHomeInstrutor() {

    const cursos = useSelector(state => state.cursos.lista);
    const dispatch = useDispatch();
    const [cursosFiltro, setCursosFiltro] = useState([]);
    const [open, setOpen] = useState(false);
    const carregou = useRef(false);
    const carregandoCursos = useSelector(state => state.cursos.carregando);
    const usuario = useSelector(state => state.auth.usuarioLogado);

    async function carregarCursos() {
        try {
            dispatch(setCarregando(true));

            const dados = await cursoService.listarPorInstrutor(usuario.id);

            dispatch(setCursos(dados));

            const ordenados = [...dados].sort((a, b) =>
                b.codigo - a.codigo
            );

            setCursosFiltro(ordenados);
        } catch (e) {
            console.log(e);

            alertas.erro('Erro ao carregar cursos!');
        } finally {
            dispatch(setCarregando(false));
        }
    }

    useEffect(() => {
        document.title = "Meus Cursos";

        if (carregou.current) return;
        carregou.current = true;

        carregarCursos();
    }, []);

    function renderCursos() {
        if (carregandoCursos) {
            return (
                <div className="grid grid-lines-1 sm:grid-lines-2 lg:grid-lines-4 gap-4">
                    {[...Array(4)].map((_, i) => (<CardCursoSkeleton key={i} />))}
                </div>
            );
        }

        if (cursos.length === 0) {
           return (
            <div className="space-y-4 max-w-5xl mx-auto">
                <CardSemCursos />
            </div>
           );
        }

        return (
        cursosFiltro.map(curso => (
            <CardCurso
                key={curso.codigo}
                curso={curso}
                atualizarCursos={carregarCursos}
                setCursos={setCursosFiltro}
            /> ))
        );
    }

    return (
        <PageTemplate>

            <Navbar></Navbar>

            <div className="bg-base-300 min-h-screen p-4">

                <div className="space-y-4 max-w-5xl mx-auto">

                    <div className="grid grid-cols-2 items-center py-4">

                        {/* ESQUERDA */}
                        <div>
                            <h1 className="text-2xl font-bold">
                                Gerenciar Cursos
                            </h1>

                            <p className="text-base text-base-content/60">
                                Crie, edite e gerencie seus cursos
                            </p>
                        </div>

                        {/* DIREITA */}
                        <div className="flex justify-end">
                            <Botao className="btn btn-primary rounded-lg font-bold"
                                   onClick={() => setOpen(true)}>
                                <FaPlus size={14} />
                                Novo Curso
                            </Botao>
                        </div>

                    </div>

                    <CriarCurso
                        open={open}
                        atualizarCursos={carregarCursos}
                        onClose={() => setOpen(false)}
                    />

                    {renderCursos()}

                </div>

            </div>

        </PageTemplate>
    );
}

export default PageHomeInstrutor;
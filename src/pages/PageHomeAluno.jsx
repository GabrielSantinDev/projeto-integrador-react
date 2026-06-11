import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import PageTemplate from "../components/PageTemplate.jsx";
import Navbar from "../components/Navbar.jsx";
import CardCursoAluno from "../components/CardCursoAluno.jsx";
import CardSemCursosAluno from "../components/CardSemCursosAluno.jsx";
import matriculaService from "../services/matriculaService.js";
import alertas from "../util/Alertas.jsx";
import cursoService from "../services/cursoService.js";
import CardCursoCatalogo from "../components/CardCursoCatalogo.jsx";

function PageHomeAluno() {

    const [matriculas, setMatriculas] = useState([]);
    const [cursos, setCursos] = useState([]);
    const cursosInscritosIds = matriculas.map(m => m.curso.codigo);
    const cursosRecomendados = (cursos.filter(
        curso => !cursosInscritosIds.includes(curso.codigo)
    ).filter(c=> c.publicado === true)).slice(0, 4);

    const usuario = useSelector(state => state.auth.usuarioLogado);

    async function carregarMatriculas() {
        if (!usuario?.id) return;

        try {
            const dados = await matriculaService.listarPorAluno(usuario.id);
            setMatriculas(dados);
        } catch (e) {
            console.log(e);
            alertas.erro("Erro ao carregar seus cursos!");
        }
    }

    async function carregarCursos() {
        try {
            const dados = await cursoService.listarTodos();
            setCursos(dados);
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        if (!usuario?.id) return;

        carregarMatriculas();
        carregarCursos();
    }, [usuario?.id]);

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

                    {matriculas.length === 0 && (
                        <CardSemCursosAluno />
                    )}

                    {matriculas.length > 0 && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {matriculas.map(matricula => (
                                <CardCursoAluno
                                    key={matricula.codigo}
                                    matricula={matricula}
                                />
                            ))}
                        </div>
                    )}


                    <div className="py-4">
                        <h1 className="text-2xl font-bold">
                            Cursos recomendados
                        </h1>
                        <p className="text-base text-base-content/60">
                            Procurando o que aprender em seguida?
                        </p>
                    </div>

                    {cursos.length > 0 && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            {cursosRecomendados.map(curso => (
                                <CardCursoCatalogo
                                    key={curso.codigo}
                                    curso={curso}
                                />
                            ))}
                        </div>
                    )}

                </div>

            </div>

        </PageTemplate>
    );
}

export default PageHomeAluno;
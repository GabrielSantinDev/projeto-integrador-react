
import PageTemplate from "../components/PageTemplate.jsx";
import Navbar from "../components/Navbar.jsx";
import Botao from "../components/Botao.jsx";
import CardCurso from "../components/CardCurso.jsx";
import {useEffect, useState} from "react";
import cursoService from "../services/cursoService.js";
import CardSemCursos from "../components/CardSemCursos.jsx";
import { FaPlus } from "react-icons/fa";

function PageHome() {

    const [cursos, setCursos] = useState([]);
    const [cursosFiltro, setCursosFiltro] = useState([]);

    async function carregarCursos() {
        try {
            const dados = await cursoService.listarTodos();
            setCursos(dados);

            const ordenados = [...dados].sort((a, b) =>
                b.codigo - a.codigo
            );

            setCursosFiltro(ordenados);
        } catch (e) {
            console.log(e);
            alert("Erro ao carregar cursos.");
        }
    }

    useEffect(() => {
        carregarCursos();
    }, []);

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
                            <Botao className="btn btn-primary rounded-lg font-bold">
                                <FaPlus size={14} />
                                Novo Curso
                            </Botao>
                        </div>

                    </div>


                {cursos.length === 0 && (
                    <div  className="space-y-4 max-w-5xl mx-auto">
                        <CardSemCursos />
                    </div>
                )}

                {!(cursos.length === 0) &&(
                    cursosFiltro.map(curso => (
                        <CardCurso
                            key={curso.codigo}
                            curso={curso}
                            atualizarCursos={carregarCursos}
                            setCursos={setCursosFiltro}
                        />
                    ))
                )}

                </div>

            </div>

        </PageTemplate>
    );
}

export default PageHome;
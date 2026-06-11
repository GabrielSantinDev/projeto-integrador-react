
import PageTemplate from "../components/PageTemplate.jsx";
import Navbar from "../components/Navbar.jsx";
import Botao from "../components/Botao.jsx";
import CardCurso from "../components/CardCurso.jsx";
import {useEffect, useRef, useState} from "react";
import CardSemCursos from "../components/CardSemCursos.jsx";
import CursoModal from "../components/CriarCurso.jsx";
import { FaPlus } from "react-icons/fa";
import cursoService from "../services/cursoService.js";
import alertas from "../util/Alertas.jsx";
import CriarCurso from "../components/CriarCurso.jsx";
import {useSelector} from "react-redux";

function PageHomeInstrutor() {

    const [cursos, setCursos] = useState([]);
    const [cursosFiltro, setCursosFiltro] = useState([]);
    const [open, setOpen] = useState(false);
    const carregou = useRef(false);

    const usuario = useSelector(state => state.auth.usuarioLogado);

    async function carregarCursos() {
        try {
            const dados = await cursoService.listarPorInstrutor(usuario.id);
            setCursos(dados);

            const ordenados = [...dados].sort((a, b) =>
                b.codigo - a.codigo
            );

            setCursosFiltro(ordenados);
        } catch (e) {
            console.log(e);

            alertas.erro('Erro ao carregar cursos!');

        }
    }

    useEffect(() => {
        if (carregou.current) return;

        carregou.current = true;

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

export default PageHomeInstrutor;
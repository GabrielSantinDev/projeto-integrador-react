import { useEffect } from "react";
import PageTemplate from "../components/PageTemplate.jsx";
import Navbar from "../components/Navbar.jsx";
import CardCursoCatalogo from "../components/cursos/CardCursoCatalogo.jsx";
import cursoService from "../services/cursoService.js";
import {useDispatch, useSelector} from "react-redux";
import {setCarregando, setCursos} from "../store.js";
import CardCursoCatalogoSkeleton from "../components/cursos/CardCursoCatalogoSkeleton.jsx";

function PageCatalogo() {

    const cursos = useSelector(state => state.cursos.lista);
    const dispatch = useDispatch();
    const cursosFiltro = cursos.map(curso => curso).filter(c=> c.publicado === true);
    const carregando = useSelector(state => state.cursos.carregando);
    const usuario = useSelector(state => state.auth.usuarioLogado);

    async function carregarCursos() {
        try {
            dispatch(setCarregando(true));

            if (cursos.length > 0) return;
            const dados = await cursoService.listarTodos();

            dispatch(setCursos(dados));
        } finally {
            dispatch(setCarregando(false));
        }
    }

    useEffect(() => {
        document.title = "Catálogo";

        carregarCursos();
    }, []);


    function renderConteudo() {
        if (carregando) {
            return (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {[...Array(8)].map((_, i) => (<CardCursoCatalogoSkeleton key={i} />))}
                </div>
            );
        }

        if (cursosFiltro.length === 0) {
            return (
                <div className="text-center text-base-content/60">
                    Nenhum curso encontrado.
                </div>
            );
        }

        return (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {cursosFiltro.map(curso => (<CardCursoCatalogo
                    key={curso.codigo}
                    curso={curso}
                    usuario={usuario}
                    />))}
            </div>
        );
    }

    return (
        <PageTemplate>

            <Navbar />

            <div className="bg-base-300 min-h-screen p-4">

                <div className="space-y-6 max-w-6xl mx-auto">

                    {/* Header */}
                    <div className="py-4">
                        <h1 className="text-2xl font-bold">
                            Catálogo de Cursos
                        </h1>
                        <p className="text-base text-base-content/60">
                            Explore todos os cursos disponíveis na plataforma
                        </p>
                    </div>

                    {/* Lista de cursos --- mostra um skeleton do card enquanto os cursos ainda estão carregando */}
                    {renderConteudo()}

                </div>

            </div>

        </PageTemplate>
    );
}

export default PageCatalogo;
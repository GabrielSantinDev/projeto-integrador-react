import { useEffect, useState } from "react";
import PageTemplate from "../components/PageTemplate.jsx";
import Navbar from "../components/Navbar.jsx";
import CardCursoCatalogo from "../components/CardCursoCatalogo.jsx";
import cursoService from "../services/cursoService.js";

function PageCatalogo() {

    const [cursos, setCursos] = useState([]);
    const cursosFiltro = cursos.map(curso => curso).filter(c=> c.publicado === true);

    async function carregarCursos() {
        try {
            const dados = await cursoService.listarTodos();
            setCursos(dados);
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        carregarCursos();
    }, []);

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

                    {/* Lista de cursos */}
                    {cursos.length === 0 ? (
                        <div className="text-center text-base-content/60">
                            Nenhum curso encontrado.
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            {cursosFiltro.map(curso => (
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

export default PageCatalogo;
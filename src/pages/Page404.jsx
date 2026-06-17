import { FaTriangleExclamation, FaHouse } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import Botao from "../components/Botao.jsx";
import {useEffect} from "react";
import PageTemplate from "../components/PageTemplate.jsx";

function Page404() {
    const navigate = useNavigate();

    useEffect(() => {
        document.title = "Erro 404";
    }, []);


    return (
        <PageTemplate>
            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content text-center">

                    <div className="card bg-base-100 shadow-xl max-w-lg w-full">
                        <div className="card-body items-center text-center p-10">

                            {/* Ícone */}
                            <FaTriangleExclamation className="text-warning text-7xl mb-4" />

                            {/* Código */}
                            <h1 className="text-7xl font-bold text-error">404</h1>

                            {/* Título */}
                            <h2 className="text-2xl font-bold mt-2">
                                Página não encontrada
                            </h2>

                            {/* Texto */}
                            <p className="text-base-content/70 mt-3">
                                A página que você tentou acessar não existe, foi removida
                                ou o endereço informado está incorreto.
                            </p>

                            {/* Botões */}
                            <div className="flex gap-3 mt-6 flex-wrap justify-center">

                                <Botao
                                    className="btn btn-primary gap-2"
                                    onClick={() => navigate("/home")}
                                >
                                    <FaHouse />
                                    Início
                                </Botao>

                                <Botao
                                    className="btn btn-outline"
                                    onClick={() => navigate(-1)}
                                >
                                    Voltar
                                </Botao>

                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </PageTemplate>
    );
}

export default Page404;
import { HiClock } from "react-icons/hi2";
import ImagemCoverCurso from "./ImagemCoverCurso.jsx";
import {useState} from "react";
import alertas from "../../util/Alertas.jsx";
import matriculaService from "../../services/matriculaService.js";

function CardCursoCatalogo({ curso , usuario, carregarCursos, carregarMatriculas }) {

    const [loading, setLoading] = useState(false);

    async function handleMatricula() {
        if (loading) return;

        if (!usuario?.id) {
            alertas.erro("Usuário não encontrado");
            return;
        }

        setLoading(true);

        try {
            const matriculas = await matriculaService.listarPorAluno(usuario.id);

            const jaMatriculado = matriculas.some(
                m => m.curso.codigo === curso.codigo
            );

            if (jaMatriculado) {
                alertas.erro("Você já está matriculado neste curso");
                return;
            }

            await matriculaService.matricular({
                alunoCodigo: usuario.id,
                cursoCodigo: curso.codigo,
                porcentagemProgresso: 0,
                concluido: false,
                dataMatricula: new Date()
            });

            alertas.sucesso("Inscrição realizada!");

            if (carregarCursos) {
                await carregarCursos();
            }

            if (carregarMatriculas) {
                await carregarMatriculas();
            }

        } catch (err) {
            console.log(err);
            alertas.erro("Erro ao se inscrever");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="bg-base-100 rounded-2xl shadow-sm border border-base-200 overflow-hidden flex flex-col hover:shadow-md transition-shadow duration-200">

            {/* Thumbnail */}
            <div className="h-36 bg-gradient-to-br from-primary/10 to-primary/20 flex items-center justify-center relative">
                <ImagemCoverCurso curso={curso} />

                {curso.categoria && (
                    <span className="absolute top-3 left-3 badge badge-ghost badge-sm bg-base-100/80">
                        {curso.categoria}
                    </span>
                )}
            </div>

            {/* Conteúdo */}
            <div className="p-4 flex flex-col gap-2 flex-1">

                {/* Título */}
                <h3 className="font-semibold text-base-content text-sm leading-snug line-clamp-2">
                    {curso.titulo}
                </h3>

                {/* Instrutor */}
                <p className="text-xs text-base-content/50">
                    {curso.instrutor?.nome ?? "Instrutor"}
                </p>

                {/* Info */}
                <div className="flex items-center gap-1 text-xs text-base-content/50 mt-1">
                    <HiClock className="w-3 h-3" />
                    {curso.horasDuracao}h de conteúdo
                </div>

                {/* Preço + CTA */}
                <div className="mt-auto pt-3 flex items-center justify-between">
                    <p className="text-sm font-semibold text-base-content">
                        {curso.preco?.toLocaleString("pt-BR", {
                            style: "currency",
                            currency: "BRL",
                        })}
                    </p>

                    <button
                        className="btn btn-primary btn-sm"
                        onClick={handleMatricula}
                        disabled={loading}
                    >
                        {loading ?
                            <span className="loading loading-spinner loading-sm bg-primary text-white" />
                            : "Inscrever-se"}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default CardCursoCatalogo;
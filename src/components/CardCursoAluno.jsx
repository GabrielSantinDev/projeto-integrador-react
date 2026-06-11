import { HiBookOpen, HiClock, HiCheckCircle } from "react-icons/hi2";
import ImagemCoverCurso from "./ImagemCoverCurso.jsx";

/**
 * CardCursoAluno
 * Props:
 *  - matricula: { curso: { titulo, categoria, horasDuracao, preco, instrutor: { nome } },
 *                 porcentagemProgresso, concluido }
 */
function CardCursoAluno({ matricula }) {
    const { curso, porcentagemProgresso = 0, concluido = false } = matricula;
    const progresso = Math.round(porcentagemProgresso);
    const horasAssistidas = ((porcentagemProgresso / 100) * curso.horasDuracao).toFixed(0);

    return (
        <div className="bg-base-100 rounded-2xl shadow-sm border border-base-200 overflow-hidden flex flex-col hover:shadow-md transition-shadow duration-200">

            {/* Thumbnail */}
            <div className="h-36 bg-gradient-to-br from-primary/10 to-primary/20 flex items-center justify-center relative">
                <ImagemCoverCurso curso={curso} />

                {concluido && (
                    <span className="absolute top-3 left-3 badge badge-success badge-sm gap-1 text-white">
                        <HiCheckCircle className="w-3 h-3" />
                        Concluído
                    </span>
                )}
                {!concluido && curso.categoria && (
                    <span className="absolute top-3 left-3 badge badge-ghost badge-sm bg-base-100/80">
                        {curso.categoria}
                    </span>
                )}
            </div>

            {/* Conteúdo */}
            <div className="p-4 flex flex-col gap-2 flex-1">
                <h3 className="font-semibold text-base-content text-sm leading-snug line-clamp-2">
                    {curso.titulo}
                </h3>
                <p className="text-xs text-base-content/50">
                    {curso.instrutor?.nome ?? "Instrutor"}
                </p>

                {/* Progresso */}
                <div className="mt-auto pt-2">
                    <div className="flex justify-between items-center mb-1">
                        <span className="flex items-center gap-1 text-xs text-base-content/50">
                            <HiClock className="w-3 h-3" />
                            {horasAssistidas}h de {curso.horasDuracao}h
                        </span>
                        <span className="text-xs font-medium text-base-content/70">
                            {progresso}%
                        </span>
                    </div>
                    <progress
                        className="progress progress-primary w-full h-1.5"
                        value={progresso}
                        max="100"
                    />
                </div>

                {/* Preço */}
                <p className="text-sm font-semibold text-base-content mt-1">
                    {curso.preco?.toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                    })}
                </p>
            </div>
        </div>
    );
}

export default CardCursoAluno;
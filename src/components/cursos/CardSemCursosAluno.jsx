import { HiBookOpen } from "react-icons/hi2";

function CardSemCursosAluno() {
    return (
        <div className="col-span-full flex flex-col items-center justify-center py-20 gap-4 text-center">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
                <HiBookOpen className="w-8 h-8 text-primary/50" />
            </div>
            <div>
                <p className="font-semibold text-base-content">Você ainda não tem cursos</p>
                <p className="text-sm text-base-content/50 mt-1">
                    Explore o catálogo e comece sua jornada de aprendizado.
                </p>
            </div>
        </div>
    );
}

export default CardSemCursosAluno;
import { HiOutlineBookOpen } from "react-icons/hi2";

function CardSemCursos() {
    return (
        <div className="card bg-base-100 shadow-sm border border-dashed border-base-300">
            <div className="card-body items-center text-center py-10">

                <div className="w-16 h-16 rounded-full bg-base-200 flex items-center justify-center">
                    <HiOutlineBookOpen className="text-3xl opacity-60 text-primary" />
                </div>

                <h2 className="text-xl font-bold mt-2">
                    Nenhum curso encontrado
                </h2>

                <p className="text-base-content/70 max-w-md">
                    Você ainda não publicou nenhum curso.
                    Quando criar seu primeiro curso, ele aparecerá aqui.
                </p>

            </div>
        </div>
    );
}

export default CardSemCursos;
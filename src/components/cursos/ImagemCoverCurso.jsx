import { HiOutlineBookOpen } from "react-icons/hi2";

function ImagemCoverCurso({ curso }) {
    return (
        <div className="w-full h-full flex items-center justify-center bg-linear-to-br from-primary/20 to-secondary/10">
            {curso?.urlImagem ? (
                <img
                    src={curso.urlImagem}
                    alt={curso.titulo}
                    className="w-full h-full object-cover"
                />
            ) : (
                <HiOutlineBookOpen className="text-3xl opacity-50" />
            )}
        </div>
    );
}

export default ImagemCoverCurso;
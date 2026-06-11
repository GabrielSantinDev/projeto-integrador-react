import { HiAcademicCap } from "react-icons/hi2";
import { MdOutlineCastForEducation } from "react-icons/md";


function TipoContaSelector({ value = "aluno", onChange }) {
    const tipos = [
        {
            key: "aluno",
            label: "Aluno",
            icon: <HiAcademicCap className="w-4 h-4" />,
        },
        {
            key: "instrutor",
            label: "Instrutor",
            icon: <MdOutlineCastForEducation className="w-4 h-4" />,
        },
    ];

    return (
        <div className="flex rounded-xl border border-base-300 p-1 gap-1 bg-base-300/50">
            {tipos.map((tipo) => {
                const ativo = value === tipo.key;
                return (
                    <button
                        key={tipo.key}
                        type="button"
                        onClick={() => onChange(tipo.key)}
                        className={`
                            flex-1 flex items-center justify-center gap-2
                            py-2 px-4 rounded-lg text-sm font-medium
                            transition-all duration-200 cursor-pointer
                            outline-none focus:outline-none border-none focus-visible:outline-none focus:border-none
                            ${
                            ativo
                                ? "bg-base-100 text-primary shadow-sm border border-base-300"
                                : "text-base-content/60 hover:text-base-content/80"
                        }
                        `}
                    >
                        {tipo.icon}
                        {tipo.label}
                    </button>
                );
            })}
        </div>

    );
}

export default TipoContaSelector;
import toast from "react-hot-toast";
import { MdError, MdCheckCircle } from "react-icons/md";

class Alertas {

    static erro(mensagem) {
        toast(mensagem, {
            icon: <MdError size={18} />,
            style: {
                borderRadius: "10px",
                background: "#e6192a",
                color: "#ffffff",
            },
        });
    }

    static sucesso(mensagem) {
        toast(mensagem, {
            icon: <MdCheckCircle size={18} />,
            style: {
                borderRadius: "10px",
                background: "#16a34a",
                color: "#ffffff",
            },
        });
    }

    static loading(mensagem) {
        return toast.custom(() => (
            <div className="
                flex items-center gap-3
                px-4 py-3
                bg-base-100
                rounded-xl
                shadow-xl
            ">
                <span className="loading loading-spinner loading-sm"></span>

                <span>{mensagem}</span>
            </div>
        ));
    }

    static mensagemIcon(Icon, mensagem) {
        return toast.custom(() => (
            <div className="
            flex items-center gap-3
            px-4 py-3
            bg-base-200
            rounded-xl
            shadow-xs
        ">
                <Icon size={20} />

                <span>{mensagem}</span>
            </div>
        ));
    }

}

export default Alertas;
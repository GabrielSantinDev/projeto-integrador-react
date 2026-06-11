
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function PublicRoute({ children }) {

    const usuario = useSelector(
        state => state.auth.usuarioLogado
    );

    if (usuario) {
        return (
            <Navigate
                to={
                    usuario.role === "INSTRUTOR"
                        ? "/home-instrutor"
                        : "/home-aluno"
                }
                replace
            />
        );
    }

    return children;
}
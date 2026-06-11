
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function PrivateRoute({ children, role }) {

    const usuario = useSelector(
        state => state.auth.usuarioLogado
    );

    if (!usuario) {
        return <Navigate to="/login" replace />;
    }

    if (role && usuario.role !== role) {
        return <Navigate to="/login" replace />;
    }

    return children;
}
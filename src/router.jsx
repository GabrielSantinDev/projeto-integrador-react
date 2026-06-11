import {createBrowserRouter} from "react-router-dom";
import {
    Page404, PageHomeAluno, PageLogin, PageHomeInstrutor, PageCadastro, PageHome

} from "./pages/index.js";
import PublicRoute from "./routes/PublicRoute.jsx";
import PrivateRoute from "./routes/PrivateRoute.jsx";
import PageCatalogo from "./pages/PageCatalogo.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: (
            <PublicRoute>
                <PageLogin />
            </PublicRoute>
        ),
        errorElement: <Page404/>
    },
    {
        path: "/login",
        element: (
            <PublicRoute>
                <PageLogin />
            </PublicRoute>
        )
    },
    {
        path: "/home",
        element: (
            <PublicRoute>
                <PageLogin />
            </PublicRoute>
        )
    },
    {
        path: "/home-instrutor",
        element: (
            <PrivateRoute role="INSTRUTOR">
                <PageHomeInstrutor />
            </PrivateRoute>
        )
    },
    {
        path: "/home-aluno",
        element: (
            <PrivateRoute role="ALUNO">
                <PageHomeAluno />
            </PrivateRoute>
        )
    },
    {
        path: "/catalogo",
        element: (
            <PrivateRoute role="ALUNO">
                <PageCatalogo />
            </PrivateRoute>
        )
    },
    {
        path: "/cadastro",
        element: <PageCadastro />
    }
]);

export default router;
import {createBrowserRouter} from "react-router-dom";
import {
    Page404, PageHomeAluno, PageLogin, PageHomeInstrutor, PageCadastro, PageHome

} from "./pages/index.js";

const router = createBrowserRouter([
    {
        path: "/",
        element: <PageHome/>,
        errorElement: <Page404/>
    },
    {
        path: "/home-instrutor",
        element: <PageHomeInstrutor/>,
        errorElement: <Page404/>
    },
    {
        path: "/home-aluno",
        element: <PageHomeAluno/>,
        errorElement: <Page404/>
    },
    {
        path: "/login",
        element: <PageLogin/>,
    },
    {
        path: "/cadastro",
        element: <PageCadastro/>,
    }

]);

export default router;
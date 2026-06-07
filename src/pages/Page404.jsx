import PageTemplate from "../components/PageTemplate.jsx";

function Page404() {
    return (
        <PageTemplate>
            <h1 className="text-9xl text-red-600">Erro 404</h1>
            <h1 className="text-xl">Não foi possível acessar a página.</h1>
        </PageTemplate>
    );

}

export default Page404;
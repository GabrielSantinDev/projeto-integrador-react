
import Titulo from "./Titulo.jsx";


function PageTemplate(props) {
    return (
        <>
            <main className="p-5">
                <Titulo>{props.titulo}</Titulo>
                {props.children}
            </main>
            <footer>

            </footer>
        </>
    )
}

export default PageTemplate;
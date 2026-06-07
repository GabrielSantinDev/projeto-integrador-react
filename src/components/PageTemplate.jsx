
import Titulo from "./Titulo.jsx";


function PageTemplate(props) {
    return (
        <div className={props.className}>
            <main>
                {props.children}
            </main>

            <footer>

            </footer>
        </div>
    )
}

export default PageTemplate;
function Titulo(props) {
    return (
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-blue-600 drop-shadow-sm">
            {props.children}
        </h1>
    )
}

export default Titulo;
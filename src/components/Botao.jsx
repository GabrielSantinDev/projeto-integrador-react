function Botao(props) {
    return (
        <button {...props}
                className="bg-blue-800 rounded p-2 text-white">
            {props.children}
        </button>
    )
}

export default Botao;
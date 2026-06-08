function InputTexto({
        type = "text",
        className = "",
        maxLength = 100,
        ...props
    }) {
    return (
        <input
            type={type}
            maxLength={maxLength}
            className={`
                input
                input-bordered
                w-full
                focus:outline-none
                focus:border-primary/80
                focus:ring-2
                focus:ring-primary/80
                rounded-xl
                ${className}
              `}
            {...props}
        />
    );
}

export default InputTexto;
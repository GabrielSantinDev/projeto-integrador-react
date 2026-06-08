function InputTextArea({
           value,
           placeholder,
           onChange,
           rows = 4,
           maxLength = 300
       }) {
    return (
        <textarea
            value={value}
            rows={rows}
            placeholder={placeholder}
            onChange={onChange}
            maxLength={maxLength}
            className="
                textarea
                textarea-bordered
                w-full
                focus:outline-none
                focus:border-primary/80
                focus:ring-2
                focus:ring-primary/80
                rounded-xl
            "
        />
    );
}

export default InputTextArea;
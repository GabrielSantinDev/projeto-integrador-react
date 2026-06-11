import { createContext, useContext, useState } from "react";

const ConfirmContext = createContext();

export function ConfirmProvider({ children }) {
    const [state, setState] = useState({
        open: false,
        title: "",
        message: "",
        resolve: null,
    });

    function confirm(title, message) {
        return new Promise((resolve) => {
            setState({
                open: true,
                title,
                message,
                resolve,
            });
        });
    }

    function handleClose(result) {
        state.resolve?.(result);
        setState((prev) => ({ ...prev, open: false }));
    }

    return (
        <ConfirmContext.Provider value={{ confirm }}>
            {children}

            {state.open && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-base-100 rounded-xl p-6 shadow-lg w-fit max-w-sm">

                        <h2 className="text-lg font-bold mb-2 break-words">
                            {state.title}
                        </h2>

                        <p className="text-sm opacity-70 mb-4 break-words">
                            {state.message}
                        </p>

                        <div className="flex justify-end gap-2">
                            <button
                                className="btn btn-ghost"
                                onClick={() => handleClose(false)}
                            >
                                Não
                            </button>

                            <button
                                className="btn btn-error"
                                onClick={() => handleClose(true)}
                            >
                                Sim
                            </button>
                        </div>

                    </div>
                </div>
            )}
        </ConfirmContext.Provider>
    );
}

export function useConfirm() {
    return useContext(ConfirmContext);
}
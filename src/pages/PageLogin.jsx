import { useState } from "react";
import { useForm } from "react-hook-form";
import { HiArrowRightOnRectangle } from "react-icons/hi2";
import AuthCard from "../components/AuthCard";
import TipoContaSeletor from "../components/TipoContaSeletor";
import InputTexto from "../components/InputTexto";
import Botao from "../components/Botao";
import authService from "../services/authService.js";
import {login} from "../store.js";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";

function PageLogin() {
    const dispatch  = useDispatch();
    const navigate  = useNavigate();
    const [tipo, setTipo] = useState("aluno");
    const [erroServidor, setErroServidor] = useState("");

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors, isSubmitting },
    } = useForm({ defaultValues: { username: "", senha: "" } });


    const onSubmit = async (data) => {
        setErroServidor("");

        console.log(data);

        try {
            // 1. Chama POST /auth
            const response = await authService.login({
                username: data.username,
                senha: data.senha,
            });

            // 2. Guarda no Redux (e no localStorage via reducer)
            dispatch(login({ usuario: response.usuario, token: response.token }));

            // 3. Redireciona conforme o role
            if (response.usuario.role === "INSTRUTOR") {
                navigate("/home-instrutor");
            } else {
                navigate("/home-aluno");
            }
        } catch (err) {
            const status = err.response?.status;
            console.log(err)

            if (status === 401 || status === 403) {
                setErroServidor("Email ou senha incorretos.");
            } else {
                setErroServidor("Erro ao conectar com o servidor. Tente novamente.");
            }
        }
    };

    return (
        <AuthCard>
            <h1 className="text-2xl font-bold text-base-content mb-1">
                Entrar na sua conta
            </h1>
            <p className="text-base-content/55 text-sm mb-6">
                Acesse sua plataforma de cursos
            </p>

            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                {/* Tipo de conta */}
                <div>
                    <label className="block text-sm font-medium text-base-content mb-2">
                        Entrar como
                    </label>
                    <TipoContaSeletor value={tipo} onChange={setTipo} />
                </div>

                {/* Email / username */}
                <div>
                    <label className="block text-sm font-medium text-base-content mb-1">
                        Email
                    </label>
                    <InputTexto
                        type="email"
                        placeholder="seu@email.com"
                        {...register("username", {
                            required: "Email é obrigatório",
                            pattern: {
                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                message: "Email inválido",
                            },
                        })}
                    />
                    {errors.username && (
                        <p className="text-error text-xs mt-1">{errors.username.message}</p>
                    )}
                </div>

                {/* Senha */}
                <div>
                    <label className="block text-sm font-medium text-base-content mb-1">
                        Senha
                    </label>
                    <InputTexto
                        type="password"
                        placeholder="••••••••"
                        {...register("senha", {
                            required: "Senha é obrigatória",
                            minLength: { value: 6, message: "Mínimo de 6 caracteres" },
                        })}
                    />
                    {errors.senha && (
                        <p className="text-error text-xs mt-1">{errors.senha.message}</p>
                    )}
                </div>

                {erroServidor && (
                    <div className="alert alert-error py-2 px-3 text-sm rounded-xl">
                        {erroServidor}
                    </div>
                )}

                <Botao
                    className="btn btn-primary w-full rounded-xl mt-1 gap-2"
                    onClick={() => {}}
                >
                    {isSubmitting ? (
                        <span className="loading loading-spinner loading-sm" />
                    ) : (
                        <HiArrowRightOnRectangle className="w-4 h-4" />
                    )}
                    Entrar
                </Botao>
            </form>

            <p className="text-center text-sm text-base-content/55 mt-5">
                Não tem uma conta?{" "}
                <a href="/cadastro" className="text-primary font-medium hover:underline">
                    Cadastre-se
                </a>
            </p>

        </AuthCard>
    );
}

export default PageLogin;

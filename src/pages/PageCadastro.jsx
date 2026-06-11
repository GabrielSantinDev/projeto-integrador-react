import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { HiUserPlus } from "react-icons/hi2";
import AuthCard from "../components/AuthCard";
import TipoContaSeletor from "../components/TipoContaSeletor";
import InputTexto from "../components/InputTexto";
import Botao from "../components/Botao";
import alunoService from "../services/alunoService";
import instrutorService from "../services/instrutorService";
import {useNavigate} from "react-router-dom";

function PageCadastro() {
    const navigate = useNavigate();
    const [tipo, setTipo] = useState("aluno");
    const [erroServidor, setErroServidor] = useState("");

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm({
        defaultValues: { nome: "", email: "", senha: "", dataNascimento: "" },
    });

    const validarIdade = (dataNasc) => {
        const nascimento = new Date(dataNasc);
        const hoje = new Date();
        let idade = hoje.getFullYear() - nascimento.getFullYear();
        const mes = hoje.getMonth() - nascimento.getMonth();
        if (mes < 0 || (mes === 0 && hoje.getDate() < nascimento.getDate())) idade--;
        return idade;
    };

    const onSubmit = async (data) => {
        setErroServidor("");

        if (tipo === "instrutor" && validarIdade(data.dataNascimento) < 18) {
            setErroServidor("É necessário ter pelo menos 18 anos para se cadastrar como instrutor (RN03).");
            return;
        }

        // O username é o próprio email — o back usa isso para login
        const payload = {
            nome: data.nome,
            username: data.email,   // Spring Security vai usar este campo
            email: data.email,
            senha: data.senha,       // O back deve encriptar com BCrypt no service
            dataNascimento: data.dataNascimento,
        };

        try {
            if (tipo === "instrutor") {
                await instrutorService.cadastrar(payload);
            } else {
                await alunoService.cadastrar(payload);
            }
            // Redireciona para login após cadastro
            navigate("/login");
        } catch (err) {
            const status = err.response?.status;
            if (status === 409) {
                setErroServidor("Este email já está cadastrado.");
            } else {
                setErroServidor("Ocorreu um erro ao criar a conta. Tente novamente.");
            }
        }
    };

    return (
        <AuthCard>
            <h1 className="text-2xl font-bold text-base-content mb-1">
                Criar uma conta
            </h1>
            <p className="text-base-content/55 text-sm mb-6">
                Comece sua jornada de aprendizado
            </p>

            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                <div>
                    <label className="block text-sm font-medium text-base-content mb-2">
                        Tipo de conta
                    </label>
                    <TipoContaSeletor value={tipo} onChange={setTipo} />
                </div>

                <div>
                    <label className="block text-sm font-medium text-base-content mb-1">
                        Nome completo
                    </label>
                    <InputTexto
                        placeholder="Seu nome"
                        {...register("nome", {
                            required: "Nome é obrigatório",
                            minLength: { value: 3, message: "Mínimo de 3 caracteres" },
                        })}
                    />
                    {errors.nome && (
                        <p className="text-error text-xs mt-1">{errors.nome.message}</p>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium text-base-content mb-1">
                        Email
                    </label>
                    <InputTexto
                        type="email"
                        placeholder="seu@email.com"
                        {...register("email", {
                            required: "Email é obrigatório",
                            pattern: {
                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                message: "Email inválido",
                            },
                        })}
                    />
                    {errors.email && (
                        <p className="text-error text-xs mt-1">{errors.email.message}</p>
                    )}
                </div>

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

                <div>
                    <label className="block text-sm font-medium text-base-content mb-1">
                        Data de nascimento
                    </label>
                    <InputTexto
                        type="date"
                        {...register("dataNascimento", {
                            required: "Data de nascimento é obrigatória",
                        })}
                    />
                    {errors.dataNascimento && (
                        <p className="text-error text-xs mt-1">{errors.dataNascimento.message}</p>
                    )}
                    {tipo === "instrutor" && !errors.dataNascimento && (
                        <p className="text-xs text-base-content/50 mt-1">
                            É necessário ter pelo menos 18 anos para se cadastrar como instrutor (RN03).
                        </p>
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
                        <HiUserPlus className="w-4 h-4" />
                    )}
                    Criar conta
                </Botao>
            </form>

            <p className="text-center text-sm text-base-content/55 mt-5">
                Já tem uma conta?{" "}
                <a href="/login" className="text-primary font-medium hover:underline">
                    Entrar
                </a>
            </p>
        </AuthCard>
    );
}


export default PageCadastro;
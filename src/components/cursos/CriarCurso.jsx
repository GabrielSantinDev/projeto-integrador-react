import Botao from "../Botao.jsx";
import InputTexto from "../InputTexto.jsx";
import InputTextArea from "../InputTextArea.jsx";
import InputNumero from "../InputNumero.jsx";
import {useState} from "react";
import cursoService from "../../services/cursoService.js";
import alertas from "../../util/Alertas.jsx";
import { useSelector } from "react-redux";

export default function CriarCurso({ open, onClose , atualizarCursos}) {

    if (!open) return null;

    const [titulo, setTitulo] = useState("");
    const [descricao, setDescricao] = useState("");
    const [preco, setPreco] = useState("");
    const [cargaHoraria, setCargaHoraria] = useState("");
    const [categoria, setCategoria] = useState("");

    const usuario = useSelector(state => state.auth.usuarioLogado);


    function validarFormulario() {
        if (!titulo.trim()) {
            alertas.erro("Informe o título");
            return false;
        }

        if (!descricao.trim()) {
            alertas.erro("Informe a descrição");
            return false;
        }

        if (!preco || Number(preco) <= 0) {
            alertas.erro("Informe um preço válido")
            return false;
        }

        if (!cargaHoraria || Number(cargaHoraria) <= 0) {
            alertas.erro("Informe uma carga horária válida")
            return false;
        }

        if (!categoria.trim()) {
            alertas.erro("Informe a categoria")
            return false;
        }

        return true;
    }

    async function handleSubmit() {
        const valido = validarFormulario();

        if (!valido) return;

        const curso = {
            instrutorCodigo: usuario.id,

            titulo,
            categoria,

            horasDuracao: Number(cargaHoraria),

            preco: Number(preco),
            descricao,

            publicado: false,
        };

        try {
            await cursoService.criar(curso);

            // limpa os campos
            setTitulo("");
            setDescricao("");
            setPreco("");
            setCargaHoraria("");
            setCategoria("");

            onClose();

            alertas.sucesso("Curso criado com sucesso!");
            atualizarCursos();
        } catch (error) {
            console.log(error);
            alertas.erro("Erro ao criar curso! Tente novamente.");
        }
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">

            {/* Overlay escuro */}
            <div
                className="absolute inset-0 bg-black/50 backdrop-blur-[2px]"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="relative w-full max-w-[470px] rounded-2xl bg-base-200 shadow-2xl border border-primary">

                {/* Header */}
                <div className="flex items-start justify-between px-6 pt-6">
                    <div>
                        <h2 className="text-2xl font-semibold text-base-content">
                            Novo Curso
                        </h2>

                        <p className="mt-1 text-sm text-base-content/80">
                            Preencha os dados para criar um novo curso.
                        </p>
                    </div>

                    <Botao
                        onClick={onClose}
                        className="btn text-base-content/70 hover:text-base-200 hover:bg-error/80 btn-circle"
                    >
                        ✕
                    </Botao>
                </div>

                <div className="px-6 py-5 space-y-5">

                    <div>
                        <label className="block text-sm font-medium text-base-content mb-2">
                            Título *
                        </label>

                        <InputTexto
                            value={titulo}
                            onChange={(e) => setTitulo(e.target.value)}
                            placeholder="Nome do curso"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-base-content mb-2">
                            Descrição *
                        </label>

                        <InputTextArea
                            value={descricao}
                            rows={4}
                            onChange={(e) => setDescricao(e.target.value)}
                            placeholder="Descreva o curso"
                        />

                    </div>

                    <div className="grid grid-cols-2 gap-4">

                        <div>
                            <label className="block text-sm font-medium text-base-content mb-2">
                                Preço (R$) *
                            </label>

                            <InputNumero
                                value={preco}
                                onChange={(e) => setPreco(e.target.value)}
                                placeholder="00,00"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-base-content mb-2">
                                Carga horária (h) *
                            </label>

                            <InputNumero
                                value={cargaHoraria}
                                onChange={(e) => setCargaHoraria(e.target.value)}
                                placeholder="20"
                            />
                        </div>

                    </div>

                    <div>
                        <label className="block text-sm font-medium text-base-content mb-2">
                            Categoria *
                        </label>

                        <InputTexto
                            value={categoria}
                            onChange={(e) => setCategoria(e.target.value)}
                            placeholder="Ex: Desenvolvimento Web"
                        />
                    </div>

                </div>

                <div className="flex justify-end gap-3 px-6 pb-6">

                    <Botao
                        onClick={onClose}
                        className="btn btn-ghost hover:border hover:border-base-content"
                    >
                        Cancelar
                    </Botao>

                    <Botao
                        onClick={handleSubmit}
                        className="
                            btn
                            bg-primary
                            border-none
                            text-white
                            hover:bg-primary/70
                            " >
                        Criar Curso
                    </Botao>

                </div>

            </div>
        </div>
    );
}
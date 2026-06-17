import {
    FaEyeSlash,
    FaEye,
    FaPen,
    FaTrash
} from "react-icons/fa";

import { IoTimeOutline } from "react-icons/io5";
import Botao from "../Botao.jsx";
import cursoService from "../../services/cursoService.js";
import alertas from "../../util/Alertas.jsx";
import {useRef, useState} from "react";
import EditarCurso from "./EditarCurso.jsx";
import ImagemCoverCurso from "./ImagemCoverCurso.jsx";
import {useConfirm} from "../ConfirmModal.jsx";

function CardCurso({ curso, atualizarCursos, setCursos}) {

    const [open, setOpen] = useState(false);
    const fileInputRef = useRef(null);
    const { confirm } = useConfirm();

    const cores = [
        "border-blue-500 text-blue-500",
        "border-green-500 text-green-500",
        "border-purple-500 text-purple-500",
        "border-orange-500 text-orange-500",
        "border-pink-500 text-pink-500",
        "border-cyan-500 text-cyan-500",
    ];

    const corCategoria =
        cores[curso.categoria.length % cores.length];

    function handleClick() {
        fileInputRef.current.click();
    }

    async function handleFileChange(e) {
        const file = e.target.files[0];
        if (!file) return;

        try {
            const preview = URL.createObjectURL(file);

            // mudar de imagem na interface antes de enviar no back end para ficar mais rápido
            setCursos(prev =>
                prev.map(c =>
                    c.codigo === curso.codigo
                        ? { ...c, urlImagem: preview }
                        : c
                )
            );

            const atualizado = await cursoService.atualizarImagem(curso.codigo, file);

            setCursos(prev =>
                prev.map(c =>
                    c.codigo === curso.codigo
                        ? { ...c, urlImagem: atualizado.urlImagem }
                        : c
                )
            );

        } catch (error) {
            console.log(error);
        }
    }

    async function publicarCurso() {

        const cursoAtualizado = {
            ...curso,
            publicado: !curso.publicado,
        };

        // Atualiza UI imediatamente
        setCursos(prev =>
            prev.map(c =>
                c.codigo === curso.codigo
                    ? cursoAtualizado
                    : c
            )
        );

        alertas.mensagemIcon(
            cursoAtualizado.publicado ? FaEye : FaEyeSlash,
            cursoAtualizado.publicado ? 'Curso publicado' : 'Curso privado'
        );

        try {
            await cursoService.atualizar(curso.codigo, cursoAtualizado);
            //await atualizarCursos();
        } catch (error) {
            console.log(error);

            // Reverte em caso de erro
            setCursos(prev =>
                prev.map(c =>
                    c.codigo === curso.codigo
                        ? curso
                        : c
                )
            );
        }
    }

    async function removerCurso() {
        const ok = await confirm(
            "Excluir Curso?",
            "Tem certeza que deseja excluir o curso " + curso.titulo + "? Esta ação não pode ser desfeita.");

        if (!ok) return;

        alertas.loading('Removendo curso...');

        try {
            await cursoService.remover(curso.codigo);
            alertas.sucesso('Curso removido com sucesso!');
            atualizarCursos();
        } catch (error) {
            console.log(error);

            const data = error?.response?.data;

            const msg = (data?.message || data?.error || '').toLowerCase();

            const isForeignKey =
                msg.includes('violates foreign key constraint') ||
                msg.includes('still referenced') ||
                msg.includes('constraint') ||
                msg.includes('foreign key');

            if (isForeignKey) {
                alertas.erro('Não é possível excluir: este curso contém alunos matriculados.');
                return;
            }

            alertas.erro('Ocorreu um erro ao remover o curso!');

        }
    }

    return (
        <div className="card bg-base-100 shadow-sm border border-base-300 hover:shadow-lg">
            <div className="card-body">

                <div className="flex items-center justify-between">

                    {/* ESQUERDA */}
                    <div className="flex gap-4">

                        <input
                            type="file"
                            accept="image/*"
                            ref={fileInputRef}
                            className="hidden"
                            onChange={handleFileChange}
                        />

                        <Botao
                            type="button"
                            onClick={handleClick}
                            className="btn btn-ghost rounded-2xl p-0 w-32 h-20 overflow-hidden"
                        >

                            {/* EDITAR IMAGENS */}
                            <div className="relative w-32 h-20 rounded-2xl overflow-hidden group">

                                {/* FUNDO (IMAGEM OU FALLBACK) */}
                                <ImagemCoverCurso curso={curso} />

                                {/* OVERLAY HOVER */}
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-200 flex items-center justify-center">
                                    <FaPen className="text-white text-xl opacity-0 group-hover:opacity-100 transition-all duration-200" />
                                </div>

                                {/* LÁPIS PEQUENO */}
                                <div className="absolute top-1 right-1 bg-black/50 rounded-full p-1 transition-opacity duration-200 group-hover:opacity-0">
                                    <FaPen className="text-white text-[10px]" />
                                </div>

                            </div>

                        </Botao>

                        <div>

                            <div className="flex gap-2 mb-2">

                            <span className={`badge badge-outline ${corCategoria}`}>
                                {curso.categoria}
                            </span>

                            <span
                                className={`badge text-base-100 outline-none border-none ${
                                    curso.publicado
                                        ? "bg-success/90"
                                        : "bg-error/90"
                                }`}
                            >
                                {curso.publicado ? "Público" : "Privado"}
                            </span>

                            </div>


                            <h2 className="font-bold text-base truncate max-w-[50ch]">
                                {curso.titulo}
                            </h2>

                            <p className="text-sm opacity-70 mt-1 line-clamp-2">
                                {curso.descricao}
                            </p>

                            <div className="flex items-center gap-4 mt-2 text-sm opacity-70">

                                <span className="flex items-center gap-1">
                                    <IoTimeOutline />
                                    {curso.horasDuracao}h
                                </span>

                                <span className="font-semibold text-base-content opacity-100">
                                    R$ {curso.preco?.toFixed(2)}
                                </span>

                            </div>

                        </div>

                    </div>

                    {/* DIREITA */}
                    <div className="flex gap-2">

                        <Botao
                            className="btn btn-ghost hover:bg-success/80 rounded-full"
                            onClick={() => publicarCurso(curso)}
                        >
                            {curso.publicado ? <FaEyeSlash /> : <FaEye />}
                            {curso.publicado ? "Despublicar" : "Publicar"}
                        </Botao>

                        <Botao
                            className="btn btn-ghost hover:bg-success/80 rounded-full"
                            onClick={() => setOpen(true)}
                        >
                            <FaPen />
                            Editar
                        </Botao>

                        <Botao className="btn btn-ghost text-error hover:bg-error hover:text-base-content rounded-full"
                               onClick={() => removerCurso(curso)}
                        >
                            <FaTrash />
                            Remover
                        </Botao>

                        <EditarCurso
                            open={open}
                            atualizarCursos={atualizarCursos}
                            curso={curso}
                            onClose={() => setOpen(false)}
                        />

                    </div>

                </div>

            </div>
        </div>
    );
}

export default CardCurso;
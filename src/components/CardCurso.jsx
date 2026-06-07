import {
    FaEyeSlash,
    FaEye,
    FaPen,
    FaTrash
} from "react-icons/fa";

import { IoTimeOutline } from "react-icons/io5";
import { HiOutlineBookOpen } from "react-icons/hi2";
import Botao from "./Botao.jsx";
import cursoService from "../services/cursoService.js";

function CardCurso({ curso, atualizarCursos, setCursos}) {

    async function publicarCurso() {

        const cursoAtualizado = {
            ...curso,
            publicado: !curso.publicado,
        };

        // 1. Atualiza UI imediatamente
        setCursos(prev =>
            prev.map(c =>
                c.codigo === curso.codigo
                    ? cursoAtualizado
                    : c
            )
        );

        try {
            await cursoService.atualizar(curso.codigo, cursoAtualizado);
            //await atualizarCursos();
        } catch (error) {
            console.log(error);

            // 3. Reverte em caso de erro
            setCursos(prev =>
                prev.map(c =>
                    c.codigo === curso.codigo
                        ? curso
                        : c
                )
            );
        }
    }

    return (
        <div className="card bg-base-100 shadow-sm border border-base-300 hover:shadow-lg">
            <div className="card-body">

                <div className="flex items-center justify-between">

                    {/* ESQUERDA */}
                    <div className="flex gap-4">

                        <div className="w-32 h-20 rounded-2xl flex items-center justify-center bg-linear-to-br from-primary/20 to-secondary/10">
                            <HiOutlineBookOpen className="text-3xl opacity-50" />
                        </div>

                        <div>

                            <div className="flex items-center gap-2 mb-2">
                                <div className="badge badge-outline">
                                    {curso.categoria}
                                </div>
                            </div>

                            <h2 className="font-bold text-xl">
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

                        <Botao className="btn btn-ghost hover:bg-success/80 rounded-full">
                            <FaPen />
                            Editar
                        </Botao>

                        <Botao className="btn btn-ghost text-error hover:bg-error hover:text-base-content rounded-full">
                            <FaTrash />
                            Remover
                        </Botao>

                    </div>

                </div>

            </div>
        </div>
    );
}

export default CardCurso;
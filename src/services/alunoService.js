import api from './api'

const alunoService = {
    listarTodos: async () => {
        const response = await api.get("/alunos")
        return response.data
    },
    cadastrar: async (aluno) => {
        const response = await api.post("/alunos", aluno)
        return response.data
    },
    atualizar: async (id, aluno) => {
        const response = await api.put(`/alunos/${id}`, aluno)
        return response.data
    },
    buscarId: async (id) => {
        const response = await api.get(`/alunos/${id}`)
        return response.data
    },
    remover: async (id) => {
        const response = await api.delete(`/alunos/${id}`)
        return response.data
    }
}

export default alunoService;
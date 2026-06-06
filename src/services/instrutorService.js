import api from './api'

const instrutorService = {
    listarTodos: async () => {
        const response = await api.get("/instrutores")
        return response.data
    },
    cadastrar: async (instrutor) => {
        const response = await api.post("/instrutores", instrutor)
        return response.data
    },
    atualizar: async (id, instrutor) => {
        const response = await api.put(`/instrutores/${id}`, instrutor)
        return response.data
    },
    buscarId: async (id) => {
        const response = await api.get(`/instrutores/${id}`)
        return response.data
    },
    remover: async (id) => {
        const response = await api.delete(`/instrutores/${id}`)
        return response.data
    }
}

export default instrutorService;
import api from './api'

const avaliacaoService = {
    listarTodos: async () => {
        const response = await api.get("/avaliacoes")
        return response.data
    },
    cadastrar: async (avaliacao) => {
        const response = await api.post("/avaliacoes", avaliacao)
        return response.data
    },
    atualizar: async (id, avaliacao) => {
        const response = await api.put(`/avaliacoes/${id}`, avaliacao)
        return response.data
    },
    buscarId: async (id) => {
        const response = await api.get(`/avaliacoes/${id}`)
        return response.data
    },
    remover: async (id) => {
        const response = await api.delete(`/avaliacoes/${id}`)
        return response.data
    }
}

export default avaliacaoService;
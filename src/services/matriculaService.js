import api from './api'

const matriculaService = {
    listarTodos: async () => {
        const response = await api.get("/matriculas")
        return response.data
    },
    cadastrar: async (matricula) => {
        const response = await api.post("/matriculas", matricula)
        return response.data
    },
    atualizar: async (id, matricula) => {
        const response = await api.put(`/matriculas/${id}`, matricula)
        return response.data
    },
    buscarId: async (id) => {
        const response = await api.get(`/matriculas/${id}`)
        return response.data
    },
    remover: async (id) => {
        const response = await api.delete(`/matriculas/${id}`)
        return response.data
    }
}

export default matriculaService;
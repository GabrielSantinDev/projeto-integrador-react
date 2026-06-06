import api from './api'

const cursoService = {
    listarTodos: async () => {
        const response = await api.get("/cursos")
        return response.data
    },
    cadastrar: async (curso) => {
        const response = await api.post("/cursos", curso)
        return response.data
    },
    atualizar: async (id, curso) => {
        const response = await api.put(`/cursos/${id}`, curso)
        return response.data
    },
    buscarId: async (id) => {
        const response = await api.get(`/cursos/${id}`)
        return response.data
    },
    remover: async (id) => {
        const response = await api.delete(`/cursos/${id}`)
        return response.data
    }
}

export default cursoService;
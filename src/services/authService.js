import api from './api';

const authService = {
    // POST /auth  →  LoginResponseDTO { usuario, token }
    login: async ({ username, senha }) => {
        const response = await api.post('/auth', { username, senha });
        return response.data; // { usuario: { id, nome, email, username, role }, token }
    },
};

export default authService;
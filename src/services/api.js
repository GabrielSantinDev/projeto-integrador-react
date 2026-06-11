import axios from 'axios';
import store from '../store.js';

const api = axios.create({
    baseURL: 'http://localhost:8080',
    timeout: 10000,
});

// Interceptor de REQUEST — anexa o Bearer token em toda requisição
api.interceptors.request.use(
    (config) => {
        const token = store.getState().auth.token;
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Interceptor de RESPONSE — trata 401 globalmente (token expirado)
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // Token expirado ou inválido: faz logout automático
            store.dispatch({ type: 'auth/logout' });
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export default api;
import { configureStore, createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        // Recupera do localStorage para sobreviver ao F5
        usuarioLogado: (() => {
            try {
                const raw = localStorage.getItem('usuarioLogado');
                return raw ? JSON.parse(raw) : null;
            } catch {
                return null;
            }
        })(),
        token: localStorage.getItem('token') || null,
    },
    reducers: {
        // Disparado após login bem-sucedido
        // payload: { usuario: UsuarioDetailDTO, token: string }
        login: (state, action) => {
            state.usuarioLogado = action.payload.usuario;
            state.token = action.payload.token;
            localStorage.setItem('usuarioLogado', JSON.stringify(action.payload.usuario));
            localStorage.setItem('token', action.payload.token);
        },

        logout: (state) => {
            state.usuarioLogado = null;
            state.token = null;
            localStorage.removeItem('usuarioLogado');
            localStorage.removeItem('token');
        },
    },
});

const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
    },
});

export const { login, logout } = authSlice.actions;
export default store;
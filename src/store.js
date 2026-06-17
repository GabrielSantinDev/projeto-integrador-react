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

const cursosSlice = createSlice({
    name: "cursos",
    initialState: {
        lista: [],
        carregando: false,
    },
    reducers: {

        setCursos: (state, action) => {
            state.lista = action.payload;
        },
        clearCursos: (state) => {
            state.lista = [];
        },
        setCarregando: (state, action) => {
            state.carregando = action.payload;
        }
    }
});

const matriculasSlice = createSlice({
    name: "matriculas",
    initialState: {
        lista: [],
        carregando: false,
    },
    reducers: {
        setMatriculas: (state, action) => {
            state.lista = action.payload;
        },

        clearMatriculas: (state) => {
            state.lista = [];
        },
        setCarregandoMatriculas: (state, action) => {
            state.carregando = action.payload;
        }
    }
});


const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        cursos: cursosSlice.reducer,
        matriculas: matriculasSlice.reducer,
    },
});

export const { login, logout } = authSlice.actions;
export const { setCursos, clearCursos, setCarregando} = cursosSlice.actions;
export const { setMatriculas, clearMatriculas, setCarregandoMatriculas} = matriculasSlice.actions;
export default store;
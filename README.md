<div align="center">

<img src="https://img.shields.io/badge/SkillUp-Frontend-7f22fe?style=for-the-badge&logo=graduation-cap&logoColor=white" alt="SkillUp Frontend" />

<br/><br/>

![React](https://img.shields.io/badge/React_18-61DAFB?style=flat-square&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS_v4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)
![DaisyUI](https://img.shields.io/badge/DaisyUI-5A0EF8?style=flat-square&logo=daisyui&logoColor=white)
![Redux](https://img.shields.io/badge/Redux_Toolkit-764ABC?style=flat-square&logo=redux&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=flat-square&logo=reactrouter&logoColor=white)
![Axios](https://img.shields.io/badge/Axios-5A29E4?style=flat-square&logo=axios&logoColor=white)
![React Hook Form](https://img.shields.io/badge/React_Hook_Form-EC5990?style=flat-square&logo=reacthookform&logoColor=white)
![Status](https://img.shields.io/badge/status-em%20desenvolvimento-yellow?style=flat-square)

<br/>

**Frontend da plataforma de cursos online SkillUp, desenvolvido em React e consumindo a [API REST em Spring Boot](https://github.com/GabrielSantinDev/ProjetoIntegrador).**

</div>

---

## 📖 Sobre o Projeto

Este repositório contém o front-end da plataforma **SkillUp**, construído em **React + Vite** e integrado à [API REST](https://github.com/GabrielSantinDev/ProjetoIntegrador) via **Axios**.

A autenticação é feita via **JWT** — o token recebido do back-end é armazenado no **Redux** (estado global) e no **localStorage** (persistência após F5), e injetado automaticamente em todas as requisições por um interceptor do Axios.

A interface suporta **tema claro e escuro** persistido entre sessões, com estilização via **Tailwind CSS v4 + DaisyUI**.

Vídeo de demonstração: **https://drive.google.com/file/d/1stQfz3xotUg2ilquvHLbQZJLBz6IexrO/view?usp=sharing**

---

## 🎯 Funcionalidades

### 👨‍🎓 Aluno
- Cadastro e login
- Visualização dos cursos matriculados com barra de progresso
- Catálogo de cursos disponíveis
- Matrícula em novos cursos

### 👨‍🏫 Instrutor
- Cadastro e login
- Criação, edição e exclusão de cursos
- Upload de imagem de capa
- Publicação e gerenciamento de cursos

### 🔒 Geral
- Rotas protegidas por autenticação (`PrivateRoute`)
- Rotas públicas bloqueadas para usuários já logados (`PublicRoute`)
- Redirecionamento automático por role (`ALUNO` / `INSTRUTOR`)
- Logout com limpeza do Redux e localStorage
- Tema claro/escuro persistido no localStorage

---

## 🛠 Tecnologias

| Tecnologia | Uso |
|---|---|
| React 18 | Biblioteca de UI |
| Vite | Bundler e servidor de desenvolvimento |
| Tailwind CSS v4 | Estilização utilitária |
| DaisyUI | Componentes e sistema de temas |
| Redux Toolkit + react-redux | Estado global (autenticação, token) |
| React Router Dom | Roteamento client-side |
| Axios | Requisições HTTP com interceptors |
| React Hook Form | Formulários com validação |

---

## 🏗 Estrutura do Projeto

```
src/
│
├── assets/                 # Imagens e arquivos estáticos
│
├── components/             # Componentes reutilizáveis
├── pages/                  # Páginas da aplicação
│   ├── Page404.jsx
│   ├── PageCadastro.jsx
│   ├── PageHome.jsx
│   ├── PageHomeAluno.jsx
│   ├── PageHomeInstrutor.jsx
│   └── PageLogin.jsx
│
├── routes/                 # Controle de acesso às rotas
│   ├── PrivateRoute.jsx    # Bloqueia usuários não autenticados
│   └── PublicRoute.jsx     # Bloqueia usuários já logados
│
├── services/               # Comunicação com a API
│   ├── api.js              # Instância Axios + interceptors JWT
│   ├── authService.js      # Login
│   ├── alunoService.js
│   ├── avaliacaoService.js
│   ├── cursoService.js
│   ├── instrutorService.js
│   └── matriculaService.js
│
├── util/                   # Utilitários gerais
│
├── App.css                 # Configuração Tailwind + temas DaisyUI
├── App.jsx
├── main.jsx                # Entry point — Provider Redux + BrowserRouter
├── router.jsx              # Definição de todas as rotas
└── store.js                # Redux store + authSlice
```

---

## 🔐 Autenticação e Estado Global

O fluxo de autenticação segue o padrão ensinado com **Redux + JWT**:

```
1. Usuário faz login  →  POST /auth  (authService)
2. API retorna  →  { usuario, token }
3. dispatch(login({ usuario, token }))  →  salva no Redux + localStorage
4. Axios interceptor injeta  →  Authorization: Bearer <token>  em toda requisição
5. Se o token expirar (401)  →  interceptor faz logout automático e redireciona
6. Ao recarregar a página  →  Redux inicializa lendo o localStorage (sem perder sessão)
```

### `store.js` — authSlice

| Action | O que faz |
|---|---|
| `login(payload)` | Salva `usuarioLogado` e `token` no Redux e no localStorage |
| `logout()` | Limpa Redux e localStorage, encerrando a sessão |

---

## 🗺 Rotas

| Rota | Página | Acesso |
|---|---|---|
| `/` | Redireciona conforme role | — |
| `/login` | `PageLogin` | Público (bloqueado se logado) |
| `/cadastro` | `PageCadastro` | Público (bloqueado se logado) |
| `/home-aluno` | `PageHomeAluno` | `ALUNO` autenticado |
| `/home-instrutor` | `PageHomeInstrutor` | `INSTRUTOR` autenticado |
| `*` | `Page404` | Qualquer |

### PrivateRoute

Redireciona para `/login` se o usuário não estiver autenticado.

### PublicRoute

Redireciona para a home correspondente se o usuário já estiver logado.

---

## ▶️ Como Executar

### Pré-requisitos

- Node.js 18+
- npm
- [API REST do SkillUp](https://github.com/GabrielSantinDev/ProjetoIntegrador) rodando em `http://localhost:8080`

### 1. Clonar o repositório

```bash
git clone https://github.com/GabrielSantinDev/projeto-integrador-react.git
cd projeto-integrador-react
```

### 2. Instalar dependências

```bash
npm install
```

### 3. Executar em desenvolvimento

```bash
npm run dev
```

O app estará disponível em `http://localhost:5173`.

### 4. Build para produção

```bash
npm run build
```

---

## ⚙️ Configuração da API

A URL base da API está definida em `src/services/api.js`:

```js
const api = axios.create({
    baseURL: 'http://localhost:8080',
    timeout: 10000,
});
```

Se a API estiver em outro endereço, altere o `baseURL` nesse arquivo.

---

## 📌 Conceitos Aplicados

- Autenticação stateless com JWT armazenado em Redux + localStorage
- Interceptor Axios para injeção automática do Bearer token
- Proteção de rotas por autenticação e por role
- Estado global com Redux Toolkit
- Formulários com validação via React Hook Form
- Tema claro/escuro persistido com DaisyUI + localStorage
- Componentização e reutilização de UI
- Consumo de API REST com tratamento de erros e estados de carregamento

---

## 🔗 Projetos Relacionados

| Repositório | Descrição | Tecnologia |
|---|---|---|
| [ProjetoIntegrador](https://github.com/GabrielSantinDev/ProjetoIntegrador) | API REST consumida por este front-end | Java + Spring Boot |
| [projeto-integrador-react](https://github.com/GabrielSantinDev/projeto-integrador-react) | **Este repositório** — Frontend | React + TailwindCSS |
| [ProjetoIntegradorWeb](https://github.com/GabrielSantinDev/ProjetoIntegradorWeb) | Versão web alternativa | PHP + Bootstrap |

---

## 👥 Equipe

Projeto desenvolvido para as disciplinas de **Análise e Projeto de Sistemas** e **Programação de Software e Aplicativos I** do curso de **Sistemas de Informação — IFPR**.

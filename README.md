# laBiblio

Sistema web de gerenciamento de biblioteca: cadastro, listagem e organização de livros, com dashboard e autenticação de usuários.

## Tecnologias

- **Frontend:** React + TypeScript + Vite
- **UI:** Tailwind CSS + shadcn/ui
- **Backend:** Convex (banco de dados, funções serverless e sincronização em tempo real)

## Como rodar o projeto

Pré-requisitos: [Node.js](https://nodejs.org) (LTS) e uma conta gratuita no [Convex](https://www.convex.dev).

```bash
# 1. Instalar as dependências
npm install

# 2. Rodar o backend Convex (deixe rodando)
npx convex dev

# 3. Em outro terminal, rodar o frontend
npm run dev
```

O app abre em `http://localhost:5173`.

> Novo no projeto ou em Git/Convex? Veja o [Guia para iniciantes](./GUIA-INICIANTE.md).

## Scripts

| Comando | O que faz |
|---|---|
| `npm run dev` | Roda o frontend em modo desenvolvimento |
| `npm run build` | Checa os tipos e gera a build de produção |
| `npm run lint` | Roda o ESLint |
| `npm run preview` | Serve localmente a build de produção |

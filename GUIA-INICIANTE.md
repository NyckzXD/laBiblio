# Guia para iniciantes — Git, Convex e como rodar o projeto

Este guia é para quem está começando: explica os comandos básicos do Git no PowerShell, o que é o Convex e como configurar/rodar o projeto laBiblio localmente.

---

## 1. Git básico no PowerShell

O PowerShell roda os comandos do Git normalmente (o Git funciona igual em qualquer terminal). Abra o PowerShell na pasta do projeto antes de começar.

### Configuração inicial (só precisa fazer uma vez por computador)

```powershell
git config --global user.name "Seu Nome"
git config --global user.email "seu@email.com"
```

### Comandos do dia a dia

| Comando | O que faz |
|---|---|
| `git status` | Mostra o que mudou (arquivos novos, modificados, etc). Use sempre antes de qualquer outra coisa. |
| `git add nome-do-arquivo` | Adiciona um arquivo específico para o próximo commit. |
| `git add .` | Adiciona **todos** os arquivos modificados/novos. Cuidado: revise com `git status` antes. |
| `git commit -m "mensagem"` | Salva as mudanças adicionadas (staged) como um novo commit, com uma mensagem explicando o que foi feito. |
| `git log` | Mostra o histórico de commits. |
| `git log --oneline` | Mesmo histórico, mas resumido em uma linha por commit. |
| `git diff` | Mostra as diferenças de linhas que ainda **não** foram adicionadas (`git add`). |
| `git diff --staged` | Mostra as diferenças do que já está preparado para commit. |
| `git branch` | Lista as branches (ramos) do repositório. |
| `git branch nome-da-branch` | Cria uma nova branch. |
| `git checkout nome-da-branch` | Troca para outra branch. |
| `git checkout -b nome-da-branch` | Cria e já troca para a nova branch (atalho dos dois comandos acima). |
| `git pull` | Baixa e mescla as mudanças mais recentes do repositório remoto. |
| `git push` | Envia seus commits locais para o repositório remoto. |
| `git clone url-do-repo` | Copia (baixa) um repositório remoto para a sua máquina. |
| `git stash` | Guarda temporariamente as mudanças não commitadas, sem perdê-las, e limpa a working tree. |
| `git stash pop` | Traz de volta as mudanças guardadas com `git stash`. |

### Fluxo típico de trabalho

```powershell
git status                     # ver o que mudou
git add .                      # preparar as mudanças
git commit -m "explica o que fez"
git push                       # enviar para o remoto (ex: GitHub)
```

### Cuidado com estes comandos (podem apagar trabalho)

- `git reset --hard` — descarta mudanças não commitadas **permanentemente**.
- `git checkout -- arquivo` — descarta mudanças não commitadas de um arquivo específico.
- `git clean -fd` — apaga arquivos não rastreados (novos, nunca commitados).

Sempre rode `git status` antes de usar esses comandos, para saber exatamente o que será perdido.

> Nota: este projeto (`laBiblio`) ainda não é um repositório Git inicializado. Se quiser começar a versionar, rode `git init` na raiz do projeto.

---

## 2. O que é o Convex (para quem nunca usou)

[Convex](https://www.convex.dev) é um **backend como serviço**: ele te dá banco de dados, funções de servidor (backend) e sincronização em tempo real com o frontend, sem você precisar montar um servidor Node/Express e um banco separado.

Ideia central:

- Você escreve **funções TypeScript** dentro da pasta `convex/` (queries, mutations, actions).
- O Convex hospeda essas funções na nuvem e cria automaticamente um **banco de dados** para você.
- No frontend, você chama essas funções com hooks do React (`useQuery`, `useMutation`) e a UI atualiza **sozinha em tempo real** quando os dados mudam — sem precisar dar refresh ou fazer polling.

### Os 3 tipos de função

| Tipo | Para que serve | Exemplo no projeto |
|---|---|---|
| `query` | Ler dados (não pode alterar nada) | `convex/model/books/query.ts` → `list` (lista os livros) |
| `mutation` | Escrever/alterar dados (criar, editar, apagar) | `convex/model/books/mutation.ts` → `registerBook`, `updateBook`, `delet` |
| `action` | Operações com efeitos externos (chamar APIs de fora, enviar e-mail, etc). Pode chamar queries/mutations, mas não acessa o banco diretamente. | não usado neste projeto ainda |

### Como isso aparece no código

1. **Schema** (`convex/model/books/schema.ts`): define o formato da tabela `books` (quais campos existem e seus tipos).
2. **Query** (`convex/model/books/query.ts`): busca os dados do banco.
3. **Mutation** (`convex/model/books/mutation.ts`): cria/edita/remove livros.
4. **Frontend** (`src/pages/books/...`): usa `useQuery(api.model.books.query.list)` para ler e `useMutation(api.model.books.mutation.delet)` para escrever.

### Tipos gerados automaticamente

A pasta `convex/_generated/` é **gerada automaticamente** pelo Convex (não edite ela na mão). Ela cria o objeto `api`, que é como você referencia suas funções no frontend com autocomplete e checagem de tipos:

```ts
import { api } from "@convex/_generated/api";
useQuery(api.model.books.query.list);
```

Se você criar, renomear ou apagar um arquivo dentro de `convex/`, precisa regenerar esses tipos (veja seção 4 — `npx convex dev` faz isso automaticamente enquanto está rodando).

### Autenticação

Este projeto usa `@convex-dev/auth`, um pacote de autenticação integrado ao Convex (arquivos `convex/auth.ts` e `convex/auth.config.ts`). Ele cuida de login/sessão sem precisar de um serviço externo separado.

---

## 3. Variáveis de ambiente (envs) do projeto

O projeto usa dois arquivos de variáveis de ambiente, que **não devem ser commitados** (contêm URLs/segredos do seu deployment Convex):

### `.env.local` (raiz do projeto — usado pelo Vite/frontend)

```
CONVEX_DEPLOYMENT=<seu deployment, ex: dev:nome-do-projeto>
VITE_CONVEX_URL=<url do seu deployment Convex>
VITE_CONVEX_SITE_URL=<url do site do seu deployment Convex>
```

- `CONVEX_DEPLOYMENT`: identifica qual deployment (ambiente) do Convex o CLI (`npx convex dev`) deve usar.
- `VITE_CONVEX_URL`: URL que o frontend usa para se conectar ao Convex (variáveis com prefixo `VITE_` ficam expostas no navegador, é assim que o Vite funciona).
- `VITE_CONVEX_SITE_URL`: URL usada por integrações de auth/HTTP do Convex.

### `convex/.env` (usado pelas funções que rodam no servidor Convex)

```
CONVEX_SITE_URL=<url do site do seu deployment Convex>
```

Usada dentro das funções do backend (por exemplo em `convex/auth.config.ts`, para configurar o provider de autenticação).

### Como gerar/obter esses valores

Você **não precisa preencher esses valores à mão**. Ao rodar `npx convex dev` pela primeira vez (veja seção 4), o CLI:

1. Pede para você logar na sua conta Convex (abre o navegador).
2. Pergunta se quer criar um projeto novo ou usar um existente.
3. Cria/atualiza o `.env.local` automaticamente com os valores corretos.

Se precisar ver os valores depois, use `npx convex env list` ou olhe no [dashboard do Convex](https://dashboard.convex.dev).

---

## 4. Como rodar o projeto

### Pré-requisitos

- [Node.js](https://nodejs.org) instalado (LTS mais recente).
- Uma conta no [Convex](https://www.convex.dev) (gratuita).

### Passo a passo

```powershell
# 1. Instalar as dependências
npm install

# 2. Rodar o Convex em modo desenvolvimento
#    (primeira vez: vai pedir login e configurar o .env.local automaticamente)
npx convex dev
```

Deixe esse terminal do `npx convex dev` **aberto e rodando** — ele:
- Sincroniza as funções da pasta `convex/` com o seu deployment.
- Regenera os tipos em `convex/_generated/` sempre que você salva um arquivo.
- Mostra logs e erros das suas funções em tempo real.

Abra um **segundo terminal** (PowerShell) para rodar o frontend:

```powershell
# 3. Rodar o frontend (Vite)
npm run dev
```

Isso abre o app em algo como `http://localhost:5173`.

### Resumo dos scripts (`package.json`)

| Comando | O que faz |
|---|---|
| `npm run dev` | Roda o frontend em modo desenvolvimento (Vite). |
| `npm run build` | Verifica os tipos (`tsc -b`) e gera a build de produção. |
| `npm run lint` | Roda o ESLint para checar o código. |
| `npm run preview` | Serve localmente a build de produção gerada por `npm run build`. |
| `npx convex dev` | Roda o backend Convex em modo desenvolvimento (não está no `package.json`, mas é essencial — rode em paralelo ao `npm run dev`). |
| `npx convex codegen` | Regenera apenas os tipos em `convex/_generated/` sem ficar em modo watch (útil depois de renomear/criar arquivos em `convex/`). |

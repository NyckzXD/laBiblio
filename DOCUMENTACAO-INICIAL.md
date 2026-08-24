# Documento Inicial do Projeto — laBiblio

## 1. Introdução

O **laBiblio** é um sistema web de gerenciamento de biblioteca, desenvolvido com o objetivo de digitalizar e organizar os processos de cadastro, controle de acervo e empréstimo de livros em uma instituição de ensino.

Atualmente, o controle de empréstimos, cadastro de alunos e organização do acervo em bibliotecas físicas é feito de forma manual ou com ferramentas pouco integradas, o que gera retrabalho, perda de informação e dificuldade de acompanhar o histórico de empréstimos de cada aluno. O laBiblio propõe resolver esse problema oferecendo uma plataforma centralizada, com sincronização em tempo real, onde colaboradores da biblioteca podem gerenciar o acervo e os empréstimos, e alunos podem consultar o catálogo e seu próprio histórico de livros retirados.

## 2. Objetivo do Projeto

Desenvolver uma aplicação web que permita:

- Gerenciar o acervo de livros da biblioteca (cadastro, edição, consulta e disponibilidade).
- Gerenciar o cadastro de alunos e colaboradores.
- Registrar e controlar empréstimos (aluguéis) de livros, com data de retirada e devolução.
- Oferecer, para o aluno, uma área própria com catálogo de livros e histórico de empréstimos.
- Oferecer, para o colaborador, um dashboard administrativo com visão geral do acervo e das operações da biblioteca.

## 3. Requisitos Funcionais

| Código | Descrição |
|---|---|
| RF01 | O sistema deve permitir autenticação de usuários (login/cadastro). |
| RF02 | O sistema deve diferenciar dois perfis de acesso: **aluno** e **colaborador**, com áreas e permissões distintas. |
| RF03 | O sistema deve permitir o cadastro, edição e listagem de livros (título, autor, ISBN, ano de publicação e disponibilidade). |
| RF04 | O sistema deve permitir a busca de livros por título e por autor. |
| RF05 | O sistema deve permitir o cadastro de alunos (nome, e-mail, matrícula, data de nascimento, endereço). |
| RF06 | O sistema deve permitir o cadastro de colaboradores (nome, matrícula, data de nascimento, endereço, cargo). |
| RF07 | O sistema deve permitir o registro de um aluguel/empréstimo de livro, associando aluno e livro, com data de retirada. |
| RF08 | O sistema deve permitir o registro da devolução de um livro emprestado. |
| RF09 | O sistema deve manter o histórico de livros emprestados por cada aluno. |
| RF10 | O sistema deve atualizar automaticamente a disponibilidade de um livro após o empréstimo/devolução. |
| RF11 | O aluno deve poder consultar, em sua área, o catálogo de livros disponíveis e seu histórico de empréstimos. |
| RF12 | O colaborador deve ter acesso a um dashboard com a visão geral do sistema (acervo, empréstimos, etc.). |
| RF13 | O acesso dos alunos ao sistema deve ser feito por meio de link/código de autenticação enviado por e-mail, utilizando o serviço Resend integrado ao Convex Auth. |

## 4. Requisitos Não Funcionais

| Código | Descrição |
|---|---|
| RNF01 | O sistema deve ser uma aplicação web responsiva, acessível via navegador. |
| RNF02 | O sistema deve utilizar sincronização de dados em tempo real entre os usuários (via Convex). |
| RNF03 | O sistema deve ter uma interface consistente e reutilizável, construída com um design system (shadcn/ui + Tailwind CSS). |
| RNF04 | O acesso às funcionalidades deve ser controlado por perfil de usuário (autenticação e autorização). |
| RNF05 | O código deve ser desenvolvido em TypeScript, garantindo tipagem estática e menor incidência de erros em tempo de execução. |
| RNF06 | O sistema deve ser modular, separando claramente frontend, backend e modelos de dados, para facilitar manutenção. |

## 5. Tecnologias Utilizadas

| Camada | Tecnologia |
|---|---|
| Linguagem | TypeScript / JavaScript |
| Frontend | React 19 + Vite |
| Estilização / UI | Tailwind CSS + shadcn/ui + lucide-react (ícones) |
| Roteamento | React Router DOM |
| Backend | Convex (funções serverless + banco de dados reativo) |
| Autenticação | Convex Auth (`@convex-dev/auth`) |
| Envio de e-mails | Resend (autenticação/acesso dos alunos via e-mail) |
| Banco de Dados | Convex Database (NoSQL, reativo, integrado ao backend) |
| Controle de versão | Git / GitHub |

## 6. Modelo de Dados (entidades principais)

- **users** — usuários autenticados (gerenciado pelo Convex Auth).
- **alunos** — dados do aluno (nome, e-mail, matrícula, data de nascimento, endereço, histórico de livros).
- **colaboradores** — dados do colaborador da biblioteca (nome, matrícula, data de nascimento, endereço, cargo).
- **books** — acervo de livros (título, autor, ISBN, ano, disponibilidade).
- **alugueis** — registros de empréstimo (livro, aluno, data de retirada, data de devolução).

## 7. Equipe e Responsabilidades

| Integrante | Responsabilidade |
|---|---|
| Weuller Silva | Backend — Convex, autenticação, banco de dados |
| Nycolas Fernandes | Frontend — telas do aluno (catálogo, histórico, sidebar do aluno) |
| Pedro Henrique | Frontend — telas do colaborador / dashboard administrativo |
| Lucas Dantas | Documentação, testes e apresentação |

## 8. Cronograma

Prazo final do projeto: **dezembro de 2026**. Etapa 1 concluída e entregue em 24/08/2026.

| Etapa | Descrição | Prazo |
|---|---|---|
| Etapa 1 | Levantamento de requisitos e documento inicial | 24/08/2026 ✅ |
| Etapa 2 | Modelagem do banco de dados e prototipação das telas | 15/09/2026 |
| Etapa 3 | Implementação — cadastro de livros, alunos e colaboradores | 10/10/2026 |
| Etapa 4 | Implementação — empréstimos, histórico e dashboard | 07/11/2026 |
| Etapa 5 | Testes, ajustes finais e documentação | 05/12/2026 |
| Etapa 6 | Entrega final / apresentação | 19/12/2026 |

## 9. Considerações Finais

Este documento representa a etapa inicial do projeto laBiblio e será atualizado conforme o desenvolvimento avançar, incorporando eventuais mudanças de escopo, requisitos ou cronograma definidas pela equipe.

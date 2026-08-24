import { v } from "convex/values";
import { mutation } from "../../_generated/server";

export const registerAluno = mutation({
  args: {
    nome: v.string(),
    email: v.string(),
    matricula: v.string(),
    data_nascimento: v.string(),
    endereco: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("alunos", {
      nome: args.nome,
      email: args.email,
      matricula: args.matricula,
      data_nascimento: args.data_nascimento,
      endereco: args.endereco,
      historico_de_livros: [],
    });
  },
});

export const updateAluno = mutation({
  args: {
    id: v.id("alunos"),
    nome: v.string(),
    email: v.string(),
    matricula: v.string(),
    data_nascimento: v.string(),
    endereco: v.string(),
  },
  handler: async (ctx, args) => {
    const { id, ...update } = args;
    const existing = await ctx.db.get(id);
    if (!existing) throw new Error("Nao localizado");

    await ctx.db.patch(id, {
      ...update
    });
  },
});

export const deleteAluno = mutation({
  args: { id: v.id("alunos") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});

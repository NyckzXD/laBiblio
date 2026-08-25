import { v } from "convex/values";
import { mutation, internalMutation } from "../../_generated/server";
import { internal } from "../../_generated//api";

export const registerAluno = mutation({
  args: {
    nome: v.string(),
    email: v.string(),
    matricula: v.string(),
    data_nascimento: v.string(),
    endereco: v.string(),
  },
  handler: async (ctx, args) => {
    const existingUser = await ctx.db
      .query("users")
      .withIndex("email", (q) => q.eq("email", args.email))
      .unique();

    const alunos = await ctx.db.insert("alunos", {
      nome: args.nome,
      email: args.email,
      matricula: args.matricula,
      data_nascimento: args.data_nascimento,
      endereco: args.endereco,
      historico_de_livros: [],
      userId: existingUser?._id,
    });

    await ctx.scheduler.runAfter(0, internal.alunos.registerEmail, {
      email: args.email,
      nome: args.nome,
      matricula: args.matricula,
    });

    return alunos
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

    let userId = existing.userId;
    if (!userId && update.email !== existing.email) {
      const existingUser = await ctx.db
        .query("users")
        .withIndex("email", (q) => q.eq("email", update.email))
        .unique();
      userId = existingUser?._id;
    }

    await ctx.db.patch(id, {
      ...update,
      userId,
    });
  },
});

export const deleteAluno = mutation({
  args: { id: v.id("alunos") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});

export const linkAlunoUser = internalMutation({
  args: {
    userId: v.id("users"),
    email: v.string(),
  },
  handler: async (ctx, { userId, email }) => {
    const aluno = await ctx.db
      .query("alunos")
      .withIndex("by_email", (q) => q.eq("email", email))
      .unique();

    if (aluno && !aluno.userId) {
      await ctx.db.patch(aluno._id, { userId });
    }
  },
});

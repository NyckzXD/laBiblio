import { v } from "convex/values";
import { mutation } from "../../_generated/server";

export const registerColaborador = mutation({
  args: {
    nome: v.string(),
    matricula: v.string(),
    data_nascimento: v.string(),
    endereco: v.string(),
    cargo: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("colaboradores", {
      nome: args.nome,
      matricula: args.matricula,
      data_nascimento: args.data_nascimento,
      endereco: args.endereco,
      cargo: args.cargo,
    });
  },
});

export const updateColaborador = mutation({
  args: {
    id: v.id("colaboradores"),
    nome: v.string(),
    matricula: v.string(),
    data_nascimento: v.string(),
    endereco: v.string(),
    cargo: v.string(),
  },
  handler: async (ctx, args) => {
    const { id, ...update } = args;
    const existing = await ctx.db.get(id);
    if (!existing) throw new Error("Colaborador não localizado");

    await ctx.db.patch(id, {
      ...update,
    });
  },
});

export const deleteColaborador = mutation({
  args: { id: v.id("colaboradores") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});
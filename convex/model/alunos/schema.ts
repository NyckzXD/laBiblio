import { defineTable } from "convex/server";
import { v } from "convex/values";

export const AlunosTable = defineTable({
  userId: v.optional(v.id("users")),
  nome: v.string(),
  email: v.string(),
  matricula: v.string(),
  data_nascimento: v.string(),
  endereco: v.string(),
  historico_de_livros: v.array(v.id("alugueis")),
})
  .index("by_userId", ["userId"])
  .index("by_matricula", ["matricula"])
  .index("by_nome", ["nome"]);

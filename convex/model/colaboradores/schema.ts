import { defineTable } from "convex/server";
import { v } from "convex/values";

export const ColaboradoresTable = defineTable({
  userId: v.optional(v.id("users")),
  nome: v.string(),
  matricula: v.string(),
  data_nascimento: v.string(),
  endereco: v.string(),
  cargo: v.string(),
})
  .index("by_userId", ["userId"])
  .index("by_matricula", ["matricula"]);

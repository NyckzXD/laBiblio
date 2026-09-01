import { defineTable } from "convex/server";
import { v } from "convex/values";

export const AlugueisTable = defineTable({
  id_book: v.array(v.id("books")),
  id_aluno: v.id("alunos"),
  data_retirada: v.string(),
  data_devolucao: v.optional(v.string()),
})
  .index("by_book", ["id_book"])
  .index("by_aluno", ["id_aluno"]);

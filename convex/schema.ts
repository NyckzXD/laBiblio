import { defineSchema } from "convex/server";
import { authTables } from "@convex-dev/auth/server";
import { BooksTable } from "./model/books/schema";
import { AlunosTable } from "./model/alunos/schema";
import { ColaboradoresTable } from "./model/colaboradores/schema";
import { AlugueisTable } from "./model/alugueis/schema";

const schema = defineSchema({
  ...authTables,
  books: BooksTable,
  alunos: AlunosTable,
  colaboradores: ColaboradoresTable,
  alugueis: AlugueisTable,
});
 
export default schema;
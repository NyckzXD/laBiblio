import { defineSchema } from "convex/server";
import { authTables } from "@convex-dev/auth/server";
import { BooksTable } from "./model/books/schema";
 
const schema = defineSchema({
  ...authTables,
books: BooksTable,
});
 
export default schema;
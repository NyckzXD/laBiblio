import { defineTable } from "convex/server";
import { v } from "convex/values";

export const BooksTable = defineTable({
  title: v.string(),
  author: v.string(),
  isbn: v.optional(v.string()),
  year: v.optional(v.string()),
  available: v.boolean(),
})
  .index("by_author", ["author"])
  .index("by_title", ["title"])
  .index("by_title_author", ["title", "author"]);

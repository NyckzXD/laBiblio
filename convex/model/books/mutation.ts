import { v } from "convex/values";
import { mutation } from "../../_generated/server";

export const registerBook = mutation({
  args: {
    title: v.string(),
    author: v.string(),
    isbn: v.optional(v.string()),
    year: v.optional(v.string()),
    available: v.boolean(),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("books", {
      title: args.title,
      author: args.author,
      isbn: args.isbn,
      year: args.year,
      available: args.available,
    });
  },
});

export const updateBook = mutation({
  args: {
    id: v.id("books"),
    title: v.string(),
    author: v.string(),
    isbn: v.optional(v.string()),
    year: v.optional(v.string()),
    available: v.boolean(),
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

export const delet = mutation({
  args: { id: v.id("books") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});

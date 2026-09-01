import { getAuthUserId } from "@convex-dev/auth/server";
import { query } from "../../_generated/server";
import { v } from "convex/values";

export const currentAluno = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) return null;
    return await ctx.db
      .query("alunos")
      .withIndex("by_userId", (q) => q.eq("userId", userId))
      .unique();
  },
});

export const list = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) return [];
    return ctx.db.query("alunos").order("asc").collect();
  },
});

export const getById = query({
  args: { id: v.id("alunos") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});
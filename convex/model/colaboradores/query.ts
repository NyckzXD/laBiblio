import { getAuthUserId } from "@convex-dev/auth/server";
import { query } from "../../_generated/server";

export const currentColaborador = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) return null;
    return await ctx.db
      .query("colaboradores")
      .withIndex("by_userId", (q) => q.eq("userId", userId))
      .unique();
  },
});

export const list = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) return [];
    return ctx.db.query("colaboradores").order("asc").collect();
  },
});
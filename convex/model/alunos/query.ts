import { getAuthUserId } from "@convex-dev/auth/server";
import { query } from "../../_generated/server";

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

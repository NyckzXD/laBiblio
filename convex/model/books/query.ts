import { getAuthUserId } from "@convex-dev/auth/server";
import { query } from "../../_generated/server";

export const list = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) return [];
    return ctx.db.query("books").withIndex("by_title_author").order("asc").collect();
  },
});


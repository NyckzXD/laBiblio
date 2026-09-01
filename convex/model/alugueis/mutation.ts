// convex/alugueis.ts
import { v } from "convex/values";
import { mutation } from "../../_generated/server";
import { internal } from "../../_generated/api";

export const RentBooks = mutation({
  args: {
    id_book: v.array(v.id("books")),
    id_aluno: v.id("alunos"),
  },
  handler: async (ctx, args) => {
    const devolution = new Date();
    const finalDate = devolution.getDate() + 7;
    devolution.setDate(finalDate);

    const rentalId = await ctx.db.insert("alugueis", {
      id_book: args.id_book,
      id_aluno: args.id_aluno,
      data_retirada: new Date().toISOString(),
      data_devolucao: devolution.toISOString(),
    });

    await Promise.all(
      args.id_book.map((bookId) =>
        ctx.db.patch(bookId, {
          available: false,
        }),
      ),
    );

    await ctx.scheduler.runAfter(0, internal.alugueis.scheduleReminderEmail, {
      id_aluno: args.id_aluno,
      id_books: args.id_book,
      data_devolucao: devolution.toISOString(),
    });

    await ctx.scheduler.runAfter(0, internal.alugueis.notifyEmailScheduled, {
      id_aluno: args.id_aluno,
      id_books: args.id_book,
      data_devolucao: devolution.toISOString(),
    });
    return rentalId;
  },
});

import { v } from "convex/values";
import { mutation } from "../../_generated/server";

export const RentBooks = mutation({
    args: {
        id_book: v.array(v.id("books")),
        id_aluno: v.id("alunos"),
    },
    handler: async (ctx, args) => {
        const devolution = new Date();
        const finalDate = devolution.getDate() + 7;
        devolution.setDate(finalDate);
        await ctx.db.insert("alugueis", {
            id_book: args.id_book,
            id_aluno: args.id_aluno,
            data_retirada: new Date().toISOString(),
            data_devolucao: devolution.toISOString(),
        });
    }
}) 
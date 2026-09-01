// convex/alugueis.ts ou convex/emails.ts
import { action } from "../../_generated/server";
import { v } from "convex/values";
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendReminderEmail = action({
  args: {
    id_aluno: v.id("alunos"),
    email: v.string(),
    data_devolucao: v.string(),
    livros_titulos: v.array(v.string()),
  },
  handler: async (ctx, args) => {
    try {
      await resend.emails.send({
        from: 'biblioteca@seudominio.com',
        to: [args.email],
        subject: '📚 Lembrete: Devolva seus livros',
        html: `
          <h1>Lembrete de Devolução</h1>
          <p>Você tem que devolver os seguintes livros:</p>
          <ul>
            ${args.livros_titulos.map(livro => `<li>${livro}</li>`).join('')}
          </ul>
          <p><strong>Data de devolução:</strong> ${new Date(args.data_devolucao).toLocaleDateString('pt-BR')}</p>
        `,
        scheduledAt: args.data_devolucao,
      });

      return { success: true };
    } catch (error) {
      console.error("Erro ao enviar email:", error);
      throw error;
    }
  },
});
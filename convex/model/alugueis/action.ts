// convex/emails.ts
import { internalAction } from "../../_generated/server";
import { v } from "convex/values";
import { Resend } from 'resend';
import { api, internal } from "../../_generated/api"; 

const resend = new Resend(process.env.RESEND_API_KEY);

export const scheduleReminderEmail = internalAction({
  args: {
    id_aluno: v.id("alunos"),
    id_books: v.array(v.id("books")),
    data_devolucao: v.string(),
  },
  handler: async (ctx, args): Promise<{ success: boolean }> => { 
    try {
      const aluno = await ctx.runQuery(api.alunos.getById, {
        id: args.id_aluno,
      });
      const livros = await Promise.all(
        args.id_books.map(id =>
          ctx.runQuery(api.books.getById, { id })
        )
      );

      const livrosTitulos = livros
        .filter(l => l !== null)
        .map(l => l.title);

      const dataFormatada = new Date(args.data_devolucao)
        .toLocaleDateString('pt-BR');

      await resend.emails.send({
        from: "LaBiblio <onboarding@wgprojects.site>",
        to: [aluno?.email || ""],
        subject: '📚 Lembrete: Devolva seus livros',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h1>Lembrete de Devolução de Livros</h1>
            <p>Olá <strong>${aluno?.nome}</strong>,</p>
            <p>Este é um lembrete de que você deve devolver os seguintes livros até <strong>${dataFormatada}</strong>:</p>
            
            <ul style="font-size: 16px; line-height: 1.8;">
              ${livrosTitulos.map(titulo => `<li>${titulo}</li>`).join('')}
            </ul>
            
            <p>Por favor, devolva os livros na data indicada para evitar multas.</p>
            
            <hr style="margin: 30px 0; border: none; border-top: 1px solid #ddd;">
            <p style="color: #666; font-size: 12px;">
              Biblioteca KalangoDB
            </p>
          </div>
        `,
        scheduledAt: args.data_devolucao,
      });

      console.log(`Email agendado para ${aluno?.email}`);
      
      await ctx.scheduler.runAfter(
        0,
        internal.alugueis.notifyEmailScheduled,
        {
          id_aluno: args.id_aluno,
          id_books: args.id_books,
          data_devolucao: args.data_devolucao,
        }
      );

      return { success: true };
    } catch (error) {
      console.error("Erro ao agendar email:", error);
      throw error;
    }
  },
});

export const notifyEmailScheduled = internalAction({
  args: {
    id_aluno: v.id("alunos"),
    id_books: v.array(v.id("books")),
    data_devolucao: v.string(),
  },
  handler: async (ctx, args): Promise<{ success: boolean; message: string }> => { 
    try {
      const aluno = await ctx.runQuery(api.alunos.getById, {
        id: args.id_aluno,
      });

      const livros = await Promise.all(
        args.id_books.map(id =>
          ctx.runQuery(api.books.getById, { id })
        )
      );

      const totalLivros = livros.filter(l => l !== null).length;
      const dataFormatada = new Date(args.data_devolucao)
        .toLocaleDateString('pt-BR', { 
          weekday: 'long', 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric' 
        });

      await resend.emails.send({
        from: "LaBiblio <onboarding@wgprojects.site>",
        to: [aluno?.email || ""],
        subject: '✅ Email de Lembrete Agendado',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h1 style="color: #28a745;">✅ Agendamento Confirmado</h1>
            <p>Olá <strong>${aluno?.nome}</strong>,</p>
            
            <p style="line-height: 1.6;">
              Seu email de lembrete foi agendado com sucesso! Você receberá um aviso sobre a devolução dos seus <strong>${totalLivros} livro(s)</strong> em:
            </p>
            
            <div style="background-color: #f0f0f0; padding: 15px; border-radius: 5px; text-align: center; margin: 20px 0;">
              <p style="margin: 0; font-size: 18px; font-weight: bold; color: #333;">
                📅 ${dataFormatada}
              </p>
            </div>
            
            <p style="color: #666; font-size: 14px;">
              Você pode gerenciar seus aluguéis a qualquer momento no nosso portal.
            </p>
            
            <hr style="margin: 30px 0; border: none; border-top: 1px solid #ddd;">
            <p style="color: #999; font-size: 12px;">
              Biblioteca KalangoDB - Sistema de Aluguel
            </p>
          </div>
        `,
      });

      console.log(`✅ Confirmação enviada para ${aluno?.email}`);
      return { 
        success: true, 
        message: `Email de confirmação enviado para ${aluno?.email}` 
      };
    } catch (error) {
      console.error("Erro ao notificar agendamento:", error);
      throw error;
    }
  },
});

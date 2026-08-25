import { useAuthActions } from "@convex-dev/auth/react";
import { useState } from "react";
import { Notifications } from "@/services/notifications";

function mensagemDeErro(err: unknown): string {
  const message = String((err as { message?: string })?.message ?? "");
  if (message.includes("InvalidAccountId")) {
    return "Email não cadastrado.";
  }
  if (message.includes("InvalidSecret") || message.includes("Invalid code")) {
    return "Código inválido.";
  }
  return "Não foi possível concluir. Tente novamente.";
}

export function ResetSenha() {
  const { signIn } = useAuthActions();
  const [step, setStep] = useState<"forgot" | { email: string }>("forgot");
  const [enviando, setEnviando] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const pedirCodigo = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setEnviando(true);
    setError(null);
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    try {
      await signIn("password", { email, flow: "reset" });
      setStep({ email });
    } catch (err) {
      setError(mensagemDeErro(err));
    } finally {
      setEnviando(false);
    }
  };

  const confirmarNovaSenha = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setEnviando(true);
    setError(null);
    const formData = new FormData(e.currentTarget);
    try {
      await signIn("password", {
        email: (step as { email: string }).email,
        code: formData.get("code") as string,
        newPassword: formData.get("newPassword") as string,
        flow: "reset-verification",
      });
    } catch (err) {
      setError(mensagemDeErro(err));
    } finally {
      setEnviando(false);
    }
  };

  return step === "forgot" ? (
    <form onSubmit={pedirCodigo} className="flex flex-col gap-3 max-w-sm">
      {error && (
        <Notifications
          title="Erro"
          description={error}
          variant="destructive"
          onClose={() => setError(null)}
        />
      )}
      <input
        name="email"
        type="email"
        placeholder="Seu email"
        className="rounded-lg border px-3 py-2"
      />
      <button
        type="submit"
        disabled={enviando}
        className="rounded-lg bg-blue-600 px-4 py-2 text-white disabled:opacity-50"
      >
        {enviando ? "Enviando..." : "Enviar código"}
      </button>
    </form>
  ) : (
    <form onSubmit={confirmarNovaSenha} className="flex flex-col gap-3 max-w-sm">
      {error && (
        <Notifications
          title="Erro"
          description={error}
          variant="destructive"
          onClose={() => setError(null)}
        />
      )}
      <input
        name="code"
        placeholder="Código recebido no email"
        className="rounded-lg border px-3 py-2"
      />
      <input
        name="newPassword"
        type="password"
        placeholder="Nova senha"
        className="rounded-lg border px-3 py-2"
      />
      <button
        type="submit"
        disabled={enviando}
        className="rounded-lg bg-blue-600 px-4 py-2 text-white disabled:opacity-50"
      >
        {enviando ? "Confirmando..." : "Redefinir senha"}
      </button>
      <button
        type="button"
        onClick={() => setStep("forgot")}
        className="text-sm text-gray-500"
      >
        Voltar
      </button>
    </form>
  );
}
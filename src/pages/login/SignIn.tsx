import { useAuthActions } from "@convex-dev/auth/react";
import { useState } from "react";
import { Button } from "../../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Separator } from "../../components/ui/separator";
import { Notifications } from "@/services/notifications";

export function SignIn() {
  const { signIn } = useAuthActions();
  const [step, setStep] = useState<"signUp" | "signIn">("signIn");
  const [accountCreated, setAccountCreated] = useState(false);
  const [error, setError] = useState<string | null>(null);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-xl">
            {step === "signIn" ? "Entrar" : "Criar conta"}
          </CardTitle>
          <CardDescription>
            {step === "signIn"
              ? "Acesse sua conta para continuar"
              : "Preencha os dados para criar sua conta"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {accountCreated && (
           <Notifications
              title="Cadstrado"
              description={"Cadastrado com sucesso"}
              variant="default"
              onClose={() => setError(null)}
            />
          )}

          {error && (
            <Notifications
              title="Erro"
              description={error}
              variant="destructive"
              onClose={() => setError(null)}
            />
          )}

          <form
            className="flex flex-col gap-4"
            onSubmit={(event) => {
              event.preventDefault();
              const formData = new FormData(event.currentTarget);
              const submittedStep = step;
              setError(null);
              void signIn("password", formData)
                .then(() => {
                  if (submittedStep === "signUp") {
                    setAccountCreated(true);
                    setStep("signIn");
                  }
                })
                .catch((err) => {
                  console.log("erro aqui",err)
                  const message = String(err?.message ?? "");
                  if (message.includes("InvalidAccountId")) {
                    setError("Email não cadastrado.");
                  } else if (
                    message.includes("InvalidSecret")
                  ) {
                    setError("Senha incorreta.");
                  } else {
                    setError("Não foi possível concluir. Tente novamente.");
                  }
                });
            }}
          >
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="voce@exemplo.com"
                required
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="password">Senha</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="••••••••"
                required
              />
            </div>
            <input name="flow" type="hidden" value={step} />
            <Button type="submit" className="mt-1 w-full">
              {step === "signIn" ? "Entrar" : "Criar conta"}
            </Button>
          </form>

          <div className="mt-4 flex items-center gap-3">
            <Separator className="flex-1" />
            <span className="text-xs text-muted-foreground">ou</span>
            <Separator className="flex-1" />
          </div>

          <Button
            variant="outline"
            className="mt-4 w-full"
            onClick={() => void signIn("google")}
          >
            <GoogleIcon className="size-4" />
            Entrar com Google
          </Button>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            {step === "signIn" ? "Não tem uma conta?" : "Já tem uma conta?"}{" "}
            <button
              type="button"
              className="font-medium text-foreground underline-offset-4 hover:underline"
              onClick={() => {
                setAccountCreated(false);
                setStep(step === "signIn" ? "signUp" : "signIn");
              }}
            >
              {step === "signIn" ? "Criar conta" : "Entrar"}
            </button>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

function GoogleIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg viewBox="0 0 24 24" {...props}>
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.99.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        fill="#EA4335"
      />
    </svg>
  );
}

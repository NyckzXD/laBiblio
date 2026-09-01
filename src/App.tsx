// src/App.tsx
import { Authenticated, Unauthenticated, useQuery } from "convex/react";
import { useAuthActions } from "@convex-dev/auth/react";
import { api } from "../convex/_generated/api";
import { SignIn } from "./pages/login/SignIn";
import { Dashboard } from "./pages/home/DashboardPage";
import { AlunoApp } from "./alunosPages/aluno/AlunoApp";
import { Button } from "./components/ui/button";

function AreaLogada() {
  const { signOut } = useAuthActions();
  const colaborador = useQuery(
    api.model.colaboradores.query.currentColaborador,
  );
  const aluno = useQuery(api.model.alunos.query.currentAluno);

  if (aluno === undefined) {
    return null;
  }

  if (colaborador === undefined || aluno === undefined) {
    return null;
  }

  if (colaborador) return <Dashboard />;
  if (aluno) return <AlunoApp />;

  return (
    <>
      <p>Conta sem cadastro de aluno ou colaborador.</p>
      <Button onClick={() => void signOut()}>voltar</Button>
    </>
  );
}

function App() {
  return (
    <>
      <Authenticated>
        <AreaLogada />
      </Authenticated>
      <Unauthenticated>
        <SignIn />
      </Unauthenticated>
    </>
  );
}

export default App;

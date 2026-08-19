// src/App.tsx
import { Authenticated, Unauthenticated, useQuery } from "convex/react";
import { api } from "../convex/_generated/api";
import { SignIn } from "./pages/login/SignIn";
import { Dashboard } from "./pages/home/DashboardPage";
import { AlunoApp } from "./pages/aluno/AlunoApp"; 

function AreaLogada() {
  const colaborador = useQuery(api.model.colaboradores.query.currentColaborador);
  const aluno = useQuery(api.model.alunos.query.currentAluno);

  if (aluno === undefined) {
    return null; 
  }

  if (colaborador === undefined || aluno === undefined) {
    return null; 
  }

  if (colaborador) return <Dashboard />;
  if (aluno) return <AlunoApp />;

  return <p>Conta sem cadastro de aluno ou colaborador.</p>;
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

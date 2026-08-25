import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { AddAluno } from "../components/AddAluno";
import { ListAlunos } from "../components/ListAlunos";
import { useMemo, useState } from "react";
import { useQuery } from "convex/react";
import { api } from "@convex/_generated/api";

export function AlunosPage() {
  const [search, setSearch] = useState("");
  const listAlunos = useQuery(api.alunos.list) || [];

  const filtered = useMemo(
    () =>
      listAlunos?.filter((c) =>
        c.nome.toLowerCase().includes(search.toLowerCase()),
      ) ?? [],
    [listAlunos, search],
  );

  const recentEntries =
    listAlunos?.filter((s) => Date.now() - s._creationTime < 30 * 24 * 60 * 60 * 1000)
      .length ?? 0;

  return (
    <>
      <div className="flex flex-col gap-6 animate-fade-in">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground tracking-tight">
              Alunos
            </h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              Cadastre os alunos
            </p>
          </div>
          <AddAluno />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card className="border shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Adicionados recentemente
              </CardTitle>
            </CardHeader>
            <CardContent>
              <span className="text-2xl font-bold">{recentEntries}</span>
            </CardContent>
          </Card>
        </div>
        <Input
          placeholder="Buscar por nome..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="sm:max-w-xs"
        />
        <Separator />
        <ListAlunos listAlunos={filtered} />
      </div>
    </>
  );
}

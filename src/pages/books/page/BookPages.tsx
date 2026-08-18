import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { AddBooks } from "../components/AddBooks";
import { ListCustomers } from "../components/ListBooks";
import { useMemo, useState } from "react";
import { useQuery } from "convex/react";
import { api } from "@convex/_generated/api";

export function BookPages() {
  const [search, setSearch] = useState("");
  const listCustomer = useQuery(api.model.books.query.list) || [];

  const filtered = useMemo(
    () =>
      listCustomer?.filter((c) =>
        c.title.toLowerCase().includes(search.toLowerCase()),
      ) ?? [],
    [listCustomer, search],
  );

  const recentEntries =
    listCustomer?.filter((s) => Date.now() - s._creationTime < 30 * 24 * 60 * 60 * 1000)
      .length ?? 0;

  return (
    <>
      <div className="flex flex-col gap-6 animate-fade-in">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground tracking-tight">
              Books
            </h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              Cadastre os livros
            </p>
          </div>
          <AddBooks />
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
          placeholder="Buscar por título..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="sm:max-w-xs"
        />
        <Separator />
        <ListCustomers listCustomer={filtered} />
      </div>
    </>
  );
}

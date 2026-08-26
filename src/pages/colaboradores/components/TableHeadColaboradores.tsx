import { TableHead, TableRow } from "@/components/ui/table";

export function TableHeadColaboradores() {
  return (
    <TableRow className="flex justify-between">
      <TableHead className="min-w-40 shrink-0 flex items-center">Nome</TableHead>
      <TableHead className="min-w-40 shrink-0 flex items-center">Cargo</TableHead>
      <TableHead className="min-w-40 shrink-0 flex items-center">Matrícula</TableHead>
      <TableHead className="min-w-40 shrink-0 flex items-center">Data de Nasc.</TableHead>
      <TableHead className="min-w-40 shrink-0 flex items-center">Endereço</TableHead>
      <TableHead className="min-w-16 shrink-0 flex items-center">Ações</TableHead>
    </TableRow>
  );
}
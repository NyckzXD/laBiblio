import { TableHead, TableRow } from "@/components/ui/table";

export function TableHeadBooks() {
  return (
    <TableRow className="flex justify-between">
      <TableHead className="min-w-40 shrink-0 flex items-center">Title</TableHead>
      <TableHead className="min-w-56 shrink-0 flex items-center">Author</TableHead>
      <TableHead className="min-w-40 shrink-0 flex items-center">Isbn</TableHead>
      <TableHead className="min-w-40 shrink-0 flex items-center">Year</TableHead>
      <TableHead className="min-w-40 shrink-0 flex items-center">Avaliable</TableHead>
      <TableHead className="min-w-16 shrink-0 flex items-center">Ações</TableHead>
    </TableRow>
  );
}

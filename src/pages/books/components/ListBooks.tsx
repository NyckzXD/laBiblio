import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { api } from "@convex/_generated/api";
import { useMutation } from "convex/react";
import { EllipsisVertical, Eye, SquarePen, Trash } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import type { Doc, Id } from "@convex/_generated/dataModel";
import { TableHeadBooks } from "./TableHead";
import { AddBooks } from "./AddBooks";

interface CustomerRowProps {
  Books: Doc<"books">;
  onDelete: (id: Id<"books">) => void;
}

function CustomerRow({
  Books,
  onDelete,
}: CustomerRowProps) {
  const [open, setOpen] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);

  return (
    <>
      <TableRow key={Books._id} className="flex items-center justify-between">
        <TableCell className="min-w-40 shrink-0">{Books.title}</TableCell>
        <TableCell className="min-w-56 shrink-0">{Books.author}</TableCell>
        <TableCell className="min-w-40 shrink-0">{Books.isbn || "-"}</TableCell>
        <TableCell className="min-w-40 shrink-0">{Books.year || "-"}</TableCell>
        <TableCell className="min-w-40 shrink-0">
          {Books.available ? "Sim" : "Não"}
        </TableCell>
        <TableCell className="min-w-16 shrink-0 flex justify-center">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Button variant="ghost" size="icon">
                <EllipsisVertical />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setTimeout(() => setOpen(true), 0)}>
                <Eye className="mr-2 h-4 w-4" />
                Visualizar
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTimeout(() => setIsEditOpen(true), 0)}>
                <SquarePen className="mr-2 h-4 w-4" />
                Editar
              </DropdownMenuItem>
              <DropdownMenuItem
                className="text-red-500 focus:text-red-500"
                onClick={() => setTimeout(() => setAlertOpen(true), 0)}
              >
                <Trash className="mr-2 h-4 w-4" />
                Excluir
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </TableCell>
      </TableRow>
      <AddBooks
        books={Books}
        open={isEditOpen}
        onOpenChange={setIsEditOpen}
      />
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{Books.title}</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-2 text-sm">
            <p>
              <span className="text-muted-foreground">Autor: </span>
              {Books.author}
            </p>
            <p>
              <span className="text-muted-foreground">ISBN: </span>
              {Books.isbn || "-"}
            </p>
            <p>
              <span className="text-muted-foreground">Ano: </span>
              {Books.year || "-"}
            </p>
            <p>
              <span className="text-muted-foreground">Disponível: </span>
              {Books.available ? "Sim" : "Não"}
            </p>
          </div>
        </DialogContent>
      </Dialog>
      <Dialog open={alertOpen} onOpenChange={setAlertOpen}>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Excluir livro</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground">
            Tem certeza que deseja excluir "{Books.title}"? Essa ação não
            pode ser desfeita.
          </p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setAlertOpen(false)}>
              Cancelar
            </Button>
            <Button
              variant="destructive"
              onClick={() => {
                onDelete(Books._id);
                setAlertOpen(false);
              }}
            >
              Excluir
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}


export function ListCustomers({ listCustomer }: { listCustomer: any[] }) {

  const delet = useMutation(api.model.books.mutation.delet);

  const onDelete = (id: Id<"books">) => {
    delet({ id });
  };

  return (
    <div className="overflow-x-auto rounded-lg border">
      <Table>
        <TableHeader>
          <TableHeadBooks />
        </TableHeader>
        <TableBody>
          {listCustomer?.map((books) => (
            <CustomerRow
              key={books._id}
              Books={books}
              onDelete={onDelete}
            />
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

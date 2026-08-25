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
import { TableHeadAlunos } from "./TableHeadAlunos";
import { AddAluno } from "./AddAluno";

interface AlunoRowProps {
  aluno: Doc<"alunos">;
  onDelete: (id: Id<"alunos">) => void;
}

function AlunoRow({
  aluno,
  onDelete,
}: AlunoRowProps) {
  const [open, setOpen] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);

  return (
    <>
      <TableRow key={aluno._id} className="flex items-center justify-between">
        <TableCell className="min-w-40 shrink-0">{aluno.nome}</TableCell>
        <TableCell className="min-w-56 shrink-0">{aluno.email}</TableCell>
        <TableCell className="min-w-40 shrink-0">{aluno.matricula || "-"}</TableCell>
        <TableCell className="min-w-40 shrink-0">{aluno.data_nascimento || "-"}</TableCell>
        <TableCell className="min-w-40 shrink-0">{aluno.endereco || "-"}</TableCell>
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
      <AddAluno
        aluno={aluno}
        open={isEditOpen}
        onOpenChange={setIsEditOpen}
      />
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{aluno.nome}</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-2 text-sm">
            <p>
              <span className="text-muted-foreground">E-mail: </span>
              {aluno.email}
            </p>
            <p>
              <span className="text-muted-foreground">Matrícula: </span>
              {aluno.matricula || "-"}
            </p>
            <p>
              <span className="text-muted-foreground">Data de Nascimento: </span>
              {aluno.data_nascimento || "-"}
            </p>
            <p>
              <span className="text-muted-foreground">Endereço: </span>
              {aluno.endereco || "-"}
            </p>
          </div>
        </DialogContent>
      </Dialog>
      <Dialog open={alertOpen} onOpenChange={setAlertOpen}>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Excluir aluno</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground">
            Tem certeza que deseja excluir "{aluno.nome}"? Essa ação não
            pode ser desfeita.
          </p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setAlertOpen(false)}>
              Cancelar
            </Button>
            <Button
              variant="destructive"
              onClick={() => {
                onDelete(aluno._id);
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

export function ListAlunos({ listAlunos }: { listAlunos: Doc<"alunos">[] }) {
  const delet = useMutation(api.model.alunos.mutation.deleteAluno);

  const onDelete = (id: Id<"alunos">) => {
    delet({ id });
  };

  return (
    <div className="overflow-x-auto rounded-lg border">
      <Table>
        <TableHeader>
          <TableHeadAlunos />
        </TableHeader>
        <TableBody>
          {listAlunos?.map((aluno) => (
            <AlunoRow
              key={aluno._id}
              aluno={aluno}
              onDelete={onDelete}
            />
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

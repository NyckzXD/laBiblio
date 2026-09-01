import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TableHeadBooks } from "@/pages/books/components/TableHead";
import type { Doc, Id } from "@convex/_generated/dataModel";
import { EllipsisVertical, Eye } from "lucide-react";
import { BooksDetails } from "./BookDetails";
import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { useMutation, useQuery } from "convex/react";
import { api } from "@convex/_generated/api";

interface BookProps {
  books: Doc<"books">[];
}

export function BooksCard({ books }: BookProps) {
  const rentBooks = useMutation(api.alugueis.RentBooks);
  const aluno = useQuery(api.alunos.currentAluno);

  const [selectedBook, setSelectedBook] = useState<Doc<"books"> | null>(null);
  const [open, setOpen] = useState(false);
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());

  const avaliable = (aval: boolean) => {
    return aval ? "Sim" : "Não";
  };

  const toggleRow = (bookId: string) => {
    setSelectedRows((prev) => {
      const newSet = new Set(prev);

      if (newSet.has(bookId)) {
        newSet.delete(bookId);
      } else {
        if (newSet.size >= 3) {
          alert("Você só pode selecionar até 3 livros por vez.");
          return prev;
        }
        newSet.add(bookId);
      }
      return newSet;
    });
  };

  async function handleRentBooks() {
    if (selectedRows.size === 0) {
      alert("Selecione pelo menos um livro para alugar.");
      return;
    }
    try {
      await rentBooks({
        id_book: Array.from(selectedRows) as Array<Id<"books">>,
        id_aluno: aluno?._id as any,
      });
      alert("Livros alugados com sucesso!");
      setSelectedRows(new Set());
    } catch (error) {
      console.error("Erro ao alugar livros:", error);
      alert("Ocorreu um erro ao alugar os livros. Tente novamente.");
    }
  }

  return (
    <>
      <div>
        <Button onClick={handleRentBooks}>Alugar Livros</Button>
      </div>
      <div className="overflow-x-auto rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow className="flex items-center justify-between">
              <TableHeadBooks />
            </TableRow>
          </TableHeader>
          <TableBody>
            {books.map((book) => (
              <TableRow
                key={book._id}
                className={`flex items-center justify-between cursor-pointer ${
                  selectedRows.has(book._id)
                    ? "bg-blue-100"
                    : book.available
                      ? "bg-green-100"
                      : "bg-yellow-100"
                }`}
              >
                <TableCell className="w-12 shrink-0 flex justify-center">
                  <Checkbox
                    checked={selectedRows.has(book._id)}
                    onCheckedChange={() => toggleRow(book._id)}
                  />
                </TableCell>

                <TableCell className="min-w-40 shrink-0">
                  {book.title}
                </TableCell>
                <TableCell className="min-w-56 shrink-0">
                  {book.author}
                </TableCell>
                <TableCell className="min-w-40 shrink-0">
                  {book.isbn || "-"}
                </TableCell>
                <TableCell className="min-w-40 shrink-0">
                  {book.year || "-"}
                </TableCell>
                <TableCell className="min-w-40 shrink-0">
                  {avaliable(book.available)}
                </TableCell>
                <TableCell className="min-w-16 shrink-0 flex justify-center">
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <Button variant="ghost" size="icon">
                        <EllipsisVertical />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        onClick={() => {
                          setSelectedBook(book);
                          setOpen(true);
                        }}
                      >
                        <Eye className="mr-2 h-4 w-4" />
                        Visualizar
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {selectedBook && (
        <BooksDetails Books={selectedBook} open={open} onOpenChange={setOpen} />
      )}
    </>
  );
}

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
import type { Doc } from "@convex/_generated/dataModel";
import { EllipsisVertical, Eye } from "lucide-react";
import { BooksDetails } from "./BookDetails";
import { useState } from "react";

interface BookProps {
  books: Doc<"books">[];
}

export function BooksCard({ books }: BookProps) {
  const [selectedBook, setSelectedBook] = useState<Doc<"books"> | null>(null);
  const [open, setOpen] = useState(false);

  const avaliable = (aval: boolean) => {
    if (aval) {
      return "Sim";
    } else {
      return "Não";
    }
  };
  return (
    <>
      <div className="overflow-x-auto rounded-lg border">
        <Table>
          <TableHeader>
            <TableHeadBooks />
          </TableHeader>
          <TableBody>
            {books.map((book) => (
              <TableRow
                key={book._id}
                className={`flex items-center justify-between ${book.available ? "bg-green-100" : "bg-yellow-100"}`}
              >
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
                      {/* <DropdownMenuItem
                        onClick={() => setTimeout(() => setIsEditOpen(true), 0)}
                      >
                        <SquarePen className="mr-2 h-4 w-4" />
                        Editar
                      </DropdownMenuItem> */}
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

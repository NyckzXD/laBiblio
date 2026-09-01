import { useQuery } from "convex/react";
import { BooksCard } from "../components/Bookscard";
import { api } from "@convex/_generated/api";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export function BookCatalogoPage() {
  const list = useQuery(api.books.list) || [];
  const [search, setSearch] = useState("");
  const filtered = list?.filter((book) => book.title.toLowerCase().includes(search.toLowerCase()) || book.author.toLowerCase().includes(search.toLowerCase())) ?? [];

  return (
    <div className="flex flex-col gap-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground tracking-tight">
            Books
          </h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Escolha os livros
          </p>
        </div>
      </div>
      <Input
        placeholder="Buscar por título..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="sm:max-w-xs"
      />
      <Separator />
      <BooksCard books={filtered} />
    </div>
  );
}

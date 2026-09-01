import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { Doc } from "@convex/_generated/dataModel";

interface BooksDetailsProps {
  Books: Doc<"books">;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onClose?: () => void;
}

export function BooksDetails({ Books, open, onOpenChange, onClose }: BooksDetailsProps) {

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
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
    </>
  );
}

export function BookCatalogoPage() {
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
    </div>
  );
}

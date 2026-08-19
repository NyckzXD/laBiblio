import { BookMarked, LibraryBig } from "lucide-react";
import type { ComponentType } from "react";
import { BookCatalogoPage } from "./alunosPages/booksCatalogo/page/BookCatalogoPage";

export type RouteAlunoConfig = {
  path: string;
  title: string;
  icon: ComponentType;
  component: ComponentType;
  showInMenu: boolean;
};

export const alunoRoutes: RouteAlunoConfig[] = [
  {
    path: "/aluno/livros",
    title: "Livros",
    icon: BookMarked,
    component: BookCatalogoPage,
    showInMenu: true,
  },
//   {
//     path: "/aluno/historico",
//     title: "Meus empréstimos",
//     icon: LibraryBig,
//     component: AlunoHistoricoPage,
//     showInMenu: true,
//   },
];

import type { ComponentType } from "react";
import { Home, LibraryBig, Users, Briefcase } from "lucide-react";
import { Dashboard } from "./pages/home/DashboardPage";
import { BookPages } from "./pages/books/page/BookPages";
import { AlunosPage } from "./pages/alunos/page/AlunosPage";
import { ColaboradoresPage } from "./pages/colaboradores/page/ColaboradoresPage";

export type RouteConfig = {
  path: string;
  title: string;
  icon: ComponentType;
  component: ComponentType;
  showInMenu: boolean;
};

export const routes: RouteConfig[] = [
  {
    path: "/dashboard",
    title: "Dashboard",
    icon: Home,
    component: Dashboard,
    showInMenu: true,
  },
  {
    path: "/bookPage",
    title: "Books",
    icon: LibraryBig,
    component: BookPages,
    showInMenu: true,
  },
  {
    path: "/alunos",
    title: "Alunos",
    icon: Users,
    component: AlunosPage,
    showInMenu: true,
  },
  {
    path: "/colaboradores",
    title: "Colaboradores",
    icon: Briefcase,
    component: ColaboradoresPage,
    showInMenu: true,
  },
];

export const menuItems = routes.filter((r) => r.showInMenu);

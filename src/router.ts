import type { ComponentType } from "react";
import { Home, LibraryBig } from "lucide-react";
import { Dashboard } from "./pages/home/DashboardPage";
import { BookPages } from "./pages/books/page/BookPages";

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
];

export const menuItems = routes.filter((r) => r.showInMenu);

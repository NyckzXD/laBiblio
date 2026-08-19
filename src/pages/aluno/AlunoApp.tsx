import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Route, Routes } from "react-router-dom";
import { alunoRoutes } from "@/routerAluno";
import { AlunoSidebar } from "./AlunoSidebar";

export function AlunoApp() {
  return (
    <SidebarProvider>
      <AlunoSidebar />
      <SidebarInset>
        <main className="flex-1 p-4 sm:p-6 overflow-x-hidden overflow-y-auto">
          <Routes>
            {alunoRoutes.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={<route.component />}
              />
            ))}
          </Routes>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}

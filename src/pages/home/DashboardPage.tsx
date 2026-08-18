import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "../sideBar/SideBar";
import { Route, Routes } from "react-router-dom";
import { routes } from "@/router";

export function Dashboard() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <main className="flex-1 p-4 sm:p-6 overflow-x-hidden overflow-y-auto">
          <Routes>
            {routes.map((route) => (
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

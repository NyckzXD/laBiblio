import { LogOut } from "lucide-react";
import { NavLink } from "react-router-dom";
import { useAuthActions } from "@convex-dev/auth/react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useQuery } from "convex/react";
import { menuItems } from "@/router";
import { api } from "@convex/_generated/api";




export function AppSidebar() {
  const { signOut } = useAuthActions();
  const user = useQuery(api.model.user.queries.currentUser);
  console.log("🚀 ~ AppSidebar ~ user:", user)
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="flex flex-row items-center gap-2 px-2 py-3">
        <SidebarTrigger />
        <span className="font-bold text-lg truncate group-data-[collapsible=icon]:hidden">
          LaBiblio
        </span>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.path}>
                  <SidebarMenuButton
                    className="px-1 py-1"
                    render={
                      <NavLink
                        to={item.path}
                        className={({ isActive }) =>
                          isActive ? "text-primary font-semibold" : ""
                        }
                      />
                    }
                  >
                    <item.icon />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-2">
        <SidebarMenu>
          <SidebarMenuItem>
            {user ? (
              <div className="flex items-center gap-3 px-1 py-1">
                <Avatar className="h-8 w-8 shrink-0">
                  <AvatarImage src={user.image} />
                  <AvatarFallback>
                    {user.name?.[0]?.toUpperCase() ?? user.email?.[0]?.toLocaleUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col items-start min-w-0 group-data-[collapsible=icon]:hidden">
                  <span className="font-medium text-[13px] truncate">{user.name}</span>
                  <span className="text-xs text-muted-foreground truncate">{user.email}</span>
                </div>
              </div>
            ) : (
              <span className="text-sm text-muted-foreground">
                Carregando...
              </span>
            )}
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton className="bg-gray-300 hover:bg-gray-400 hover:text-destructive" onClick={() => signOut()}>
              <LogOut />
              <span>Sair</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}

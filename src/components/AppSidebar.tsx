import { Inbox, HardDrive, Layout, RefreshCw, BarChart3, Users, ShoppingCart } from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
} from "@/components/ui/sidebar";

export function AppSidebar() {
  const location = useLocation();

  const dashboardItems = [
    { title: "Inbox", url: "/", icon: Inbox, badge: 4 },
    { title: "Drive Files", url: "/drive", icon: HardDrive, badge: 435 },
    { title: "Boards", url: "/boards", icon: Layout, badge: 5 },
    { title: "Updates", url: "/updates", icon: RefreshCw },
    { title: "Analytics", url: "/analytics", icon: BarChart3, badge: 2 },
    { title: "CRM Dashboard", url: "/crm", icon: Users, badge: 2 },
    { title: "Ecommerce", url: "/ecommerce", icon: ShoppingCart },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <Sidebar className="border-r border-border/40 bg-background">
      <SidebarHeader className="p-6">
        <h1 className="text-2xl font-semibold text-foreground">Dashboard</h1>
        
        {/* User Profile Section */}
        <div className="flex items-center gap-3 mt-6">
          <Avatar className="w-12 h-12">
            <AvatarImage src="" alt="Nancy Martino" />
            <AvatarFallback className="bg-blue-500 text-white">NM</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-medium text-foreground">Nancy Martino</p>
            <p className="text-xs text-muted-foreground">Designer</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="px-6">
        {/* Dashboards Section */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-4">
            DASHBOARDS
          </SidebarGroupLabel>
          
          <SidebarGroupContent>
            <SidebarMenu className="space-y-2">
              {dashboardItems.map((item) => {
                const isItemActive = isActive(item.url);
                
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      className={`
                        flex items-center justify-between px-3 py-3 rounded-lg transition-all duration-200
                        ${isItemActive 
                          ? 'bg-blue-50 text-blue-600' 
                          : 'text-gray-600 hover:bg-gray-50'
                        }
                      `}
                    >
                      <NavLink to={item.url} className="flex items-center justify-between w-full">
                        <div className="flex items-center gap-3">
                          <item.icon className={`w-5 h-5 ${isItemActive ? 'text-blue-500' : 'text-blue-500'}`} />
                          <span className="text-sm font-medium">{item.title}</span>
                        </div>
                        {item.badge && (
                          <span className={`text-xs px-2 py-1 rounded font-medium ${
                            isItemActive ? 'text-blue-600' : 'text-gray-500'
                          }`}>
                            {item.badge}
                          </span>
                        )}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
import { Home, CheckSquare, Users, Briefcase, BarChart3, FileText, Bell } from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";

const navigationItems = [
  { title: "Home", url: "/", icon: Home },
  { title: "Tasks", url: "/tasks", icon: CheckSquare },
  { title: "Talents", url: "/talents", icon: Users },
  { title: "Open Roles", url: "/roles", icon: Briefcase },
  { title: "Analytics", url: "/analytics", icon: BarChart3 },
  { title: "Reports", url: "/reports", icon: FileText },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;
  const collapsed = state === "collapsed";

  const isActive = (path: string) => currentPath === path;
  const getNavCls = ({ isActive }: { isActive: boolean }) =>
    isActive 
      ? "bg-primary text-primary-foreground font-medium hover:bg-primary-hover" 
      : "hover:bg-muted-hover text-muted-foreground hover:text-foreground";

  return (
    <Sidebar
      className={collapsed ? "w-16" : "w-64"}
      collapsible="icon"
    >
      <SidebarContent className="bg-surface border-r border-border">
        {/* Logo area */}
        <div className="p-8 border-b border-border">
          {!collapsed ? (
            <h1 className="text-xl font-semibold text-foreground">TaskFlow CRM</h1>
          ) : (
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
              <CheckSquare className="w-5 h-5 text-primary-foreground" />
            </div>
          )}
        </div>

        <SidebarGroup className="px-4 py-6">
          <SidebarGroupLabel className={collapsed ? "sr-only" : "text-muted-foreground font-medium text-sm"}>
            Navigation
          </SidebarGroupLabel>
          
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url} 
                      end 
                      className={({ isActive }) => `
                        ${getNavCls({ isActive })}
                        flex items-center gap-4 px-4 py-3 rounded-xl transition-colors font-medium
                      `}
                    >
                      <item.icon className="w-5 h-5 flex-shrink-0" />
                      {!collapsed && <span className="font-medium">{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Notification area - bottom */}
        <div className="mt-auto p-4">
          {!collapsed && (
            <div className="bg-muted rounded-xl p-4 border border-border">
              <div className="flex items-start gap-3">
                <Bell className="w-5 h-5 text-muted-foreground mt-0.5" />
                <div className="text-sm">
                  <p className="font-semibold text-foreground">New Update</p>
                  <p className="text-muted-foreground text-xs leading-relaxed mt-1">
                    Send personalized mails
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </SidebarContent>
    </Sidebar>
  );
}
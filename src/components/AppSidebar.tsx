import { Home, CheckSquare, Users, Briefcase, BarChart3, FileText, Building2 } from "lucide-react";
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
  const collapsed = state === "collapsed";

  return (
    <Sidebar 
      className={`${collapsed ? 'w-20' : 'w-72'} transition-all duration-300 bg-sidebar border-r border-sidebar-border/30`}
      collapsible="icon"
    >
      <SidebarContent className="p-6">
        {/* Logo area */}
        <div className="flex items-center mb-10 px-2">
          {!collapsed ? (
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary-hover rounded-2xl flex items-center justify-center shadow-lg">
                <Building2 className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="font-bold text-xl text-sidebar-foreground tracking-tight">TaskFlow</span>
            </div>
          ) : (
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary-hover rounded-2xl flex items-center justify-center mx-auto shadow-lg">
              <Building2 className="w-5 h-5 text-primary-foreground" />
            </div>
          )}
        </div>

        {/* Navigation */}
        <SidebarGroup>
          <SidebarMenu className="space-y-3">
            {navigationItems.map((item) => {
              const isActive = location.pathname === item.url;
              return (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    className={`
                      flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-200 group relative overflow-hidden
                      ${isActive 
                        ? 'bg-gradient-to-r from-primary/10 to-primary/5 text-primary font-semibold shadow-sm border border-primary/20 backdrop-blur-sm' 
                        : 'text-sidebar-foreground/80 hover:bg-sidebar-accent/60 hover:text-sidebar-foreground'
                      }
                    `}
                  >
                    <NavLink to={item.url} className="flex items-center gap-4 w-full">
                      <item.icon className={`w-5 h-5 ${isActive ? 'text-primary' : 'text-sidebar-foreground/70'}`} />
                      {!collapsed && (
                        <span className="font-medium text-sm">{item.title}</span>
                      )}
                      {isActive && !collapsed && (
                        <div className="absolute right-3 w-2 h-2 bg-primary rounded-full"></div>
                      )}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarGroup>

        {/* Notification area */}
        {!collapsed && (
          <div className="mt-auto pt-8">
            <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-2xl p-5 border border-primary/10 backdrop-blur-sm">
              <div className="flex items-start gap-4">
                <div className="w-3 h-3 bg-gradient-to-r from-primary to-primary-hover rounded-full mt-1.5 flex-shrink-0 shadow-sm"></div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-sidebar-foreground mb-2">
                    Send personalized mails
                  </p>
                  <p className="text-xs text-sidebar-foreground/70 leading-relaxed">
                    Automate your email campaigns with smart targeting
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </SidebarContent>
    </Sidebar>
  );
}
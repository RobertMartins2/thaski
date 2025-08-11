import { Home, FolderOpen, Users, Calendar, BarChart3, CalendarDays, LogOut, Hexagon } from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";

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
  SidebarHeader,
  SidebarFooter,
} from "@/components/ui/sidebar";

const navigationItems = [
  { title: "Home", url: "/", icon: Home },
  { title: "Projects", url: "/projects", icon: FolderOpen, badge: "11" },
  { title: "Meetings", url: "/meetings", icon: Users },
  { title: "Team", url: "/team", icon: Users, badge: "2" },
  { title: "Schedule", url: "/schedule", icon: Calendar },
  { title: "Analytics", url: "/analytics", icon: BarChart3 },
  { title: "Calendar", url: "/calendar", icon: CalendarDays },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const collapsed = state === "collapsed";

  return (
    <Sidebar 
      collapsible="icon"
    >
      <SidebarContent className="p-6 flex flex-col h-full">
        {/* Logo and Header */}
        {!collapsed && (
          <SidebarHeader className="mb-8 px-0">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
                <Hexagon className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold text-lg text-gray-900">TaskFlow</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 leading-tight">
                Stay on Top of<br />Your Work 👋
              </h1>
            </div>
          </SidebarHeader>
        )}

        {/* Navigation */}
        <SidebarGroup className="flex-1">
          <SidebarMenu className="space-y-2">
            {navigationItems.map((item) => {
              const isActive = location.pathname === item.url;
              return (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    className={`
                      flex items-center justify-between px-4 py-3 rounded-lg transition-all duration-200 group
                      ${isActive 
                        ? 'bg-orange-50 text-orange-600 font-medium' 
                        : 'text-gray-600 hover:bg-gray-50'
                      }
                    `}
                  >
                    <NavLink to={item.url} className="flex items-center justify-between w-full">
                      <div className="flex items-center gap-3">
                        <item.icon className={`w-5 h-5 ${isActive ? 'text-orange-600' : 'text-gray-500'}`} />
                        {!collapsed && (
                          <span className="text-sm">{item.title}</span>
                        )}
                      </div>
                      {!collapsed && item.badge && (
                        <span className="bg-orange-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                          {item.badge}
                        </span>
                      )}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarGroup>

        {/* Logout Button */}
        <SidebarFooter className="px-0 mt-auto">
          <Button
            variant="ghost"
            className="w-full justify-start px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg"
          >
            <LogOut className="w-5 h-5 mr-3" />
            {!collapsed && <span className="text-sm">Logout</span>}
          </Button>
        </SidebarFooter>
      </SidebarContent>
    </Sidebar>
  );
}
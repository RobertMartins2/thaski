import { useState } from "react";
import { Home, FolderOpen, Settings, Zap, LogOut, Search, Plus, User, ChevronRight, ChevronDown, Kanban } from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useProjects } from "@/contexts/ProjectContext";
import { supabase } from "@/integrations/supabase/client";

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
  SidebarFooter,
} from "@/components/ui/sidebar";

export function AppSidebar() {
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedSections, setExpandedSections] = useState({
    projects: false,
    settings: false
  });
  
  const { projects, projectsCount } = useProjects();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const mainItems = [
    { title: "Dashboard", url: "/", icon: Home, color: "text-blue-500" },
    { title: "Projetos", url: "/projects", icon: FolderOpen, color: "text-green-500", badge: projectsCount },
    { title: "Análises", url: "/analytics", icon: Kanban, color: "text-purple-500" },
    { title: "Relatórios", url: "/reports", icon: Zap, color: "text-orange-500" },
  ];

  const isActive = (path: string) => location.pathname === path;
  const isProjectDetailActive = location.pathname.startsWith('/project');

  return (
    <Sidebar className="border-r border-border/40 bg-background">
      <SidebarHeader className="p-4 border-b border-border/40">
        {/* Logo and Title */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
            <Kanban className="w-4 h-4 text-white" />
          </div>
          <span className="font-semibold text-lg text-foreground">TaskFlow Pro</span>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Pesquisar"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-muted/50 border-0 focus-visible:ring-1 focus-visible:ring-primary"
          />
        </div>
      </SidebarHeader>

      <SidebarContent className="px-4 py-2">
        {/* Main Navigation */}
        <SidebarGroup>
          <SidebarMenu className="space-y-1">
            {mainItems.map((item) => {
              const isItemActive = isActive(item.url) || (item.url === "/projects" && isProjectDetailActive);
              
              return (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    className={`
                      flex items-center justify-between px-3 py-2.5 rounded-lg transition-all duration-200 group
                      ${isItemActive 
                        ? 'bg-primary/10 text-primary font-medium border border-primary/20' 
                        : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground'
                      }
                    `}
                  >
                    <NavLink to={item.url} className="flex items-center justify-between w-full">
                      <div className="flex items-center gap-3">
                        <item.icon className={`w-5 h-5 ${isItemActive ? 'text-primary' : item.color}`} />
                        <span className="text-sm">{item.title}</span>
                      </div>
                      {item.badge && item.badge > 0 && (
                        <span className="bg-primary text-primary-foreground text-xs px-2 py-0.5 rounded-full font-medium">
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

        {/* Projects Section */}
        <SidebarGroup>
          <div className="flex items-center justify-between px-3 py-2">
            <SidebarGroupLabel className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Projetos Recentes
            </SidebarGroupLabel>
            <Button
              variant="ghost"
              size="sm"
              className="h-6 w-6 p-0"
              onClick={() => toggleSection('projects')}
            >
              {expandedSections.projects ? (
                <ChevronDown className="w-3 h-3" />
              ) : (
                <ChevronRight className="w-3 h-3" />
              )}
            </Button>
          </div>
          
          {expandedSections.projects && (
            <SidebarGroupContent>
              <SidebarMenu className="space-y-1">
                {projects.slice(0, 5).map((project) => {
                  const isProjectActive = location.pathname === `/project/${project.id}`;
                  return (
                    <SidebarMenuItem key={project.id}>
                      <SidebarMenuButton
                        asChild
                        className={`
                          flex items-center px-3 py-2 rounded-lg transition-all duration-200 text-sm
                          ${isProjectActive 
                            ? 'bg-primary/10 text-primary font-medium' 
                            : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground'
                          }
                        `}
                      >
                        <NavLink to={`/project/${project.id}`} className="flex items-center gap-3 w-full">
                          <div className={`w-3 h-3 rounded-full ${project.color}`} />
                          <span className="truncate">{project.name}</span>
                        </NavLink>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          )}
        </SidebarGroup>

        {/* Tools Section */}
        <SidebarGroup>
          <div className="flex items-center justify-between px-3 py-2">
            <SidebarGroupLabel className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Ferramentas
            </SidebarGroupLabel>
            <Button
              variant="ghost"
              size="sm"
              className="h-6 w-6 p-0"
              onClick={() => toggleSection('settings')}
            >
              {expandedSections.settings ? (
                <ChevronDown className="w-3 h-3" />
              ) : (
                <ChevronRight className="w-3 h-3" />
              )}
            </Button>
          </div>
          
          {expandedSections.settings && (
            <SidebarGroupContent>
              <SidebarMenu className="space-y-1">
                <SidebarMenuItem>
                  <SidebarMenuButton className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:bg-muted/50 hover:text-foreground transition-colors">
                    <Plus className="w-4 h-4 text-blue-500" />
                    <span>Criar</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:bg-muted/50 hover:text-foreground transition-colors">
                    <Settings className="w-4 h-4 text-gray-500" />
                    <span>Configurações</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          )}
        </SidebarGroup>
      </SidebarContent>

      {/* User Footer */}
      <SidebarFooter className="p-4 border-t border-border/40">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate">Usuário</p>
              <p className="text-xs text-muted-foreground truncate">Online</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0"
            onClick={handleSignOut}
            title="Sair"
          >
            <LogOut className="w-4 h-4" />
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
import { useState } from "react";
import { Home, FolderOpen, Settings, Zap, LogOut, Hexagon, ChevronRight, ChevronDown } from "lucide-react";
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

const projects = [
  { id: '1', name: 'Projeto Imobiliário', color: 'bg-blue-500' },
  { id: '2', name: 'Plataforma E-commerce', color: 'bg-green-500' },
  { id: '3', name: 'Design de App Mobile', color: 'bg-purple-500' },
  { id: '4', name: 'Campanha de Marketing', color: 'bg-orange-500' },
];

const navigationItems = [
  { title: "Home", url: "/", icon: Home },
  { title: "Projetos", url: "/projects", icon: FolderOpen, badge: "11", expandable: true },
  { title: "Configurações", url: "/settings", icon: Settings },
  { title: "Integrações", url: "/integrations", icon: Zap },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const collapsed = state === "collapsed";
  const [expandedProjects, setExpandedProjects] = useState(false);

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
                Mantenha-se no Controle<br />do seu Trabalho 👋
              </h1>
            </div>
          </SidebarHeader>
        )}

        {/* Navigation */}
        <SidebarGroup className="flex-1">
          <SidebarMenu className="space-y-2">
            {navigationItems.map((item) => {
              const isActive = location.pathname === item.url;
              const isProjectActive = item.title === "Projetos" && location.pathname.startsWith('/project');
              const shouldHighlight = isActive || isProjectActive;
              
              return (
                <div key={item.title}>
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      asChild
                      className={`
                        flex items-center justify-between px-4 py-3 rounded-lg transition-all duration-200 group
                        ${shouldHighlight 
                          ? 'bg-orange-50 text-orange-600 font-medium' 
                          : 'text-gray-600 hover:bg-gray-50'
                        }
                      `}
                    >
                      <div className="flex items-center justify-between w-full">
                        <NavLink to={item.url} className="flex items-center gap-3 flex-1">
                          <item.icon className={`w-5 h-5 ${shouldHighlight ? 'text-orange-600' : 'text-gray-500'}`} />
                          {!collapsed && (
                            <span className="text-sm">{item.title}</span>
                          )}
                        </NavLink>
                        
                        {!collapsed && (
                          <div className="flex items-center gap-2">
                            {item.badge && (
                              <span className="bg-orange-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                                {item.badge}
                              </span>
                            )}
                            {item.expandable && (
                              <button
                                onClick={(e) => {
                                  e.preventDefault();
                                  setExpandedProjects(!expandedProjects);
                                }}
                                className="p-1 hover:bg-gray-100 rounded"
                              >
                                {expandedProjects ? (
                                  <ChevronDown className="w-4 h-4 text-gray-500" />
                                ) : (
                                  <ChevronRight className="w-4 h-4 text-gray-500" />
                                )}
                              </button>
                            )}
                          </div>
                        )}
                      </div>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  
                  {/* Expanded Projects */}
                  {item.expandable && expandedProjects && !collapsed && (
                    <div className="ml-6 mt-1 space-y-1">
                      {projects.map((project) => {
                        const isProjectDetailActive = location.pathname === `/project/${project.id}`;
                        return (
                          <SidebarMenuItem key={project.id}>
                            <SidebarMenuButton
                              asChild
                              className={`
                                flex items-center px-4 py-2 rounded-lg transition-all duration-200 text-sm
                                ${isProjectDetailActive 
                                  ? 'bg-orange-50 text-orange-600 font-medium' 
                                  : 'text-gray-600 hover:bg-gray-50'
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
                    </div>
                  )}
                </div>
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
            {!collapsed && <span className="text-sm">Sair</span>}
          </Button>
        </SidebarFooter>
      </SidebarContent>
    </Sidebar>
  );
}
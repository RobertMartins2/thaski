
import { useEffect, useState } from "react";
import { Plus, Grid3X3, FolderOpen } from "lucide-react";
import { useProjects } from "@/contexts/ProjectContext";
import { Button } from "@/components/ui/button";
import { CreateProjectDialog } from "@/components/CreateProjectDialog";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { NavLink } from "react-router-dom";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";

export default function Index() {
  const { projects, refreshProjects } = useProjects();
  const [createDialogOpen, setCreateDialogOpen] = useState(false);

  useEffect(() => {
    refreshProjects();
  }, [refreshProjects]);

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <div className="container mx-auto px-6 py-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Meus Projetos</h1>
              <p className="text-muted-foreground mt-1">
                Gerencie seus projetos e tarefas de forma eficiente
              </p>
            </div>
            <Button 
              onClick={() => setCreateDialogOpen(true)}
              className="bg-primary hover:bg-primary/90"
            >
              <Plus className="w-4 h-4 mr-2" />
              Novo Projeto
            </Button>
          </div>

          {/* Projects Grid */}
          {projects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {projects.map((project) => (
                <Card key={project.id} className="group hover:shadow-lg transition-shadow cursor-pointer">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className={`w-4 h-4 rounded-full ${project.color || 'bg-primary'}`} />
                      <Badge variant="secondary" className="text-xs">
                        {project.code}
                      </Badge>
                    </div>
                    <CardTitle className="text-lg group-hover:text-primary transition-colors">
                      {project.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Grid3X3 className="w-4 h-4" />
                        <span>{project.taskCount || 0} tarefas</span>
                      </div>
                      <NavLink to={`/project/${project.id}`}>
                        <Button variant="ghost" size="sm" className="group-hover:bg-primary/10">
                          Abrir
                        </Button>
                      </NavLink>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center min-h-[400px]">
              <div className="text-center space-y-6">
                <div className="w-24 h-24 mx-auto bg-muted rounded-full flex items-center justify-center">
                  <FolderOpen className="w-12 h-12 text-muted-foreground" />
                </div>
                <div className="space-y-2">
                  <h2 className="text-2xl font-semibold text-foreground">
                    Nenhum projeto encontrado
                  </h2>
                  <p className="text-muted-foreground">
                    Crie seu primeiro projeto para começar a organizar suas tarefas
                  </p>
                </div>
                <Button 
                  onClick={() => setCreateDialogOpen(true)}
                  className="bg-primary hover:bg-primary/90"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Criar Primeiro Projeto
                </Button>
              </div>
            </div>
          )}

          <CreateProjectDialog 
            open={createDialogOpen}
            onOpenChange={setCreateDialogOpen}
            onProjectCreated={(project) => {
              setCreateDialogOpen(false);
              refreshProjects();
            }}
          />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}


import { useState, useEffect } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { TaskBoard } from "@/components/TaskBoard";
import { ProjectHeader } from "@/components/ProjectHeader";
import { toast } from "sonner";
import { Project } from "@/types/kanban";
import { useProjects } from "@/contexts/ProjectContext";
import { CreateProjectDialog } from "@/components/CreateProjectDialog";

const Index = () => {
  const { projects, addProject: addProjectToContext } = useProjects();
  const [currentProject, setCurrentProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Selecionar primeiro projeto disponível quando os projetos carregarem
    if (projects.length > 0 && !currentProject) {
      setCurrentProject(projects[0]);
    }
  }, [projects, currentProject]);

  const handleProjectChange = (project: Project) => {
    setCurrentProject(project);
    toast.success(`Alternado para ${project.name}`);
  };

  const handleNewProject = (newProject: Project) => {
    addProjectToContext(newProject);
    setCurrentProject(newProject);
    toast.success(`Projeto ${newProject.name} criado e selecionado!`);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="flex-1">
        <main className="flex flex-col h-screen overflow-hidden">
          {/* Project Header */}
          <div className="flex-shrink-0">
            <ProjectHeader 
              currentProject={currentProject}
              projects={projects}
              onProjectChange={handleProjectChange}
              onNewProject={() => {}} // Não usado mais aqui
            />
          </div>
          
          {/* Task Board Content */}
          {currentProject ? (
            <div 
              className="flex-1 overflow-auto px-6 py-6"
              style={{
                background: 'linear-gradient(100deg, #F8FBFF 0.39%, #FFFFF8 91.56%)'
              }}
            >
              <TaskBoard projectId={currentProject.id} />
            </div>
          ) : (
            <div className="flex-1 flex items-center justify-center p-6">
              <div className="text-center space-y-4">
                <h2 className="text-2xl font-bold text-foreground mb-4">
                  Nenhum projeto encontrado
                </h2>
                <p className="text-muted-foreground mb-6">
                  Crie seu primeiro projeto para começar a organizar suas tarefas
                </p>
                <CreateProjectDialog onProjectCreated={handleNewProject} />
              </div>
            </div>
          )}
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Index;

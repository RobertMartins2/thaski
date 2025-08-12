import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { ProjectHeader } from "@/components/ProjectHeader";
import { TaskBoard } from "@/components/TaskBoard";
import { toast } from "sonner";
import { Project } from "@/types/kanban";
import { getProjects, getProjectById } from "@/lib/project-storage";

const ProjectDetail = () => {
  const { id } = useParams();
  const [currentProject, setCurrentProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  const projects = getProjects();

  useEffect(() => {
    loadProject();
  }, [id]);

  const loadProject = async () => {
    setLoading(true);
    try {
      const { getProjectById } = await import('@/lib/project-storage');
      const project = await getProjectById(id || '');
      if (project) {
        setCurrentProject(project);
      } else {
        toast.error("Projeto não encontrado");
      }
    } catch (error) {
      console.error('Erro ao carregar projeto:', error);
      toast.error("Erro ao carregar projeto");
    } finally {
      setLoading(false);
    }
  };

  const handleProjectChange = (project: Project) => {
    setCurrentProject(project);
    toast.success(`Alternado para ${project.name}`);
  };

  const handleNewProject = () => {
    toast.info("Funcionalidade de criar novo projeto em breve!");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Carregando projeto...</p>
        </div>
      </div>
    );
  }

  if (!currentProject) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-2">Projeto Não Encontrado</h1>
          <p className="text-muted-foreground">O projeto solicitado não foi encontrado.</p>
        </div>
      </div>
    );
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        {/* Project Header */}
        <div className="flex-shrink-0 border-b border-border/40">
          <ProjectHeader 
            currentProject={currentProject}
            projects={projects}
            onProjectChange={handleProjectChange}
            onNewProject={handleNewProject}
          />
        </div>
        
        {/* Task Board Content */}
        <div className="flex-1 overflow-hidden">
          <div className="h-full px-4 lg:px-6 py-6 overflow-auto">
            <TaskBoard projectId={id} />
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default ProjectDetail;
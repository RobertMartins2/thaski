import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { ProjectHeader } from "@/components/ProjectHeader";
import { TaskBoard } from "@/components/TaskBoard";
import { toast } from "sonner";
import { Project } from "@/types/kanban";

const ProjectDetail = () => {
  const { projectId } = useParams();
  const [currentProject, setCurrentProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  const projects: Project[] = [
    { id: '1', name: 'Projeto Imobiliário', code: 'IMB', color: 'bg-blue-500', taskCount: 488 },
    { id: '2', name: 'Plataforma E-commerce', code: 'ECM', color: 'bg-green-500', taskCount: 487 },
    { id: '3', name: 'Design de App Mobile', code: 'APP', color: 'bg-purple-500', taskCount: 485 },
    { id: '4', name: 'Campanha de Marketing', code: 'MKT', color: 'bg-orange-500', taskCount: 486 }
  ];

  useEffect(() => {
    // Simulate loading and find project
    const timer = setTimeout(() => {
      const project = projects.find(p => p.id === projectId);
      if (project) {
        setCurrentProject(project);
      } else {
        toast.error("Projeto não encontrado");
      }
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [projectId]);

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
      <div className="flex-1">
        <main className="flex flex-col h-screen overflow-hidden">
          {/* Project Header */}
          <div className="flex-shrink-0">
            <ProjectHeader 
              currentProject={currentProject}
              projects={projects}
              onProjectChange={handleProjectChange}
              onNewProject={handleNewProject}
            />
          </div>
          
          {/* Task Board Content */}
          <div className="flex-1 overflow-auto px-6 py-6">
            <TaskBoard />
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default ProjectDetail;
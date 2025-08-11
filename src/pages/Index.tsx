
import { useState } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { TaskBoard } from "@/components/TaskBoard";
import { ProjectHeader } from "@/components/ProjectHeader";
import { toast } from "sonner";
import { Project } from "@/types/kanban";

import { Menu } from "lucide-react";

const Index = () => {
  const [currentProject, setCurrentProject] = useState<Project>({
    id: '1', 
    name: 'Projeto Imobiliário',
    code: 'IMB',
    color: 'bg-blue-500',
    taskCount: 488
  });

  const projects: Project[] = [
    { id: '1', name: 'Projeto Imobiliário', code: 'IMB', color: 'bg-blue-500', taskCount: 488 },
    { id: '2', name: 'Plataforma E-commerce', code: 'ECM', color: 'bg-green-500', taskCount: 487 },
    { id: '3', name: 'Design de App Mobile', code: 'APP', color: 'bg-purple-500', taskCount: 485 },
    { id: '4', name: 'Campanha de Marketing', code: 'MKT', color: 'bg-orange-500', taskCount: 486 }
  ];

  const handleProjectChange = (project: Project) => {
    setCurrentProject(project);
    toast.success(`Alternado para ${project.name}`);
  };

  const handleNewProject = () => {
    toast.info("Funcionalidade de criar novo projeto em breve!");
  };

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

export default Index;


import { useState } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { TaskBoard } from "@/components/TaskBoard";
import { ProjectHeader } from "@/components/ProjectHeader";
import { toast } from "sonner";
import { Project } from "@/types/kanban";
import { getProjects } from "@/lib/project-storage";

import { Menu } from "lucide-react";

const Index = () => {
  const projects = getProjects();
  const [currentProject, setCurrentProject] = useState<Project | null>(
    projects[0] || null
  );

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
            <TaskBoard projectId={currentProject?.id} />
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Index;

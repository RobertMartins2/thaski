
import { useState } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { TaskBoard } from "@/components/TaskBoard";
import { ProjectHeader } from "@/components/ProjectHeader";
import { toast } from "sonner";

import { Menu } from "lucide-react";

interface Project {
  id: string;
  name: string;
  description?: string;
}

const Index = () => {
  const [currentProject, setCurrentProject] = useState<Project>({
    id: '1', 
    name: 'Real Estate Project', 
    description: 'Main project workspace'
  });

  const projects: Project[] = [
    { id: '1', name: 'Real Estate Project', description: 'Main project workspace' },
    { id: '2', name: 'E-commerce Platform', description: 'Online store development' },
    { id: '3', name: 'Mobile App Design', description: 'iOS/Android application' },
    { id: '4', name: 'Marketing Campaign', description: 'Q1 2024 marketing activities' }
  ];

  const handleProjectChange = (project: Project) => {
    setCurrentProject(project);
    toast.success(`Switched to ${project.name}`);
  };

  const handleNewProject = () => {
    toast.info("Create new project feature coming soon!");
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

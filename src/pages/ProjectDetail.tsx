import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { ProjectHeader } from "@/components/ProjectHeader";
import { TaskBoard } from "@/components/TaskBoard";
import { toast } from "sonner";

interface Project {
  id: string;
  name: string;
  description?: string;
}

const ProjectDetail = () => {
  const { projectId } = useParams();
  const [currentProject, setCurrentProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  const projects: Project[] = [
    { id: '1', name: 'Real Estate Project', description: 'Main project workspace' },
    { id: '2', name: 'E-commerce Platform', description: 'Online store development' },
    { id: '3', name: 'Mobile App Design', description: 'iOS/Android application' },
    { id: '4', name: 'Marketing Campaign', description: 'Q1 2024 marketing activities' }
  ];

  useEffect(() => {
    // Simulate loading and find project
    const timer = setTimeout(() => {
      const project = projects.find(p => p.id === projectId);
      if (project) {
        setCurrentProject(project);
      } else {
        toast.error("Project not found");
      }
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [projectId]);

  const handleProjectChange = (project: Project) => {
    setCurrentProject(project);
    toast.success(`Switched to ${project.name}`);
  };

  const handleNewProject = () => {
    toast.info("Create new project feature coming soon!");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading project...</p>
        </div>
      </div>
    );
  }

  if (!currentProject) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-2">Project Not Found</h1>
          <p className="text-muted-foreground">The requested project could not be found.</p>
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
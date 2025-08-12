
import { useEffect } from "react";
import { TaskBoard } from "@/components/TaskBoard";
import { ProjectHeader } from "@/components/ProjectHeader";
import { useProjects } from "@/contexts/ProjectContext";

export default function Index() {
  const { projects } = useProjects();
  const currentProject = projects.length > 0 ? projects[0] : null;

  useEffect(() => {
    console.log('Index page rendered');
    console.log('Current project:', currentProject);
    console.log('Projects:', projects);
  }, [currentProject, projects]);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-6">
        <ProjectHeader />
        {currentProject ? (
          <TaskBoard />
        ) : (
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">
                Bem-vindo ao Kanban Board
              </h2>
              <p className="text-muted-foreground">
                Selecione um projeto no menu lateral ou crie um novo projeto para começar.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

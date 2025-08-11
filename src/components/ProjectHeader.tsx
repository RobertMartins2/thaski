
import { ProjectSelector } from "./ProjectSelector";
import { Project } from "@/types/kanban";

interface ProjectHeaderProps {
  currentProject?: Project | null;
  projects?: Project[];
  onProjectChange?: (project: Project) => void;
  onNewProject?: () => void;
}

export function ProjectHeader({ 
  currentProject,
  projects = [],
  onProjectChange = () => {},
  onNewProject = () => {}
}: ProjectHeaderProps) {
  if (!currentProject) {
    return (
      <div className="relative h-32 bg-gradient-to-r from-slate-600 to-slate-700 bg-cover bg-center">
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="relative h-full flex items-center justify-center px-8">
          <div className="text-center">
            <p className="text-white/80 text-sm font-medium mb-1">
              NENHUM PROJETO SELECIONADO
            </p>
            <h1 className="text-white text-xl">
              Crie ou selecione um projeto para começar
            </h1>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-32 bg-gradient-to-r from-blue-600 to-purple-600 bg-cover bg-center">
      <div className="absolute inset-0 bg-black/30"></div>
      <div className="relative h-full flex items-center justify-between px-8">
        <div>
          <p className="text-white/80 text-sm font-medium mb-1">
            PROJETO / {currentProject.name.toUpperCase()}
          </p>
          <h1 className="text-white text-2xl font-bold">
            {currentProject.name}
          </h1>
        </div>
        
        <div className="flex items-center gap-3">
          <ProjectSelector
            currentProject={currentProject}
            projects={projects}
            onProjectChange={onProjectChange}
            onNewProject={onNewProject}
          />
        </div>
      </div>
    </div>
  );
}

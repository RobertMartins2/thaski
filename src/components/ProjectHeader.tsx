
import { ProjectSelector } from "./ProjectSelector";
import { Project } from "@/types/kanban";

interface ProjectHeaderProps {
  currentProject?: Project;
  projects?: Project[];
  onProjectChange?: (project: Project) => void;
  onNewProject?: () => void;
}

export function ProjectHeader({ 
  currentProject = { id: '1', name: 'Projeto Imobiliário', code: 'IMB', color: 'bg-blue-500', taskCount: 488 },
  projects = [
    { id: '1', name: 'Projeto Imobiliário', code: 'IMB', color: 'bg-blue-500', taskCount: 488 },
    { id: '2', name: 'Plataforma E-commerce', code: 'ECM', color: 'bg-green-500', taskCount: 487 },
    { id: '3', name: 'Design de App Mobile', code: 'APP', color: 'bg-purple-500', taskCount: 485 },
    { id: '4', name: 'Campanha de Marketing', code: 'MKT', color: 'bg-orange-500', taskCount: 486 }
  ],
  onProjectChange = () => {},
  onNewProject = () => {}
}: ProjectHeaderProps) {
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


import { ProjectSelector } from "./ProjectSelector";

interface Project {
  id: string;
  name: string;
  description?: string;
}

interface ProjectHeaderProps {
  currentProject?: Project;
  projects?: Project[];
  onProjectChange?: (project: Project) => void;
  onNewProject?: () => void;
}

export function ProjectHeader({ 
  currentProject = { id: '1', name: 'Real Estate Project', description: 'Main project workspace' },
  projects = [
    { id: '1', name: 'Real Estate Project', description: 'Main project workspace' },
    { id: '2', name: 'E-commerce Platform', description: 'Online store development' },
    { id: '3', name: 'Mobile App Design', description: 'iOS/Android application' },
    { id: '4', name: 'Marketing Campaign', description: 'Q1 2024 marketing activities' }
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

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Project } from '@/types/kanban';
import { getProjectsAsync } from '@/lib/project-storage';

interface ProjectContextType {
  projects: Project[];
  projectsCount: number;
  refreshProjects: () => Promise<void>;
  addProject: (project: Project) => void;
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

interface ProjectProviderProps {
  children: ReactNode;
}

export function ProjectProvider({ children }: ProjectProviderProps) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [projectsCount, setProjectsCount] = useState(0);

  const refreshProjects = async () => {
    try {
      const projectsList = await getProjectsAsync();
      setProjects(projectsList);
      setProjectsCount(projectsList.length);
    } catch (error) {
      console.error('Erro ao carregar projetos:', error);
    }
  };

  const addProject = (project: Project) => {
    setProjects(prev => [project, ...prev]);
    setProjectsCount(prev => prev + 1);
  };

  useEffect(() => {
    refreshProjects();
  }, []);

  return (
    <ProjectContext.Provider value={{ 
      projects, 
      projectsCount, 
      refreshProjects, 
      addProject 
    }}>
      {children}
    </ProjectContext.Provider>
  );
}

export function useProjects() {
  const context = useContext(ProjectContext);
  if (context === undefined) {
    throw new Error('useProjects must be used within a ProjectProvider');
  }
  return context;
}
import { Project } from "@/types/kanban";

const PROJECTS_STORAGE_KEY = 'kanban-projects';

// Projetos padrão inicial
const defaultProjects: Project[] = [
  { id: '1', name: 'Projeto Imobiliário', code: 'IMB', color: 'bg-blue-500', taskCount: 488 },
  { id: '2', name: 'Plataforma E-commerce', code: 'ECM', color: 'bg-green-500', taskCount: 487 },
  { id: '3', name: 'Design de App Mobile', code: 'APP', color: 'bg-purple-500', taskCount: 485 },
  { id: '4', name: 'Campanha de Marketing', code: 'MKT', color: 'bg-orange-500', taskCount: 486 }
];

export function getProjects(): Project[] {
  try {
    const stored = localStorage.getItem(PROJECTS_STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
    // Se não há projetos armazenados, inicializar com os padrão
    setProjects(defaultProjects);
    return defaultProjects;
  } catch (error) {
    console.error('Erro ao carregar projetos:', error);
    return defaultProjects;
  }
}

export function setProjects(projects: Project[]): void {
  try {
    localStorage.setItem(PROJECTS_STORAGE_KEY, JSON.stringify(projects));
  } catch (error) {
    console.error('Erro ao salvar projetos:', error);
  }
}

export function addProject(project: Project): void {
  const projects = getProjects();
  const updatedProjects = [...projects, project];
  setProjects(updatedProjects);
}

export function updateProject(updatedProject: Project): void {
  const projects = getProjects();
  const updatedProjects = projects.map(p => 
    p.id === updatedProject.id ? updatedProject : p
  );
  setProjects(updatedProjects);
}

export function deleteProject(projectId: string): void {
  const projects = getProjects();
  const updatedProjects = projects.filter(p => p.id !== projectId);
  setProjects(updatedProjects);
}

export function getProjectById(projectId: string): Project | undefined {
  const projects = getProjects();
  return projects.find(p => p.id === projectId);
}
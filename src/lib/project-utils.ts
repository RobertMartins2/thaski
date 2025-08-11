import { Project } from "@/types/kanban";

// Gera o próximo código de task para um projeto
export function generateTaskCode(project: Project): string {
  const nextNumber = project.taskCount + 1;
  return `${project.code}-${nextNumber}`;
}

// Incrementa o contador de tasks de um projeto
export function incrementTaskCount(project: Project): Project {
  return {
    ...project,
    taskCount: project.taskCount + 1
  };
}

// Projetos mock com siglas configuráveis
export const mockProjects: Project[] = [
  { id: '1', name: 'Projeto Imobiliário', code: 'IMB', color: 'bg-blue-500', taskCount: 488 },
  { id: '2', name: 'Plataforma E-commerce', code: 'ECM', color: 'bg-green-500', taskCount: 487 },
  { id: '3', name: 'Design de App Mobile', code: 'APP', color: 'bg-purple-500', taskCount: 485 },
  { id: '4', name: 'Campanha de Marketing', code: 'MKT', color: 'bg-orange-500', taskCount: 486 },
];

// Função para buscar projeto por ID (delegada para project-storage)
export function getProjectById(projectId: string): Project | undefined {
  // Evitar dependência circular - esta função agora é apenas um wrapper
  // A implementação real está em project-storage.ts
  return mockProjects.find(project => project.id === projectId);
}
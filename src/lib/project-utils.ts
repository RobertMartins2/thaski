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

// Lista vazia - dados reais virão do Supabase
export const mockProjects: Project[] = [];

// Função para buscar projeto por ID (delegada para project-storage)
export function getProjectById(projectId: string): Project | undefined {
  // A implementação real está em project-storage.ts
  // Esta função não deve mais usar dados mockados
  return undefined;
}
import { Project } from "@/types/kanban";
import { getSupabaseProjects, createSupabaseProject, updateSupabaseProject, deleteSupabaseProject, getSupabaseProjectById } from "./supabase-projects";

const PROJECTS_STORAGE_KEY = 'kanban-projects';

// Lista inicial vazia - projetos serão criados pelo usuário
const defaultProjects: Project[] = [];

export async function getProjectsAsync(): Promise<Project[]> {
  return await getSupabaseProjects();
}

export function setProjects(projects: Project[]): void {
  try {
    localStorage.setItem(PROJECTS_STORAGE_KEY, JSON.stringify(projects));
  } catch (error) {
    console.error('Erro ao salvar projetos:', error);
  }
}

export async function addProject(project: Omit<Project, 'id' | 'taskCount'>): Promise<Project | null> {
  return await createSupabaseProject(project);
}

export async function updateProject(updatedProject: Project): Promise<boolean> {
  return await updateSupabaseProject(updatedProject);
}

export async function deleteProject(projectId: string): Promise<boolean> {
  return await deleteSupabaseProject(projectId);
}

export async function getProjectById(projectId: string): Promise<Project | null> {
  return await getSupabaseProjectById(projectId);
}

// Função síncrona mantida para compatibilidade (será removida gradualmente)
export function getProjectByIdSync(projectId: string): Project | undefined {
  return undefined;
}
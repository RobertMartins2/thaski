import { supabase } from "@/integrations/supabase/client";
import { Project, KanbanColumn as KanbanColumnType, Task } from "@/types/kanban";

export interface DatabaseProject {
  id: string;
  name: string;
  code: string;
  color: string;
  task_count: number;
  created_at: string;
  updated_at: string;
  user_id: string;
}

export interface DatabaseKanbanColumn {
  id: string;
  project_id: string;
  title: string;
  color: string;
  order_index: number;
  created_at: string;
  updated_at: string;
}

export interface DatabaseTask {
  id: string;
  project_id: string;
  title: string;
  description: string | null;
  code: string;
  status: string;
  tags: any[];
  custom_fields: any;
  created_at: string;
  updated_at: string;
  user_id: string;
}

// Funções para Projetos
export async function getSupabaseProjects(): Promise<Project[]> {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Erro ao buscar projetos:', error);
    return [];
  }

  return data.map(project => ({
    id: project.id,
    name: project.name,
    code: project.code,
    color: project.color,
    taskCount: project.task_count
  }));
}

export async function getSupabaseProjectById(projectId: string): Promise<Project | null> {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('id', projectId)
    .single();

  if (error) {
    console.error('Erro ao buscar projeto:', error);
    return null;
  }

  return {
    id: data.id,
    name: data.name,
    code: data.code,
    color: data.color,
    taskCount: data.task_count
  };
}

export async function createSupabaseProject(project: Omit<Project, 'id' | 'taskCount'>): Promise<Project | null> {
  const { data: user } = await supabase.auth.getUser();
  
  if (!user.user) {
    console.error('Usuário não autenticado');
    return null;
  }

  const { data, error } = await supabase
    .from('projects')
    .insert([{
      name: project.name,
      code: project.code,
      color: project.color,
      user_id: user.user.id
    }])
    .select()
    .single();

  if (error) {
    console.error('Erro ao criar projeto:', error);
    return null;
  }

  return {
    id: data.id,
    name: data.name,
    code: data.code,
    color: data.color,
    taskCount: data.task_count
  };
}

export async function updateSupabaseProject(project: Project): Promise<boolean> {
  const { error } = await supabase
    .from('projects')
    .update({
      name: project.name,
      code: project.code,
      color: project.color
    })
    .eq('id', project.id);

  if (error) {
    console.error('Erro ao atualizar projeto:', error);
    return false;
  }

  return true;
}

export async function deleteSupabaseProject(projectId: string): Promise<boolean> {
  const { error } = await supabase
    .from('projects')
    .delete()
    .eq('id', projectId);

  if (error) {
    console.error('Erro ao deletar projeto:', error);
    return false;
  }

  return true;
}

// Funções para Colunas do Kanban
export async function getProjectKanbanColumns(projectId: string): Promise<KanbanColumnType[]> {
  const { data, error } = await supabase
    .from('kanban_columns')
    .select('*')
    .eq('project_id', projectId)
    .order('order_index', { ascending: true });

  if (error) {
    console.error('Erro ao buscar colunas:', error);
    return [];
  }

  return data.map(column => ({
    id: column.id,
    title: column.title,
    color: column.color,
    order: column.order_index
  }));
}

export async function updateProjectKanbanColumns(projectId: string, columns: KanbanColumnType[]): Promise<boolean> {
  try {
    // Deletar colunas existentes
    await supabase
      .from('kanban_columns')
      .delete()
      .eq('project_id', projectId);

    // Inserir novas colunas
    const columnsToInsert = columns.map(column => ({
      project_id: projectId,
      title: column.title,
      color: column.color,
      order_index: column.order
    }));

    const { error } = await supabase
      .from('kanban_columns')
      .insert(columnsToInsert);

    if (error) {
      console.error('Erro ao atualizar colunas:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Erro ao atualizar colunas:', error);
    return false;
  }
}

// Funções para Tasks
export async function getProjectTasks(projectId: string): Promise<Task[]> {
  const { data, error } = await supabase
    .from('tasks')
    .select('*')
    .eq('project_id', projectId)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Erro ao buscar tasks:', error);
    return [];
  }

  return data.map(task => ({
    id: task.id,
    title: task.title,
    description: task.description || '',
    code: task.code,
    status: task.status,
    tags: Array.isArray(task.tags) ? task.tags as any[] : [],
    dueDate: (task as any).due_date ? new Date((task as any).due_date) : undefined,
    priority: (task as any).priority || 'medium'
  }));
}

export async function createProjectTask(projectId: string, task: Omit<Task, 'id'>): Promise<Task | null> {
  const { data: user } = await supabase.auth.getUser();
  
  if (!user.user) {
    console.error('Usuário não autenticado');
    return null;
  }

  const { data, error } = await supabase
    .from('tasks')
    .insert({
      project_id: projectId,
      title: task.title,
      description: task.description,
      code: task.code,
      status: task.status,
      tags: task.tags as any,
      due_date: task.dueDate?.toISOString(),
      priority: task.priority,
      user_id: user.user.id
    })
    .select()
    .single();

  if (error) {
    console.error('Erro ao criar task:', error);
    return null;
  }

  return {
    id: data.id,
    title: data.title,
    description: data.description || '',
    code: data.code,
    status: data.status,
    tags: Array.isArray(data.tags) ? data.tags as any[] : [],
    dueDate: (data as any).due_date ? new Date((data as any).due_date) : undefined,
    priority: (data as any).priority || 'medium'
  };
}

export async function updateProjectTask(task: Task): Promise<boolean> {
  const { error } = await supabase
    .from('tasks')
    .update({
      title: task.title,
      description: task.description,
      status: task.status,
      tags: task.tags as any,
      due_date: task.dueDate?.toISOString(),
      priority: task.priority
    })
    .eq('id', task.id);

  if (error) {
    console.error('Erro ao atualizar task:', error);
    return false;
  }

  return true;
}

export async function deleteProjectTask(taskId: string): Promise<boolean> {
  const { error } = await supabase
    .from('tasks')
    .delete()
    .eq('id', taskId);

  if (error) {
    console.error('Erro ao deletar task:', error);
    return false;
  }

  return true;
}

// Função para gerar código de task
export async function generateTaskCodeForProject(projectId: string): Promise<string> {
  const project = await getSupabaseProjectById(projectId);
  if (!project) {
    return `TASK-${Date.now()}`;
  }
  
  const nextNumber = project.taskCount + 1;
  return `${project.code}-${nextNumber}`;
}
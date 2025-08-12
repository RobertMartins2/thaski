export interface Project {
  id: string;
  name: string;
  code: string; // Sigla configurável do projeto (ex: "CFW", "PRJ", etc)
  color: string;
  taskCount: number; // Contador de tasks para numeração sequencial
}

export interface KanbanColumn {
  id: string;
  title: string;
  color: string;
  order: number;
}

export interface CustomField {
  id: string;
  name: string;
  type: 'text' | 'number' | 'select';
  value: string | number | null;
  options?: string[]; // Para campos do tipo select
  visible: boolean; // Se deve aparecer no card ou só na edição
}

export interface Task {
  id: string;
  title: string;
  description: string;
  code: string; // Gerado automaticamente baseado na sigla e contador do projeto
  tags: Array<{
    name: string;
    color: 'design' | 'hiring' | 'dev' | 'performance' | 'mobile' | 'dashboard' | 'guideline' | 'landing' | 'custom';
    customColor?: string; // Para tags customizadas
  }>;
  status: string; // Now dynamic instead of fixed enum
  dueDate?: Date; // Data de conclusão
  priority: 'low' | 'medium' | 'high'; // Prioridade da tarefa
}
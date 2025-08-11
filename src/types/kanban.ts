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
  code: string;
  tags: Array<{
    name: string;
    color: 'design' | 'hiring' | 'dev' | 'performance' | 'mobile' | 'dashboard' | 'guideline' | 'landing';
  }>;
  status: string; // Now dynamic instead of fixed enum
  customFields?: CustomField[];
}
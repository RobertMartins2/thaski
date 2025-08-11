export interface KanbanColumn {
  id: string;
  title: string;
  color: string;
  order: number;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  code: string;
  tags: Array<{
    name: string;
    color: 'design' | 'hiring' | 'dev' | 'performance';
  }>;
  status: string; // Now dynamic instead of fixed enum
}
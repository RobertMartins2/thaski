-- Criar tabela de projetos
CREATE TABLE public.projects (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  code TEXT NOT NULL UNIQUE,
  color TEXT NOT NULL DEFAULT 'bg-blue-500',
  task_count INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE
);

-- Criar tabela de colunas personalizadas do Kanban
CREATE TABLE public.kanban_columns (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  color TEXT NOT NULL,
  order_index INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Criar tabela de tasks
CREATE TABLE public.tasks (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  code TEXT NOT NULL,
  status TEXT NOT NULL,
  tags JSONB DEFAULT '[]'::jsonb,
  custom_fields JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE
);

-- Habilitar RLS
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.kanban_columns ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tasks ENABLE ROW LEVEL SECURITY;

-- Políticas para projetos
CREATE POLICY "Users can view their own projects" 
ON public.projects 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own projects" 
ON public.projects 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own projects" 
ON public.projects 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own projects" 
ON public.projects 
FOR DELETE 
USING (auth.uid() = user_id);

-- Políticas para colunas
CREATE POLICY "Users can view columns of their projects" 
ON public.kanban_columns 
FOR SELECT 
USING (EXISTS (SELECT 1 FROM public.projects WHERE projects.id = kanban_columns.project_id AND projects.user_id = auth.uid()));

CREATE POLICY "Users can create columns for their projects" 
ON public.kanban_columns 
FOR INSERT 
WITH CHECK (EXISTS (SELECT 1 FROM public.projects WHERE projects.id = kanban_columns.project_id AND projects.user_id = auth.uid()));

CREATE POLICY "Users can update columns of their projects" 
ON public.kanban_columns 
FOR UPDATE 
USING (EXISTS (SELECT 1 FROM public.projects WHERE projects.id = kanban_columns.project_id AND projects.user_id = auth.uid()));

CREATE POLICY "Users can delete columns of their projects" 
ON public.kanban_columns 
FOR DELETE 
USING (EXISTS (SELECT 1 FROM public.projects WHERE projects.id = kanban_columns.project_id AND projects.user_id = auth.uid()));

-- Políticas para tasks
CREATE POLICY "Users can view tasks of their projects" 
ON public.tasks 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own tasks" 
ON public.tasks 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own tasks" 
ON public.tasks 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own tasks" 
ON public.tasks 
FOR DELETE 
USING (auth.uid() = user_id);

-- Triggers para atualizar updated_at
CREATE TRIGGER update_projects_updated_at
BEFORE UPDATE ON public.projects
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_kanban_columns_updated_at
BEFORE UPDATE ON public.kanban_columns
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_tasks_updated_at
BEFORE UPDATE ON public.tasks
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Função para atualizar contador de tasks automaticamente
CREATE OR REPLACE FUNCTION public.update_project_task_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE public.projects 
    SET task_count = task_count + 1
    WHERE id = NEW.project_id;
    RETURN NEW;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE public.projects 
    SET task_count = GREATEST(task_count - 1, 0)
    WHERE id = OLD.project_id;
    RETURN OLD;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Trigger para manter contador atualizado
CREATE TRIGGER update_project_task_count_trigger
AFTER INSERT OR DELETE ON public.tasks
FOR EACH ROW
EXECUTE FUNCTION public.update_project_task_count();

-- Inserir colunas padrão para novos projetos
CREATE OR REPLACE FUNCTION public.create_default_columns_for_project()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.kanban_columns (project_id, title, color, order_index) VALUES
    (NEW.id, 'A Fazer', 'bg-slate-400', 0),
    (NEW.id, 'Em Andamento', 'bg-yellow-500', 1),
    (NEW.id, 'Em Revisão', 'bg-blue-500', 2),
    (NEW.id, 'Concluído', 'bg-green-500', 3);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER create_default_columns_trigger
AFTER INSERT ON public.projects
FOR EACH ROW
EXECUTE FUNCTION public.create_default_columns_for_project();
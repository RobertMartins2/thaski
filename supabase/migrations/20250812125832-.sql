-- Adicionar colunas due_date e priority na tabela tasks
ALTER TABLE public.tasks ADD COLUMN due_date TIMESTAMP WITH TIME ZONE;
ALTER TABLE public.tasks ADD COLUMN priority TEXT DEFAULT 'medium' NOT NULL;
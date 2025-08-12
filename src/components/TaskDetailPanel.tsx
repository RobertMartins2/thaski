import { useEffect, useMemo, useState } from "react";
import { Calendar, Clock, Flag, Tag, Columns } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import type { Task } from "@/types/kanban";

interface TaskDetailPanelProps {
  task: Task;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onEditTask?: (task: Task) => void;
  onDeleteTask?: (taskId: string) => void;
  columns?: Array<{ id: string; title: string }>;
}

const priorityLabels: Record<Task["priority"], string> = {
  low: "Baixa",
  medium: "Média",
  high: "Alta",
};

export function TaskDetailPanel({ task, open, onOpenChange, onEditTask, onDeleteTask, columns = [] }: TaskDetailPanelProps) {
  const [localTask, setLocalTask] = useState<Task>(task);
  const [editingTitle, setEditingTitle] = useState(false);
  const [newTag, setNewTag] = useState("");

  useEffect(() => {
    setLocalTask(task);
    setEditingTitle(false);
    setNewTag("");
  }, [task]);

  const createdAtText = useMemo(() => {
    if (!localTask.createdAt) return "—";
    try {
      return format(new Date(localTask.createdAt), "dd/MM/yyyy 'às' HH:mm", { locale: ptBR });
    } catch {
      return "—";
    }
  }, [localTask.createdAt]);

  const saveChanges = () => {
    onEditTask?.(localTask);
  };

  const deleteTask = () => {
    if (!onDeleteTask) return;
    onDeleteTask(localTask.id);
    onOpenChange(false);
  };

  const removeTag = (name: string) => {
    setLocalTask((prev) => ({
      ...prev,
      tags: prev.tags.filter((t) => t.name !== name),
    }));
  };

  const addTag = () => {
    const trimmed = newTag.trim();
    if (!trimmed) return;
    if (localTask.tags.some((t) => t.name.toLowerCase() === trimmed.toLowerCase())) return;
    setLocalTask((prev) => ({
      ...prev,
      tags: [...prev.tags, { name: trimmed, color: "custom" as const }],
    }));
    setNewTag("");
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="w-full sm:w-[600px] lg:w-1/2 lg:max-w-[50vw] bg-background border-border/30 p-0 overflow-hidden"
      >
        <div className="flex flex-col h-full">
          <SheetHeader className="border-b border-border/30 p-6 pb-4">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="text-sm text-muted-foreground font-medium mb-2">{localTask.code}</div>
                {editingTitle ? (
                  <Input
                    autoFocus
                    value={localTask.title}
                    onChange={(e) => setLocalTask({ ...localTask, title: e.target.value })}
                    onKeyDown={(e) => e.key === "Enter" && setEditingTitle(false)}
                    onBlur={() => setEditingTitle(false)}
                    className="h-10 text-lg font-semibold"
                  />
                ) : (
                  <SheetTitle
                    className="text-xl font-semibold text-foreground leading-tight cursor-text"
                    onClick={() => setEditingTitle(true)}
                  >
                    {localTask.title}
                  </SheetTitle>
                )}
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={saveChanges} className="h-9">Salvar</Button>
                <Button variant="destructive" size="sm" onClick={deleteTask} className="h-9">Excluir</Button>
              </div>
            </div>
          </SheetHeader>

          <div className="flex-1 overflow-auto">
            <div className="p-6 space-y-8">
              {/* Campos com ícone à esquerda e conteúdo à direita */}
              <div className="space-y-5">
                {/* Data de Criação - somente leitura */}
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-muted-foreground mt-0.5" />
                  <div className="flex-1">
                    <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Data de Criação</div>
                    <div className="text-sm text-foreground mt-1">{createdAtText}</div>
                  </div>
                </div>

                {/* Status */}
                <div className="flex items-start gap-3">
                  <Columns className="w-5 h-5 text-muted-foreground mt-0.5" />
                  <div className="flex-1">
                    <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Status</div>
                    <div className="mt-1 max-w-xs">
                      <Select
                        value={localTask.status}
                        onValueChange={(value) => setLocalTask({ ...localTask, status: value })}
                      >
                        <SelectTrigger className="h-10">
                          <SelectValue placeholder="Selecione" />
                        </SelectTrigger>
                        <SelectContent className="bg-surface border-border/30">
                          {columns.length > 0 ? (
                            columns.map((c) => (
                              <SelectItem key={c.id} value={c.id}>{c.title}</SelectItem>
                            ))
                          ) : (
                            <>
                              <SelectItem value="todo">A Fazer</SelectItem>
                              <SelectItem value="progress">Em Andamento</SelectItem>
                              <SelectItem value="review">Em Revisão</SelectItem>
                              <SelectItem value="done">Concluído</SelectItem>
                            </>
                          )}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                {/* Prioridade */}
                <div className="flex items-start gap-3">
                  <Flag className="w-5 h-5 text-muted-foreground mt-0.5" />
                  <div className="flex-1">
                    <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Prioridade</div>
                    <div className="mt-1 max-w-xs">
                      <Select
                        value={localTask.priority}
                        onValueChange={(v: Task["priority"]) => setLocalTask({ ...localTask, priority: v })}
                      >
                        <SelectTrigger className="h-10">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-surface border-border/30">
                          <SelectItem value="low">{priorityLabels.low}</SelectItem>
                          <SelectItem value="medium">{priorityLabels.medium}</SelectItem>
                          <SelectItem value="high">{priorityLabels.high}</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                {/* Data de Entrega */}
                <div className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-muted-foreground mt-0.5" />
                  <div className="flex-1">
                    <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Data de Entrega</div>
                    <div className="mt-1 max-w-xs">
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant="outline" className="h-10 w-full justify-start">
                            {localTask.dueDate ? (
                              format(new Date(localTask.dueDate), "dd/MM/yyyy", { locale: ptBR })
                            ) : (
                              <span>Selecionar data</span>
                            )}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0 bg-surface border-border/30" align="start">
                          <CalendarComponent
                            mode="single"
                            selected={localTask.dueDate}
                            onSelect={(d) => setLocalTask({ ...localTask, dueDate: d ?? undefined })}
                            initialFocus
                            className="p-3 pointer-events-auto"
                            locale={ptBR}
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex items-start gap-3">
                  <Tag className="w-5 h-5 text-muted-foreground mt-0.5" />
                  <div className="flex-1">
                    <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Tags</div>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {localTask.tags.map((t, i) => (
                        <Badge
                          key={i}
                          variant="outline"
                          onClick={() => removeTag(t.name)}
                          className="text-xs cursor-pointer"
                          title="Remover"
                        >
                          {t.name}
                        </Badge>
                      ))}
                    </div>
                    <div className="mt-3 flex gap-2 max-w-xs">
                      <Input
                        placeholder="Adicionar tag"
                        value={newTag}
                        onChange={(e) => setNewTag(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
                        className="h-9"
                      />
                      <Button type="button" variant="outline" className="h-9" onClick={addTag}>
                        Adicionar
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Descrição */}
              <div className="pt-4">
                <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">Descrição</div>
                <Textarea
                  value={localTask.description}
                  onChange={(e) => setLocalTask({ ...localTask, description: e.target.value })}
                  placeholder="Descreva a tarefa..."
                  className="min-h-[140px]"
                />
              </div>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

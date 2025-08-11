import { useState } from "react";
import { Edit, X, CalendarIcon } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Task } from "./TaskCard";
import { CustomFieldsManager } from "./CustomFieldsManager";
import { CustomField } from "@/types/kanban";

interface EditTaskDialogProps {
  task: Task;
  onEditTask: (updatedTask: Task) => void;
  onDeleteTask?: (taskId: string) => void;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  columns?: Array<{id: string, title: string}>;
}

const tagOptions = [
  { name: 'Design', color: 'design' as const },
  { name: 'Desenvolvimento', color: 'dev' as const },
  { name: 'Contratação', color: 'hiring' as const },
  { name: 'Performance', color: 'performance' as const },
  { name: 'App Mobile', color: 'mobile' as const },
  { name: 'Dashboard', color: 'dashboard' as const },
  { name: 'Diretrizes', color: 'guideline' as const },
  { name: 'Landing Pages', color: 'landing' as const },
];

const tagColorMap = {
  design: 'tag-design',
  hiring: 'tag-hiring', 
  dev: 'tag-dev',
  performance: 'tag-performance',
  mobile: 'bg-blue-100 text-blue-700',
  dashboard: 'bg-cyan-100 text-cyan-700',
  guideline: 'bg-green-100 text-green-700',
  landing: 'bg-purple-100 text-purple-700'
};

export function EditTaskDialog({ task, onEditTask, onDeleteTask, open, onOpenChange, columns = [] }: EditTaskDialogProps) {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [code, setCode] = useState(task.code);
  const [status, setStatus] = useState(task.status);
  const [selectedTags, setSelectedTags] = useState(task.tags);
  const [dueDate, setDueDate] = useState<Date | undefined>(undefined);
  const [customFields, setCustomFields] = useState<CustomField[]>(task.customFields || []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim() || !description.trim()) return;

    const updatedTask: Task = {
      ...task,
      title: title.trim(),
      description: description.trim(),
      code: code.trim(),
      tags: selectedTags,
      status,
      customFields: customFields.length > 0 ? customFields : undefined,
    };

    onEditTask(updatedTask);
    onOpenChange(false);
  };

  const addTag = (tag: { name: string; color: 'design' | 'hiring' | 'dev' | 'performance' | 'mobile' | 'dashboard' | 'guideline' | 'landing' }) => {
    if (!selectedTags.some(t => t.name === tag.name)) {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const removeTag = (tagName: string) => {
    setSelectedTags(selectedTags.filter(t => t.name !== tagName));
  };

  const handleDelete = () => {
    if (onDeleteTask && confirm("Tem certeza de que deseja excluir esta tarefa? Esta ação não pode ser desfeita.")) {
      onDeleteTask(task.id);
      onOpenChange(false);
    }
  };

  const handleUpdateCustomFields = (fields: CustomField[]) => {
    setCustomFields(fields);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto bg-surface border-border/30">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold text-foreground">Editar Tarefa</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6 mt-6">
          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title" className="text-sm font-semibold text-foreground">Título da Tarefa</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Digite o título da tarefa..."
              className="h-12 text-base"
              required
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description" className="text-sm font-semibold text-foreground">Descrição</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Digite a descrição da tarefa..."
              className="min-h-[100px] text-base resize-none"
              required
            />
          </div>

          {/* Code and Status Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="code" className="text-sm font-semibold text-foreground">Código da Tarefa</Label>
              <Input
                id="code"
                value={code}
                readOnly
                placeholder="ex: CFW-123"
                className="h-12 text-base bg-muted/50 text-muted-foreground font-mono"
              />
              <p className="text-xs text-muted-foreground">
                Código automático não pode ser editado
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="status" className="text-sm font-semibold text-foreground">Status</Label>
              <Select value={status} onValueChange={(value: string) => setStatus(value)}>
                <SelectTrigger className="h-12">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-surface border-border/30 z-50">
                  {columns.length > 0 ? (
                    columns.map((column) => (
                      <SelectItem key={column.id} value={column.id}>
                        {column.title}
                      </SelectItem>
                    ))
                  ) : (
                    <>
                      <SelectItem value="todo">A Fazer</SelectItem>
                      <SelectItem value="progress">Em Andamento</SelectItem>
                      <SelectItem value="done">Concluído</SelectItem>
                      <SelectItem value="overdue">Atrasado</SelectItem>
                    </>
                  )}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Due Date */}
          <div className="space-y-2">
            <Label className="text-sm font-semibold text-foreground">Data de Vencimento</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full h-12 justify-start text-left font-normal",
                    !dueDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {dueDate ? format(dueDate, "PPP") : <span>Selecione uma data</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={dueDate}
                  onSelect={setDueDate}
                  initialFocus
                  className={cn("p-3 pointer-events-auto")}
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Tags */}
          <div className="space-y-3">
            <Label className="text-sm font-semibold text-foreground">Tags</Label>
            
            {/* Tags Selecionadas */}
            {selectedTags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {selectedTags.map((tag, index) => (
                  <Badge
                    key={index}
                    className={`${tagColorMap[tag.color]} text-xs px-3 py-1.5 font-medium rounded-lg cursor-pointer group`}
                    variant="secondary"
                    onClick={() => removeTag(tag.name)}
                  >
                    {tag.name}
                    <X className="w-3 h-3 ml-1.5 group-hover:text-destructive transition-colors" />
                  </Badge>
                ))}
              </div>
            )}
            
            {/* Available Tags */}
            <div className="flex flex-wrap gap-2">
              {tagOptions.filter(tag => !selectedTags.some(t => t.name === tag.name)).map((tag, index) => (
                <Badge
                  key={index}
                  className={`${tagColorMap[tag.color]} text-xs px-3 py-1.5 font-medium rounded-lg cursor-pointer hover:scale-105 transition-transform opacity-60 hover:opacity-100`}
                  variant="secondary"
                  onClick={() => addTag(tag)}
                >
                  + {tag.name}
                </Badge>
              ))}
            </div>
          </div>

          {/* Custom Fields */}
          <CustomFieldsManager
            customFields={customFields}
            onUpdateFields={handleUpdateCustomFields}
          />

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            {onDeleteTask && (
              <Button
                type="button"
                variant="destructive"
              onClick={handleDelete}
              className="h-12 font-semibold"
            >
              Excluir
            </Button>
            )}
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="flex-1 h-12 font-semibold"
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              className="flex-1 h-12 gradient-button"
              disabled={!title.trim() || !description.trim()}
            >
              <Edit className="w-4 h-4 mr-2" />
              Salvar Alterações
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
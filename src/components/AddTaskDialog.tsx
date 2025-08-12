import { useState } from "react";
import { Plus, X, Calendar, ChevronDown } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RichTextEditor } from "@/components/ui/rich-text-editor";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Task } from "@/types/kanban";
import { Project } from "@/types/kanban";
import { generateTaskCode } from "@/lib/project-utils";

interface AddTaskDialogProps {
  onAddTask: (task: Omit<Task, 'id'>) => void;
  defaultStatus?: string;
  trigger?: React.ReactNode;
  columns?: Array<{id: string, title: string}>;
  currentProject?: Project; // Projeto atual para gerar códigos
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

const priorityOptions = [
  { value: 'low', label: 'Baixa', color: 'bg-green-100 text-green-700' },
  { value: 'medium', label: 'Média', color: 'bg-yellow-100 text-yellow-700' },
  { value: 'high', label: 'Alta', color: 'bg-red-100 text-red-700' },
];

export function AddTaskDialog({ onAddTask, defaultStatus = 'todo', trigger, columns = [], currentProject }: AddTaskDialogProps) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [code, setCode] = useState('');
  const [status, setStatus] = useState<string>(defaultStatus);
  const [selectedTags, setSelectedTags] = useState<Array<{ name: string; color: 'design' | 'hiring' | 'dev' | 'performance' | 'mobile' | 'dashboard' | 'guideline' | 'landing' | 'custom'; customColor?: string }>>([]);
  const [dueDate, setDueDate] = useState<Date | undefined>(undefined);
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('medium');
  const [customTagName, setCustomTagName] = useState('');
  const [customTagColor, setCustomTagColor] = useState('#3B82F6');

  // Gerar código automaticamente quando o diálogo abre
  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
    if (isOpen && currentProject && !code) {
      setCode(generateTaskCode(currentProject));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim() || !description.trim()) return;

    const newTask: Omit<Task, 'id'> = {
      title: title.trim(),
      description: description.trim(),
      code: code.trim() || (currentProject ? generateTaskCode(currentProject) : `TASK-${Date.now()}`),
      tags: selectedTags,
      status,
      dueDate,
      priority,
    };

    onAddTask(newTask);
    
    // Reset form
    setTitle('');
    setDescription('');
    setCode('');
    setStatus(defaultStatus);
    setSelectedTags([]);
    setDueDate(undefined);
    setPriority('medium');
    setCustomTagName('');
    setCustomTagColor('#3B82F6');
    setOpen(false);
  };

  const addTag = (tag: { name: string; color: 'design' | 'hiring' | 'dev' | 'performance' | 'mobile' | 'dashboard' | 'guideline' | 'landing' | 'custom'; customColor?: string }) => {
    if (!selectedTags.some(t => t.name === tag.name)) {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const removeTag = (tagName: string) => {
    setSelectedTags(selectedTags.filter(t => t.name !== tagName));
  };

  const createCustomTag = () => {
    if (!customTagName.trim()) return;
    
    const newTag = {
      name: customTagName.trim(),
      color: 'custom' as const,
      customColor: customTagColor
    };
    
    if (!selectedTags.some(t => t.name === newTag.name)) {
      setSelectedTags([...selectedTags, newTag]);
      setCustomTagName('');
      setCustomTagColor('#3B82F6');
    }
  };

  const defaultTrigger = (
    <Button className="gradient-button h-12">
      <Plus className="w-5 h-5 mr-2" />
      Nova Tarefa
    </Button>
  );

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        {trigger || defaultTrigger}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto bg-surface border-border/30">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold text-foreground">Criar Nova Tarefa</DialogTitle>
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
            <RichTextEditor
              content={description}
              onChange={setDescription}
              placeholder="Digite a descrição da tarefa..."
              className="min-h-[120px]"
            />
          </div>

          {/* Status and Priority Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="status" className="text-sm font-semibold text-foreground">Status da Tarefa</Label>
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
                    </>
                  )}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-semibold text-foreground">Prioridade</Label>
              <Select value={priority} onValueChange={(value: 'low' | 'medium' | 'high') => setPriority(value)}>
                <SelectTrigger className="h-12">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-surface border-border/30 z-50">
                  {priorityOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      <div className="flex items-center gap-2">
                        <div className={`w-3 h-3 rounded-full ${option.color.split(' ')[0]}`} />
                        {option.label}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Due Date */}
          <div className="space-y-2">
            <Label className="text-sm font-semibold text-foreground">Data de Conclusão</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="h-12 w-full justify-start text-left font-normal"
                >
                  <Calendar className="mr-2 h-4 w-4" />
                  {dueDate ? format(dueDate, "dd/MM/yyyy", { locale: ptBR }) : "Selecionar data"}
                  <ChevronDown className="ml-auto h-4 w-4 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 bg-surface border-border/30 z-50" align="start">
                <CalendarComponent
                  mode="single"
                  selected={dueDate}
                  onSelect={setDueDate}
                  initialFocus
                  className="p-3 pointer-events-auto"
                  locale={ptBR}
                  disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Tags */}
          <div className="space-y-3">
            <Label className="text-sm font-semibold text-foreground">Tags da Tarefa</Label>
            
            {/* Selected Tags */}
            {selectedTags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {selectedTags.map((tag, index) => (
                  <Badge
                    key={index}
                    className={`text-xs px-3 py-1.5 font-medium rounded-lg cursor-pointer group ${
                      tag.color === 'custom' 
                        ? 'text-white' 
                        : tagColorMap[tag.color as keyof typeof tagColorMap]
                    }`}
                    style={tag.color === 'custom' ? { backgroundColor: tag.customColor } : {}}
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
            <div className="flex flex-wrap gap-2 mb-3">
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

            {/* Create Custom Tag */}
            <div className="border border-border/30 rounded-lg p-4 bg-muted/20">
              <Label className="text-sm font-medium text-foreground mb-3 block">Criar Tag Personalizada</Label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-2">
                  <Input
                    value={customTagName}
                    onChange={(e) => setCustomTagName(e.target.value)}
                    placeholder="Nome da tag..."
                    className="h-10"
                    onKeyPress={(e) => e.key === 'Enter' && createCustomTag()}
                  />
                </div>
                <div className="flex gap-2">
                  <input
                    type="color"
                    value={customTagColor}
                    onChange={(e) => setCustomTagColor(e.target.value)}
                    className="w-10 h-10 rounded border border-border/30 cursor-pointer"
                  />
                  <Button
                    type="button"
                    onClick={createCustomTag}
                    disabled={!customTagName.trim()}
                    className="flex-1 h-10"
                    variant="outline"
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              className="flex-1 h-12 font-semibold"
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              className="flex-1 h-12 gradient-button"
              disabled={!title.trim() || !description.trim()}
            >
              <Plus className="w-4 h-4 mr-2" />
              Criar Tarefa
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
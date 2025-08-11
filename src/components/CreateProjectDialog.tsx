import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import { Project } from "@/types/kanban";
import { addProject } from "@/lib/project-storage";

interface CreateProjectDialogProps {
  onProjectCreated?: (project: Project) => void;
}

const PROJECT_COLORS = [
  { value: 'bg-blue-500', label: 'Azul' },
  { value: 'bg-green-500', label: 'Verde' },
  { value: 'bg-purple-500', label: 'Roxo' },
  { value: 'bg-orange-500', label: 'Laranja' },
  { value: 'bg-red-500', label: 'Vermelho' },
  { value: 'bg-yellow-500', label: 'Amarelo' },
  { value: 'bg-pink-500', label: 'Rosa' },
  { value: 'bg-indigo-500', label: 'Índigo' }
];

export function CreateProjectDialog({ onProjectCreated }: CreateProjectDialogProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    code: '',
    color: 'bg-blue-500'
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim() || !formData.code.trim()) {
      toast.error('Nome e código são obrigatórios');
      return;
    }

    if (formData.code.length > 6) {
      toast.error('Código deve ter no máximo 6 caracteres');
      return;
    }

    setLoading(true);
    try {
      const newProject = await addProject({
        name: formData.name.trim(),
        code: formData.code.trim().toUpperCase(),
        color: formData.color
      });

      if (newProject) {
        toast.success(`Projeto "${newProject.name}" criado com sucesso!`);
        onProjectCreated?.(newProject);
        setOpen(false);
        setFormData({ name: '', code: '', color: 'bg-blue-500' });
      } else {
        toast.error('Erro ao criar projeto');
      }
    } catch (error: any) {
      console.error('Erro ao criar projeto:', error);
      toast.error(error.message || 'Erro ao criar projeto');
    } finally {
      setLoading(false);
    }
  };

  const generateCodeFromName = (name: string) => {
    const words = name.trim().split(' ');
    let code = '';
    
    if (words.length === 1) {
      code = words[0].substring(0, 3).toUpperCase();
    } else if (words.length === 2) {
      code = (words[0].substring(0, 2) + words[1].substring(0, 1)).toUpperCase();
    } else {
      code = words.slice(0, 3).map(word => word.charAt(0)).join('').toUpperCase();
    }
    
    return code;
  };

  const handleNameChange = (name: string) => {
    setFormData(prev => ({
      ...prev,
      name,
      // Auto-generate code if it's empty or was auto-generated
      code: !prev.code || prev.code === generateCodeFromName(prev.name) 
        ? generateCodeFromName(name)
        : prev.code
    }));
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Novo Projeto
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Criar Novo Projeto</DialogTitle>
          <DialogDescription>
            Adicione um novo projeto ao seu workspace. O código será usado para gerar IDs das tarefas.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nome do Projeto</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => handleNameChange(e.target.value)}
              placeholder="ex: Projeto Imobiliário"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="code">Código do Projeto</Label>
            <Input
              id="code"
              value={formData.code}
              onChange={(e) => setFormData(prev => ({ ...prev, code: e.target.value.toUpperCase() }))}
              placeholder="ex: IMB"
              maxLength={6}
              className="uppercase"
              required
            />
            <p className="text-xs text-muted-foreground">
              Usado para gerar códigos de tarefas (ex: {formData.code || 'IMB'}-001)
            </p>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="color">Cor do Projeto</Label>
            <Select value={formData.color} onValueChange={(value) => setFormData(prev => ({ ...prev, color: value }))}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {PROJECT_COLORS.map(color => (
                  <SelectItem key={color.value} value={color.value}>
                    <div className="flex items-center gap-2">
                      <div className={`w-4 h-4 rounded-full ${color.value}`} />
                      {color.label}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancelar
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? 'Criando...' : 'Criar Projeto'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
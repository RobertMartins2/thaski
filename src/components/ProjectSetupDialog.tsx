import { useState } from "react";
import { Settings, Plus, Trash2, GripVertical, Edit2, FolderOpen, ArrowRight } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { KanbanColumn } from "@/types/kanban";
import { useNavigate } from "react-router-dom";

interface ProjectSetupDialogProps {
  projectId: string;
  projectName: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const colorOptions = [
  { name: 'Cinza', value: 'bg-slate-400', class: 'bg-slate-400' },
  { name: 'Azul', value: 'bg-blue-500', class: 'bg-blue-500' },
  { name: 'Verde', value: 'bg-green-500', class: 'bg-green-500' },
  { name: 'Amarelo', value: 'bg-yellow-500', class: 'bg-yellow-500' },
  { name: 'Vermelho', value: 'bg-red-500', class: 'bg-red-500' },
  { name: 'Roxo', value: 'bg-purple-500', class: 'bg-purple-500' },
  { name: 'Rosa', value: 'bg-pink-500', class: 'bg-pink-500' },
  { name: 'Índigo', value: 'bg-indigo-500', class: 'bg-indigo-500' },
];

export function ProjectSetupDialog({ projectId, projectName, open, onOpenChange }: ProjectSetupDialogProps) {
  const navigate = useNavigate();
  
  // Colunas padrão iniciais
  const [columns, setColumns] = useState<KanbanColumn[]>([
    { id: 'todo', title: 'A Fazer', color: 'bg-slate-400', order: 0 },
    { id: 'progress', title: 'Em Andamento', color: 'bg-yellow-500', order: 1 },
    { id: 'review', title: 'Em Revisão', color: 'bg-blue-500', order: 2 },
    { id: 'done', title: 'Concluído', color: 'bg-green-500', order: 3 }
  ]);
  
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingTitle, setEditingTitle] = useState('');

  const handleAddColumn = () => {
    const newColumn: KanbanColumn = {
      id: `column-${Date.now()}`,
      title: 'Novo Estágio',
      color: 'bg-slate-400',
      order: columns.length,
    };
    setColumns([...columns, newColumn]);
    setEditingId(newColumn.id);
    setEditingTitle(newColumn.title);
  };

  const handleDeleteColumn = (columnId: string) => {
    const updatedColumns = columns
      .filter(col => col.id !== columnId)
      .map((col, index) => ({ ...col, order: index }));
    setColumns(updatedColumns);
  };

  const handleEditTitle = (columnId: string, currentTitle: string) => {
    setEditingId(columnId);
    setEditingTitle(currentTitle);
  };

  const handleSaveTitle = (columnId: string) => {
    if (editingTitle.trim()) {
      setColumns(columns.map(col =>
        col.id === columnId ? { ...col, title: editingTitle.trim() } : col
      ));
    }
    setEditingId(null);
    setEditingTitle('');
  };

  const handleChangeColor = (columnId: string, color: string) => {
    setColumns(columns.map(col =>
      col.id === columnId ? { ...col, color } : col
    ));
  };

  const handleFinishSetup = () => {
    // Salvar as configurações das colunas (por enquanto apenas local)
    // TODO: Em uma implementação completa, isso seria salvo no backend
    localStorage.setItem(`project-${projectId}-columns`, JSON.stringify(columns));
    
    onOpenChange(false);
    navigate(`/project/${projectId}`);
  };

  const handleSkipSetup = () => {
    // Usar colunas padrão
    localStorage.setItem(`project-${projectId}-columns`, JSON.stringify(columns));
    onOpenChange(false);
    navigate(`/project/${projectId}`);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto bg-surface border-border/30">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold text-foreground flex items-center gap-3">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Settings className="w-5 h-5 text-primary" />
            </div>
            Configurar Estágios do Projeto
          </DialogTitle>
          <p className="text-muted-foreground mt-2">
            Configure os estágios do quadro Kanban para <strong>{projectName}</strong>. 
            Você pode personalizar os nomes e cores de cada estágio conforme sua metodologia de trabalho.
          </p>
        </DialogHeader>
        
        <div className="space-y-6 mt-6">
          {/* Preview dos estágios */}
          <div className="bg-muted/20 rounded-xl p-4">
            <Label className="text-sm font-medium text-foreground mb-3 block">Preview dos Estágios</Label>
            <div className="flex gap-3 overflow-x-auto pb-2">
              {columns.map((column) => (
                <div key={column.id} className="flex-shrink-0 bg-background rounded-lg p-3 border border-border/40 min-w-[120px]">
                  <div className="flex items-center gap-2 mb-2">
                    <div className={`w-3 h-3 rounded-full ${column.color}`} />
                    <span className="text-sm font-medium text-foreground truncate">{column.title}</span>
                  </div>
                  <div className="text-xs text-muted-foreground">0 tarefas</div>
                </div>
              ))}
            </div>
          </div>

          {/* Lista de colunas editáveis */}
          <div className="space-y-4">
            <Label className="text-sm font-medium text-foreground">Configurar Estágios</Label>
            {columns.map((column, index) => (
              <div
                key={column.id}
                className="flex items-center gap-4 p-4 bg-muted/20 rounded-xl border border-border/30 group hover:bg-muted/30 transition-colors"
              >
                {/* Drag Handle */}
                <div className="cursor-grab text-muted-foreground hover:text-foreground transition-colors">
                  <GripVertical className="w-5 h-5" />
                </div>

                {/* Order Number */}
                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                  <span className="text-sm font-medium text-primary">{index + 1}</span>
                </div>

                {/* Color Indicator */}
                <div className={`w-4 h-4 rounded-full ${column.color}`} />

                {/* Title */}
                <div className="flex-1">
                  {editingId === column.id ? (
                    <div className="flex gap-2">
                      <Input
                        value={editingTitle}
                        onChange={(e) => setEditingTitle(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') handleSaveTitle(column.id);
                          if (e.key === 'Escape') {
                            setEditingId(null);
                            setEditingTitle('');
                          }
                        }}
                        className="h-8 text-sm"
                        placeholder="Nome do estágio..."
                        autoFocus
                      />
                      <Button
                        size="sm"
                        onClick={() => handleSaveTitle(column.id)}
                        className="h-8 px-3"
                      >
                        Salvar
                      </Button>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 group">
                      <span className="font-medium text-foreground">{column.title}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEditTitle(column.id, column.title)}
                        className="h-6 w-6 p-0 opacity-60 group-hover:opacity-100 hover:bg-muted transition-opacity"
                        title="Editar nome do estágio"
                      >
                        <Edit2 className="w-3 h-3" />
                      </Button>
                    </div>
                  )}
                </div>

                {/* Color Picker */}
                <div className="flex gap-1">
                  {colorOptions.map((colorOption) => (
                    <button
                      key={colorOption.value}
                      onClick={() => handleChangeColor(column.id, colorOption.value)}
                      className={`w-6 h-6 rounded-full ${colorOption.class} border-2 transition-transform hover:scale-110 ${
                        column.color === colorOption.value ? 'border-foreground' : 'border-transparent'
                      }`}
                      title={colorOption.name}
                    />
                  ))}
                </div>

                {/* Delete Button */}
                {columns.length > 1 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDeleteColumn(column.id)}
                    className="h-8 w-8 p-0 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                    title="Excluir estágio"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                )}
              </div>
            ))}
          </div>

          {/* Add New Column */}
          <Button
            variant="outline"
            onClick={handleAddColumn}
            className="w-full border-dashed border-2 border-border/60 hover:border-border hover:bg-muted/30 transition-all py-6"
          >
            <Plus className="w-5 h-5 mr-2" />
            Adicionar Novo Estágio
          </Button>

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <Button
              variant="outline"
              onClick={handleSkipSetup}
              className="flex-1 h-12 font-semibold"
            >
              Usar Padrão
            </Button>
            <Button
              onClick={handleFinishSetup}
              className="flex-1 h-12 gradient-button"
            >
              <FolderOpen className="w-4 h-4 mr-2" />
              Criar e Abrir Projeto
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
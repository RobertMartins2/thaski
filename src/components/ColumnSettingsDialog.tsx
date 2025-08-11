import { useState } from "react";
import { Settings, Plus, Trash2, GripVertical, Edit2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { KanbanColumn } from "@/types/kanban";

interface ColumnSettingsDialogProps {
  columns: KanbanColumn[];
  onUpdateColumns: (columns: KanbanColumn[]) => void;
}

const colorOptions = [
  { name: 'Gray', value: 'bg-slate-400', class: 'bg-slate-400' },
  { name: 'Blue', value: 'bg-blue-500', class: 'bg-blue-500' },
  { name: 'Green', value: 'bg-green-500', class: 'bg-green-500' },
  { name: 'Yellow', value: 'bg-yellow-500', class: 'bg-yellow-500' },
  { name: 'Red', value: 'bg-red-500', class: 'bg-red-500' },
  { name: 'Purple', value: 'bg-purple-500', class: 'bg-purple-500' },
  { name: 'Pink', value: 'bg-pink-500', class: 'bg-pink-500' },
  { name: 'Indigo', value: 'bg-indigo-500', class: 'bg-indigo-500' },
];

export function ColumnSettingsDialog({ columns, onUpdateColumns }: ColumnSettingsDialogProps) {
  const [open, setOpen] = useState(false);
  const [localColumns, setLocalColumns] = useState<KanbanColumn[]>(columns);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingTitle, setEditingTitle] = useState('');

  const handleAddColumn = () => {
    const newColumn: KanbanColumn = {
      id: `column-${Date.now()}`,
      title: 'New Stage',
      color: 'bg-slate-400',
      order: localColumns.length,
    };
    setLocalColumns([...localColumns, newColumn]);
    setEditingId(newColumn.id);
    setEditingTitle(newColumn.title);
  };

  const handleDeleteColumn = (columnId: string) => {
    const updatedColumns = localColumns
      .filter(col => col.id !== columnId)
      .map((col, index) => ({ ...col, order: index }));
    setLocalColumns(updatedColumns);
  };

  const handleEditTitle = (columnId: string, currentTitle: string) => {
    setEditingId(columnId);
    setEditingTitle(currentTitle);
  };

  const handleSaveTitle = (columnId: string) => {
    if (editingTitle.trim()) {
      setLocalColumns(localColumns.map(col =>
        col.id === columnId ? { ...col, title: editingTitle.trim() } : col
      ));
    }
    setEditingId(null);
    setEditingTitle('');
  };

  const handleChangeColor = (columnId: string, color: string) => {
    setLocalColumns(localColumns.map(col =>
      col.id === columnId ? { ...col, color } : col
    ));
  };

  const handleSave = () => {
    onUpdateColumns(localColumns);
    setOpen(false);
  };

  const handleCancel = () => {
    setLocalColumns(columns);
    setEditingId(null);
    setEditingTitle('');
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button 
          variant="outline" 
          size="sm" 
          className="h-9 w-9 p-0 rounded-xl hover:bg-muted/50 transition-colors"
        >
          <Settings className="w-4 h-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[700px] bg-surface border-border/30">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold text-foreground">Configure Board Columns</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 mt-6">
          {/* Columns List */}
          <div className="space-y-4">
            {localColumns.map((column, index) => (
              <div
                key={column.id}
                className="flex items-center gap-4 p-4 bg-muted/20 rounded-xl border border-border/30"
              >
                {/* Drag Handle */}
                <div className="cursor-grab text-muted-foreground hover:text-foreground transition-colors">
                  <GripVertical className="w-5 h-5" />
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
                        autoFocus
                      />
                      <Button
                        size="sm"
                        onClick={() => handleSaveTitle(column.id)}
                        className="h-8 px-3"
                      >
                        Save
                      </Button>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-foreground">{column.title}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEditTitle(column.id, column.title)}
                        className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 hover:bg-muted"
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
                {localColumns.length > 1 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDeleteColumn(column.id)}
                    className="h-8 w-8 p-0 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
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
            Add New Stage
          </Button>

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <Button
              variant="outline"
              onClick={handleCancel}
              className="flex-1 h-12 font-semibold"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              className="flex-1 h-12 gradient-button"
            >
              Save Changes
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
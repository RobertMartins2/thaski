import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TaskCard, Task } from "./TaskCard";

interface KanbanColumnProps {
  title: string;
  tasks: Task[];
  status: 'todo' | 'progress' | 'done';
}

const statusStyles = {
  todo: 'status-todo',
  progress: 'status-progress',
  done: 'status-done'
};

const statusColors = {
  todo: 'bg-status-todo',
  progress: 'bg-status-progress', 
  done: 'bg-status-done'
};

export function KanbanColumn({ title, tasks, status }: KanbanColumnProps) {
  return (
    <div className={`kanban-column ${statusStyles[status]}`}>
      {/* Column header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className={`w-3 h-3 rounded-full ${statusColors[status]}`} />
          <h2 className="font-semibold text-foreground">
            {title}
          </h2>
          <span className="text-xs bg-muted text-muted-foreground px-2 py-0.5 rounded-full">
            {tasks.length}
          </span>
        </div>
      </div>
      
      {/* Tasks list */}
      <div className="space-y-3 mb-4">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
      
      {/* Add new task button */}
      <Button 
        variant="ghost" 
        className="w-full justify-start text-muted-foreground hover:text-foreground border-2 border-dashed border-border hover:border-muted-foreground/50"
      >
        <Plus className="w-4 h-4 mr-2" />
        Add new
      </Button>
    </div>
  );
}
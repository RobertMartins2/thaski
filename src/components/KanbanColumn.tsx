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
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className={`w-2 h-2 rounded-full ${statusColors[status]}`} />
          <h2 className="font-semibold text-foreground text-lg">
            {title}
          </h2>
          <span className="text-xs bg-muted text-muted-foreground px-3 py-1 rounded-full font-medium">
            {tasks.length}
          </span>
        </div>
      </div>
      
      {/* Tasks list */}
      <div className="space-y-4 mb-6">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
      
      {/* Add new task button */}
      <Button 
        variant="ghost" 
        className="w-full justify-start text-muted-foreground hover:text-foreground border-2 border-dashed border-border hover:border-muted-foreground/50 rounded-xl py-6 font-medium"
      >
        <Plus className="w-5 h-5 mr-3" />
        Add new task
      </Button>
    </div>
  );
}
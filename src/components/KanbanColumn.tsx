import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TaskCard, Task } from "./TaskCard";
import { AddTaskDialog } from "./AddTaskDialog";

interface KanbanColumnProps {
  title: string;
  tasks: Task[];
  status: 'todo' | 'progress' | 'done';
  onAddTask: (task: Omit<Task, 'id'>) => void;
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

export function KanbanColumn({ title, tasks, status, onAddTask }: KanbanColumnProps) {
  return (
    <div className={`kanban-column status-${status}`}>
      {/* Column header */}
      <div className="column-header">
        <div className={`status-indicator`} />
        <h2 className="column-title">
          {title}
        </h2>
        <span className="task-count">
          {tasks.length}
        </span>
      </div>
      
      {/* Tasks list */}
      <div className="space-y-5 mb-8">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
      
      {/* Add new task button */}
      <AddTaskDialog 
        onAddTask={onAddTask}
        defaultStatus={status}
        trigger={
          <Button 
            variant="ghost" 
            className="add-task-button"
          >
            <Plus className="w-5 h-5 mr-3 text-muted-foreground" />
            <span>Add new task</span>
          </Button>
        }
      />
    </div>
  );
}
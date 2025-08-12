import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TaskCard } from "./TaskCard";
import { Task } from "@/types/kanban";
import { AddTaskDialog } from "./AddTaskDialog";
import { KanbanColumn as KanbanColumnType } from "@/types/kanban";

interface KanbanColumnProps {
  column: KanbanColumnType;
  tasks: Task[];
  onAddTask: (task: Omit<Task, 'id'>) => void;
}

export function KanbanColumn({ column, tasks, onAddTask }: KanbanColumnProps) {
  return (
    <div className="kanban-column">
      {/* Column header */}
      <div className="column-header">
        <div className={`w-3 h-3 rounded-full flex-shrink-0 ${column.color}`} />
        <h2 className="column-title">
          {column.title}
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
        defaultStatus={column.id}
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
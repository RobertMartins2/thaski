import { useDroppable } from "@dnd-kit/core";
import { Plus } from "lucide-react";
import { KanbanColumn as KanbanColumnType, Project } from "@/types/kanban";
import { Task } from "@/types/kanban";
import { DraggableTask } from "./DraggableTask";
import { AddTaskDialog } from "./AddTaskDialog";

interface DroppableColumnProps {
  column: KanbanColumnType;
  tasks: Task[];
  onAddTask: (task: Omit<Task, 'id'>) => void;
  onTaskClick?: (task: Task) => void;
  columns?: Array<{id: string, title: string}>;
  currentProject?: Project; // Projeto atual para gerar códigos
}

export function DroppableColumn({ column, tasks, onAddTask, onTaskClick, columns, currentProject }: DroppableColumnProps) {
  const { isOver, setNodeRef } = useDroppable({
    id: column.id,
  });

  const style = {
    backgroundColor: isOver ? 'rgba(0, 0, 0, 0.1)' : undefined,
  };

  return (
    <div 
      ref={setNodeRef}
      style={style}
      className="kanban-column transition-colors"
    >
      <div className="column-header">
        <div className={`status-indicator ${column.color}`} />
        <span className="column-title">{column.title}</span>
        <span className="task-count ml-auto">
          {tasks.length}
        </span>
      </div>
      
      <div className="space-y-4">
        {tasks.map((task) => (
          <DraggableTask 
            key={task.id} 
            task={task} 
            onClick={onTaskClick}
          />
        ))}
        
        {/* Add Task Button */}
        <AddTaskDialog 
          onAddTask={onAddTask}
          defaultStatus={column.id}
          columns={columns}
          currentProject={currentProject}
          trigger={
            <button className="w-full flex items-center justify-center gap-2 py-2 px-3 text-sm text-muted-foreground hover:text-foreground hover:bg-accent rounded-lg border-2 border-dashed border-border hover:border-primary/50 transition-all">
              <Plus className="w-4 h-4" />
              <span>Adicionar</span>
            </button>
          }
        />
      </div>
    </div>
  );
}
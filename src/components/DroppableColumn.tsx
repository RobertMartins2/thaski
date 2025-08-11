import { useDroppable } from "@dnd-kit/core";
import { Plus } from "lucide-react";
import { KanbanColumn as KanbanColumnType } from "@/types/kanban";
import { Task } from "./TaskCard";
import { DraggableTask } from "./DraggableTask";
import { AddTaskDialog } from "./AddTaskDialog";

interface DroppableColumnProps {
  column: KanbanColumnType;
  tasks: Task[];
  onAddTask: (task: Omit<Task, 'id'>) => void;
  onTaskClick?: (task: Task) => void;
  columns?: Array<{id: string, title: string}>;
}

export function DroppableColumn({ column, tasks, onAddTask, onTaskClick, columns }: DroppableColumnProps) {
  const { isOver, setNodeRef } = useDroppable({
    id: column.id,
  });

  const style = {
    backgroundColor: isOver ? 'rgba(0, 0, 0, 0.05)' : undefined,
  };

  return (
    <div 
      ref={setNodeRef}
      style={style}
      className="kanban-column transition-colors"
    >
      <div className="column-header">
        <div className={`status-indicator ${column.id === 'todo' ? 'bg-slate-400' : column.id === 'progress' ? 'bg-amber-400' : column.id === 'done' ? 'bg-green-500' : 'bg-red-500'}`} />
        <span className="column-title">{column.title}</span>
        <span className="task-count ml-auto">
          {tasks.length}
        </span>
      </div>
      
      <div className="space-y-4">
        {tasks.map((task) => (
          <DraggableTask key={task.id} task={task} onClick={onTaskClick} />
        ))}
        
        {/* Add Task Button */}
        <AddTaskDialog 
          onAddTask={onAddTask}
          defaultStatus={column.id}
          columns={columns || [{ id: column.id, title: column.title }]}
          trigger={
            <button className="add-task-button">
              <Plus className="w-4 h-4 mr-2" />
              Add new task
            </button>
          }
        />
      </div>
    </div>
  );
}
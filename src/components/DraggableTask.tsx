import { useDraggable } from "@dnd-kit/core";
import { TaskCard } from "./TaskCard";
import { Task } from "@/types/kanban";

interface DraggableTaskProps {
  task: Task;
  onClick?: (task: Task) => void;
}

export function DraggableTask({ task, onClick }: DraggableTaskProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    isDragging,
  } = useDraggable({
    id: task.id,
  });

  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
  } : undefined;

  const handleClick = (task: Task) => {
    if (onClick) {
      onClick(task);
    }
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={isDragging ? 'opacity-50' : ''}
      {...listeners}
      {...attributes}
    >
      <TaskCard task={task} onClick={handleClick} />
    </div>
  );
}
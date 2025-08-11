import { useDraggable } from "@dnd-kit/core";
import { TaskCard, Task } from "./TaskCard";

interface DraggableTaskProps {
  task: Task;
}

export function DraggableTask({ task }: DraggableTaskProps) {
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

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={isDragging ? 'opacity-50' : ''}
      {...listeners}
      {...attributes}
    >
      <TaskCard task={task} />
    </div>
  );
}
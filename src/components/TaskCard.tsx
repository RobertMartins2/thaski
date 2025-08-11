import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

export interface Task {
  id: string;
  title: string;
  description: string;
  code: string;
  tags: Array<{
    name: string;
    color: 'design' | 'hiring' | 'dev' | 'performance';
  }>;
  status: 'todo' | 'progress' | 'done';
}

interface TaskCardProps {
  task: Task;
}

const tagColorMap = {
  design: 'tag-design',
  hiring: 'tag-hiring', 
  dev: 'tag-dev',
  performance: 'tag-performance'
};

export function TaskCard({ task }: TaskCardProps) {
  return (
    <Card className="task-card group">
      <CardContent className="p-4 space-y-3">
        {/* Task code */}
        <div className="text-xs font-mono text-muted-foreground">
          {task.code}
        </div>
        
        {/* Task title */}
        <h3 className="font-semibold text-foreground text-sm leading-tight">
          {task.title}
        </h3>
        
        {/* Task description */}
        <p className="text-xs text-muted-foreground leading-relaxed">
          {task.description}
        </p>
        
        {/* Tags */}
        <div className="flex flex-wrap gap-1.5">
          {task.tags.map((tag, index) => (
            <Badge
              key={index}
              className={`${tagColorMap[tag.color]} text-xs px-2 py-0.5 font-medium`}
              variant="secondary"
            >
              {tag.name}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
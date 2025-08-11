import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

export interface Task {
  id: string;
  title: string;
  description: string;
  code: string;
  tags: Array<{
    name: string;
    color: 'design' | 'hiring' | 'dev' | 'performance' | 'mobile' | 'dashboard' | 'guideline' | 'landing';
  }>;
  status: string;
}

interface TaskCardProps {
  task: Task;
}

const tagColorMap = {
  design: 'tag-design',
  hiring: 'tag-hiring', 
  dev: 'tag-dev',
  performance: 'tag-performance',
  mobile: 'bg-blue-100 text-blue-700',
  dashboard: 'bg-cyan-100 text-cyan-700',
  guideline: 'bg-green-100 text-green-700',
  landing: 'bg-purple-100 text-purple-700'
};

export function TaskCard({ task }: TaskCardProps) {
  return (
    <Card className="task-card group cursor-pointer">
      <CardContent className="p-6 space-y-5">
        {/* Task code */}
        <div className="text-xs font-semibold text-muted-foreground/80 uppercase tracking-wide">
          {task.code}
        </div>
        
        {/* Task title */}
        <h3 className="font-semibold text-foreground text-base leading-tight -mt-1">
          {task.title}
        </h3>
        
        {/* Task description */}
        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
          {task.description}
        </p>
        
        {/* Tags */}
        <div className="flex flex-wrap gap-2 pt-1">
          {task.tags.map((tag, index) => (
            <Badge
              key={index}
              className={`${tagColorMap[tag.color]} text-xs px-3 py-1.5 font-medium rounded-lg`}
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
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
  customFields?: Array<{
    id: string;
    name: string;
    type: 'text' | 'number' | 'select';
    value: string | number | null;
    options?: string[];
    visible: boolean;
  }>;
}

interface TaskCardProps {
  task: Task;
  onClick?: (task: Task) => void;
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

export function TaskCard({ task, onClick }: TaskCardProps) {
  return (
    <Card 
      className="group cursor-pointer" 
      onClick={() => onClick?.(task)}
      style={{
        borderRadius: '10px',
        border: '4px solid #F6F9FC',
        background: '#FFF',
        boxShadow: '0 4px 20px 0 rgba(229, 237, 247, 0.30)'
      }}
    >
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
        
        {/* Custom Fields (only visible ones) */}
        {task.customFields && task.customFields.filter(field => field.visible && field.value !== null && field.value !== '').length > 0 && (
          <div className="space-y-2 pt-2 border-t border-border/20">
            {task.customFields
              .filter(field => field.visible && field.value !== null && field.value !== '')
              .map((field) => (
                <div key={field.id} className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground font-medium">{field.name}:</span>
                  <span className="text-foreground font-medium">
                    {field.type === 'number' ? Number(field.value) : String(field.value)}
                  </span>
                </div>
              ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
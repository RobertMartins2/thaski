import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Task } from "@/types/kanban";

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
  landing: 'bg-purple-100 text-purple-700',
  custom: 'text-white'
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
              className={`text-xs px-3 py-1.5 font-medium rounded-lg ${
                tag.color === 'custom' ? 'text-white' : tagColorMap[tag.color]
              }`}
              style={tag.color === 'custom' ? { backgroundColor: tag.customColor } : {}}
              variant="secondary"
            >
              {tag.name}
            </Badge>
          ))}
        </div>

        {/* Priority and Due Date */}
        {(task.priority !== 'medium' || task.dueDate) && (
          <div className="flex items-center gap-2 pt-1 border-t border-border/20">
            {task.priority !== 'medium' && (
              <Badge 
                className={`text-xs px-2 py-1 font-medium ${
                  task.priority === 'high' 
                    ? 'bg-red-100 text-red-700' 
                    : 'bg-green-100 text-green-700'
                }`}
                variant="secondary"
              >
                {task.priority === 'high' ? 'Alta' : 'Baixa'}
              </Badge>
            )}
            {task.dueDate && (
              <Badge className="text-xs px-2 py-1 font-medium bg-blue-100 text-blue-700" variant="secondary">
                {new Date(task.dueDate).toLocaleDateString('pt-BR')}
              </Badge>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
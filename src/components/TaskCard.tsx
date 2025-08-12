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
      <CardContent className="p-6 space-y-4">
        {/* 1° Código da Task */}
        <div className="text-xs font-semibold text-muted-foreground/80 uppercase tracking-wide">
          {task.code}
        </div>
        
        {/* 2° Tags */}
        <div className="flex flex-wrap gap-2">
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
        
        {/* 3° Título da Task */}
        <h3 className="font-semibold text-foreground text-base leading-tight">
          {task.title}
        </h3>
        
        {/* 4° Descrição da Task */}
        <div 
          className="text-sm text-muted-foreground leading-relaxed prose prose-sm max-w-none"
          style={{ 
            display: '-webkit-box', 
            WebkitLineClamp: task.description.length > 350 ? 6 : 'unset',
            WebkitBoxOrient: 'vertical',
            overflow: task.description.length > 350 ? 'hidden' : 'visible'
          }}
          dangerouslySetInnerHTML={{ 
            __html: task.description.length > 350 ? `${task.description.substring(0, 350)}...` : task.description 
          }}
        />
        
        {/* 5° Linha cinza dividindo */}
        <div className="border-t border-gray-200"></div>

        {/* 6° Prioridade e Data */}
        <div className="flex items-center justify-between">
          {/* Prioridade */}
          <Badge 
            className={`text-xs px-3 py-1.5 font-medium rounded-lg ${
              task.priority === 'high' 
                ? 'bg-red-100 text-red-700' 
                : task.priority === 'low' 
                  ? 'bg-green-100 text-green-700'
                  : 'bg-yellow-100 text-yellow-700'
            }`}
            variant="secondary"
          >
            {task.priority === 'high' ? 'Alta' : task.priority === 'low' ? 'Baixa' : 'Média'}
          </Badge>
          
          {/* Data de conclusão */}
          {task.dueDate && (
            <Badge 
              className="text-xs px-3 py-1.5 font-medium bg-white border border-gray-300 text-gray-700 rounded-lg"
              variant="outline"
            >
              {new Date(task.dueDate).toLocaleDateString('pt-BR')}
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
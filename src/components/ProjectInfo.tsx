import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Plus } from "lucide-react";

interface ProjectInfoProps {
  priority?: string;
  deadline?: string;
  assignees?: Array<{ name: string; avatar?: string; initials: string }>;
  tags?: Array<{ name: string; color: string }>;
}

export function ProjectInfo({ 
  priority = "Normal", 
  deadline = "Tue, 4 April 2023",
  assignees = [
    { name: "Momon", initials: "M" },
    { name: "Faza Dskruljah", initials: "FD" },
    { name: "Nala Sofyan", initials: "NS" },
    { name: "Vito Arey", initials: "VA" }
  ],
  tags = [
    { name: "Landing Pages", color: "bg-purple-100 text-purple-700" },
    { name: "Mobile App", color: "bg-blue-100 text-blue-700" },
    { name: "Dashboard", color: "bg-cyan-100 text-cyan-700" },
    { name: "Guideline", color: "bg-green-100 text-green-700" }
  ]
}: ProjectInfoProps) {
  return (
    <div className="bg-surface/80 backdrop-blur-sm rounded-3xl border border-border/40 p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Priority */}
        <div>
          <label className="text-sm font-semibold text-muted-foreground mb-3 block tracking-tight">Priority</label>
          <div className="flex items-center gap-3">
            <div className="status-indicator bg-slate-400"></div>
            <span className="text-sm font-medium text-foreground">{priority}</span>
          </div>
        </div>

        {/* Deadline */}
        <div>
          <label className="text-sm font-semibold text-muted-foreground mb-3 block tracking-tight">Deadline</label>
          <span className="text-sm font-medium text-foreground">{deadline}</span>
        </div>

        {/* Assignees */}
        <div>
          <label className="text-sm font-semibold text-muted-foreground mb-3 block tracking-tight">Assignees</label>
          <div className="flex items-center gap-2">
            {assignees.map((assignee, index) => (
              <Avatar key={index} className="w-8 h-8 ring-2 ring-surface shadow-sm">
                <AvatarFallback className="text-xs font-semibold bg-primary text-primary-foreground">
                  {assignee.initials}
                </AvatarFallback>
              </Avatar>
            ))}
            <button className="w-8 h-8 rounded-full bg-muted/50 ring-2 ring-surface flex items-center justify-center hover:bg-muted transition-colors backdrop-blur-sm">
              <Plus className="w-3 h-3 text-muted-foreground" />
            </button>
          </div>
        </div>

        {/* Tags */}
        <div>
          <label className="text-sm font-semibold text-muted-foreground mb-3 block tracking-tight">Tags</label>
          <div className="flex flex-wrap items-center gap-2">
            {tags.map((tag, index) => (
              <Badge 
                key={index} 
                variant="secondary" 
                className={`px-3 py-1 text-xs font-medium rounded-full border
                  ${tag.name === 'Landing Pages' ? 'tag-hiring' : ''}
                  ${tag.name === 'Mobile App' ? 'tag-dev' : ''}
                  ${tag.name === 'Dashboard' ? 'tag-performance' : ''}
                  ${tag.name === 'Guideline' ? 'tag-design' : ''}
                `}
              >
                {tag.name}
              </Badge>
            ))}
            <button className="w-7 h-7 rounded-full bg-muted/50 flex items-center justify-center hover:bg-muted transition-colors backdrop-blur-sm">
              <Plus className="w-3 h-3 text-muted-foreground" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
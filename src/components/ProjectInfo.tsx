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
    <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Priority */}
        <div>
          <label className="text-sm font-medium text-gray-700 mb-2 block">Priority</label>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-gray-400"></div>
            <span className="text-sm text-gray-900">{priority}</span>
          </div>
        </div>

        {/* Deadline */}
        <div>
          <label className="text-sm font-medium text-gray-700 mb-2 block">Deadline</label>
          <span className="text-sm text-gray-900">{deadline}</span>
        </div>

        {/* Assignees */}
        <div>
          <label className="text-sm font-medium text-gray-700 mb-2 block">Assignees</label>
          <div className="flex items-center gap-1">
            {assignees.map((assignee, index) => (
              <Avatar key={index} className="w-7 h-7 border-2 border-white">
                <AvatarFallback className="text-xs font-medium bg-blue-500 text-white">
                  {assignee.initials}
                </AvatarFallback>
              </Avatar>
            ))}
            <button className="w-7 h-7 rounded-full bg-gray-100 border-2 border-white flex items-center justify-center hover:bg-gray-200 transition-colors">
              <Plus className="w-3 h-3 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Tags */}
        <div>
          <label className="text-sm font-medium text-gray-700 mb-2 block">Tags</label>
          <div className="flex flex-wrap items-center gap-2">
            {tags.map((tag, index) => (
              <Badge key={index} variant="secondary" className={`px-3 py-1 text-xs font-medium rounded-full ${tag.color}`}>
                {tag.name}
              </Badge>
            ))}
            <button className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors">
              <Plus className="w-3 h-3 text-gray-600" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
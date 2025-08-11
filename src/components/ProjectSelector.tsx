import { useState } from "react";
import { ChevronDown, Plus, FolderOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Project } from "@/types/kanban";

interface ProjectSelectorProps {
  currentProject: Project;
  projects: Project[];
  onProjectChange: (project: Project) => void;
  onNewProject: () => void;
}

export function ProjectSelector({ 
  currentProject, 
  projects, 
  onProjectChange, 
  onNewProject 
}: ProjectSelectorProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          className="flex items-center gap-2 text-white hover:bg-white/10 border border-white/20 backdrop-blur-sm"
        >
          <FolderOpen className="w-4 h-4" />
          <span className="font-medium">{currentProject.name}</span>
          <ChevronDown className="w-4 h-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="start" 
        className="w-64 bg-popover border-border backdrop-blur-lg z-[100] shadow-xl"
        sideOffset={8}
      >
        <DropdownMenuLabel className="text-foreground">
          Selecionar Projeto
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        
        {projects.map((project) => (
          <DropdownMenuItem
            key={project.id}
            onClick={() => onProjectChange(project)}
            className={`cursor-pointer ${
              project.id === currentProject.id 
                ? 'bg-primary/10 text-primary font-medium' 
                : 'hover:bg-muted/50'
            }`}
          >
            <div className="flex flex-col">
              <span className="font-medium">{project.name}</span>
              <span className="text-xs text-muted-foreground">
                {project.code} • {project.taskCount} tarefas
              </span>
            </div>
          </DropdownMenuItem>
        ))}
        
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={onNewProject} className="cursor-pointer hover:bg-muted/50">
          <Plus className="w-4 h-4 mr-2" />
          <span>Novo Projeto</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
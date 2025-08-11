
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { TaskBoard } from "@/components/TaskBoard";
import { ProjectHeader } from "@/components/ProjectHeader";
import { ProjectInfo } from "@/components/ProjectInfo";
import { Menu } from "lucide-react";

const Index = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen w-full flex bg-background">
        <AppSidebar />
        
        <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
          {/* Project Header */}
          <div className="flex-shrink-0">
            <ProjectHeader projectName="Real Estate Project" />
          </div>
          
          {/* Project Information */}
          <div className="flex-shrink-0 px-6 py-6 border-b border-border/20">
            <ProjectInfo />
          </div>
          
          {/* Task Board Content */}
          <div className="flex-1 overflow-auto px-6 py-6">
            <TaskBoard />
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Index;

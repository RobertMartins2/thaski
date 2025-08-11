
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { TaskBoard } from "@/components/TaskBoard";
import { ProjectHeader } from "@/components/ProjectHeader";
import { ProjectInfo } from "@/components/ProjectInfo";
import { Menu } from "lucide-react";

const Index = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen w-full flex">
        <AppSidebar />
        
        <div className="flex-1 flex flex-col min-w-0 bg-background">
          {/* Project Header with AI Generated Background */}
          <ProjectHeader projectName="Real Estate Project" />
          
          {/* Project Information */}
          <div className="px-6 py-4 border-b border-border/40">
            <ProjectInfo />
          </div>
          
          {/* Task Board Content */}
          <main className="flex-1 overflow-auto p-6">
            <TaskBoard />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Index;

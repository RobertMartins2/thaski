
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { TaskBoard } from "@/components/TaskBoard";
import { ProjectHeader } from "@/components/ProjectHeader";
import { Menu } from "lucide-react";

const Index = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        
        <main className="flex-1 overflow-auto bg-gray-50">
          {/* Project Header with AI Generated Background */}
          <ProjectHeader projectName="Real Estate Project" />
          
          {/* Navigation Header */}
          <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">
            <div className="flex items-center gap-4">
              <SidebarTrigger className="lg:hidden hover:bg-gray-100 rounded-lg p-2 transition-colors">
                <Menu className="h-5 w-5" />
              </SidebarTrigger>
              
              <div>
                <h2 className="text-xl font-semibold text-gray-900">Dashboard</h2>
                <p className="text-sm text-gray-600">Gerencie suas tarefas e projetos</p>
              </div>
            </div>
          </header>
          
          {/* Task Board Content */}
          <div className="p-6">
            <TaskBoard />
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Index;

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { TaskBoard } from "@/components/TaskBoard";
import { Menu } from "lucide-react";

const Index = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        
        <div className="flex-1 flex flex-col">
          {/* Header with sidebar trigger */}
          <header className="h-16 bg-surface border-b border-border flex items-center px-4 lg:px-6">
            <SidebarTrigger className="lg:hidden">
              <Menu className="h-5 w-5" />
            </SidebarTrigger>
            
            <div className="ml-4 lg:ml-0">
              <h2 className="text-lg font-semibold text-foreground">Dashboard</h2>
              <p className="text-sm text-muted-foreground">Welcome back, let's get productive!</p>
            </div>
          </header>
          
          {/* Main content */}
          <main className="flex-1">
            <TaskBoard />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Index;

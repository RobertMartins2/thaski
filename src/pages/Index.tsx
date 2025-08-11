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
          <header className="h-20 bg-surface border-b border-border flex items-center px-6 lg:px-8">
            <SidebarTrigger className="lg:hidden">
              <Menu className="h-6 w-6" />
            </SidebarTrigger>
            
            <div className="ml-4 lg:ml-0">
              <h2 className="text-xl font-semibold text-foreground">Dashboard</h2>
              <p className="text-muted-foreground font-medium">Welcome back, let's get productive!</p>
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

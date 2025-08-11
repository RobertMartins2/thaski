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
          <header className="h-24 bg-surface/60 backdrop-blur-sm border-b border-border/30 flex items-center px-8 lg:px-12">
            <SidebarTrigger className="lg:hidden mr-4 hover:bg-muted/50 rounded-xl p-2 transition-colors">
              <Menu className="h-5 w-5" />
            </SidebarTrigger>
            
            <div className="flex items-center justify-between w-full">
              <div>
                <h2 className="text-2xl font-bold text-foreground tracking-tight">Dashboard</h2>
                <p className="text-muted-foreground font-medium mt-1">Welcome back, let's get productive!</p>
              </div>
              
              <div className="flex items-center gap-4">
                {/* Optional quick actions could go here */}
              </div>
            </div>
          </header>
          
          {/* Main content */}
          <main className="flex-1 overflow-auto">
            <TaskBoard />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Index;

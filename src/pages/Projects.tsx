import { useState, useEffect } from "react";
import { Plus, FolderOpen, Settings, Trash2, Edit2, Kanban } from "lucide-react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { NavLink } from "react-router-dom";

interface Project {
  id: string;
  name: string;
  description: string;
  taskCount: number;
  createdAt: string;
  color: string;
}

const Projects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [newProjectName, setNewProjectName] = useState('');
  const [newProjectDescription, setNewProjectDescription] = useState('');
  const [newProjectColor, setNewProjectColor] = useState('bg-blue-500');

  // Load sample projects on mount
  useEffect(() => {
    const sampleProjects: Project[] = [
      {
        id: '1',
        name: 'Real Estate Project',
        description: 'Main project workspace for real estate management',
        taskCount: 12,
        createdAt: '2024-01-15',
        color: 'bg-blue-500'
      },
      {
        id: '2', 
        name: 'E-commerce Platform',
        description: 'Online store development and maintenance',
        taskCount: 8,
        createdAt: '2024-01-20',
        color: 'bg-green-500'
      },
      {
        id: '3',
        name: 'Mobile App Design',
        description: 'iOS and Android application design',
        taskCount: 15,
        createdAt: '2024-02-01',
        color: 'bg-purple-500'
      }
    ];
    setProjects(sampleProjects);
  }, []);

  const colorOptions = [
    { name: 'Blue', value: 'bg-blue-500' },
    { name: 'Green', value: 'bg-green-500' },
    { name: 'Purple', value: 'bg-purple-500' },
    { name: 'Red', value: 'bg-red-500' },
    { name: 'Orange', value: 'bg-orange-500' },
    { name: 'Pink', value: 'bg-pink-500' },
    { name: 'Indigo', value: 'bg-indigo-500' },
    { name: 'Teal', value: 'bg-teal-500' },
  ];

  const handleCreateProject = () => {
    if (!newProjectName.trim()) {
      toast.error("Project name is required");
      return;
    }

    const newProject: Project = {
      id: `project-${Date.now()}`,
      name: newProjectName.trim(),
      description: newProjectDescription.trim(),
      taskCount: 0,
      createdAt: new Date().toISOString().split('T')[0],
      color: newProjectColor
    };

    setProjects([...projects, newProject]);
    setNewProjectName('');
    setNewProjectDescription('');
    setNewProjectColor('bg-blue-500');
    setIsCreateDialogOpen(false);
    toast.success(`Project "${newProject.name}" created successfully!`);
  };

  const handleDeleteProject = (projectId: string, projectName: string) => {
    if (confirm(`Are you sure you want to delete "${projectName}"? This action cannot be undone.`)) {
      setProjects(projects.filter(p => p.id !== projectId));
      toast.success(`Project "${projectName}" deleted successfully`);
    }
  };

  const EmptyState = () => (
    <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
      <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mb-6">
        <Kanban className="w-10 h-10 text-muted-foreground" />
      </div>
      <h2 className="text-2xl font-bold text-foreground mb-2">No Projects Yet</h2>
      <p className="text-muted-foreground mb-6 max-w-md">
        Create your first Kanban project to start organizing your tasks and workflows efficiently.
      </p>
      <Button onClick={() => setIsCreateDialogOpen(true)} size="lg" className="gradient-button">
        <Plus className="w-5 h-5 mr-2" />
        Create First Project
      </Button>
    </div>
  );

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        
        <main className="flex-1">
          <div className="p-8">
            <div className="max-w-7xl mx-auto">
              {/* Header */}
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h1 className="text-3xl font-bold text-foreground">Projects</h1>
                  <p className="text-muted-foreground mt-1">
                    Manage your Kanban boards and project workflows
                  </p>
                </div>
                
                {projects.length > 0 && (
                  <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
                    <DialogTrigger asChild>
                      <Button className="gradient-button">
                        <Plus className="w-4 h-4 mr-2" />
                        New Project
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[500px]">
                      <DialogHeader>
                        <DialogTitle>Create New Project</DialogTitle>
                        <DialogDescription>
                          Set up a new Kanban board for your project
                        </DialogDescription>
                      </DialogHeader>
                      
                      <div className="space-y-4 py-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Project Name</Label>
                          <Input
                            id="name"
                            value={newProjectName}
                            onChange={(e) => setNewProjectName(e.target.value)}
                            placeholder="Enter project name..."
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="description">Description</Label>
                          <Textarea
                            id="description"
                            value={newProjectDescription}
                            onChange={(e) => setNewProjectDescription(e.target.value)}
                            placeholder="Brief description of your project..."
                            className="resize-none"
                            rows={3}
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label>Project Color</Label>
                          <div className="flex flex-wrap gap-2">
                            {colorOptions.map((color) => (
                              <button
                                key={color.value}
                                onClick={() => setNewProjectColor(color.value)}
                                className={`w-8 h-8 rounded-full ${color.value} border-2 transition-transform hover:scale-110 ${
                                  newProjectColor === color.value ? 'border-foreground scale-110' : 'border-transparent'
                                }`}
                                title={color.name}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                      
                      <DialogFooter>
                        <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                          Cancel
                        </Button>
                        <Button onClick={handleCreateProject} disabled={!newProjectName.trim()}>
                          Create Project
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                )}
              </div>

              {/* Content */}
              {projects.length === 0 ? (
                <EmptyState />
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {projects.map((project) => (
                    <Card key={project.id} className="group hover:shadow-lg transition-all duration-300 border-border/40">
                      <CardHeader className="pb-4">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-3">
                            <div className={`w-4 h-4 rounded-full ${project.color}`} />
                            <CardTitle className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                              {project.name}
                            </CardTitle>
                          </div>
                          <div className="opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="h-8 w-8 p-0"
                              onClick={() => toast.info("Edit functionality coming soon!")}
                            >
                              <Edit2 className="w-4 h-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                              onClick={() => handleDeleteProject(project.id, project.name)}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                        <CardDescription className="text-muted-foreground">
                          {project.description || "No description provided"}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <div className="flex items-center justify-between mb-4">
                          <Badge variant="secondary" className="text-xs">
                            {project.taskCount} tasks
                          </Badge>
                          <span className="text-xs text-muted-foreground">
                            Created {new Date(project.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                        
                        <NavLink to={`/project/${project.id}`}>
                          <Button className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                            <FolderOpen className="w-4 h-4 mr-2" />
                            Open Project
                          </Button>
                        </NavLink>
                      </CardContent>
                    </Card>
                  ))}
                  
                  {/* Add new project card */}
                  <Card 
                    className="border-dashed border-2 border-border/60 hover:border-border cursor-pointer transition-all duration-300 flex items-center justify-center min-h-[240px] group hover:bg-muted/30"
                    onClick={() => setIsCreateDialogOpen(true)}
                  >
                    <div className="text-center">
                      <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-muted/80 transition-colors">
                        <Plus className="w-6 h-6 text-muted-foreground" />
                      </div>
                      <p className="text-muted-foreground font-medium">Add New Project</p>
                    </div>
                  </Card>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>

      {/* Create Project Dialog (for empty state) */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Create New Project</DialogTitle>
            <DialogDescription>
              Set up a new Kanban board for your project
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Project Name</Label>
              <Input
                id="name"
                value={newProjectName}
                onChange={(e) => setNewProjectName(e.target.value)}
                placeholder="Enter project name..."
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={newProjectDescription}
                onChange={(e) => setNewProjectDescription(e.target.value)}
                placeholder="Brief description of your project..."
                className="resize-none"
                rows={3}
              />
            </div>
            
            <div className="space-y-2">
              <Label>Project Color</Label>
              <div className="flex flex-wrap gap-2">
                {colorOptions.map((color) => (
                  <button
                    key={color.value}
                    onClick={() => setNewProjectColor(color.value)}
                    className={`w-8 h-8 rounded-full ${color.value} border-2 transition-transform hover:scale-110 ${
                      newProjectColor === color.value ? 'border-foreground scale-110' : 'border-transparent'
                    }`}
                    title={color.name}
                  />
                ))}
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreateProject} disabled={!newProjectName.trim()}>
              Create Project
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </SidebarProvider>
  );
};

export default Projects;
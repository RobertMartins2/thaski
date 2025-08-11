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
import { ProjectSetupDialog } from "@/components/ProjectSetupDialog";

interface Project {
  id: string;
  name: string;
  code: string; // Sigla de 3 letras configurável do projeto
  description: string;
  taskCount: number;
  createdAt: string;
  color: string;
}

const Projects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [setupProjectId, setSetupProjectId] = useState<string | null>(null);
  const [setupProjectName, setSetupProjectName] = useState<string>('');
  const [newProjectName, setNewProjectName] = useState('');
  const [newProjectCode, setNewProjectCode] = useState('');
  const [newProjectDescription, setNewProjectDescription] = useState('');
  const [newProjectColor, setNewProjectColor] = useState('bg-blue-500');

  // Load sample projects on mount
  useEffect(() => {
    const sampleProjects: Project[] = [
      {
        id: '1',
        name: 'Projeto Imobiliário',
        code: 'IMB',
        description: 'Workspace principal para gestão imobiliária',
        taskCount: 12,
        createdAt: '2024-01-15',
        color: 'bg-blue-500'
      },
      {
        id: '2', 
        name: 'Plataforma E-commerce',
        code: 'ECM',
        description: 'Desenvolvimento e manutenção de loja online',
        taskCount: 8,
        createdAt: '2024-01-20',
        color: 'bg-green-500'
      },
      {
        id: '3',
        name: 'Design de App Mobile',
        code: 'APP',
        description: 'Design de aplicação iOS e Android',
        taskCount: 15,
        createdAt: '2024-02-01',
        color: 'bg-purple-500'
      }
    ];
    setProjects(sampleProjects);
  }, []);

  const colorOptions = [
    { name: 'Azul', value: 'bg-blue-500' },
    { name: 'Verde', value: 'bg-green-500' },
    { name: 'Roxo', value: 'bg-purple-500' },
    { name: 'Vermelho', value: 'bg-red-500' },
    { name: 'Laranja', value: 'bg-orange-500' },
    { name: 'Rosa', value: 'bg-pink-500' },
    { name: 'Índigo', value: 'bg-indigo-500' },
    { name: 'Verde-azulado', value: 'bg-teal-500' },
  ];

  const handleCreateProject = () => {
    if (!newProjectName.trim()) {
      toast.error("Nome do projeto é obrigatório");
      return;
    }
    
    if (!newProjectCode.trim()) {
      toast.error("Código do projeto é obrigatório");
      return;
    }

    const codeRegex = /^[A-Z]{3}$/;
    if (!codeRegex.test(newProjectCode.trim())) {
      toast.error("Código deve ter exatamente 3 letras maiúsculas");
      return;
    }

    // Verificar se o código já existe
    if (projects.some(p => p.code === newProjectCode.trim().toUpperCase())) {
      toast.error("Este código já está sendo usado por outro projeto");
      return;
    }

    const newProject: Project = {
      id: `project-${Date.now()}`,
      name: newProjectName.trim(),
      code: newProjectCode.trim().toUpperCase(),
      description: newProjectDescription.trim(),
      taskCount: 0,
      createdAt: new Date().toISOString().split('T')[0],
      color: newProjectColor
    };

    setProjects([...projects, newProject]);
    setNewProjectName('');
    setNewProjectCode('');
    setNewProjectDescription('');
    setNewProjectColor('bg-blue-500');
    setIsCreateDialogOpen(false);
    
    // Abrir o dialog de configuração dos estágios
    setSetupProjectId(newProject.id);
    setSetupProjectName(newProject.name);
    
    toast.success(`Projeto "${newProject.name}" criado! Configure os estágios do kanban.`);
  };

  const handleDeleteProject = (projectId: string, projectName: string) => {
    if (confirm(`Tem certeza de que deseja excluir "${projectName}"? Esta ação não pode ser desfeita.`)) {
      setProjects(projects.filter(p => p.id !== projectId));
      toast.success(`Projeto "${projectName}" excluído com sucesso`);
    }
  };

  const EmptyState = () => (
    <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
      <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mb-6">
        <Kanban className="w-10 h-10 text-muted-foreground" />
      </div>
      <h2 className="text-2xl font-bold text-foreground mb-2">Nenhum Projeto Ainda</h2>
      <p className="text-muted-foreground mb-6 max-w-md">
        Crie seu primeiro projeto Kanban para começar a organizar suas tarefas e fluxos de trabalho de forma eficiente.
      </p>
      <Button onClick={() => setIsCreateDialogOpen(true)} size="lg" className="gradient-button">
        <Plus className="w-5 h-5 mr-2" />
        Criar Primeiro Projeto
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
                  <h1 className="text-3xl font-bold text-foreground">Projetos</h1>
                  <p className="text-muted-foreground mt-1">
                    Gerencie seus quadros Kanban e fluxos de trabalho dos projetos
                  </p>
                </div>
                
                {projects.length > 0 && (
                  <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
                    <DialogTrigger asChild>
                      <Button className="gradient-button">
                        <Plus className="w-4 h-4 mr-2" />
                        Novo Projeto
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[500px]">
                      <DialogHeader>
                        <DialogTitle>Criar Novo Projeto</DialogTitle>
                        <DialogDescription>
                          Configure um novo quadro Kanban para seu projeto
                        </DialogDescription>
                      </DialogHeader>
                      
                      <div className="space-y-4 py-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Nome do Projeto</Label>
                          <Input
                            id="name"
                            value={newProjectName}
                            onChange={(e) => setNewProjectName(e.target.value)}
                            placeholder="Digite o nome do projeto..."
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="code">Código do Projeto</Label>
                          <Input
                            id="code"
                            value={newProjectCode}
                            onChange={(e) => setNewProjectCode(e.target.value.toUpperCase())}
                            placeholder="ex: PKI"
                            maxLength={3}
                            className="font-mono text-center"
                          />
                          <p className="text-xs text-muted-foreground">
                            Código de 3 letras maiúsculas para identificar as tarefas (ex: PKI-1, PKI-2)
                          </p>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="description">Descrição</Label>
                          <Textarea
                            id="description"
                            value={newProjectDescription}
                            onChange={(e) => setNewProjectDescription(e.target.value)}
                            placeholder="Breve descrição do seu projeto..."
                            className="resize-none"
                            rows={3}
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label>Cor do Projeto</Label>
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
                          Cancelar
                        </Button>
                        <Button onClick={handleCreateProject} disabled={!newProjectName.trim() || !newProjectCode.trim()}>
                          Criar Projeto
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
                              onClick={() => toast.info("Funcionalidade de edição em breve!")}
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
                          {project.description || "Nenhuma descrição fornecida"}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <div className="flex items-center justify-between mb-4">
                          <Badge variant="secondary" className="text-xs">
                            {project.taskCount} tarefas
                          </Badge>
                          <span className="text-xs text-muted-foreground">
                            Criado em {new Date(project.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                        
                         <div className="grid grid-cols-1 gap-2">
                           <NavLink to={`/project/${project.id}`}>
                             <Button className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                               <FolderOpen className="w-4 h-4 mr-2" />
                               Abrir Projeto
                             </Button>
                           </NavLink>
                           <Button 
                             variant="outline"
                             className="w-full hover:bg-muted/50"
                             onClick={() => {
                               setSetupProjectId(project.id);
                               setSetupProjectName(project.name);
                             }}
                           >
                             <Settings className="w-4 h-4 mr-2" />
                             Reconfigurar Estágios
                           </Button>
                         </div>
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
                      <p className="text-muted-foreground font-medium">Adicionar Novo Projeto</p>
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
            <DialogTitle>Criar Novo Projeto</DialogTitle>
            <DialogDescription>
              Configure um novo quadro Kanban para seu projeto
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nome do Projeto</Label>
              <Input
                id="name"
                value={newProjectName}
                onChange={(e) => setNewProjectName(e.target.value)}
                placeholder="Digite o nome do projeto..."
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="code">Código do Projeto</Label>
              <Input
                id="code"
                value={newProjectCode}
                onChange={(e) => setNewProjectCode(e.target.value.toUpperCase())}
                placeholder="ex: PKI"
                maxLength={3}
                className="font-mono text-center"
              />
              <p className="text-xs text-muted-foreground">
                Código de 3 letras maiúsculas para identificar as tarefas (ex: PKI-1, PKI-2)
              </p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Descrição</Label>
              <Textarea
                id="description"
                value={newProjectDescription}
                onChange={(e) => setNewProjectDescription(e.target.value)}
                placeholder="Breve descrição do seu projeto..."
                className="resize-none"
                rows={3}
              />
            </div>
            
            <div className="space-y-2">
              <Label>Cor do Projeto</Label>
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
              Cancelar
            </Button>
            <Button onClick={handleCreateProject} disabled={!newProjectName.trim() || !newProjectCode.trim()}>
              Criar Projeto
            </Button>
          </DialogFooter>
        </DialogContent>
        </Dialog>

        {/* Project Setup Dialog */}
        {setupProjectId && (
          <ProjectSetupDialog
            projectId={setupProjectId}
            projectName={setupProjectName}
            open={!!setupProjectId}
            onOpenChange={(open) => {
              if (!open) {
                setSetupProjectId(null);
                setSetupProjectName('');
              }
            }}
          />
        )}
      </SidebarProvider>
    );
  };

export default Projects;
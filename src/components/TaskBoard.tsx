import { useState, useEffect } from "react";
import { Plus, Calendar, Grid3X3, Search, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { KanbanColumn } from "./KanbanColumn";
import { Task } from "@/types/kanban";
import { AddTaskDialog } from "./AddTaskDialog";
import { ColumnSettingsDialog } from "./ColumnSettingsDialog";
import { KanbanColumn as KanbanColumnType, Project } from "@/types/kanban";
import { DndContext, DragEndEvent, DragOverlay, DragStartEvent, closestCorners } from "@dnd-kit/core";
import { useSensors, useSensor, PointerSensor } from "@dnd-kit/core";
import { TaskCard } from "./TaskCard";
import { DroppableColumn } from "./DroppableColumn";
import { getProjectById } from "@/lib/project-storage";
import { getProjectTasks, getProjectKanbanColumns, createProjectTask, updateProjectTask, deleteProjectTask } from "@/lib/supabase-projects";

// Tasks iniciais vazias - dados reais virão do Supabase
const initialTasks: Task[] = [];

interface TaskBoardProps {
  projectId?: string; // ID do projeto atual
}

export function TaskBoard({ projectId }: TaskBoardProps) {
  const [currentProject, setCurrentProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  // Colunas padrão
  const defaultColumns: KanbanColumnType[] = [
    { id: 'todo', title: 'A Fazer', color: 'bg-slate-400', order: 0 },
    { id: 'progress', title: 'Em Andamento', color: 'bg-yellow-500', order: 1 },
    { id: 'review', title: 'Em Revisão', color: 'bg-blue-500', order: 2 },
    { id: 'done', title: 'Concluído', color: 'bg-green-500', order: 3 }
  ];

  const [viewMode, setViewMode] = useState<'board' | 'calendar'>('board');
  const [searchQuery, setSearchQuery] = useState('');
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [columns, setColumns] = useState<KanbanColumnType[]>(defaultColumns);
  const [activeTask, setActiveTask] = useState<Task | null>(null);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  // Carregar dados do projeto
  useEffect(() => {
    if (projectId) {
      loadProjectData();
    }
  }, [projectId]);

  const loadProjectData = async () => {
    if (!projectId) return;
    
    setLoading(true);
    try {
      // Carregar projeto
      const project = await getProjectById(projectId);
      setCurrentProject(project);

      // Carregar colunas do projeto
      const projectColumns = await getProjectKanbanColumns(projectId);
      if (projectColumns.length > 0) {
        setColumns(projectColumns);
      }

      // Carregar tasks do projeto
      const projectTasks = await getProjectTasks(projectId);
      setTasks(projectTasks);
      
    } catch (error) {
      console.error('Erro ao carregar dados do projeto:', error);
    } finally {
      setLoading(false);
    }
  };

  // Carregar colunas customizadas do localStorage como fallback
  useEffect(() => {
    try {
      const savedColumns = localStorage.getItem(`project-${projectId}-columns`);
      if (savedColumns) {
        const parsedColumns = JSON.parse(savedColumns);
        setColumns(parsedColumns);
      }
    } catch (error) {
      console.warn('Erro ao carregar colunas customizadas:', error);
    }
  }, [projectId]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 3,
      },
    })
  );

  const handleAddTask = async (newTaskData: Omit<Task, 'id'>) => {
    if (!projectId) return;
    
    try {
      const createdTask = await createProjectTask(projectId, newTaskData);
      if (createdTask) {
        setTasks(prevTasks => [createdTask, ...prevTasks]);
        
        // Atualizar o contador do projeto
        if (currentProject) {
          setCurrentProject({
            ...currentProject,
            taskCount: currentProject.taskCount + 1
          });
        }
      }
    } catch (error) {
      console.error('Erro ao criar task:', error);
    }
  };

  const handleUpdateColumns = (newColumns: KanbanColumnType[]) => {
    setColumns(newColumns);
    // Salvar no localStorage como fallback
    if (projectId) {
      localStorage.setItem(`project-${projectId}-columns`, JSON.stringify(newColumns));
    }
  };

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const task = tasks.find(task => task.id === active.id);
    if (task) {
      setActiveTask(task);
    }
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveTask(null);
    
    if (!over) return;
    
    const taskId = active.id as string;
    const columnId = over.id as string;
    
    // Find the task and update its status
    const task = tasks.find(task => task.id === taskId);
    if (!task || task.status === columnId) return;
    
    const updatedTask = { ...task, status: columnId };
    
    // Update local state immediately
    setTasks(prevTasks => 
      prevTasks.map(t => 
        t.id === taskId 
          ? updatedTask
          : t
      )
    );

    // Update in database
    try {
      await updateProjectTask(updatedTask);
    } catch (error) {
      console.error('Erro ao atualizar task:', error);
      // Revert local state on error
      setTasks(prevTasks => 
        prevTasks.map(t => 
          t.id === taskId 
            ? task // revert to original
            : t
        )
      );
    }
  };

  const handleTaskClick = (task: Task) => {
    setEditingTask(task);
    setEditDialogOpen(true);
  };

  const handleEditTask = async (updatedTask: Task) => {
    try {
      const success = await updateProjectTask(updatedTask);
      if (success) {
        setTasks(prevTasks => 
          prevTasks.map(task => 
            task.id === updatedTask.id ? updatedTask : task
          )
        );
      }
    } catch (error) {
      console.error('Erro ao atualizar task:', error);
    }
  };

  const handleDeleteTask = async (taskId: string) => {
    try {
      const success = await deleteProjectTask(taskId);
      if (success) {
        setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
        
        // Decrementar contador do projeto
        if (currentProject) {
          setCurrentProject({
            ...currentProject,
            taskCount: Math.max(0, currentProject.taskCount - 1)
          });
        }
      }
    } catch (error) {
      console.error('Erro ao deletar task:', error);
    }
  };

  const filteredTasks = tasks.filter(task => 
    task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    task.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    task.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getTasksForColumn = (columnId: string) => {
    return filteredTasks.filter(task => task.status === columnId);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="px-6 space-y-6">
        {/* Board/Calendar View */}
        {viewMode === 'board' ? (
          <>
            {/* Column Headers with Tabs */}
            <div className="flex items-center gap-6 pb-6 border-b border-border/40">
              {columns
                .sort((a, b) => a.order - b.order)
                .map((column) => (
                  <div key={column.id} className="flex items-center gap-3">
                    <div className={`status-indicator ${column.color}`} />
                    <span className="font-semibold text-foreground">{column.title}</span>
                    <span className="task-count">
                      {getTasksForColumn(column.id).length}
                    </span>
                  </div>
                ))}
              <div className="flex items-center gap-3 ml-auto">
                <ColumnSettingsDialog 
                  columns={columns}
                  onUpdateColumns={handleUpdateColumns}
                />
                <AddTaskDialog 
                  onAddTask={handleAddTask}
                  defaultStatus="todo"
                  columns={columns.map(col => ({ id: col.id, title: col.title }))}
                  currentProject={currentProject}
                  trigger={
                    <Button className="gradient-button">
                      <Plus className="w-4 h-4 mr-2" />
                      Nova Tarefa
                    </Button>
                  }
                />
              </div>
            </div>

            {/* Kanban Board Grid */}
            <div 
              className="grid gap-2 lg:gap-3 auto-rows-fr"
              style={{ 
                gridTemplateColumns: `repeat(${columns.length}, minmax(380px, 1fr))`,
                minHeight: '600px'
              }}
            >
              {columns
                .sort((a, b) => a.order - b.order)
                .map((column) => (
                   <DroppableColumn
                     key={column.id}
                     column={column}
                     tasks={getTasksForColumn(column.id)}
                     onAddTask={handleAddTask}
                     onTaskClick={handleTaskClick}
                     columns={columns.map(col => ({ id: col.id, title: col.title }))}
                     currentProject={currentProject}
                   />
                ))}
            </div>
          </>
        ) : (
          <div className="bg-surface rounded-3xl p-12 text-center border border-border/40">
            <Calendar className="w-20 h-20 mx-auto text-muted-foreground mb-6" />
            <h3 className="text-2xl font-bold text-foreground mb-3">Visualização de Calendário</h3>
            <p className="text-muted-foreground">A visualização de calendário será implementada em breve</p>
          </div>
        )}
      </div>

      <DragOverlay>
        {activeTask ? <TaskCard task={activeTask} /> : null}
      </DragOverlay>

      {editingTask && (
        <AddTaskDialog
          task={editingTask}
          onEditTask={handleEditTask}
          onDeleteTask={handleDeleteTask}
          open={editDialogOpen}
          onOpenChange={setEditDialogOpen}
          columns={columns.map(col => ({ id: col.id, title: col.title }))}
          currentProject={currentProject}
        />
      )}
    </DndContext>
  );
}
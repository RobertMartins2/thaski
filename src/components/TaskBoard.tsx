import { useState, useEffect } from "react";
import { Plus, Calendar, Grid3X3, Search, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { KanbanColumn } from "./KanbanColumn";
import { Task } from "./TaskCard";
import { AddTaskDialog } from "./AddTaskDialog";
import { ColumnSettingsDialog } from "./ColumnSettingsDialog";
import { KanbanColumn as KanbanColumnType, Project } from "@/types/kanban";
import { DndContext, DragEndEvent, DragOverlay, DragStartEvent, closestCorners } from "@dnd-kit/core";
import { useSensors, useSensor, PointerSensor } from "@dnd-kit/core";
import { TaskCard } from "./TaskCard";
import { DroppableColumn } from "./DroppableColumn";
import { EditTaskDialog } from "./EditTaskDialog";
import { TaskDetailPanel } from "./TaskDetailPanel";
import { generateTaskCode } from "@/lib/project-utils";
import { getProjectById } from "@/lib/project-storage";

// Tasks iniciais vazias - dados reais virão do Supabase
const initialTasks: Task[] = [];

interface TaskBoardProps {
  projectId?: string; // ID do projeto atual
}

export function TaskBoard({ projectId }: TaskBoardProps) {
  // Buscar o projeto atual
  const currentProject = getProjectById(projectId);

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
  const [detailTask, setDetailTask] = useState<Task | null>(null);
  const [detailPanelOpen, setDetailPanelOpen] = useState(false);

  // Carregar colunas customizadas do localStorage
  useEffect(() => {
    try {
      const savedColumns = localStorage.getItem(`project-${projectId}-columns`);
      if (savedColumns) {
        setColumns(JSON.parse(savedColumns));
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

  const handleAddTask = (newTaskData: Omit<Task, 'id'>) => {
    // Gerar código automaticamente baseado no projeto atual ou usar padrão
    const taskCode = currentProject ? generateTaskCode(currentProject) : `TASK-${Date.now()}`;  
    
    const newTask: Task = {
      ...newTaskData,
      id: `task-${Date.now()}`,
      code: taskCode,
    };
    setTasks([...tasks, newTask]);
    
    // TODO: Aqui precisaríamos incrementar o taskCount do projeto na fonte de dados
    // Por agora, a geração do código usa o taskCount atual do projeto
  };

  const handleUpdateColumns = (newColumns: KanbanColumnType[]) => {
    setColumns(newColumns);
    // Salvar no localStorage
    localStorage.setItem(`project-${projectId}-columns`, JSON.stringify(newColumns));
  };

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const task = tasks.find(task => task.id === active.id);
    if (task) {
      setActiveTask(task);
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveTask(null);
    
    if (!over) return;
    
    const taskId = active.id as string;
    const columnId = over.id as string;
    
    // Find the task and update its status
    const task = tasks.find(task => task.id === taskId);
    if (!task || task.status === columnId) return;
    
    setTasks(prevTasks => 
      prevTasks.map(task => 
        task.id === taskId 
          ? { ...task, status: columnId }
          : task
      )
    );
  };

  const handleTaskClick = (task: Task) => {
    setEditingTask(task);
    setEditDialogOpen(true);
  };

  const handleTaskDetailClick = (task: Task) => {
    setDetailTask(task);
    setDetailPanelOpen(true);
  };

  const handleEditTask = (updatedTask: Task) => {
    setTasks(prevTasks => 
      prevTasks.map(task => 
        task.id === updatedTask.id ? updatedTask : task
      )
    );
  };

  const handleDeleteTask = (taskId: string) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
  };

  const filteredTasks = tasks.filter(task => 
    task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    task.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    task.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getTasksForColumn = (columnId: string) => {
    return filteredTasks.filter(task => task.status === columnId);
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="space-y-6">
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
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-6">
              {columns
                .sort((a, b) => a.order - b.order)
                .map((column) => (
                   <DroppableColumn
                     key={column.id}
                     column={column}
                     tasks={getTasksForColumn(column.id)}
                     onAddTask={handleAddTask}
                     onTaskClick={handleTaskClick}
                     onTaskDetailClick={handleTaskDetailClick}
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
        <EditTaskDialog
          task={editingTask}
          onEditTask={handleEditTask}
          onDeleteTask={handleDeleteTask}
          open={editDialogOpen}
          onOpenChange={setEditDialogOpen}
          columns={columns.map(col => ({ id: col.id, title: col.title }))}
        />
      )}

      {detailTask && (
        <TaskDetailPanel
          task={detailTask}
          open={detailPanelOpen}
          onOpenChange={setDetailPanelOpen}
          onEditTask={handleEditTask}
          columns={columns.map(col => ({ id: col.id, title: col.title }))}
        />
      )}
    </DndContext>
  );
}
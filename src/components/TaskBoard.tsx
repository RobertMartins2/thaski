import { useState } from "react";
import { Plus, Calendar, Grid3X3, Search, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { KanbanColumn } from "./KanbanColumn";
import { Task } from "./TaskCard";
import { AddTaskDialog } from "./AddTaskDialog";
import { ColumnSettingsDialog } from "./ColumnSettingsDialog";
import { KanbanColumn as KanbanColumnType } from "@/types/kanban";
import { DndContext, DragEndEvent, DragOverlay, DragStartEvent, closestCorners } from "@dnd-kit/core";
import { useSensors, useSensor, PointerSensor } from "@dnd-kit/core";
import { TaskCard } from "./TaskCard";
import { DroppableColumn } from "./DroppableColumn";
import { EditTaskDialog } from "./EditTaskDialog";
import { TaskDetailPanel } from "./TaskDetailPanel";

// Mock data for demonstration
const mockTasks: Task[] = [
  {
    id: '1',
    title: 'OMOC Project',
    description: 'Alex Christ, London',
    code: 'CFW-481',
    tags: [{ name: 'Mobile App', color: 'mobile' }, { name: 'Dashboard', color: 'dashboard' }, { name: 'Guideline', color: 'guideline' }, { name: 'Landing Pages', color: 'landing' }],
    status: 'todo'
  },
  {
    id: '2', 
    title: 'Regros Project',
    description: 'Sygintus, Mextos',
    code: 'CFW-482',
    tags: [{ name: 'Guideline', color: 'guideline' }, { name: 'Landing Pages', color: 'landing' }],
    status: 'todo'
  },
  {
    id: '3',
    title: 'Momon Project', 
    description: 'Momon Company',
    code: 'CFW-483',
    tags: [{ name: 'Guideline', color: 'guideline' }, { name: 'Mobile App', color: 'mobile' }],
    status: 'progress'
  },
  {
    id: '4',
    title: 'Loody Project',
    description: 'Hya Ji, China',
    code: 'CFW-484', 
    tags: [{ name: 'Mobile App', color: 'mobile' }, { name: 'Dashboard', color: 'dashboard' }, { name: 'Guideline', color: 'guideline' }],
    status: 'progress'
  },
  {
    id: '5',
    title: 'EdRuv Project',
    description: 'Hall Yonny, US',
    code: 'CFW-485',
    tags: [{ name: 'Guideline', color: 'guideline' }, { name: 'Mobile App', color: 'mobile' }],
    status: 'done'
  },
  {
    id: '6',
    title: 'Jokly Project',
    description: 'Hussein Dubai',
    code: 'CFW-486',
    tags: [{ name: 'Landing Pages', color: 'landing' }],
    status: 'done'
  }
];

export function TaskBoard() {
  // Default columns
  const defaultColumns: KanbanColumnType[] = [
    { id: 'todo', title: 'To Do', color: 'bg-slate-400', order: 0 },
    { id: 'progress', title: 'In Progress', color: 'bg-yellow-500', order: 1 },
    { id: 'done', title: 'Completed', color: 'bg-green-500', order: 2 },
    { id: 'overdue', title: 'Overdue', color: 'bg-red-500', order: 3 }
  ];

  const [viewMode, setViewMode] = useState<'board' | 'calendar'>('board');
  const [searchQuery, setSearchQuery] = useState('');
  const [tasks, setTasks] = useState<Task[]>(mockTasks);
  const [columns, setColumns] = useState<KanbanColumnType[]>(defaultColumns);
  const [activeTask, setActiveTask] = useState<Task | null>(null);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [detailTask, setDetailTask] = useState<Task | null>(null);
  const [detailPanelOpen, setDetailPanelOpen] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 3,
      },
    })
  );

  const handleAddTask = (newTaskData: Omit<Task, 'id'>) => {
    const newTask: Task = {
      ...newTaskData,
      id: `task-${Date.now()}`,
    };
    setTasks([...tasks, newTask]);
  };

  const handleUpdateColumns = (newColumns: KanbanColumnType[]) => {
    setColumns(newColumns);
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
                  trigger={
                    <Button className="gradient-button">
                      <Plus className="w-4 h-4 mr-2" />
                      New Task
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
                  />
                ))}
            </div>
          </>
        ) : (
          <div className="bg-surface rounded-3xl p-12 text-center border border-border/40">
            <Calendar className="w-20 h-20 mx-auto text-muted-foreground mb-6" />
            <h3 className="text-2xl font-bold text-foreground mb-3">Calendar View</h3>
            <p className="text-muted-foreground">Calendar view will be implemented soon</p>
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
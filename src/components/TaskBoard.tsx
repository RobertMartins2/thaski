import { useState } from "react";
import { Plus, Calendar, Grid3X3, Search, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { KanbanColumn } from "./KanbanColumn";
import { Task } from "./TaskCard";
import { AddTaskDialog } from "./AddTaskDialog";
import { ColumnSettingsDialog } from "./ColumnSettingsDialog";
import { KanbanColumn as KanbanColumnType } from "@/types/kanban";

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

  const filteredTasks = tasks.filter(task => 
    task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    task.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    task.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getTasksForColumn = (columnId: string) => {
    return filteredTasks.filter(task => task.status === columnId);
  };

  return (
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
                  <div className={`status-indicator ${column.id === 'todo' ? 'bg-slate-400' : column.id === 'progress' ? 'bg-amber-400' : column.id === 'done' ? 'bg-green-500' : 'bg-red-500'}`} />
                  <span className="font-semibold text-foreground">{column.title}</span>
                  <span className="task-count">
                    {getTasksForColumn(column.id).length}
                  </span>
                </div>
              ))}
            <Button className="ml-auto gradient-button">
              <Plus className="w-4 h-4 mr-2" />
              New Task
            </Button>
          </div>

          {/* Kanban Board Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-6">
            {columns
              .sort((a, b) => a.order - b.order)
              .map((column) => (
                <div key={column.id} className="kanban-column">
                  <div className="column-header">
                    <div className={`status-indicator ${column.id === 'todo' ? 'bg-slate-400' : column.id === 'progress' ? 'bg-amber-400' : column.id === 'done' ? 'bg-green-500' : 'bg-red-500'}`} />
                    <span className="column-title">{column.title}</span>
                    <span className="task-count ml-auto">
                      {getTasksForColumn(column.id).length}
                    </span>
                  </div>
                  
                  <div className="space-y-4">
                    {getTasksForColumn(column.id).map((task) => (
                      <div key={task.id} className="task-card p-4">
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-sm text-muted-foreground font-medium">{task.code}</span>
                        </div>
                        <h3 className="font-semibold text-foreground mb-2">{task.title}</h3>
                        <p className="text-sm text-muted-foreground mb-4">{task.description}</p>
                        <div className="flex flex-wrap gap-2">
                          {task.tags.map((tag, index) => (
                            <span 
                              key={index} 
                              className={`px-3 py-1 rounded-full text-xs font-medium
                                ${tag.color === 'design' ? 'tag-design' : ''}
                                ${tag.color === 'dev' ? 'tag-dev' : ''}
                                ${tag.color === 'performance' ? 'tag-performance' : ''}
                                ${tag.color === 'hiring' ? 'tag-hiring' : ''}
                                ${tag.color === 'mobile' ? 'tag-dev' : ''}
                                ${tag.color === 'dashboard' ? 'tag-performance' : ''}
                                ${tag.color === 'guideline' ? 'tag-design' : ''}
                                ${tag.color === 'landing' ? 'tag-hiring' : ''}
                              `}
                            >
                              {tag.name}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                    
                    {/* Add Task Button */}
                    <AddTaskDialog 
                      onAddTask={handleAddTask}
                      defaultStatus={column.id}
                      trigger={
                        <button className="add-task-button">
                          <Plus className="w-4 h-4 mr-2" />
                          Add new task
                        </button>
                      }
                    />
                  </div>
                </div>
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
  );
}
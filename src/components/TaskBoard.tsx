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
    <div className="bg-gray-50 min-h-screen">
      {/* Board/Calendar View */}
      {viewMode === 'board' ? (
        <div className="p-6">
          {/* Column Headers with Tabs */}
          <div className="flex gap-6 mb-6 border-b border-gray-200">
            {columns
              .sort((a, b) => a.order - b.order)
              .map((column) => (
                <div key={column.id} className="flex items-center gap-3 pb-3">
                  <div className={`w-3 h-3 rounded-full ${column.color}`} />
                  <span className="font-medium text-gray-900">{column.title}</span>
                  <span className="bg-gray-100 text-gray-600 text-sm px-2 py-1 rounded-full">
                    {getTasksForColumn(column.id).length}
                  </span>
                </div>
              ))}
            <Button 
              className="ml-auto bg-black hover:bg-gray-800 text-white px-4 py-2 rounded-lg"
            >
              <Plus className="w-4 h-4 mr-2" />
              New Task
            </Button>
          </div>

          {/* Kanban Board */}
          <div className={`grid gap-6`} style={{ gridTemplateColumns: `repeat(${columns.length}, minmax(300px, 1fr))` }}>
            {columns
              .sort((a, b) => a.order - b.order)
              .map((column) => (
                <div key={column.id} className="space-y-4">
                  {/* Column Content */}
                  <div className="space-y-4">
                    {getTasksForColumn(column.id).map((task) => (
                      <div key={task.id} className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm text-gray-500">{task.code}</span>
                        </div>
                        <h3 className="font-medium text-gray-900 mb-2">{task.title}</h3>
                        <p className="text-sm text-gray-600 mb-4">{task.description}</p>
                        <div className="flex flex-wrap gap-2">
                          {task.tags.map((tag, index) => (
                            <span 
                              key={index} 
                              className={`px-2 py-1 rounded-full text-xs font-medium
                                ${tag.color === 'design' ? 'bg-purple-100 text-purple-700' : ''}
                                ${tag.color === 'dev' ? 'bg-blue-100 text-blue-700' : ''}
                                ${tag.color === 'performance' ? 'bg-orange-100 text-orange-700' : ''}
                                ${tag.color === 'hiring' ? 'bg-pink-100 text-pink-700' : ''}
                                ${tag.color === 'mobile' ? 'bg-blue-100 text-blue-700' : ''}
                                ${tag.color === 'dashboard' ? 'bg-cyan-100 text-cyan-700' : ''}
                                ${tag.color === 'guideline' ? 'bg-green-100 text-green-700' : ''}
                                ${tag.color === 'landing' ? 'bg-purple-100 text-purple-700' : ''}
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
                        <button className="w-full p-4 border-2 border-dashed border-gray-200 rounded-lg text-gray-500 hover:border-gray-300 hover:text-gray-600 transition-colors text-left">
                          <Plus className="w-4 h-4 inline mr-2" />
                          Add new task
                        </button>
                      }
                    />
                  </div>
                </div>
              ))}
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-lg p-12 text-center">
          <Calendar className="w-20 h-20 mx-auto text-gray-400 mb-6" />
          <h3 className="text-2xl font-semibold text-gray-900 mb-3">Calendar View</h3>
          <p className="text-gray-600">Calendar view will be implemented soon</p>
        </div>
      )}
    </div>
  );
}
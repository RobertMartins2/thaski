import { useState } from "react";
import { Plus, Calendar, Grid3X3, Search, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { KanbanColumn } from "./KanbanColumn";
import { Task } from "./TaskCard";

// Mock data for demonstration
const mockTasks: Task[] = [
  {
    id: '1',
    title: 'Design new dashboard layout',
    description: 'Create wireframes and mockups for the new admin dashboard interface',
    code: 'CFW-481',
    tags: [{ name: 'Design', color: 'design' }, { name: 'UI/UX', color: 'design' }],
    status: 'todo'
  },
  {
    id: '2', 
    title: 'Implement user authentication',
    description: 'Add login/logout functionality with JWT token management',
    code: 'CFW-482',
    tags: [{ name: 'Dev', color: 'dev' }, { name: 'Backend', color: 'dev' }],
    status: 'todo'
  },
  {
    id: '3',
    title: 'Optimize database queries', 
    description: 'Improve performance of slow running queries in user dashboard',
    code: 'CFW-483',
    tags: [{ name: 'Performance', color: 'performance' }, { name: 'Backend', color: 'dev' }],
    status: 'progress'
  },
  {
    id: '4',
    title: 'Interview frontend candidates',
    description: 'Conduct technical interviews for React developer positions',
    code: 'CFW-484', 
    tags: [{ name: 'Hiring', color: 'hiring' }],
    status: 'progress'
  },
  {
    id: '5',
    title: 'Deploy staging environment',
    description: 'Set up and configure staging server for testing new features',
    code: 'CFW-485',
    tags: [{ name: 'Dev', color: 'dev' }, { name: 'DevOps', color: 'dev' }],
    status: 'done'
  }
];

export function TaskBoard() {
  const [viewMode, setViewMode] = useState<'board' | 'calendar'>('board');
  const [searchQuery, setSearchQuery] = useState('');

  const todoTasks = mockTasks.filter(task => task.status === 'todo');
  const progressTasks = mockTasks.filter(task => task.status === 'progress');
  const doneTasks = mockTasks.filter(task => task.status === 'done');

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-8 border-b border-border bg-surface">
        <div>
          <h1 className="text-3xl font-semibold text-foreground">Task Board</h1>
          <p className="text-muted-foreground mt-1 font-medium">Manage and track your team's progress</p>
        </div>
        
        <div className="flex items-center gap-3">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search tasks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 w-64"
            />
          </div>
          
          {/* Filters */}
          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
          
          {/* View mode toggle */}
          <div className="flex items-center rounded-lg border border-border p-1">
            <Button
              variant={viewMode === 'board' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('board')}
              className="h-8"
            >
              <Grid3X3 className="w-4 h-4 mr-1" />
              Board
            </Button>
            <Button
              variant={viewMode === 'calendar' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('calendar')}
              className="h-8"
            >
              <Calendar className="w-4 h-4 mr-1" />
              Calendar
            </Button>
          </div>
          
          {/* New task button */}
          <Button className="gradient-button">
            <Plus className="w-4 h-4 mr-2" />
            New Task
          </Button>
        </div>
      </div>
      
      {/* Board content */}
      {viewMode === 'board' ? (
        <div className="flex-1 p-8 overflow-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-full">
            <KanbanColumn
              title="To-do"
              tasks={todoTasks}
              status="todo"
            />
            <KanbanColumn
              title="In Progress"
              tasks={progressTasks}
              status="progress"
            />
            <KanbanColumn
              title="Done"
              tasks={doneTasks}
              status="done"
            />
          </div>
        </div>
      ) : (
        <div className="flex-1 p-6 flex items-center justify-center">
          <div className="text-center text-muted-foreground">
            <Calendar className="w-16 h-16 mx-auto mb-4 opacity-50" />
            <h3 className="text-lg font-medium mb-2">Calendar View</h3>
            <p>Calendar view will be implemented in the next version</p>
          </div>
        </div>
      )}
    </div>
  );
}
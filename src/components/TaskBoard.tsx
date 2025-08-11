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
    <div className="p-8 lg:p-12 space-y-10 bg-background min-h-screen">
      {/* Header */}
      <div className="space-y-8">
        <div className="max-w-2xl">
          <h1 className="text-4xl font-bold text-foreground mb-3 tracking-tight">Task Management</h1>
          <p className="text-muted-foreground text-lg leading-relaxed">Organize and track your team's progress with our modern task board</p>
        </div>
        
        {/* Controls */}
        <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center justify-between">
          <div className="flex flex-col sm:flex-row gap-4 flex-1">
            {/* Search */}
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <Input
                type="text"
                placeholder="Search tasks..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input pl-12 h-12 text-base"
              />
            </div>
            
            {/* Filter */}
            <Button variant="outline" className="filter-button h-12 px-6 font-medium">
              <Filter className="w-5 h-5 mr-3" />
              Filter
            </Button>
          </div>
          
          <div className="flex gap-4">
            {/* View toggle */}
            <div className="flex bg-muted/50 backdrop-blur-sm rounded-2xl p-1.5 border border-border/30">
              <Button
                variant={viewMode === 'board' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('board')}
                className="rounded-xl px-5 py-2.5 font-semibold text-sm"
              >
                <Grid3X3 className="w-4 h-4 mr-2" />
                Board
              </Button>
              <Button
                variant={viewMode === 'calendar' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('calendar')}
                className="rounded-xl px-5 py-2.5 font-semibold text-sm"
              >
                <Calendar className="w-4 h-4 mr-2" />
                Calendar
              </Button>
            </div>
            
            {/* New task button */}
            <Button className="gradient-button h-12">
              <Plus className="w-5 h-5 mr-2" />
              New Task
            </Button>
          </div>
        </div>
      </div>

      {/* Board/Calendar View */}
      {viewMode === 'board' ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10">
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
      ) : (
        <div className="bg-surface/60 backdrop-blur-sm rounded-3xl p-12 border border-border/30 text-center">
          <Calendar className="w-20 h-20 mx-auto text-muted-foreground/60 mb-6" />
          <h3 className="text-2xl font-semibold text-foreground mb-3">Calendar View</h3>
          <p className="text-muted-foreground text-lg">Calendar view will be implemented soon</p>
        </div>
      )}
    </div>
  );
}
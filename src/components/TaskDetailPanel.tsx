import { useState } from "react";
import { X, Edit2, Calendar, User, Paperclip, MessageSquare, Clock, FileText, Plus, Download } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Task } from "./TaskCard";
import { format } from "date-fns";

interface TaskDetailPanelProps {
  task: Task;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onEditTask?: (task: Task) => void;
  columns?: Array<{id: string, title: string}>;
}

const tagColorMap = {
  design: 'bg-purple-100 text-purple-700 border-purple-200',
  hiring: 'bg-blue-100 text-blue-700 border-blue-200', 
  dev: 'bg-green-100 text-green-700 border-green-200',
  performance: 'bg-orange-100 text-orange-700 border-orange-200',
  mobile: 'bg-blue-100 text-blue-700 border-blue-200',
  dashboard: 'bg-cyan-100 text-cyan-700 border-cyan-200',
  guideline: 'bg-green-100 text-green-700 border-green-200',
  landing: 'bg-purple-100 text-purple-700 border-purple-200'
};

const priorityColors = {
  high: 'bg-red-100 text-red-700 border-red-200',
  medium: 'bg-yellow-100 text-yellow-700 border-yellow-200',
  low: 'bg-green-100 text-green-700 border-green-200'
};

const sampleNotes = [
  {
    id: '1',
    author: 'John Doe',
    avatar: '/placeholder-avatar.png',
    content: 'Updated the design specifications and shared with the development team.',
    timestamp: '2024-01-15T10:30:00Z',
  },
  {
    id: '2',
    author: 'Sarah Wilson',
    avatar: '/placeholder-avatar.png',
    content: 'Reviewed the latest mockups. Looking great! Just need to adjust the mobile responsiveness.',
    timestamp: '2024-01-14T15:45:00Z',
  }
];

const sampleAttachments = [
  { id: '1', name: 'requirements.pdf', size: '2.4 MB', type: 'pdf' },
  { id: '2', name: 'mockup_v2.figma', size: '1.8 MB', type: 'figma' },
  { id: '3', name: 'screenshot_1.png', size: '845 KB', type: 'image' }
];

export function TaskDetailPanel({ task, open, onOpenChange, onEditTask, columns = [] }: TaskDetailPanelProps) {
  const [newNote, setNewNote] = useState('');
  const [localTask, setLocalTask] = useState(task);
  
  const handleUpdateTask = (updates: Partial<Task>) => {
    const updatedTask = { ...localTask, ...updates };
    setLocalTask(updatedTask);
    onEditTask?.(updatedTask);
  };

  const handleAddNote = () => {
    if (!newNote.trim()) return;
    
    // In a real app, this would be sent to the backend
    console.log('Adding note:', newNote);
    setNewNote('');
  };

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'pdf': return '📄';
      case 'figma': return '🎨';
      case 'image': return '🖼️';
      default: return '📎';
    }
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full sm:w-[600px] sm:max-w-[600px] bg-background border-border/30 p-0 overflow-hidden">
        <div className="flex flex-col h-full">
          {/* Header */}
          <SheetHeader className="border-b border-border/30 p-6 pb-4">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-sm text-muted-foreground font-medium">{localTask.code}</span>
                  <Badge variant="outline" className="text-xs">
                    {columns.find(col => col.id === localTask.status)?.title || localTask.status}
                  </Badge>
                </div>
                <SheetTitle className="text-xl font-semibold text-foreground leading-tight">
                  {localTask.title}
                </SheetTitle>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onOpenChange(false)}
                className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </SheetHeader>

          {/* Content */}
          <div className="flex-1 overflow-auto">
            <div className="p-6 space-y-8">
              
              {/* Task Info Grid */}
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2 block">
                      Priority
                    </label>
                    <Select value="high" onValueChange={() => {}}>
                      <SelectTrigger className="h-9">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-background border-border/30">
                        <SelectItem value="high">
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-red-500 rounded-full" />
                            High
                          </div>
                        </SelectItem>
                        <SelectItem value="medium">
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-yellow-500 rounded-full" />
                            Medium
                          </div>
                        </SelectItem>
                        <SelectItem value="low">
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full" />
                            Low
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2 block">
                      Due date
                    </label>
                    <div className="flex items-center gap-2 text-sm text-foreground">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      Jan 03, 2024
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2 block">
                      Deal summary
                    </label>
                    <div className="text-sm font-semibold text-foreground">$ 8000</div>
                  </div>
                  
                  <div>
                    <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2 block">
                      Task owner
                    </label>
                    <div className="flex items-center gap-2">
                      <Avatar className="w-6 h-6">
                        <AvatarImage src="/placeholder-avatar.png" />
                        <AvatarFallback className="text-xs bg-primary text-primary-foreground">JD</AvatarFallback>
                      </Avatar>
                      <span className="text-sm text-foreground">John Doe</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3 block">
                  Subject
                </label>
                <div className="text-sm text-foreground leading-relaxed">
                  {localTask.description}
                </div>
              </div>

              {/* Status Details */}
              <div className="grid grid-cols-4 gap-4 p-4 bg-muted/20 rounded-lg">
                <div>
                  <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">
                    Account
                  </div>
                  <div className="text-sm text-foreground">Client ABC</div>
                </div>
                <div>
                  <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">
                    Deal
                  </div>
                  <div className="text-sm text-foreground">Project Deal</div>
                </div>
                <div>
                  <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">
                    Status
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full" />
                    <span className="text-sm text-foreground">In-progress</span>
                  </div>
                </div>
                <div>
                  <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">
                    Reminder
                  </div>
                  <div className="text-sm text-foreground">Jan 20, Pop-up</div>
                </div>
              </div>

              {/* Tags */}
              <div>
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3 block">
                  Tags
                </label>
                <div className="flex flex-wrap gap-2">
                  {localTask.tags.map((tag, index) => (
                    <Badge 
                      key={index} 
                      variant="outline"
                      className={`${tagColorMap[tag.color]} border text-xs px-3 py-1`}
                    >
                      {tag.name}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Custom Fields */}
              {localTask.customFields && localTask.customFields.length > 0 && (
                <div>
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3 block">
                    Custom Fields
                  </label>
                  <div className="space-y-3">
                    {localTask.customFields.map((field) => (
                      <div key={field.id} className="flex items-center justify-between py-2">
                        <span className="text-sm font-medium text-muted-foreground">{field.name}</span>
                        <span className="text-sm text-foreground">
                          {field.value ? String(field.value) : 'Not set'}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <Separator />

              {/* Notes Section */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                    Notes
                  </label>
                  <Button variant="ghost" size="sm" className="text-xs text-primary hover:text-primary">
                    <Plus className="w-3 h-3 mr-1" />
                    Add new
                  </Button>
                </div>
                
                <div className="space-y-4">
                  {sampleNotes.map((note) => (
                    <div key={note.id} className="flex gap-3">
                      <Avatar className="w-8 h-8 mt-1">
                        <AvatarImage src={note.avatar} />
                        <AvatarFallback className="text-xs bg-muted">
                          {note.author.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-sm font-medium text-foreground">{note.author}</span>
                          <span className="text-xs text-muted-foreground">
                            {format(new Date(note.timestamp), 'MMM dd, yyyy at h:mm a')}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed">{note.content}</p>
                      </div>
                    </div>
                  ))}
                  
                  {/* Add Note */}
                  <div className="flex gap-3">
                    <Avatar className="w-8 h-8">
                      <AvatarFallback className="text-xs bg-primary text-primary-foreground">You</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-2">
                      <Textarea
                        value={newNote}
                        onChange={(e) => setNewNote(e.target.value)}
                        placeholder="Add a note..."
                        className="min-h-[60px] text-sm resize-none"
                      />
                      {newNote.trim() && (
                        <div className="flex gap-2">
                          <Button size="sm" onClick={handleAddNote}>Add Note</Button>
                          <Button variant="ghost" size="sm" onClick={() => setNewNote('')}>Cancel</Button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Documents Section */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                    Documents center
                  </label>
                  <Button variant="ghost" size="sm" className="text-xs text-primary hover:text-primary">
                    <Plus className="w-3 h-3 mr-1" />
                    Add new attachments
                  </Button>
                </div>
                
                <div className="space-y-3">
                  {sampleAttachments.map((file) => (
                    <div key={file.id} className="flex items-center gap-3 p-3 bg-muted/20 rounded-lg">
                      <div className="text-2xl">{getFileIcon(file.type)}</div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-foreground truncate">{file.name}</div>
                        <div className="text-xs text-muted-foreground">{file.size}</div>
                      </div>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="border-t border-border/30 p-4 bg-muted/20">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Clock className="w-3 h-3" />
                Last activity: 27 Dec 2022 at 9:45am
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Edit2 className="w-4 h-4 mr-1" />
                  Edit
                </Button>
                <Button size="sm" className="bg-primary text-primary-foreground">
                  ✓ Close task
                </Button>
              </div>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
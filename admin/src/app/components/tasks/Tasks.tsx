import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Calendar, Flag, User, Plus, Edit } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '../ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { toast } from 'sonner';

interface Task {
  id: number;
  title: string;
  description: string;
  project: string;
  priority: 'High' | 'Medium' | 'Low';
  assignee: string;
  assigneeName: string;
  dueDate: string;
  startDate: string;
  status: 'To Do' | 'In Progress' | 'Completed';
}

const initialTasks: Task[] = [
  { id: 1, title: 'Design Homepage Mockup', description: 'Create wireframes and mockups for the new homepage', project: 'Website Redesign', priority: 'High', assignee: 'JD', assigneeName: 'John Doe', dueDate: '2026-01-10', startDate: '2026-01-08', status: 'To Do' },
  { id: 2, title: 'Setup Database Schema', description: 'Design and implement the database schema', project: 'E-commerce Platform', priority: 'Medium', assignee: 'SS', assigneeName: 'Sarah Smith', dueDate: '2026-01-12', startDate: '2026-01-09', status: 'To Do' },
  { id: 3, title: 'Write API Documentation', description: 'Document all API endpoints with examples', project: 'API Integration', priority: 'Low', assignee: 'MJ', assigneeName: 'Mike Johnson', dueDate: '2026-01-15', startDate: '2026-01-10', status: 'To Do' },
  { id: 4, title: 'Implement Authentication', description: 'Add user authentication and authorization', project: 'Mobile App Development', priority: 'High', assignee: 'EB', assigneeName: 'Emily Brown', dueDate: '2026-01-09', startDate: '2026-01-05', status: 'In Progress' },
  { id: 5, title: 'Design Database Architecture', description: 'Plan the database migration strategy', project: 'Database Migration', priority: 'High', assignee: 'DL', assigneeName: 'David Lee', dueDate: '2026-01-11', startDate: '2026-01-06', status: 'In Progress' },
  { id: 6, title: 'Create Landing Page', description: 'Build responsive landing page', project: 'Website Redesign', priority: 'Medium', assignee: 'JD', assigneeName: 'John Doe', dueDate: '2026-01-13', startDate: '2026-01-07', status: 'In Progress' },
  { id: 7, title: 'Setup CI/CD Pipeline', description: 'Configure automated deployment pipeline', project: 'Cloud Infrastructure', priority: 'Medium', assignee: 'SS', assigneeName: 'Sarah Smith', dueDate: '2026-01-14', startDate: '2026-01-08', status: 'In Progress' },
  { id: 8, title: 'Initial Project Setup', description: 'Setup project structure and dependencies', project: 'Mobile App Development', priority: 'High', assignee: 'MJ', assigneeName: 'Mike Johnson', dueDate: '2026-01-05', startDate: '2026-01-01', status: 'Completed' },
  { id: 9, title: 'Research and Planning', description: 'Market research and project planning', project: 'E-commerce Platform', priority: 'Medium', assignee: 'EB', assigneeName: 'Emily Brown', dueDate: '2026-01-04', startDate: '2025-12-28', status: 'Completed' },
  { id: 10, title: 'Client Meeting', description: 'Initial client requirements gathering', project: 'Website Redesign', priority: 'Low', assignee: 'DL', assigneeName: 'David Lee', dueDate: '2026-01-03', startDate: '2025-12-29', status: 'Completed' },
];

const projects = ['Website Redesign', 'Mobile App Development', 'API Integration', 'Database Migration', 'E-commerce Platform', 'Cloud Infrastructure'];

const employees = [
  { id: 'JD', name: 'John Doe' },
  { id: 'SS', name: 'Sarah Smith' },
  { id: 'MJ', name: 'Mike Johnson' },
  { id: 'EB', name: 'Emily Brown' },
  { id: 'DL', name: 'David Lee' },
  { id: 'LW', name: 'Lisa Wong' },
];

const priorityColors = {
  High: 'bg-red-100 text-red-700 border-red-200',
  Medium: 'bg-yellow-100 text-yellow-700 border-yellow-200',
  Low: 'bg-green-100 text-green-700 border-green-200',
};

const columnColors = {
  'To Do': 'border-t-orange-500',
  'In Progress': 'border-t-blue-500',
  'Completed': 'border-t-green-500',
};

export default function Tasks() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    project: '',
    assignee: '',
    priority: 'Medium' as 'High' | 'Medium' | 'Low',
    status: 'To Do' as 'To Do' | 'In Progress' | 'Completed',
    startDate: '',
    dueDate: '',
  });

  const groupedTasks = {
    'To Do': tasks.filter(t => t.status === 'To Do'),
    'In Progress': tasks.filter(t => t.status === 'In Progress'),
    'Completed': tasks.filter(t => t.status === 'Completed'),
  };

  const handleAddTask = () => {
    if (!newTask.title || !newTask.project || !newTask.assignee || !newTask.startDate || !newTask.dueDate) {
      toast.error('Please fill in all required fields');
      return;
    }

    const employee = employees.find(e => e.id === newTask.assignee);
    if (!employee) {
      toast.error('Please select a valid employee');
      return;
    }

    const task: Task = {
      id: tasks.length + 1,
      title: newTask.title,
      description: newTask.description,
      project: newTask.project,
      priority: newTask.priority,
      assignee: newTask.assignee,
      assigneeName: employee.name,
      dueDate: newTask.dueDate,
      startDate: newTask.startDate,
      status: newTask.status,
    };

    setTasks([...tasks, task]);
    setNewTask({ title: '', description: '', project: '', assignee: '', priority: 'Medium', status: 'To Do', startDate: '', dueDate: '' });
    setIsAddDialogOpen(false);
    toast.success('Task added successfully!');
  };

  const handleEditTask = () => {
    if (!selectedTask) return;

    if (!selectedTask.title || !selectedTask.project || !selectedTask.assignee || !selectedTask.startDate || !selectedTask.dueDate) {
      toast.error('Please fill in all required fields');
      return;
    }

    const employee = employees.find(e => e.id === selectedTask.assignee);
    if (!employee) {
      toast.error('Please select a valid employee');
      return;
    }

    setTasks(tasks.map(t => 
      t.id === selectedTask.id 
        ? { ...selectedTask, assigneeName: employee.name }
        : t
    ));
    setIsEditDialogOpen(false);
    setSelectedTask(null);
    toast.success('Task updated successfully!');
  };

  const handleStatusChange = (taskId: number, newStatus: 'To Do' | 'In Progress' | 'Completed') => {
    setTasks(tasks.map(t => 
      t.id === taskId ? { ...t, status: newStatus } : t
    ));
    toast.success('Task status updated!');
  };

  const openEditDialog = (task: Task) => {
    setSelectedTask({ ...task });
    setIsEditDialogOpen(true);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Task Management</h2>
          <p className="text-gray-500 mt-1">Kanban-style task board for efficient tracking</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="mr-2 h-4 w-4" />
              Add Task
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Add New Task</DialogTitle>
              <DialogDescription>
                Create a new task and assign it to a team member.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2 space-y-2">
                  <Label htmlFor="task-title">Task Title *</Label>
                  <Input
                    id="task-title"
                    placeholder="Enter task title"
                    value={newTask.title}
                    onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                  />
                </div>
                <div className="col-span-2 space-y-2">
                  <Label htmlFor="task-description">Task Description</Label>
                  <Textarea
                    id="task-description"
                    placeholder="Enter task description"
                    value={newTask.description}
                    onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                    rows={3}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="project">Associated Project *</Label>
                  <Select value={newTask.project} onValueChange={(value) => setNewTask({ ...newTask, project: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select project" />
                    </SelectTrigger>
                    <SelectContent>
                      {projects.map(project => (
                        <SelectItem key={project} value={project}>{project}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="assignee">Assigned To *</Label>
                  <Select value={newTask.assignee} onValueChange={(value) => setNewTask({ ...newTask, assignee: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select employee" />
                    </SelectTrigger>
                    <SelectContent>
                      {employees.map(emp => (
                        <SelectItem key={emp.id} value={emp.id}>{emp.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="priority">Priority *</Label>
                  <Select value={newTask.priority} onValueChange={(value: 'High' | 'Medium' | 'Low') => setNewTask({ ...newTask, priority: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="High">High</SelectItem>
                      <SelectItem value="Medium">Medium</SelectItem>
                      <SelectItem value="Low">Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="status">Status *</Label>
                  <Select value={newTask.status} onValueChange={(value: 'To Do' | 'In Progress' | 'Completed') => setNewTask({ ...newTask, status: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="To Do">To Do</SelectItem>
                      <SelectItem value="In Progress">In Progress</SelectItem>
                      <SelectItem value="Completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="start-date">Start Date *</Label>
                  <Input
                    id="start-date"
                    type="date"
                    value={newTask.startDate}
                    onChange={(e) => setNewTask({ ...newTask, startDate: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="due-date">Due Date *</Label>
                  <Input
                    id="due-date"
                    type="date"
                    value={newTask.dueDate}
                    onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                  />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddTask} className="bg-blue-600 hover:bg-blue-700">
                Add Task
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Kanban Board */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {Object.entries(groupedTasks).map(([column, columnTasks]) => (
          <div key={column} className="space-y-4">
            <Card className={`border-t-4 ${columnColors[column as keyof typeof columnColors]}`}>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center justify-between">
                  <span className="text-lg">{column}</span>
                  <Badge variant="outline" className="bg-gray-100">
                    {columnTasks.length}
                  </Badge>
                </CardTitle>
              </CardHeader>
            </Card>

            <div className="space-y-3">
              {columnTasks.map((task) => (
                <Card key={task.id} className="hover:shadow-md transition-shadow cursor-pointer group">
                  <CardContent className="pt-6">
                    <div className="space-y-3">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900 mb-1">{task.title}</h4>
                          <p className="text-sm text-gray-500">{task.project}</p>
                          {task.description && (
                            <p className="text-xs text-gray-400 mt-2">{task.description}</p>
                          )}
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8 p-0"
                          onClick={() => openEditDialog(task)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>

                      <div className="flex items-center gap-2">
                        <Badge
                          variant="outline"
                          className={priorityColors[task.priority] + ' text-xs'}
                        >
                          <Flag className="h-3 w-3 mr-1" />
                          {task.priority}
                        </Badge>
                      </div>

                      <div className="space-y-2">
                        <Select value={task.status} onValueChange={(value: 'To Do' | 'In Progress' | 'Completed') => handleStatusChange(task.id, value)}>
                          <SelectTrigger className="h-8 text-xs">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="To Do">To Do</SelectItem>
                            <SelectItem value="In Progress">In Progress</SelectItem>
                            <SelectItem value="Completed">Completed</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t">
                        <div className="flex items-center text-xs text-gray-500">
                          <Calendar className="h-3 w-3 mr-1" />
                          {new Date(task.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                        </div>
                        <Avatar className="h-6 w-6">
                          <AvatarFallback className="bg-blue-600 text-white text-xs">
                            {task.assignee}
                          </AvatarFallback>
                        </Avatar>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Edit Task Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Task</DialogTitle>
            <DialogDescription>
              Update task details and assignment.
            </DialogDescription>
          </DialogHeader>
          {selectedTask && (
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2 space-y-2">
                  <Label htmlFor="edit-task-title">Task Title *</Label>
                  <Input
                    id="edit-task-title"
                    placeholder="Enter task title"
                    value={selectedTask.title}
                    onChange={(e) => setSelectedTask({ ...selectedTask, title: e.target.value })}
                  />
                </div>
                <div className="col-span-2 space-y-2">
                  <Label htmlFor="edit-task-description">Task Description</Label>
                  <Textarea
                    id="edit-task-description"
                    placeholder="Enter task description"
                    value={selectedTask.description}
                    onChange={(e) => setSelectedTask({ ...selectedTask, description: e.target.value })}
                    rows={3}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-project">Associated Project *</Label>
                  <Select value={selectedTask.project} onValueChange={(value) => setSelectedTask({ ...selectedTask, project: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {projects.map(project => (
                        <SelectItem key={project} value={project}>{project}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-assignee">Assigned To *</Label>
                  <Select value={selectedTask.assignee} onValueChange={(value) => setSelectedTask({ ...selectedTask, assignee: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {employees.map(emp => (
                        <SelectItem key={emp.id} value={emp.id}>{emp.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-priority">Priority *</Label>
                  <Select value={selectedTask.priority} onValueChange={(value: 'High' | 'Medium' | 'Low') => setSelectedTask({ ...selectedTask, priority: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="High">High</SelectItem>
                      <SelectItem value="Medium">Medium</SelectItem>
                      <SelectItem value="Low">Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-status">Status *</Label>
                  <Select value={selectedTask.status} onValueChange={(value: 'To Do' | 'In Progress' | 'Completed') => setSelectedTask({ ...selectedTask, status: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="To Do">To Do</SelectItem>
                      <SelectItem value="In Progress">In Progress</SelectItem>
                      <SelectItem value="Completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-start-date">Start Date *</Label>
                  <Input
                    id="edit-start-date"
                    type="date"
                    value={selectedTask.startDate}
                    onChange={(e) => setSelectedTask({ ...selectedTask, startDate: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-due-date">Due Date *</Label>
                  <Input
                    id="edit-due-date"
                    type="date"
                    value={selectedTask.dueDate}
                    onChange={(e) => setSelectedTask({ ...selectedTask, dueDate: e.target.value })}
                  />
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => {
              setIsEditDialogOpen(false);
              setSelectedTask(null);
            }}>
              Cancel
            </Button>
            <Button onClick={handleEditTask} className="bg-blue-600 hover:bg-blue-700">
              Update Task
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Task Statistics */}
      <Card>
        <CardHeader>
          <CardTitle>Task Statistics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <p className="text-3xl font-bold text-gray-900">
                {tasks.length}
              </p>
              <p className="text-sm text-gray-500 mt-1">Total Tasks</p>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded-lg">
              <p className="text-3xl font-bold text-orange-600">
                {groupedTasks['To Do'].length}
              </p>
              <p className="text-sm text-gray-500 mt-1">To Do</p>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <p className="text-3xl font-bold text-blue-600">
                {groupedTasks['In Progress'].length}
              </p>
              <p className="text-sm text-gray-500 mt-1">In Progress</p>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <p className="text-3xl font-bold text-green-600">
                {groupedTasks['Completed'].length}
              </p>
              <p className="text-sm text-gray-500 mt-1">Completed</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Badge } from '../ui/badge';
import { Plus, Calendar, Users, MoreVertical } from 'lucide-react';
import { Progress } from '../ui/progress';
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

const mockProjects = [
  { id: 1, name: 'Website Redesign', client: 'Tech Corp Inc', status: 'Ongoing', progress: 75, team: 5, deadline: '2026-02-15' },
  { id: 2, name: 'Mobile App Development', client: 'Global Solutions', status: 'Ongoing', progress: 45, team: 8, deadline: '2026-03-20' },
  { id: 3, name: 'API Integration', client: 'Innovation Hub', status: 'Ongoing', progress: 90, team: 3, deadline: '2026-01-30' },
  { id: 4, name: 'Database Migration', client: 'Digital Ventures', status: 'On Hold', progress: 30, team: 4, deadline: '2026-04-10' },
  { id: 5, name: 'E-commerce Platform', client: 'NextGen Tech', status: 'Ongoing', progress: 60, team: 7, deadline: '2026-02-28' },
  { id: 6, name: 'Cloud Infrastructure', client: 'Tech Corp Inc', status: 'Completed', progress: 100, team: 6, deadline: '2025-12-15' },
];

const statusColors = {
  'Ongoing': 'bg-blue-100 text-blue-700 border-blue-200',
  'Completed': 'bg-green-100 text-green-700 border-green-200',
  'On Hold': 'bg-orange-100 text-orange-700 border-orange-200',
};

export default function Projects() {
  const [filter, setFilter] = useState('All');
  const [projects, setProjects] = useState(mockProjects);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [newProject, setNewProject] = useState({
    name: '',
    client: '',
    team: '',
    deadline: '',
  });

  const filteredProjects = filter === 'All' 
    ? projects 
    : projects.filter(p => p.status === filter);

  const handleCreateProject = () => {
    if (!newProject.name || !newProject.client || !newProject.team || !newProject.deadline) {
      toast.error('Please fill in all fields');
      return;
    }

    const project = {
      id: projects.length + 1,
      name: newProject.name,
      client: newProject.client,
      status: 'Ongoing' as const,
      progress: 0,
      team: parseInt(newProject.team),
      deadline: newProject.deadline,
    };

    setProjects([...projects, project]);
    setNewProject({ name: '', client: '', team: '', deadline: '' });
    setIsCreateDialogOpen(false);
    toast.success('Project created successfully!');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Project Management</h2>
          <p className="text-gray-500 mt-1">Full project lifecycle control</p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="mr-2 h-4 w-4" />
              Create New Project
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Create New Project</DialogTitle>
              <DialogDescription>
                Enter the project details to create a new project.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="project-name">Project Name</Label>
                <Input
                  id="project-name"
                  placeholder="Website Redesign"
                  value={newProject.name}
                  onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="client">Client</Label>
                <Select value={newProject.client} onValueChange={(value) => setNewProject({ ...newProject, client: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a client" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Tech Corp Inc">Tech Corp Inc</SelectItem>
                    <SelectItem value="Global Solutions">Global Solutions</SelectItem>
                    <SelectItem value="Innovation Hub">Innovation Hub</SelectItem>
                    <SelectItem value="Digital Ventures">Digital Ventures</SelectItem>
                    <SelectItem value="NextGen Tech">NextGen Tech</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="team-size">Team Size</Label>
                <Input
                  id="team-size"
                  type="number"
                  placeholder="5"
                  value={newProject.team}
                  onChange={(e) => setNewProject({ ...newProject, team: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="deadline">Deadline</Label>
                <Input
                  id="deadline"
                  type="date"
                  value={newProject.deadline}
                  onChange={(e) => setNewProject({ ...newProject, deadline: e.target.value })}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreateProject} className="bg-blue-600 hover:bg-blue-700">
                Create Project
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-wrap gap-2">
            {['All', 'Ongoing', 'Completed', 'On Hold'].map((status) => (
              <Button
                key={status}
                variant={filter === status ? 'default' : 'outline'}
                onClick={() => setFilter(status)}
                className={filter === status ? 'bg-blue-600' : ''}
              >
                {status}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project) => (
          <Card key={project.id} className="hover:shadow-lg transition-all cursor-pointer">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg mb-2">{project.name}</CardTitle>
                  <p className="text-sm text-gray-500">{project.client}</p>
                </div>
                <Button variant="ghost" size="sm">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">Progress</span>
                  <span className="text-sm font-semibold text-gray-900">{project.progress}%</span>
                </div>
                <Progress value={project.progress} className="h-2" />
              </div>

              <div className="flex items-center justify-between">
                <Badge variant="outline" className={statusColors[project.status as keyof typeof statusColors]}>
                  {project.status}
                </Badge>
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-1" />
                    {project.team}
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    {new Date(project.deadline).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t">
                <Button variant="outline" className="w-full">View Details</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-gray-500">No projects found for this filter</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
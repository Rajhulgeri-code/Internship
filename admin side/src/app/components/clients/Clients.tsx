import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Badge } from '../ui/badge';
import { Search, Plus, Eye, Edit, Archive, MessageSquare, Clock } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '../ui/dialog';
import { toast } from 'sonner';

interface Discussion {
  id: number;
  summary: string;
  date: string;
  time: string;
  createdAt: Date;
}

interface Client {
  id: number;
  name: string;
  position: string;
  company: string;
  contact: string;
  phone: string;
  address: string;
  activeProjects: number;
  status: 'Active' | 'Inactive';
  discussions: Discussion[];
}

const mockClients: Client[] = [
  { 
    id: 1, 
    name: 'John Smith', 
    position: 'CTO',
    company: 'Tech Corp Inc', 
    contact: 'john@techcorp.com', 
    phone: '+1 234 567 8900',
    address: '123 Tech Street, Silicon Valley, CA 94025', 
    activeProjects: 5, 
    status: 'Active',
    discussions: [
      { id: 1, summary: 'Initial project discussion for website redesign', date: '2026-01-08', time: '10:30', createdAt: new Date('2026-01-08T10:30:00') },
      { id: 2, summary: 'Reviewed project milestones and timeline', date: '2026-01-05', time: '14:00', createdAt: new Date('2026-01-05T14:00:00') }
    ]
  },
  { 
    id: 2, 
    name: 'Sarah Johnson', 
    position: 'CEO',
    company: 'Global Solutions Ltd', 
    contact: 'sarah@globalsol.com', 
    phone: '+1 234 567 8901',
    address: '456 Business Ave, New York, NY 10001', 
    activeProjects: 3, 
    status: 'Active',
    discussions: [
      { id: 1, summary: 'Discussed mobile app requirements', date: '2026-01-07', time: '11:00', createdAt: new Date('2026-01-07T11:00:00') }
    ]
  },
  { 
    id: 3, 
    name: 'Mike Anderson', 
    position: 'Product Manager',
    company: 'Innovation Hub', 
    contact: 'mike@innohub.com', 
    phone: '+1 234 567 8902',
    address: '789 Innovation Drive, Austin, TX 78701', 
    activeProjects: 2, 
    status: 'Active',
    discussions: []
  },
  { 
    id: 4, 
    name: 'Emily Davis', 
    position: 'VP of Engineering',
    company: 'Digital Ventures', 
    contact: 'emily@digitalv.com', 
    phone: '+1 234 567 8903',
    address: '321 Digital Road, Seattle, WA 98101', 
    activeProjects: 7, 
    status: 'Active',
    discussions: [
      { id: 1, summary: 'Budget planning for Q1 projects', date: '2026-01-06', time: '09:30', createdAt: new Date('2026-01-06T09:30:00') },
      { id: 2, summary: 'Team allocation and resource planning', date: '2026-01-04', time: '15:00', createdAt: new Date('2026-01-04T15:00:00') }
    ]
  },
  { 
    id: 5, 
    name: 'David Wilson', 
    position: 'Director of IT',
    company: 'Smart Systems Inc', 
    contact: 'david@smartsys.com', 
    phone: '+1 234 567 8904',
    address: '654 Systems Boulevard, Boston, MA 02101', 
    activeProjects: 0, 
    status: 'Inactive',
    discussions: []
  },
  { 
    id: 6, 
    name: 'Lisa Chen', 
    position: 'Founder & CEO',
    company: 'NextGen Tech', 
    contact: 'lisa@nextgen.com', 
    phone: '+1 234 567 8905',
    address: '987 Future Lane, San Francisco, CA 94102', 
    activeProjects: 4, 
    status: 'Active',
    discussions: [
      { id: 1, summary: 'Partnership opportunities discussed', date: '2026-01-09', time: '16:00', createdAt: new Date('2026-01-09T16:00:00') }
    ]
  },
];

export default function Clients() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [clients, setClients] = useState<Client[]>(mockClients);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDiscussionDialogOpen, setIsDiscussionDialogOpen] = useState(false);
  const [newClient, setNewClient] = useState({
    name: '',
    position: '',
    company: '',
    contact: '',
    phone: '',
    address: '',
  });
  const [editingClient, setEditingClient] = useState<Client | null>(null);
  const [newDiscussion, setNewDiscussion] = useState({
    summary: '',
    date: '',
    time: '',
  });

  const filteredClients = clients.filter(client =>
    client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    client.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
    client.contact.toLowerCase().includes(searchQuery.toLowerCase()) ||
    client.position.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddClient = () => {
    if (!newClient.name || !newClient.position || !newClient.company || !newClient.contact || !newClient.phone || !newClient.address) {
      toast.error('Please fill in all required fields');
      return;
    }

    const client: Client = {
      id: clients.length + 1,
      name: newClient.name,
      position: newClient.position,
      company: newClient.company,
      contact: newClient.contact,
      phone: newClient.phone,
      address: newClient.address,
      activeProjects: 0,
      status: 'Active',
      discussions: [],
    };

    setClients([...clients, client]);
    setNewClient({ name: '', position: '', company: '', contact: '', phone: '', address: '' });
    setIsAddDialogOpen(false);
    toast.success('Client added successfully!');
  };

  const handleUpdateClient = () => {
    if (!editingClient) return;

    if (!editingClient.name || !editingClient.position || !editingClient.company || !editingClient.contact || !editingClient.phone || !editingClient.address) {
      toast.error('Please fill in all required fields');
      return;
    }

    setClients(clients.map(c => c.id === editingClient.id ? editingClient : c));
    setIsEditDialogOpen(false);
    setEditingClient(null);
    toast.success('Client updated successfully!');
  };

  const handleAddDiscussion = () => {
    if (!selectedClient || !newDiscussion.summary || !newDiscussion.date || !newDiscussion.time) {
      toast.error('Please fill in all discussion fields');
      return;
    }

    const discussion: Discussion = {
      id: (selectedClient.discussions.length + 1),
      summary: newDiscussion.summary,
      date: newDiscussion.date,
      time: newDiscussion.time,
      createdAt: new Date(`${newDiscussion.date}T${newDiscussion.time}:00`),
    };

    const updatedClient = {
      ...selectedClient,
      discussions: [...selectedClient.discussions, discussion].sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime()),
    };

    setClients(clients.map(c => c.id === selectedClient.id ? updatedClient : c));
    setSelectedClient(updatedClient);
    setNewDiscussion({ summary: '', date: '', time: '' });
    setIsDiscussionDialogOpen(false);
    toast.success('Discussion added successfully!');
  };

  const handleArchiveClient = (clientId: number) => {
    setClients(clients.map(c => 
      c.id === clientId ? { ...c, status: c.status === 'Active' ? 'Inactive' : 'Active' } : c
    ));
    toast.success('Client status updated');
  };

  const openEditDialog = (client: Client) => {
    setEditingClient({ ...client });
    setIsEditDialogOpen(true);
  };

  const openViewDialog = (client: Client) => {
    setSelectedClient(client);
    setIsViewDialogOpen(true);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Client Management</h2>
          <p className="text-gray-500 mt-1">Manage all client information centrally</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="mr-2 h-4 w-4" />
              Add New Client
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Add New Client</DialogTitle>
              <DialogDescription>
                Enter the client details to add them to your system.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="client-name">Client Name *</Label>
                  <Input
                    id="client-name"
                    placeholder="John Smith"
                    value={newClient.name}
                    onChange={(e) => setNewClient({ ...newClient, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="position">Position / Designation *</Label>
                  <Input
                    id="position"
                    placeholder="CTO"
                    value={newClient.position}
                    onChange={(e) => setNewClient({ ...newClient, position: e.target.value })}
                  />
                </div>
                <div className="col-span-2 space-y-2">
                  <Label htmlFor="company-name">Company Name *</Label>
                  <Input
                    id="company-name"
                    placeholder="Tech Corp Inc"
                    value={newClient.company}
                    onChange={(e) => setNewClient({ ...newClient, company: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john@techcorp.com"
                    value={newClient.contact}
                    onChange={(e) => setNewClient({ ...newClient, contact: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Contact Number *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+1 234 567 8900"
                    value={newClient.phone}
                    onChange={(e) => setNewClient({ ...newClient, phone: e.target.value })}
                  />
                </div>
                <div className="col-span-2 space-y-2">
                  <Label htmlFor="address">Company Address *</Label>
                  <Textarea
                    id="address"
                    placeholder="123 Tech Street, Silicon Valley, CA 94025"
                    value={newClient.address}
                    onChange={(e) => setNewClient({ ...newClient, address: e.target.value })}
                    rows={2}
                  />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddClient} className="bg-blue-600 hover:bg-blue-700">
                Add Client
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search clients by name, company, position, or contact..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Clients Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Clients ({filteredClients.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Client Name</TableHead>
                  <TableHead>Position</TableHead>
                  <TableHead>Company</TableHead>
                  <TableHead>Contact Info</TableHead>
                  <TableHead>Projects</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredClients.map((client) => (
                  <TableRow key={client.id} className="hover:bg-gray-50">
                    <TableCell className="font-medium">{client.name}</TableCell>
                    <TableCell className="text-sm text-gray-600">{client.position}</TableCell>
                    <TableCell>{client.company}</TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div>{client.contact}</div>
                        <div className="text-gray-500">{client.phone}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                        {client.activeProjects} Projects
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={client.status === 'Active' ? 'bg-green-100 text-green-700 hover:bg-green-100' : 'bg-gray-100 text-gray-700 hover:bg-gray-100'}>
                        {client.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => openViewDialog(client)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => openEditDialog(client)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleArchiveClient(client.id)}>
                          <Archive className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* View Client Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Client Details</DialogTitle>
            <DialogDescription>
              View and manage client information and discussion history
            </DialogDescription>
          </DialogHeader>
          {selectedClient && (
            <div className="space-y-6">
              {/* Client Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">Client Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Client Name</p>
                    <p className="font-medium">{selectedClient.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Position</p>
                    <p className="font-medium">{selectedClient.position}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Company</p>
                    <p className="font-medium">{selectedClient.company}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-medium">{selectedClient.contact}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Phone</p>
                    <p className="font-medium">{selectedClient.phone}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Active Projects</p>
                    <p className="font-medium">{selectedClient.activeProjects}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-sm text-gray-500">Address</p>
                    <p className="font-medium">{selectedClient.address}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Status</p>
                    <Badge className={selectedClient.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}>
                      {selectedClient.status}
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Discussion History */}
              <div className="space-y-4 border-t pt-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">Discussion History</h3>
                  <Dialog open={isDiscussionDialogOpen} onOpenChange={setIsDiscussionDialogOpen}>
                    <DialogTrigger asChild>
                      <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                        <Plus className="mr-2 h-4 w-4" />
                        Add Discussion
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-md">
                      <DialogHeader>
                        <DialogTitle>Add Discussion Note</DialogTitle>
                        <DialogDescription>
                          Record a new client discussion or meeting
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4 py-4">
                        <div className="space-y-2">
                          <Label htmlFor="discussion-summary">Discussion Summary *</Label>
                          <Textarea
                            id="discussion-summary"
                            placeholder="Enter discussion notes..."
                            value={newDiscussion.summary}
                            onChange={(e) => setNewDiscussion({ ...newDiscussion, summary: e.target.value })}
                            rows={4}
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="discussion-date">Date *</Label>
                            <Input
                              id="discussion-date"
                              type="date"
                              value={newDiscussion.date}
                              onChange={(e) => setNewDiscussion({ ...newDiscussion, date: e.target.value })}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="discussion-time">Time *</Label>
                            <Input
                              id="discussion-time"
                              type="time"
                              value={newDiscussion.time}
                              onChange={(e) => setNewDiscussion({ ...newDiscussion, time: e.target.value })}
                            />
                          </div>
                        </div>
                      </div>
                      <DialogFooter>
                        <Button variant="outline" onClick={() => setIsDiscussionDialogOpen(false)}>
                          Cancel
                        </Button>
                        <Button onClick={handleAddDiscussion} className="bg-blue-600 hover:bg-blue-700">
                          Save Discussion
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>

                {selectedClient.discussions.length > 0 ? (
                  <div className="space-y-3">
                    {selectedClient.discussions.map((discussion) => (
                      <Card key={discussion.id} className="bg-gray-50">
                        <CardContent className="pt-4">
                          <div className="space-y-2">
                            <div className="flex items-start justify-between">
                              <div className="flex items-center gap-2 text-sm text-gray-600">
                                <MessageSquare className="h-4 w-4" />
                                <span className="font-medium">{new Date(discussion.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                              </div>
                              <div className="flex items-center gap-1 text-sm text-gray-500">
                                <Clock className="h-3 w-3" />
                                <span>{discussion.time}</span>
                              </div>
                            </div>
                            <p className="text-sm text-gray-800">{discussion.summary}</p>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <MessageSquare className="h-12 w-12 mx-auto mb-2 text-gray-300" />
                    <p>No discussions recorded yet</p>
                    <p className="text-sm">Click "Add Discussion" to record your first meeting</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Edit Client Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Client</DialogTitle>
            <DialogDescription>
              Update client information
            </DialogDescription>
          </DialogHeader>
          {editingClient && (
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-client-name">Client Name *</Label>
                  <Input
                    id="edit-client-name"
                    placeholder="John Smith"
                    value={editingClient.name}
                    onChange={(e) => setEditingClient({ ...editingClient, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-position">Position / Designation *</Label>
                  <Input
                    id="edit-position"
                    placeholder="CTO"
                    value={editingClient.position}
                    onChange={(e) => setEditingClient({ ...editingClient, position: e.target.value })}
                  />
                </div>
                <div className="col-span-2 space-y-2">
                  <Label htmlFor="edit-company-name">Company Name *</Label>
                  <Input
                    id="edit-company-name"
                    placeholder="Tech Corp Inc"
                    value={editingClient.company}
                    onChange={(e) => setEditingClient({ ...editingClient, company: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-email">Email Address *</Label>
                  <Input
                    id="edit-email"
                    type="email"
                    placeholder="john@techcorp.com"
                    value={editingClient.contact}
                    onChange={(e) => setEditingClient({ ...editingClient, contact: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-phone">Contact Number *</Label>
                  <Input
                    id="edit-phone"
                    type="tel"
                    placeholder="+1 234 567 8900"
                    value={editingClient.phone}
                    onChange={(e) => setEditingClient({ ...editingClient, phone: e.target.value })}
                  />
                </div>
                <div className="col-span-2 space-y-2">
                  <Label htmlFor="edit-address">Company Address *</Label>
                  <Textarea
                    id="edit-address"
                    placeholder="123 Tech Street, Silicon Valley, CA 94025"
                    value={editingClient.address}
                    onChange={(e) => setEditingClient({ ...editingClient, address: e.target.value })}
                    rows={2}
                  />
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => {
              setIsEditDialogOpen(false);
              setEditingClient(null);
            }}>
              Cancel
            </Button>
            <Button onClick={handleUpdateClient} className="bg-blue-600 hover:bg-blue-700">
              Update Client
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

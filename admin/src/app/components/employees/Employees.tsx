import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Badge } from '../ui/badge';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { Switch } from '../ui/switch';
import { UserPlus, Shield, Eye, Edit, Trash2 } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
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

interface Employee {
  id: number;
  name: string;
  email: string;
  role: 'Admin' | 'Manager' | 'Employee';
  status: 'Active' | 'Inactive';
  permissions: string[];
  lastLogin: string;
}

const mockEmployees: Employee[] = [
  { id: 1, name: 'John Doe', email: 'john@innoinfinite.com', role: 'Admin', status: 'Active', permissions: ['View', 'Edit', 'Approve', 'Delete'], lastLogin: '2 hours ago' },
  { id: 2, name: 'Sarah Smith', email: 'sarah@innoinfinite.com', role: 'Manager', status: 'Active', permissions: ['View', 'Edit', 'Approve'], lastLogin: '5 hours ago' },
  { id: 3, name: 'Mike Johnson', email: 'mike@innoinfinite.com', role: 'Employee', status: 'Active', permissions: ['View', 'Edit'], lastLogin: '1 day ago' },
  { id: 4, name: 'Emily Brown', email: 'emily@innoinfinite.com', role: 'Manager', status: 'Active', permissions: ['View', 'Edit', 'Approve'], lastLogin: '3 hours ago' },
  { id: 5, name: 'David Lee', email: 'david@innoinfinite.com', role: 'Employee', status: 'Inactive', permissions: ['View', 'Edit'], lastLogin: '5 days ago' },
  { id: 6, name: 'Lisa Wong', email: 'lisa@innoinfinite.com', role: 'Employee', status: 'Active', permissions: ['View', 'Edit'], lastLogin: '30 min ago' },
];

const roleColors = {
  Admin: 'bg-red-100 text-red-700 border-red-200',
  Manager: 'bg-blue-100 text-blue-700 border-blue-200',
  Employee: 'bg-green-100 text-green-700 border-green-200',
};

export default function Employees() {
  const [employees, setEmployees] = useState<Employee[]>(mockEmployees);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);
  const [newEmployee, setNewEmployee] = useState({
    name: '',
    email: '',
    role: 'Employee' as 'Admin' | 'Manager' | 'Employee',
  });

  const toggleEmployeeStatus = (id: number) => {
    setEmployees(employees.map(emp => 
      emp.id === id 
        ? { ...emp, status: emp.status === 'Active' ? 'Inactive' : 'Active' }
        : emp
    ));
    toast.success('Employee status updated');
  };

  const updateEmployeeRole = (id: number, newRole: 'Admin' | 'Manager' | 'Employee') => {
    const rolePermissions = {
      Admin: ['View', 'Edit', 'Approve', 'Delete'],
      Manager: ['View', 'Edit', 'Approve'],
      Employee: ['View', 'Edit'],
    };

    setEmployees(employees.map(emp => 
      emp.id === id 
        ? { ...emp, role: newRole, permissions: rolePermissions[newRole] }
        : emp
    ));
    toast.success('Employee role updated');
  };

  const handleAddEmployee = () => {
    if (!newEmployee.name || !newEmployee.email) {
      toast.error('Please fill in all fields');
      return;
    }

    const rolePermissions = {
      Admin: ['View', 'Edit', 'Approve', 'Delete'],
      Manager: ['View', 'Edit', 'Approve'],
      Employee: ['View', 'Edit'],
    };

    const employee: Employee = {
      id: employees.length + 1,
      name: newEmployee.name,
      email: newEmployee.email,
      role: newEmployee.role,
      status: 'Active',
      permissions: rolePermissions[newEmployee.role],
      lastLogin: 'Never',
    };

    setEmployees([...employees, employee]);
    setNewEmployee({ name: '', email: '', role: 'Employee' });
    setIsAddDialogOpen(false);
    toast.success('Employee added successfully!');
  };

  const handleUpdateEmployee = () => {
    if (!editingEmployee) return;

    if (!editingEmployee.name || !editingEmployee.email) {
      toast.error('Please fill in all fields');
      return;
    }

    const rolePermissions = {
      Admin: ['View', 'Edit', 'Approve', 'Delete'],
      Manager: ['View', 'Edit', 'Approve'],
      Employee: ['View', 'Edit'],
    };

    setEmployees(employees.map(emp => 
      emp.id === editingEmployee.id 
        ? { ...editingEmployee, permissions: rolePermissions[editingEmployee.role] }
        : emp
    ));
    setIsEditDialogOpen(false);
    setEditingEmployee(null);
    toast.success('Employee updated successfully!');
  };

  const handleDeleteEmployee = (id: number) => {
    setEmployees(employees.filter(emp => emp.id !== id));
    toast.success('Employee deleted successfully');
  };

  const openViewDialog = (employee: Employee) => {
    setSelectedEmployee(employee);
    setIsViewDialogOpen(true);
  };

  const openEditDialog = (employee: Employee) => {
    setEditingEmployee({ ...employee });
    setIsEditDialogOpen(true);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Employee Access Controller</h2>
          <p className="text-gray-500 mt-1">Role-based access management</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <UserPlus className="mr-2 h-4 w-4" />
              Add Employee
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Add New Employee</DialogTitle>
              <DialogDescription>
                Add a new employee to the system with role assignment.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="emp-name">Full Name *</Label>
                <Input
                  id="emp-name"
                  placeholder="John Doe"
                  value={newEmployee.name}
                  onChange={(e) => setNewEmployee({ ...newEmployee, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="emp-email">Email Address *</Label>
                <Input
                  id="emp-email"
                  type="email"
                  placeholder="john@innoinfinite.com"
                  value={newEmployee.email}
                  onChange={(e) => setNewEmployee({ ...newEmployee, email: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="emp-role">Role *</Label>
                <Select value={newEmployee.role} onValueChange={(value: 'Admin' | 'Manager' | 'Employee') => setNewEmployee({ ...newEmployee, role: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Admin">Administrator</SelectItem>
                    <SelectItem value="Manager">Manager</SelectItem>
                    <SelectItem value="Employee">Employee</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddEmployee} className="bg-blue-600 hover:bg-blue-700">
                Add Employee
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-3xl font-bold text-gray-900">{employees.length}</p>
              <p className="text-sm text-gray-500 mt-1">Total Employees</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-3xl font-bold text-red-600">
                {employees.filter(e => e.role === 'Admin').length}
              </p>
              <p className="text-sm text-gray-500 mt-1">Administrators</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-3xl font-bold text-blue-600">
                {employees.filter(e => e.role === 'Manager').length}
              </p>
              <p className="text-sm text-gray-500 mt-1">Managers</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-3xl font-bold text-green-600">
                {employees.filter(e => e.status === 'Active').length}
              </p>
              <p className="text-sm text-gray-500 mt-1">Active Users</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Employees Table */}
      <Card>
        <CardHeader>
          <CardTitle>Employee List & Permissions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Employee</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Permissions</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Last Login</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {employees.map((employee) => (
                  <TableRow key={employee.id} className="hover:bg-gray-50">
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <Avatar>
                          <AvatarFallback className="bg-blue-600 text-white">
                            {employee.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{employee.name}</p>
                          <p className="text-sm text-gray-500">{employee.email}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Select
                        value={employee.role}
                        onValueChange={(value) => updateEmployeeRole(employee.id, value)}
                      >
                        <SelectTrigger className="w-32">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Admin">Admin</SelectItem>
                          <SelectItem value="Manager">Manager</SelectItem>
                          <SelectItem value="Employee">Employee</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {employee.permissions.map((perm, idx) => (
                          <Badge
                            key={idx}
                            variant="outline"
                            className="text-xs bg-gray-50"
                          >
                            <Shield className="h-3 w-3 mr-1" />
                            {perm}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Switch
                          checked={employee.status === 'Active'}
                          onCheckedChange={() => toggleEmployeeStatus(employee.id)}
                        />
                        <Badge className={employee.status === 'Active' ? 'bg-green-100 text-green-700 hover:bg-green-100' : 'bg-gray-100 text-gray-700 hover:bg-gray-100'}>
                          {employee.status}
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm text-gray-500">{employee.lastLogin}</span>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <Button variant="ghost" size="sm" onClick={() => openViewDialog(employee)}>
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => openEditDialog(employee)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleDeleteEmployee(employee.id)}>
                          <Trash2 className="h-4 w-4 text-red-500" />
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

      {/* Role Descriptions */}
      <Card>
        <CardHeader>
          <CardTitle>Role Descriptions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 border rounded-lg">
              <Badge variant="outline" className="bg-red-100 text-red-700 border-red-200 mb-3">
                Administrator
              </Badge>
              <p className="text-sm text-gray-600">
                Full system access with all permissions including user management and system configuration.
              </p>
            </div>
            <div className="p-4 border rounded-lg">
              <Badge variant="outline" className="bg-blue-100 text-blue-700 border-blue-200 mb-3">
                Manager
              </Badge>
              <p className="text-sm text-gray-600">
                Can view, edit, and approve content. Manages team projects and client relationships.
              </p>
            </div>
            <div className="p-4 border rounded-lg">
              <Badge variant="outline" className="bg-green-100 text-green-700 border-green-200 mb-3">
                Employee
              </Badge>
              <p className="text-sm text-gray-600">
                Can view and edit assigned tasks and projects. Limited administrative access.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* View Employee Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Employee Details</DialogTitle>
            <DialogDescription>
              View details of the selected employee.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="emp-name">Full Name</Label>
              <Input
                id="emp-name"
                placeholder="John Doe"
                value={selectedEmployee?.name || ''}
                readOnly
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="emp-email">Email Address</Label>
              <Input
                id="emp-email"
                type="email"
                placeholder="john@innoinfinite.com"
                value={selectedEmployee?.email || ''}
                readOnly
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="emp-role">Role</Label>
              <Input
                id="emp-role"
                placeholder="Admin"
                value={selectedEmployee?.role || ''}
                readOnly
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="emp-status">Status</Label>
              <Input
                id="emp-status"
                placeholder="Active"
                value={selectedEmployee?.status || ''}
                readOnly
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="emp-permissions">Permissions</Label>
              <Input
                id="emp-permissions"
                placeholder="View, Edit, Approve, Delete"
                value={selectedEmployee?.permissions.join(', ') || ''}
                readOnly
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="emp-last-login">Last Login</Label>
              <Input
                id="emp-last-login"
                placeholder="2 hours ago"
                value={selectedEmployee?.lastLogin || ''}
                readOnly
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsViewDialogOpen(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Employee Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Employee</DialogTitle>
            <DialogDescription>
              Update details of the selected employee.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="emp-name">Full Name *</Label>
              <Input
                id="emp-name"
                placeholder="John Doe"
                value={editingEmployee?.name || ''}
                onChange={(e) => setEditingEmployee({ ...editingEmployee, name: e.target.value } as Employee)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="emp-email">Email Address *</Label>
              <Input
                id="emp-email"
                type="email"
                placeholder="john@innoinfinite.com"
                value={editingEmployee?.email || ''}
                onChange={(e) => setEditingEmployee({ ...editingEmployee, email: e.target.value } as Employee)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="emp-role">Role *</Label>
              <Select value={editingEmployee?.role || 'Employee'} onValueChange={(value: 'Admin' | 'Manager' | 'Employee') => setEditingEmployee({ ...editingEmployee, role: value } as Employee)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Admin">Administrator</SelectItem>
                  <SelectItem value="Manager">Manager</SelectItem>
                  <SelectItem value="Employee">Employee</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleUpdateEmployee} className="bg-blue-600 hover:bg-blue-700">
              Update Employee
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
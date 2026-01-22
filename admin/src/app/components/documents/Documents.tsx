import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Upload, FileText, Image, File, Download, Eye, Trash2, Search, Folder, Users, Shield } from 'lucide-react';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { toast } from 'sonner';
import { uploadDocument, getAllDocuments, deleteDocument as apiDeleteDocument, getToken } from '../../services/api';

interface Document {
  _id?: string;
  id?: number;
  title: string;
  name?: string;
  type?: string;
  fileType?: string;
  size?: string;
  fileSize?: number;
  uploadedBy?: string;
  date?: string;
  createdAt?: string;
  category?: string;
  source?: 'client' | 'admin';
  client?: string;
  project?: string;
  projectId?: string;
  description?: string;
  fileUrl?: string;
  fileName?: string;
}

// Client Documents - uploaded by clients from client portal (mock for now)
const mockClientDocuments: Document[] = [
  { id: 1, name: 'Requirements_Doc_v2.pdf', type: 'PDF', size: '3.2 MB', uploadedBy: 'John Smith (Tech Corp)', date: '2026-01-08', category: 'Requirements', source: 'client', client: 'Tech Corp Inc', project: 'Website Redesign', title: 'Requirements Doc v2' },
  { id: 2, name: 'Brand_Guidelines.pdf', type: 'PDF', size: '8.4 MB', uploadedBy: 'Sarah Johnson (Global Solutions)', date: '2026-01-07', category: 'Design', source: 'client', client: 'Global Solutions Ltd', project: 'Mobile App Development', title: 'Brand Guidelines' },
  { id: 3, name: 'Content_Assets.zip', type: 'Archive', size: '24.1 MB', uploadedBy: 'Mike Anderson (Innovation Hub)', date: '2026-01-06', category: 'Assets', source: 'client', client: 'Innovation Hub', project: 'API Integration', title: 'Content Assets' },
  { id: 4, name: 'Project_Brief.docx', type: 'Word', size: '456 KB', uploadedBy: 'Emily Davis (Digital Ventures)', date: '2026-01-05', category: 'Planning', source: 'client', client: 'Digital Ventures', project: 'E-commerce Platform', title: 'Project Brief' },
  { id: 5, name: 'Logo_Files.zip', type: 'Archive', size: '12.3 MB', uploadedBy: 'Lisa Chen (NextGen Tech)', date: '2026-01-04', category: 'Design', source: 'client', client: 'NextGen Tech', project: 'Website Redesign', title: 'Logo Files' },
];

const fileIcons = {
  PDF: <FileText className="h-5 w-5 text-red-500" />,
  Figma: <File className="h-5 w-5 text-purple-500" />,
  Word: <FileText className="h-5 w-5 text-blue-500" />,
  Image: <Image className="h-5 w-5 text-green-500" />,
  Text: <FileText className="h-5 w-5 text-gray-500" />,
  Excel: <FileText className="h-5 w-5 text-green-600" />,
  Archive: <Folder className="h-5 w-5 text-orange-500" />,
  'application/pdf': <FileText className="h-5 w-5 text-red-500" />,
  'image/jpeg': <Image className="h-5 w-5 text-green-500" />,
  'image/png': <Image className="h-5 w-5 text-green-500" />,
};

const projects = ['Website Redesign', 'Mobile App Development', 'API Integration', 'Database Migration', 'E-commerce Platform', 'Cloud Infrastructure'];
const adminCategories = ['Proposals', 'Technical', 'Contracts', 'Internal', 'Financial', 'Reports'];

export default function Documents() {
  const [clientSearchQuery, setClientSearchQuery] = useState('');
  const [adminSearchQuery, setAdminSearchQuery] = useState('');
  const [selectedClientFilter, setSelectedClientFilter] = useState('All');
  const [selectedProjectFilter, setSelectedProjectFilter] = useState('All');
  const [clientDocuments, setClientDocuments] = useState<Document[]>(mockClientDocuments);
  const [adminDocuments, setAdminDocuments] = useState<Document[]>([]);
  const [isAddAdminDocDialogOpen, setIsAddAdminDocDialogOpen] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [newAdminDocument, setNewAdminDocument] = useState({
    title: '',
    description: '',
    project: '',
    category: '',
  });

  // Fetch admin documents from backend
  useEffect(() => {
    fetchAdminDocuments();
  }, []);

  const fetchAdminDocuments = async () => {
    try {
      const token = getToken();
      if (!token) return;

      const response = await getAllDocuments(token);
      if (response.success) {
        setAdminDocuments(response.data);
      }
    } catch (error: any) {
      console.error('Error fetching documents:', error);
    }
  };

  // Get unique clients and projects for filters
  const uniqueClients = ['All', ...Array.from(new Set(clientDocuments.map(doc => doc.client).filter(Boolean)))];
  const uniqueProjects = ['All', ...Array.from(new Set(clientDocuments.map(doc => doc.project).filter(Boolean)))];

  // Filter client documents
  const filteredClientDocuments = clientDocuments.filter(doc => {
    const matchesSearch = (doc.name || doc.title).toLowerCase().includes(clientSearchQuery.toLowerCase()) ||
                         (doc.uploadedBy && doc.uploadedBy.toLowerCase().includes(clientSearchQuery.toLowerCase())) ||
                         (doc.client && doc.client.toLowerCase().includes(clientSearchQuery.toLowerCase())) ||
                         (doc.project && doc.project.toLowerCase().includes(clientSearchQuery.toLowerCase()));
    const matchesClient = selectedClientFilter === 'All' || doc.client === selectedClientFilter;
    const matchesProject = selectedProjectFilter === 'All' || doc.project === selectedProjectFilter;
    return matchesSearch && matchesClient && matchesProject;
  });

  // Filter admin documents
  const filteredAdminDocuments = adminDocuments.filter(doc => {
    const matchesSearch = (doc.title || doc.fileName || '').toLowerCase().includes(adminSearchQuery.toLowerCase()) ||
                         (doc.category && doc.category.toLowerCase().includes(adminSearchQuery.toLowerCase())) ||
                         (doc.project && doc.project.toLowerCase().includes(adminSearchQuery.toLowerCase()));
    return matchesSearch;
  });

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      
      // Auto-fill title if empty
      if (!newAdminDocument.title) {
        setNewAdminDocument({ ...newAdminDocument, title: file.name });
      }
      
      toast.success(`Selected: ${file.name}`);
    }
  };

  const handleAddAdminDocument = async () => {
    if (!newAdminDocument.title || !newAdminDocument.category) {
      toast.error('Please fill in title and category');
      return;
    }

    if (!selectedFile) {
      toast.error('Please select a file to upload');
      return;
    }

    setUploadProgress(true);

    try {
      const token = getToken();
      if (!token) {
        toast.error('You must be logged in');
        return;
      }

      // Create FormData
      const formData = new FormData();
      formData.append('file', selectedFile);
      formData.append('title', newAdminDocument.title);
      formData.append('category', newAdminDocument.category);
      if (newAdminDocument.description) {
        formData.append('description', newAdminDocument.description);
      }
      if (newAdminDocument.project && newAdminDocument.project !== 'none') {
        formData.append('project', newAdminDocument.project);
      }

      // Upload to backend
      const response = await uploadDocument(formData, token);

      if (response.success) {
        toast.success('Document uploaded successfully!');
        
        // Refresh document list
        await fetchAdminDocuments();
        
        // Reset form
        setNewAdminDocument({ title: '', description: '', project: '', category: '' });
        setSelectedFile(null);
        setIsAddAdminDocDialogOpen(false);
        
        // Reset file input
        const fileInput = document.getElementById('file-upload') as HTMLInputElement;
        if (fileInput) {
          fileInput.value = '';
        }
      }
    } catch (error: any) {
      toast.error(error.message || 'Upload failed');
    } finally {
      setUploadProgress(false);
    }
  };

  const handleDeleteClientDocument = (docId: number) => {
    setClientDocuments(clientDocuments.filter(d => d.id !== docId));
    toast.success('Client document deleted successfully');
  };

  const handleDeleteAdminDocument = async (docId: string) => {
    try {
      const token = getToken();
      if (!token) {
        toast.error('You must be logged in');
        return;
      }

      const response = await apiDeleteDocument(docId, token);
      
      if (response.success) {
        toast.success('Document deleted successfully');
        await fetchAdminDocuments();
      }
    } catch (error: any) {
      toast.error(error.message || 'Delete failed');
    }
  };

  const handleDownload = (fileUrl: string, fileName: string) => {
    window.open(fileUrl, '_blank');
    toast.success(`Opening ${fileName}...`);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + ' KB';
    return (bytes / 1024 / 1024).toFixed(2) + ' MB';
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Document Manager</h2>
          <p className="text-gray-500 mt-1">Centralized file storage & access - Client & Admin Documents</p>
        </div>
      </div>

      {/* Storage Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Documents</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{clientDocuments.length + adminDocuments.length}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <FileText className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Client Documents</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{clientDocuments.length}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Users className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Admin Documents</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{adminDocuments.length}</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Shield className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Storage Used</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  {formatFileSize(adminDocuments.reduce((sum, doc) => sum + (doc.fileSize || 0), 0))}
                </p>
              </div>
              <div className="w-12 h-12 bg-cyan-100 rounded-lg flex items-center justify-center">
                <Folder className="h-6 w-6 text-cyan-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* SECTION 1: CLIENT DOCUMENTS */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Users className="h-6 w-6 text-green-600" />
          <h3 className="text-xl font-bold text-gray-900">Client Documents</h3>
          <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
            Uploaded by Clients
          </Badge>
        </div>

        {/* Client Documents Search and Filters */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search client documents..."
                  value={clientSearchQuery}
                  onChange={(e) => setClientSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={selectedClientFilter} onValueChange={setSelectedClientFilter}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Filter by Client" />
                </SelectTrigger>
                <SelectContent>
                  {uniqueClients.map(client => (
                    <SelectItem key={client} value={client}>{client}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={selectedProjectFilter} onValueChange={setSelectedProjectFilter}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Filter by Project" />
                </SelectTrigger>
                <SelectContent>
                  {uniqueProjects.map(project => (
                    <SelectItem key={project} value={project}>{project}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Client Documents Table */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-green-600" />
              Client Documents ({filteredClientDocuments.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>File Name</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Client</TableHead>
                    <TableHead>Project</TableHead>
                    <TableHead>Uploaded By</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredClientDocuments.length > 0 ? (
                    filteredClientDocuments.map((doc) => (
                      <TableRow key={doc.id} className="hover:bg-gray-50">
                        <TableCell className="font-medium">
                          <div className="flex items-center space-x-2">
                            {fileIcons[doc.type as keyof typeof fileIcons] || <File className="h-5 w-5 text-gray-500" />}
                            <span>{doc.name || doc.title}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{doc.type}</Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                            {doc.client}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <span className="text-sm text-gray-600">{doc.project}</span>
                        </TableCell>
                        <TableCell className="text-sm">{doc.uploadedBy}</TableCell>
                        <TableCell className="text-sm">{doc.date}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end space-x-2">
                            <Button variant="ghost" size="sm" title="View document">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm" onClick={() => doc.name && handleDownload('', doc.name)} title="Download document">
                              <Download className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm" onClick={() => doc.id && handleDeleteClientDocument(doc.id)} title="Delete document">
                              <Trash2 className="h-4 w-4 text-red-500" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                        No client documents found
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* SECTION 2: ADMIN DOCUMENTS */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="h-6 w-6 text-purple-600" />
            <h3 className="text-xl font-bold text-gray-900">Admin Documents</h3>
            <Badge className="bg-purple-100 text-purple-700 hover:bg-purple-100">
              Internal Use Only
            </Badge>
          </div>
          <Dialog open={isAddAdminDocDialogOpen} onOpenChange={setIsAddAdminDocDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Upload className="mr-2 h-4 w-4" />
                Add Document
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Add Admin Document</DialogTitle>
                <DialogDescription>
                  Upload an internal administrative document.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="doc-title">Document Title *</Label>
                  <Input
                    id="doc-title"
                    placeholder="e.g., Project_Proposal_TechCorp.pdf"
                    value={newAdminDocument.title}
                    onChange={(e) => setNewAdminDocument({ ...newAdminDocument, title: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="doc-description">Document Description</Label>
                  <Textarea
                    id="doc-description"
                    placeholder="Brief description of the document..."
                    value={newAdminDocument.description}
                    onChange={(e) => setNewAdminDocument({ ...newAdminDocument, description: e.target.value })}
                    rows={3}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="doc-category">Category *</Label>
                    <Select value={newAdminDocument.category} onValueChange={(value) => setNewAdminDocument({ ...newAdminDocument, category: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {adminCategories.map(cat => (
                          <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="doc-project">Associated Project (Optional)</Label>
                    <Select value={newAdminDocument.project} onValueChange={(value) => setNewAdminDocument({ ...newAdminDocument, project: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select project" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">None</SelectItem>
                        {projects.map(project => (
                          <SelectItem key={project} value={project}>{project}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="file-upload">File Upload *</Label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors">
                    <Upload className="h-12 w-12 mx-auto text-gray-400 mb-3" />
                    <p className="text-sm text-gray-600 mb-1">
                      {selectedFile ? `Selected: ${selectedFile.name}` : 'Drag & drop your file here, or click to browse'}
                    </p>
                    <p className="text-xs text-gray-500">Supported formats: PDF, DOC, DOCX, XLS, XLSX, ZIP, Images (Max 10MB)</p>
                    <Input 
                      id="file-upload" 
                      type="file" 
                      className="hidden" 
                      onChange={handleFileSelect}
                      accept=".pdf,.doc,.docx,.xls,.xlsx,.zip,.jpg,.jpeg,.png"
                    />
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="mt-3"
                      onClick={() => document.getElementById('file-upload')?.click()}
                      type="button"
                    >
                      Choose File
                    </Button>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddAdminDocDialogOpen(false)}>
                  Cancel
                </Button>
                <Button 
                  onClick={handleAddAdminDocument} 
                  className="bg-blue-600 hover:bg-blue-700"
                  disabled={uploadProgress}
                >
                  {uploadProgress ? 'Uploading...' : 'Add Document'}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Admin Documents Search */}
        <Card>
          <CardContent className="pt-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search admin documents..."
                value={adminSearchQuery}
                onChange={(e) => setAdminSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        {/* Admin Documents Table */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-purple-600" />
              Admin Documents ({filteredAdminDocuments.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>File Name</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Project</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredAdminDocuments.length > 0 ? (
                    filteredAdminDocuments.map((doc) => (
                      <TableRow key={doc._id} className="hover:bg-gray-50">
                        <TableCell className="font-medium">
                          <div className="flex items-center space-x-2">
                            {fileIcons[doc.fileType as keyof typeof fileIcons] || <File className="h-5 w-5 text-gray-500" />}
                            <span>{doc.fileName || doc.title}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{doc.fileType?.split('/')[1]?.toUpperCase() || 'FILE'}</Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                            {doc.category || '-'}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <span className="text-sm text-gray-600">{doc.project || '-'}</span>
                        </TableCell>
                        <TableCell>
                          <span className="text-sm text-gray-600 max-w-xs truncate block">
                            {doc.description || '-'}
                          </span>
                        </TableCell>
                        <TableCell className="text-sm">{doc.createdAt && formatDate(doc.createdAt)}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end space-x-2">
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              title="View document"
                              onClick={() => doc.fileUrl && window.open(doc.fileUrl, '_blank')}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              onClick={() => doc.fileUrl && doc.fileName && handleDownload(doc.fileUrl, doc.fileName)} 
                              title="Download document"
                            >
                              <Download className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              onClick={() => doc._id && handleDeleteAdminDocument(doc._id)} 
                              title="Delete document"
                            >
                              <Trash2 className="h-4 w-4 text-red-500" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                        No admin documents found. Click "Add Document" to upload your first file.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
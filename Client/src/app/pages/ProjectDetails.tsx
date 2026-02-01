import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import {
  ArrowLeft,
  Download,
  MessageSquare,
  CheckCircle,
  Clock,
  Upload,
  X
} from 'lucide-react';

import { getProjectById, Project } from '../../services/projectApi';
import {
  getProjectDocuments,
  uploadClientDocument,
  deleteClientDocument,
  ClientDocument
} from '../../services/documentApi';

export function ProjectDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [project, setProject] = useState<Project | null>(null);
  const [documents, setDocuments] = useState<ClientDocument[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadLoading, setUploadLoading] = useState(false);

  const [uploadForm, setUploadForm] = useState({
    title: '',
    description: '',
    category: 'other',
    file: null as File | null
  });

  useEffect(() => {
    if (!id) return;
    fetchProjectData();
    fetchDocuments();
  }, [id]);

  const fetchProjectData = async () => {
    try {
      setLoading(true);
      const res = await getProjectById(id!);
      setProject(res.data);
    } catch (err: any) {
      setError(err?.message || 'Failed to load project');
    } finally {
      setLoading(false);
    }
  };

  const fetchDocuments = async () => {
    try {
      const res = await getProjectDocuments(id!);
      setDocuments(res.data);
    } catch (err) {
      console.error('Failed to load documents', err);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setUploadForm({ ...uploadForm, file: e.target.files[0] });
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!uploadForm.file || !uploadForm.title.trim()) {
      setError('Please provide both file and title');
      return;
    }

    try {
      setUploadLoading(true);
      await uploadClientDocument({
        title: uploadForm.title,
        description: uploadForm.description,
        category: uploadForm.category,
        file: uploadForm.file,
        projectId: id!
      });

      setShowUploadModal(false);
      setUploadForm({ title: '', description: '', category: 'other', file: null });
      fetchDocuments();
      setError('');
    } catch (err: any) {
      setError(err?.message || 'Failed to upload document');
    } finally {
      setUploadLoading(false);
    }
  };

  const handleDeleteDocument = async (docId: string) => {
    if (!window.confirm('Are you sure you want to delete this document?')) return;

    try {
      await deleteClientDocument(docId);
      fetchDocuments();
    } catch (err: any) {
      setError(err?.message || 'Failed to delete document');
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(2)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  const getStatusBadge = (status: string) => {
    const map: Record<string, string> = {
      Submitted: 'bg-blue-100 text-blue-800',
      'In Progress': 'bg-yellow-100 text-yellow-800',
      Completed: 'bg-green-100 text-green-800',
      'In Review': 'bg-purple-100 text-purple-800'
    };
    return map[status] || 'bg-gray-100 text-gray-800';
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin h-12 w-12 border-b-2 border-blue-600 rounded-full" />
      </div>
    );
  }

  if (!project) {
    return (
      <div className="text-center pt-24">
        <h1 className="text-3xl font-bold">Project not found</h1>
        <button onClick={() => navigate('/projects')} className="text-blue-600 mt-4">
          Back to Projects
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-12 bg-gradient-to-br from-blue-50 via-blue-100 to-indigo-100">
      <div className="max-w-7xl mx-auto px-4">

        <button
          onClick={() => navigate('/projects')}
          className="flex items-center text-gray-600 mb-6"
        >
          <ArrowLeft className="mr-2" /> Back to Projects
        </button>

        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold">{project.name}</h1>
            <p className="text-gray-600">{project.service}</p>
          </div>
          <span className={`px-4 py-2 rounded-full text-sm font-semibold ${getStatusBadge(project.status)}`}>
            {project.status}
          </span>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-100 text-red-600 rounded flex justify-between">
            {error}
            <button onClick={() => setError('')}>
              <X />
            </button>
          </div>
        )}

        {/* DOCUMENTS */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Documents</h2>
            <button
              onClick={() => setShowUploadModal(true)}
              className="p-2 bg-blue-600 text-white rounded"
            >
              <Upload size={18} />
            </button>
          </div>

          {documents.length ? (
            documents.map(doc => (
              <div
                key={doc._id}
                className="flex justify-between items-center p-3 bg-gray-50 rounded mb-2"
              >
                <div>
                  <p className="font-medium">{doc.title}</p>
                  <p className="text-xs text-gray-600">
                    {formatFileSize(doc.fileSize)}
                  </p>
                </div>

                <div className="flex gap-2">
                  <a
                    href={doc.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 hover:bg-white rounded"
                  >
                    <Download size={16} />
                  </a>
                  <button
                    onClick={() => handleDeleteDocument(doc._id)}
                    className="p-2 hover:bg-white rounded"
                  >
                    <X size={16} className="text-red-600" />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center">No documents uploaded</p>
          )}
        </div>

        {/* UPLOAD MODAL */}
        {showUploadModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg w-full max-w-md">
              <h2 className="text-xl font-bold mb-4">Upload Document</h2>

              <form onSubmit={handleUpload} className="space-y-4">
                <input
                  type="file"
                  onChange={handleFileChange}
                  required
                />
                <input
                  type="text"
                  placeholder="Title"
                  value={uploadForm.title}
                  onChange={e => setUploadForm({ ...uploadForm, title: e.target.value })}
                  required
                />
                <button
                  type="submit"
                  disabled={uploadLoading}
                  className="w-full bg-blue-600 text-white py-2 rounded"
                >
                  {uploadLoading ? 'Uploading...' : 'Upload'}
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

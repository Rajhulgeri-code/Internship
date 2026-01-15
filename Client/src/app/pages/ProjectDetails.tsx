import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, Download, MessageSquare, CheckCircle, Clock, FileText } from 'lucide-react';

const mockProjectData = {
  1: {
    name: 'CAD Design Project',
    service: 'Engineering Design',
    status: 'In Progress',
    progress: 65,
    description: 'Complete CAD design for new product line including 3D modeling, technical drawings, and simulation analysis.',
    submissionDate: '2025-01-05',
    expectedCompletion: '2025-02-15',
    timeline: [
      { phase: 'Project Submitted', date: '2025-01-05', status: 'completed' },
      { phase: 'Initial Review', date: '2025-01-06', status: 'completed' },
      { phase: 'Design Phase', date: '2025-01-10', status: 'in-progress' },
      { phase: 'Client Review', date: '2025-02-01', status: 'pending' },
      { phase: 'Final Delivery', date: '2025-02-15', status: 'pending' },
    ],
    documents: [
      { name: 'Project Brief.pdf', size: '2.4 MB', date: '2025-01-05' },
      { name: 'Initial Sketches.pdf', size: '5.1 MB', date: '2025-01-10' },
    ],
    updates: [
      { date: '2025-01-10', message: 'Design phase initiated. Our engineering team has started working on the CAD models.' },
      { date: '2025-01-06', message: 'Project has been reviewed and assigned to our senior CAD specialist.' },
    ],
  },
};

export function ProjectDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const project = mockProjectData[id as keyof typeof mockProjectData];

  if (!project) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-indigo-100 pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900">Project not found</h1>
          <button
            onClick={() => navigate('/projects')}
            className="mt-4 text-blue-600 hover:text-blue-700"
          >
            Back to Projects
          </button>
        </div>
      </div>
    );
  }

  const getStatusBadge = (status: string) => {
    const statusStyles = {
      'Submitted': 'bg-blue-100 text-blue-800',
      'In Progress': 'bg-yellow-100 text-yellow-800',
      'Completed': 'bg-green-100 text-green-800',
      'In Review': 'bg-purple-100 text-purple-800',
    };
    return statusStyles[status as keyof typeof statusStyles] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-indigo-100 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <button
            onClick={() => navigate('/projects')}
            className="flex items-center text-gray-600 hover:text-gray-900 mb-4 transition-colors"
          >
            <ArrowLeft size={20} className="mr-2" />
            Back to Projects
          </button>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-900">{project.name}</h1>
              <p className="text-gray-600 mt-2">{project.service}</p>
            </div>
            <span className={`px-4 py-2 text-sm font-semibold rounded-full ${getStatusBadge(project.status)}`}>
              {project.status}
            </span>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Project Overview */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white/80 backdrop-blur-sm rounded-lg shadow-lg p-6"
            >
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Project Overview</h2>
              <p className="text-gray-700 leading-relaxed">{project.description}</p>

              <div className="mt-6 grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Submission Date</p>
                  <p className="font-semibold text-gray-900">{new Date(project.submissionDate).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Expected Completion</p>
                  <p className="font-semibold text-gray-900">{new Date(project.expectedCompletion).toLocaleDateString()}</p>
                </div>
              </div>
            </motion.div>

            {/* Progress Timeline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white/80 backdrop-blur-sm rounded-lg shadow-lg p-6"
            >
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Project Timeline</h2>
              <div className="space-y-4">
                {project.timeline.map((phase, index) => (
                  <div key={index} className="flex items-start">
                    <div className="flex-shrink-0">
                      {phase.status === 'completed' ? (
                        <CheckCircle className="w-6 h-6 text-green-500" />
                      ) : phase.status === 'in-progress' ? (
                        <Clock className="w-6 h-6 text-yellow-500" />
                      ) : (
                        <div className="w-6 h-6 rounded-full border-2 border-gray-300" />
                      )}
                    </div>
                    <div className="ml-4 flex-1">
                      <p className="font-semibold text-gray-900">{phase.phase}</p>
                      <p className="text-sm text-gray-600">{new Date(phase.date).toLocaleDateString()}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Project Updates */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white/80 backdrop-blur-sm rounded-lg shadow-lg p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold text-gray-900">Updates</h2>
                <MessageSquare className="w-6 h-6 text-blue-600" />
              </div>
              <div className="space-y-4">
                {project.updates.map((update, index) => (
                  <div key={index} className="border-l-4 border-blue-500 pl-4 py-2">
                    <p className="text-sm text-gray-600 mb-1">{new Date(update.date).toLocaleDateString()}</p>
                    <p className="text-gray-700">{update.message}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Progress Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white/80 backdrop-blur-sm rounded-lg shadow-lg p-6"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Overall Progress</h3>
              <div className="relative pt-1">
                <div className="flex mb-2 items-center justify-between">
                  <div>
                    <span className="text-3xl font-bold text-blue-600">{project.progress}%</span>
                  </div>
                </div>
                <div className="overflow-hidden h-4 mb-4 text-xs flex rounded-full bg-gray-200">
                  <div
                    style={{ width: `${project.progress}%` }}
                    className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-600 transition-all"
                  />
                </div>
              </div>
            </motion.div>

            {/* Documents */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white/80 backdrop-blur-sm rounded-lg shadow-lg p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Documents</h3>
                <FileText className="w-5 h-5 text-blue-600" />
              </div>
              <div className="space-y-3">
                {project.documents.map((doc, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{doc.name}</p>
                      <p className="text-xs text-gray-600">{doc.size} • {new Date(doc.date).toLocaleDateString()}</p>
                    </div>
                    <button className="p-2 hover:bg-white rounded-lg transition-colors">
                      <Download size={18} className="text-blue-600" />
                    </button>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white/80 backdrop-blur-sm rounded-lg shadow-lg p-6"
            >
              <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold mb-3">
                Contact Project Manager
              </button>
              <button className="w-full bg-gray-100 text-gray-700 py-3 rounded-lg hover:bg-gray-200 transition-colors font-semibold">
                Request Changes
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

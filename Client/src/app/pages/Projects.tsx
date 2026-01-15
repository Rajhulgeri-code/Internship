import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { FolderOpen, Search, Filter, Plus } from 'lucide-react';

const mockProjects = [
  { id: 1, name: 'CAD Design Project', service: 'Engineering Design', status: 'In Progress', date: '2025-01-05', progress: 65 },
  { id: 2, name: 'Web Application Development', service: 'Software Development', status: 'Completed', date: '2024-12-20', progress: 100 },
  { id: 3, name: 'Technical Manual Creation', service: 'Technical Documentation', status: 'Submitted', date: '2025-01-03', progress: 10 },
  { id: 4, name: 'Mobile App UI/UX Design', service: 'UI / UX Design', status: 'In Progress', date: '2025-01-01', progress: 45 },
  { id: 5, name: 'Data Analytics Dashboard', service: 'Data & AI Solutions', status: 'In Review', date: '2024-12-28', progress: 90 },
  { id: 6, name: 'Engineering Team Augmentation', service: 'Staffing', status: 'In Progress', date: '2024-12-15', progress: 70 },
  { id: 7, name: 'Product Documentation', service: 'Technical Documentation', status: 'Completed', date: '2024-12-10', progress: 100 },
  { id: 8, name: 'Machine Learning Model', service: 'Data & AI Solutions', status: 'In Progress', date: '2024-12-05', progress: 55 },
];

export function Projects() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const filteredProjects = mockProjects.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.service.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || project.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

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
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 space-y-4 md:space-y-0">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-4xl font-bold text-gray-900">All Projects</h1>
            <p className="text-gray-600 mt-2">Manage and track your projects</p>
          </motion.div>
          <Link
            to="/create-project"
            className="flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all hover:shadow-lg"
          >
            <Plus size={20} />
            <span>Create New Project</span>
          </Link>
        </div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white/80 backdrop-blur-sm rounded-lg shadow-lg p-6 mb-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Filter */}
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
              >
                <option value="all">All Status</option>
                <option value="Submitted">Submitted</option>
                <option value="In Progress">In Progress</option>
                <option value="In Review">In Review</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
          </div>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Link to={`/project/${project.id}`}>
                <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-lg p-6 hover:shadow-xl transition-all hover:-translate-y-1">
                  <div className="flex items-start justify-between mb-4">
                    <FolderOpen className="w-10 h-10 text-blue-600" />
                    <span className={`px-3 py-1 text-xs font-semibold rounded-full ${getStatusBadge(project.status)}`}>
                      {project.status}
                    </span>
                  </div>

                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{project.name}</h3>
                  <p className="text-gray-600 text-sm mb-4">{project.service}</p>

                  {/* Progress Bar */}
                  <div className="mb-4">
                    <div className="flex justify-between text-sm text-gray-600 mb-1">
                      <span>Progress</span>
                      <span>{project.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full transition-all"
                        style={{ width: `${project.progress}%` }}
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>Started: {new Date(project.date).toLocaleDateString()}</span>
                    <span className="text-blue-600 font-medium">View Details →</span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <FolderOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-xl text-gray-600">No projects found</p>
            <p className="text-gray-500 mt-2">Try adjusting your search or filters</p>
          </motion.div>
        )}
      </div>
    </div>
  );
}

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { FileText, ArrowLeft, X } from 'lucide-react';
import { createProject } from '../../services/projectApi';

export function CreateProject() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    service: '',
    expectedCompletion: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!formData.name.trim() || !formData.description.trim() || !formData.service || !formData.expectedCompletion) {
      setError('Please fill in all required fields');
      return;
    }

    try {
      setLoading(true);
      await createProject({
        name: formData.name,
        service: formData.service,
        description: formData.description,
        expectedCompletion: formData.expectedCompletion
      });
      
      // Show success and redirect
      alert('Project created successfully!');
      navigate('/projects');
    } catch (err: any) {
      setError(err?.message || 'Failed to create project');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-indigo-100 pt-24 pb-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate('/dashboard')}
            className="flex items-center text-gray-600 hover:text-gray-900 mb-4"
          >
            <ArrowLeft size={20} className="mr-2" />
            Back to Dashboard
          </button>
          <h1 className="text-3xl font-bold text-gray-900">Create New Project</h1>
          <p className="text-gray-600 mt-1">Submit a new project request to InnoInfinite Solutions</p>
        </div>

        {/* Error Message */}
        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 rounded-lg flex justify-between items-center"
          >
            <span>{error}</span>
            <button onClick={() => setError('')}><X size={20} /></button>
          </motion.div>
        )}

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white/90 backdrop-blur-sm rounded-lg shadow-lg p-8"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Project Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Project Title *
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter project title"
              />
            </div>

            {/* Service Type */}
            <div>
              <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-2">
                Service Type *
              </label>
              <select
                id="service"
                name="service"
                required
                value={formData.service}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select a service</option>
                <option value="Engineering Design">Engineering Design Services</option>
                <option value="Technical Documentation">Technical Documentation</option>
                <option value="Software Development">Software Development</option>
                <option value="UI / UX Design">UI / UX Design</option>
                <option value="Data & AI Solutions">Data & AI Solutions</option>
                <option value="Staffing">Staffing & Resource Augmentation</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                Project Description *
              </label>
              <textarea
                id="description"
                name="description"
                required
                rows={6}
                value={formData.description}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Describe your project requirements in detail..."
              />
            </div>

            {/* Expected Completion Date */}
            <div>
              <label htmlFor="expectedCompletion" className="block text-sm font-medium text-gray-700 mb-2">
                Expected Completion Date *
              </label>
              <input
                id="expectedCompletion"
                name="expectedCompletion"
                type="date"
                required
                value={formData.expectedCompletion}
                onChange={handleChange}
                min={new Date().toISOString().split('T')[0]}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <p className="mt-2 text-sm text-gray-500">
                When would you like this project to be completed?
              </p>
            </div>

            {/* Submit Buttons */}
            <div className="flex items-center space-x-4 pt-6">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Creating Project...
                  </>
                ) : (
                  'Submit Project'
                )}
              </button>
              <button
                type="button"
                onClick={() => navigate('/dashboard')}
                className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-lg hover:bg-gray-200 transition-colors font-semibold"
              >
                Cancel
              </button>
            </div>
          </form>
        </motion.div>

        {/* Info Box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-8 bg-blue-50/80 backdrop-blur-sm border border-blue-200 rounded-lg p-6"
        >
          <div className="flex items-start">
            <FileText className="w-6 h-6 text-blue-600 mr-3 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">What happens next?</h3>
              <ul className="space-y-2 text-gray-600 text-sm">
                <li>• Your project will be submitted to our team for review</li>
                <li>• You'll receive an email confirmation within 24 hours</li>
                <li>• Our project manager will contact you to discuss details</li>
                <li>• Track your project progress in the dashboard</li>
                <li>• Upload documents anytime from the project details page</li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
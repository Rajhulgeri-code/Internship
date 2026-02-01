import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { FileText, ArrowLeft, X } from 'lucide-react';
import { createProject } from '../../services/projectApi';

export function CreateProject() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    // Project basics
    name: '',
    description: '',
    service: '',
    projectType: '',
    priority: 'Medium',
    expectedCompletion: '',

    // Client info
    clientName: '',
    companyName: '',
    clientEmail: '',
    clientContact: '',

    // Technical
    techStack: '',
    platform: '',
    integrations: '',

    // Commercial
    budgetRange: '',
    engagementModel: '',

    // Extra
    notes: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (
      !formData.name ||
      !formData.description ||
      !formData.service ||
      !formData.clientEmail ||
      !formData.expectedCompletion
    ) {
      setError('Please fill all required fields');
      return;
    }

    try {
      setLoading(true);
      await createProject(formData);
      alert('Project created successfully!');
      navigate('/projects');
    } catch (err: any) {
      setError(err?.message || 'Failed to create project');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-indigo-100 pt-24 pb-12">
      <div className="max-w-5xl mx-auto px-4">

        {/* Header */}
        <button
          onClick={() => navigate('/dashboard')}
          className="flex items-center text-gray-600 hover:text-gray-900 mb-4"
        >
          <ArrowLeft size={20} className="mr-2" />
          Back to Dashboard
        </button>

        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          Create New Project
        </h1>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 rounded-lg flex justify-between">
            <span>{error}</span>
            <button onClick={() => setError('')}>
              <X size={18} />
            </button>
          </div>
        )}

        <motion.div className="bg-white rounded-lg shadow-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-8">

            {/* PROJECT DETAILS */}
            <section>
              <h2 className="text-xl font-semibold mb-4">Project Details</h2>

              <input
                name="name"
                placeholder="Project Title *"
                value={formData.name}
                onChange={handleChange}
                className="form-input"
              />

              <textarea
                name="description"
                rows={5}
                placeholder="Project Description *"
                value={formData.description}
                onChange={handleChange}
                className="form-textarea"
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <select
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  className="form-select"
                >
                  <option value="">Service Type *</option>
                  <option>Software Development</option>
                  <option>UI / UX Design</option>
                  <option>Data & AI</option>
                  <option>Cloud & DevOps</option>
                  <option>Maintenance</option>
                </select>

                <select
                  name="projectType"
                  value={formData.projectType}
                  onChange={handleChange}
                  className="form-select"
                >
                  <option value="">Project Type</option>
                  <option>New Development</option>
                  <option>Enhancement</option>
                  <option>Migration</option>
                  <option>Support</option>
                </select>
              </div>
            </section>

            {/* CLIENT INFO */}
            <section>
              <h2 className="text-xl font-semibold mb-4">Client Information</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  name="clientName"
                  placeholder="Client Name"
                  value={formData.clientName}
                  onChange={handleChange}
                  className="form-input"
                />

                <input
                  name="companyName"
                  placeholder="Company Name"
                  value={formData.companyName}
                  onChange={handleChange}
                  className="form-input"
                />

                <input
                  name="clientEmail"
                  type="email"
                  placeholder="Client Email *"
                  value={formData.clientEmail}
                  onChange={handleChange}
                  className="form-input"
                />

                <input
                  name="clientContact"
                  placeholder="Contact Number"
                  value={formData.clientContact}
                  onChange={handleChange}
                  className="form-input"
                />
              </div>
            </section>

            {/* TECH */}
            <section>
              <h2 className="text-xl font-semibold mb-4">
                Technical Requirements
              </h2>

              <input
                name="techStack"
                placeholder="Preferred Tech Stack (React, Node, AWS...)"
                value={formData.techStack}
                onChange={handleChange}
                className="form-input"
              />

              <input
                name="integrations"
                placeholder="Third-party Integrations (Payments, APIs, etc.)"
                value={formData.integrations}
                onChange={handleChange}
                className="form-input"
              />
            </section>

            {/* COMMERCIAL */}
            <section>
              <h2 className="text-xl font-semibold mb-4">Budget & Planning</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <select
                  name="budgetRange"
                  value={formData.budgetRange}
                  onChange={handleChange}
                  className="form-select"
                >
                  <option value="">Budget Range</option>
                  <option>Below ₹50,000</option>
                  <option>₹50,000 – ₹2,00,000</option>
                  <option>₹2,00,000+</option>
                </select>

                <select
                  name="engagementModel"
                  value={formData.engagementModel}
                  onChange={handleChange}
                  className="form-select"
                >
                  <option value="">Engagement Model</option>
                  <option>Fixed Price</option>
                  <option>Hourly</option>
                  <option>Monthly Retainer</option>
                </select>
              </div>

              <input
                type="date"
                name="expectedCompletion"
                value={formData.expectedCompletion}
                onChange={handleChange}
                className="form-input"
              />
            </section>

            {/* NOTES */}
            <section>
              <h2 className="text-xl font-semibold mb-4">Additional Notes</h2>
              <textarea
                name="notes"
                rows={4}
                placeholder="Any additional instructions or expectations"
                value={formData.notes}
                onChange={handleChange}
                className="form-textarea"
              />
            </section>

            {/* ACTIONS */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? 'Creating Project...' : 'Submit Project'}
            </button>

          </form>
        </motion.div>
      </div>
    </div>
  );
}

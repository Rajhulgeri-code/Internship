import { useState } from 'react';
import { motion } from 'motion/react';
import { Briefcase, MapPin, Clock, DollarSign, Users2, TrendingUp, Award, Heart, Search } from 'lucide-react';

export function Careers() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('all');

  const benefits = [
    {
      icon: DollarSign,
      title: 'Competitive Compensation',
      description: 'Industry-leading salaries and performance bonuses',
    },
    {
      icon: Heart,
      title: 'Health & Wellness',
      description: 'Comprehensive health insurance and wellness programs',
    },
    {
      icon: TrendingUp,
      title: 'Career Growth',
      description: 'Clear advancement paths and professional development',
    },
    {
      icon: Users2,
      title: 'Collaborative Culture',
      description: 'Work with talented teams on exciting projects',
    },
    {
      icon: Clock,
      title: 'Work-Life Balance',
      description: 'Flexible schedules and remote work options',
    },
    {
      icon: Award,
      title: 'Learning & Development',
      description: 'Training programs, certifications, and conferences',
    },
  ];

  const jobs = [
    {
      id: 1,
      title: 'Senior CAD Engineer',
      department: 'Engineering',
      location: 'San Francisco, CA',
      type: 'Full-time',
      experience: '5+ years',
      description: 'Lead CAD design projects for aerospace and automotive clients. Expert in SolidWorks, CATIA, and AutoCAD required.',
    },
    {
      id: 2,
      title: 'Full Stack Developer',
      department: 'Software',
      location: 'Remote',
      type: 'Full-time',
      experience: '3+ years',
      description: 'Build modern web applications using React, Node.js, and cloud technologies. Strong problem-solving skills required.',
    },
    {
      id: 3,
      title: 'Technical Writer',
      department: 'Documentation',
      location: 'Austin, TX',
      type: 'Full-time',
      experience: '2+ years',
      description: 'Create clear and comprehensive technical documentation. Experience with API documentation and user guides preferred.',
    },
    {
      id: 4,
      title: 'UX/UI Designer',
      department: 'Design',
      location: 'New York, NY',
      type: 'Full-time',
      experience: '4+ years',
      description: 'Design intuitive user interfaces for web and mobile applications. Proficiency in Figma and user research required.',
    },
    {
      id: 5,
      title: 'Data Scientist',
      department: 'AI/ML',
      location: 'Boston, MA',
      type: 'Full-time',
      experience: '3+ years',
      description: 'Develop machine learning models and data analytics solutions. Strong Python and statistics background required.',
    },
    {
      id: 6,
      title: 'Project Manager',
      department: 'Operations',
      location: 'Chicago, IL',
      type: 'Full-time',
      experience: '5+ years',
      description: 'Lead cross-functional teams and manage complex engineering projects. PMP certification preferred.',
    },
    {
      id: 7,
      title: 'Junior Software Engineer',
      department: 'Software',
      location: 'Remote',
      type: 'Full-time',
      experience: '0-2 years',
      description: 'Join our development team to build scalable software solutions. Recent graduates welcome to apply.',
    },
    {
      id: 8,
      title: 'Technical Recruiter',
      department: 'Staffing',
      location: 'Seattle, WA',
      type: 'Full-time',
      experience: '3+ years',
      description: 'Source and recruit top technical talent. Experience in engineering and IT recruitment required.',
    },
  ];

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.department.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = selectedDepartment === 'all' || job.department === selectedDepartment;
    return matchesSearch && matchesDepartment;
  });

  const departments = ['all', ...Array.from(new Set(jobs.map(job => job.department)))];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-indigo-100 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-bold text-gray-900 mb-6">Join Our Team</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Build your career with InnoInfinite Solutions. Work on cutting-edge projects with talented teams 
            that value innovation, learning, and growth.
          </p>
        </motion.div>

        {/* Benefits Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Why Work With Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="bg-white/80 backdrop-blur-sm rounded-lg shadow-lg p-6 hover:shadow-xl transition-all"
              >
                <benefit.icon className="w-12 h-12 text-blue-600 mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Job Listings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Open Positions</h2>

          {/* Search and Filter */}
          <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-lg p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search positions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <select
                value={selectedDepartment}
                onChange={(e) => setSelectedDepartment(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {departments.map(dept => (
                  <option key={dept} value={dept}>
                    {dept === 'all' ? 'All Departments' : dept}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Job Cards */}
          <div className="space-y-6">
            {filteredJobs.map((job, index) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="bg-white/80 backdrop-blur-sm rounded-lg shadow-lg p-6 hover:shadow-xl transition-all"
              >
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4">
                  <div className="mb-4 lg:mb-0">
                    <h3 className="text-2xl font-semibold text-gray-900 mb-2">{job.title}</h3>
                    <div className="flex flex-wrap gap-4 text-gray-600">
                      <div className="flex items-center">
                        <Briefcase size={16} className="mr-2" />
                        {job.department}
                      </div>
                      <div className="flex items-center">
                        <MapPin size={16} className="mr-2" />
                        {job.location}
                      </div>
                      <div className="flex items-center">
                        <Clock size={16} className="mr-2" />
                        {job.type}
                      </div>
                    </div>
                  </div>
                  <div className="flex-shrink-0">
                    <span className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold">
                      {job.experience}
                    </span>
                  </div>
                </div>

                <p className="text-gray-700 mb-6">{job.description}</p>

                <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-semibold">
                  Apply Now
                </button>
              </motion.div>
            ))}
          </div>

          {filteredJobs.length === 0 && (
            <div className="text-center py-12 bg-white/80 backdrop-blur-sm rounded-lg shadow-lg">
              <Briefcase className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-xl text-gray-600">No positions found</p>
              <p className="text-gray-500 mt-2">Try adjusting your search or filters</p>
            </div>
          )}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg shadow-lg p-12 text-center text-white"
        >
          <h2 className="text-3xl font-bold mb-4">Don't See the Right Position?</h2>
          <p className="text-xl text-blue-100 mb-8">
            We're always looking for talented individuals. Send us your resume!
          </p>
          <button className="bg-white text-blue-600 px-8 py-3 rounded-lg hover:bg-blue-50 transition-colors font-semibold">
            Submit General Application
          </button>
        </motion.div>
      </div>
    </div>
  );
}

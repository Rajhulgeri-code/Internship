import { motion } from 'motion/react';
import { Wrench, Code, FileText, Palette, Database, Users, ArrowRight, CheckCircle } from 'lucide-react';

export function Services() {
  const services = [
    {
      icon: Wrench,
      title: 'Engineering Design Services',
      description: 'Comprehensive engineering solutions from concept to production',
      features: [
        '3D CAD Modeling & Design',
        'Technical Drawings & Blueprints',
        'FEA & CFD Simulation',
        'Product Development & Prototyping',
        'Design Optimization',
        'Manufacturing Support',
      ],
      benefits: [
        'Reduced development time',
        'Improved product quality',
        'Cost-effective solutions',
        'Expert technical support',
      ],
      color: 'from-blue-500 to-blue-700',
    },
    {
      icon: Code,
      title: 'Software Development',
      description: 'Custom software solutions built with modern technologies',
      features: [
        'Web Application Development',
        'Mobile App Development (iOS/Android)',
        'Enterprise Software Solutions',
        'API Development & Integration',
        'Cloud Migration & Deployment',
        'Maintenance & Support',
      ],
      benefits: [
        'Scalable architecture',
        'Agile development process',
        'Quality assurance',
        'Ongoing support',
      ],
      color: 'from-purple-500 to-purple-700',
    },
    {
      icon: FileText,
      title: 'Technical Documentation',
      description: 'Clear, comprehensive documentation for complex systems',
      features: [
        'User Manuals & Guides',
        'API Documentation',
        'Standard Operating Procedures',
        'Training Materials',
        'Knowledge Base Development',
        'Technical Writing Services',
      ],
      benefits: [
        'Improved user adoption',
        'Reduced support costs',
        'Compliance documentation',
        'Knowledge preservation',
      ],
      color: 'from-green-500 to-green-700',
    },
    {
      icon: Palette,
      title: 'UI/UX Design',
      description: 'User-centered design that creates engaging experiences',
      features: [
        'User Research & Analysis',
        'Wireframing & Prototyping',
        'Visual Design & Branding',
        'Usability Testing',
        'Responsive Design',
        'Design System Creation',
      ],
      benefits: [
        'Enhanced user satisfaction',
        'Increased conversion rates',
        'Consistent brand experience',
        'Intuitive interfaces',
      ],
      color: 'from-pink-500 to-pink-700',
    },
    {
      icon: Database,
      title: 'Data & AI Solutions',
      description: 'Intelligent analytics and automation powered by AI',
      features: [
        'Data Analytics & Visualization',
        'Machine Learning Models',
        'Predictive Analytics',
        'Business Intelligence',
        'Process Automation',
        'AI Integration Services',
      ],
      benefits: [
        'Data-driven decisions',
        'Automated processes',
        'Predictive insights',
        'Competitive advantage',
      ],
      color: 'from-orange-500 to-orange-700',
    },
    {
      icon: Users,
      title: 'Staffing & Resource Augmentation',
      description: 'Skilled professionals to strengthen your team',
      features: [
        'Contract Staffing',
        'Direct Hire Placement',
        'Project-Based Teams',
        'Technical Consultants',
        'Staff Augmentation',
        'Managed Services',
      ],
      benefits: [
        'Access to top talent',
        'Flexible engagement models',
        'Reduced hiring time',
        'Scalable workforce',
      ],
      color: 'from-teal-500 to-teal-700',
    },
  ];

  const processSteps = [
    {
      number: '01',
      title: 'Discovery',
      description: 'We begin by understanding your needs, goals, and challenges',
    },
    {
      number: '02',
      title: 'Planning',
      description: 'Our team creates a detailed project plan and timeline',
    },
    {
      number: '03',
      title: 'Execution',
      description: 'We deliver high-quality work using proven methodologies',
    },
    {
      number: '04',
      title: 'Support',
      description: 'Ongoing support and maintenance to ensure success',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-indigo-100 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-bold text-gray-900 mb-6">Our Services</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive solutions across engineering, technology, and operations to help your business thrive
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="space-y-8 mb-16">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/80 backdrop-blur-sm rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all"
            >
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-8">
                {/* Service Header */}
                <div>
                  <div className={`w-16 h-16 rounded-lg bg-gradient-to-br ${service.color} flex items-center justify-center mb-4`}>
                    <service.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">{service.title}</h3>
                  <p className="text-gray-600 mb-6">{service.description}</p>
                  <button className="flex items-center text-blue-600 hover:text-blue-700 font-semibold">
                    Learn More
                    <ArrowRight size={20} className="ml-2" />
                  </button>
                </div>

                {/* Features */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-4">What We Offer</h4>
                  <ul className="space-y-2">
                    {service.features.map((feature, fIndex) => (
                      <li key={fIndex} className="flex items-start text-gray-700">
                        <CheckCircle size={18} className="text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Benefits */}
                <div className={`bg-gradient-to-br ${service.color} rounded-lg p-6 text-white`}>
                  <h4 className="font-semibold mb-4">Key Benefits</h4>
                  <ul className="space-y-3">
                    {service.benefits.map((benefit, bIndex) => (
                      <li key={bIndex} className="flex items-start">
                        <div className="w-1.5 h-1.5 bg-white rounded-full mr-3 mt-2" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Process Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white/80 backdrop-blur-sm rounded-lg shadow-lg p-8 mb-16"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Our Process</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {processSteps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="text-5xl font-bold text-blue-600 mb-4 opacity-20">{step.number}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg shadow-lg p-12 text-center text-white"
        >
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl text-blue-100 mb-8">
            Let's discuss your project and how we can help you achieve your goals
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <a
              href="/contact"
              className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg hover:bg-blue-50 transition-colors font-semibold"
            >
              Contact Us
            </a>
            <a
              href="/login"
              className="inline-block bg-blue-700 text-white px-8 py-3 rounded-lg hover:bg-blue-800 transition-colors font-semibold"
            >
              Client Portal
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

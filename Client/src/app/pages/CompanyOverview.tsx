import { motion } from 'motion/react';
import { Building, Users, Award, Target, Mail, Phone } from 'lucide-react';

export function CompanyOverview() {
  const services = [
    {
      title: 'Engineering Design Services',
      description: 'Complete CAD modeling, drafting, and simulation support for complex engineering projects.',
      features: ['3D Modeling', 'Technical Drawings', 'Simulation Analysis', 'Product Design'],
    },
    {
      title: 'Software Development',
      description: 'Custom software solutions tailored to your business needs with modern technologies.',
      features: ['Web Applications', 'Mobile Apps', 'API Development', 'Cloud Solutions'],
    },
    {
      title: 'Technical Documentation',
      description: 'Clear, comprehensive documentation for products, systems, and processes.',
      features: ['User Manuals', 'API Documentation', 'Process Guides', 'Training Materials'],
    },
    {
      title: 'UI/UX Design',
      description: 'User-centered design that creates intuitive and engaging digital experiences.',
      features: ['User Research', 'Wireframing', 'Prototyping', 'Visual Design'],
    },
    {
      title: 'Data & AI Solutions',
      description: 'Intelligent analytics and automation powered by machine learning and AI.',
      features: ['Data Analytics', 'ML Models', 'Automation', 'Predictive Analysis'],
    },
    {
      title: 'Staffing & Resource Augmentation',
      description: 'Skilled professionals to strengthen your team and accelerate project delivery.',
      features: ['Technical Staff', 'Project Teams', 'Consultants', 'Long-term Partners'],
    },
  ];

  const industries = [
    'Aerospace & Defense',
    'Automotive',
    'Manufacturing',
    'Energy & Utilities',
    'Healthcare',
    'Technology',
    'Consumer Products',
    'Industrial Equipment',
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-indigo-100 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-bold text-gray-900 mb-4">About InnoInfinite Solutions</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            A multidisciplinary services company delivering excellence in engineering, technology, and innovation
          </p>
        </motion.div>

        {/* Company Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16"
        >
          {[
            { icon: Building, label: 'Years in Business', value: '10+' },
            { icon: Users, label: 'Expert Professionals', value: '500+' },
            { icon: Award, label: 'Projects Completed', value: '1000+' },
            { icon: Target, label: 'Client Satisfaction', value: '98%' },
          ].map((stat, index) => (
            <div key={index} className="bg-white/80 backdrop-blur-sm rounded-lg shadow-lg p-6 text-center">
              <stat.icon className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <p className="text-4xl font-bold text-gray-900 mb-2">{stat.value}</p>
              <p className="text-gray-600">{stat.label}</p>
            </div>
          ))}
        </motion.div>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white/80 backdrop-blur-sm rounded-lg shadow-lg p-8"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Mission</h2>
            <p className="text-gray-700 leading-relaxed">
              To empower businesses with innovative engineering and technology solutions that drive efficiency, 
              quality, and growth. We are committed to delivering exceptional service and building long-term 
              partnerships based on trust and expertise.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white/80 backdrop-blur-sm rounded-lg shadow-lg p-8"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Vision</h2>
            <p className="text-gray-700 leading-relaxed">
              To be the leading provider of integrated engineering and technology services, recognized globally 
              for innovation, quality, and customer-centric solutions that transform industries and create 
              lasting value.
            </p>
          </motion.div>
        </div>

        {/* Services Offered */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Our Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-white/80 backdrop-blur-sm rounded-lg shadow-lg p-6 hover:shadow-xl transition-all"
              >
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{service.title}</h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <ul className="space-y-2">
                  {service.features.map((feature, fIndex) => (
                    <li key={fIndex} className="flex items-center text-sm text-gray-700">
                      <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-2" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Industries We Serve */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white/80 backdrop-blur-sm rounded-lg shadow-lg p-8 mb-16"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Industries We Serve</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {industries.map((industry, index) => (
              <div
                key={index}
                className="bg-blue-50 rounded-lg p-4 text-center hover:bg-blue-100 transition-colors"
              >
                <p className="font-medium text-gray-900">{industry}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Support & Contact */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg shadow-lg p-8 text-white"
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">Need Assistance?</h2>
            <p className="text-blue-100">Our team is here to help you succeed</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <Mail className="w-8 h-8 mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Email Support</h3>
              <p className="text-blue-100">support@innoinfinite.com</p>
            </div>

            <div className="text-center">
              <Phone className="w-8 h-8 mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Phone Support</h3>
              <p className="text-blue-100">(555) 123-4567</p>
            </div>

            <div className="text-center">
              <Users className="w-8 h-8 mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Account Manager</h3>
              <p className="text-blue-100">Dedicated support for your account</p>
            </div>
          </div>

          <div className="mt-8 text-center">
            <a
              href="mailto:support@innoinfinite.com"
              className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg hover:bg-blue-50 transition-colors font-semibold"
            >
              Contact Us Now
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

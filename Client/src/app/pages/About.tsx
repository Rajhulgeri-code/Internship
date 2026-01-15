import { motion } from 'motion/react';
import { Target, Eye, Heart, Shield, Zap, Users2 } from 'lucide-react';

export function About() {
  const values = [
    {
      icon: Shield,
      title: 'Integrity',
      description: 'We maintain the highest standards of honesty and transparency in all our dealings.',
    },
    {
      icon: Zap,
      title: 'Innovation',
      description: 'We embrace new technologies and methodologies to deliver cutting-edge solutions.',
    },
    {
      icon: Heart,
      title: 'Excellence',
      description: 'We are committed to delivering superior quality in everything we do.',
    },
    {
      icon: Users2,
      title: 'Collaboration',
      description: 'We believe in the power of teamwork and building strong partnerships.',
    },
  ];

  const team = [
    {
      name: 'Dr. Sarah Chen',
      role: 'Chief Executive Officer',
      bio: '20+ years in engineering and technology leadership',
    },
    {
      name: 'Michael Rodriguez',
      role: 'Chief Technology Officer',
      bio: 'Expert in software architecture and innovation',
    },
    {
      name: 'Emily Thompson',
      role: 'VP of Engineering Services',
      bio: 'Specialized in CAD/CAM and product development',
    },
    {
      name: 'David Kumar',
      role: 'VP of Client Solutions',
      bio: 'Focused on customer success and partnership growth',
    },
  ];

  const milestones = [
    { year: '2015', title: 'Company Founded', description: 'InnoInfinite Solutions established with a vision to transform engineering services' },
    { year: '2017', title: 'First Major Contract', description: 'Secured partnership with Fortune 500 aerospace company' },
    { year: '2019', title: 'Expansion', description: 'Opened new facilities and expanded service offerings to include AI/ML' },
    { year: '2021', title: 'Industry Recognition', description: 'Received Excellence in Engineering Services Award' },
    { year: '2023', title: 'Global Reach', description: 'Expanded operations to serve clients in 15+ countries' },
    { year: '2025', title: 'Innovation Hub', description: 'Launched advanced R&D center for emerging technologies' },
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
          <h1 className="text-5xl font-bold text-gray-900 mb-6">About InnoInfinite Solutions</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            We are a premier provider of engineering, technology, and innovation services, 
            dedicated to helping businesses achieve their most ambitious goals through expertise, 
            quality, and unwavering commitment to excellence.
          </p>
        </motion.div>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white/80 backdrop-blur-sm rounded-lg shadow-lg p-8"
          >
            <Target className="w-12 h-12 text-blue-600 mb-4" />
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Mission</h2>
            <p className="text-gray-700 leading-relaxed text-lg">
              To deliver world-class engineering and technology solutions that empower businesses 
              to innovate, grow, and succeed in an ever-evolving global marketplace. We are committed 
              to excellence, integrity, and creating lasting value for our clients and partners.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white/80 backdrop-blur-sm rounded-lg shadow-lg p-8"
          >
            <Eye className="w-12 h-12 text-blue-600 mb-4" />
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Vision</h2>
            <p className="text-gray-700 leading-relaxed text-lg">
              To be recognized globally as the most trusted and innovative partner in engineering 
              and technology services, setting new standards for quality, reliability, and customer 
              satisfaction while driving positive change across industries.
            </p>
          </motion.div>
        </div>

        {/* Core Values */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Our Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/80 backdrop-blur-sm rounded-lg shadow-lg p-6 text-center hover:shadow-xl transition-all"
              >
                <value.icon className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Company Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white/80 backdrop-blur-sm rounded-lg shadow-lg p-8 mb-16"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Our Journey</h2>
          <div className="space-y-8">
            {milestones.map((milestone, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start"
              >
                <div className="flex-shrink-0 w-20">
                  <div className="text-2xl font-bold text-blue-600">{milestone.year}</div>
                </div>
                <div className="flex-1 border-l-4 border-blue-500 pl-6 pb-8">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{milestone.title}</h3>
                  <p className="text-gray-600">{milestone.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Leadership Team */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Leadership Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/80 backdrop-blur-sm rounded-lg shadow-lg p-6 text-center"
              >
                <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl font-bold text-white">
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{member.name}</h3>
                <p className="text-blue-600 font-medium mb-3">{member.role}</p>
                <p className="text-gray-600 text-sm">{member.bio}</p>
              </motion.div>
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
          <h2 className="text-3xl font-bold mb-4">Ready to Work With Us?</h2>
          <p className="text-xl text-blue-100 mb-8">
            Let's discuss how we can help your business achieve its goals
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <a
              href="/contact"
              className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg hover:bg-blue-50 transition-colors font-semibold"
            >
              Contact Us
            </a>
            <a
              href="/services"
              className="inline-block bg-blue-700 text-white px-8 py-3 rounded-lg hover:bg-blue-800 transition-colors font-semibold"
            >
              View Services
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

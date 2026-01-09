import { useRef } from 'react';
import Slider from 'react-slick';
import { motion } from 'motion/react';
import { ArrowDown, Code, Wrench, FileText, Users, TrendingUp, Award } from 'lucide-react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import headerImage1 from "../../assets/f1cde6c5104ecbae816e478f19f5461f26aa05c8.png";
import headerImage2 from "../../assets/1bb620bdf49f76519fb05a50d31681e67a18d324.png";
import headerImage3 from "../../assets/2f631e0f286f8190ea8857ff48566ecc6e95802b.png";


const slides = [
  {
    image: "https://images.unsplash.com/photo-1762146828422-50a8bd416d3c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbmdpbmVlcmluZyUyMGRlc2lnbiUyMGJsdWVwcmludHxlbnwxfHx8fDE3Njc3OTA3NDh8MA&ixlib=rb-4.1.0&q=80&w=1080",
    title: "Engineering That Delivers.",
    subtitle: "Precision design and CAD solutions for complex projects",
  },
  {
    image: "https://images.unsplash.com/photo-1531498860502-7c67cf02f657?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2Z0d2FyZSUyMGRldmVsb3BtZW50JTIwY29kaW5nfGVufDF8fHx8MTc2NzY5OTEzMXww&ixlib=rb-4.1.0&q=80&w=1080",
    title: "Technology That Scales.",
    subtitle: "Custom software development for modern businesses",
  },
  {
    image: "https://images.unsplash.com/photo-1756742588717-24dff6283613?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmR1c3RyaWFsJTIwZmFjdG9yeSUyMHRlY2hub2xvZ3l8ZW58MXx8fHwxNzY3NzkwNzUwfDA&ixlib=rb-4.1.0&q=80&w=1080",
    title: "Solutions Built for Industry.",
    subtitle: "Comprehensive technical services and expert staffing",
  },
];

const services = [
  {
    icon: Wrench,
    title: "Engineering Design Services",
    description: "Expert CAD modeling, drafting, and simulation support",
  },
  {
    icon: FileText,
    title: "Technical Documentation",
    description: "Clear, comprehensive documentation for complex systems",
  },
  {
    icon: Code,
    title: "Software Development",
    description: "Custom applications built to your specifications",
  },
  {
    icon: Code,
    title: "UI / UX Design",
    description: "Intuitive interfaces that enhance user experience",
  },
  {
    icon: TrendingUp,
    title: "Data & AI Solutions",
    description: "Intelligent analytics and automation systems",
  },
  {
    icon: Users,
    title: "Staffing & Resource Augmentation",
    description: "Skilled professionals to strengthen your team",
  },
];

export function Home() {
  const sliderRef = useRef<Slider>(null);

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    fade: true,
    pauseOnHover: false,
  };

  const scrollToAbout = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-indigo-100">
      {/* Hero Slider Section */}
      <section className="relative h-screen mt-16">
        <Slider ref={sliderRef} {...sliderSettings} className="h-full">
          {slides.map((slide, index) => (
            <div key={index} className="relative h-screen">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${slide.image})` }}
              >
                <div className="absolute inset-0 bg-black/50" />
              </div>
              <div className="relative h-full flex items-center justify-center text-center px-4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="max-w-4xl mx-auto"
                >
                  <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
                    {slide.title}
                  </h1>
                  <p className="text-xl md:text-2xl text-gray-200 mb-8">
                    {slide.subtitle}
                  </p>
                </motion.div>
              </div>
            </div>
          ))}
        </Slider>

        {/* Scroll Down Arrow */}
        <motion.button
          onClick={scrollToAbout}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-white"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <ArrowDown size={32} />
        </motion.button>
      </section>

      {/* Hero Text Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Engineering Precision. Digital Innovation. Scalable Solutions.
            </h2>
            <p className="text-xl text-blue-100 max-w-4xl mx-auto">
              InnoInfinite Solutions delivers engineering design, software development, technical documentation, 
              and staffing services that help businesses build, scale, and innovate with confidence.
            </p>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <img
                src="https://images.unsplash.com/photo-1694702740570-0a31ee1525c7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBvZmZpY2UlMjBidWlsZGluZ3xlbnwxfHx8fDE3Njc3Mjk3MDB8MA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="About InnoInfinite"
                className="rounded-lg shadow-xl"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                About InnoInfinite Solutions
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                InnoInfinite Solutions is a multidisciplinary services company offering engineering design, 
                software development, technical documentation, and staffing solutions.
              </p>
              <p className="text-lg text-gray-600 mb-8">
                We help organizations streamline operations, improve efficiency, and deliver high-quality 
                outcomes across industries.
              </p>

              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Award className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                  <p className="text-gray-600">
                    Engineering design support through modeling, drafting, and simulation
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <Code className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                  <p className="text-gray-600">
                    Reliable software systems tailored to business needs
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <Users className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                  <p className="text-gray-600">
                    Clear documentation and skilled staffing solutions
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 via-blue-100 to-indigo-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Core Services
            </h2>
            <p className="text-xl text-gray-600">
              Comprehensive solutions across engineering, technology, and operations.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="bg-white/90 backdrop-blur-sm p-8 rounded-lg shadow-lg hover:shadow-2xl transition-all cursor-pointer"
              >
                <service.icon className="w-12 h-12 text-blue-600 mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-600">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Careers Section */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Build Your Career with InnoInfinite
            </h2>
            <p className="text-xl mb-8 text-blue-100">
              Work on real-world engineering and technology projects with teams that value learning and growth.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {[
                "Diverse Industry Projects",
                "Skill Development & Learning",
                "Collaborative Work Culture",
                "Career Growth Opportunities",
              ].map((item, index) => (
                <div
                  key={index}
                  className="bg-white/10 backdrop-blur-sm rounded-lg p-6"
                >
                  <p className="text-lg">{item}</p>
                </div>
              ))}
            </div>

            <a
              href="/careers"
              className="inline-block px-8 py-3 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition-colors font-semibold"
            >
              Explore Careers
            </a>
          </motion.div>
        </div>
      </section>

      {/* Featured Images Section */}
      <section className="py-20 bg-white/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative h-80 overflow-hidden rounded-lg shadow-lg"
            >
              <img
                src={headerImage1}
                alt="Engineering Design"
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="relative h-80 overflow-hidden rounded-lg shadow-lg"
            >
              <img
                src={headerImage2}
                alt="Software Development"
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="relative h-80 overflow-hidden rounded-lg shadow-lg"
            >
              <img
                src={headerImage3}
                alt="Technical Solutions"
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
              />
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
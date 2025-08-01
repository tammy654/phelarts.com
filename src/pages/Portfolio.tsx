import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Play, Filter, Calendar, Users, Award } from 'lucide-react';
import ParallaxSection from '../components/ParallaxSection';

const Portfolio = () => {
  const [activeFilter, setActiveFilter] = useState('All');

  const filters = ['All', '2D Animation', 'Motion Graphics', 'Visual Effects', 'Web Animation'];

  const projects = [
    {
      title: 'Brand Evolution Campaign',
      category: 'Motion Graphics',
      client: 'TechCorp Inc.',
      image: 'https://images.pexels.com/photos/3945313/pexels-photo-3945313.jpeg?auto=compress&cs=tinysrgb&w=800',
      description: 'Complete brand transformation through dynamic motion graphics and storytelling that increased brand recognition by 300%.',
      tags: ['Branding', 'Animation', 'Strategy'],
      duration: '3 weeks',
      year: '2024',
      results: '+300% Brand Recognition'
    },
    {
      title: 'Character Adventure Series',
      category: '2D Animation',
      client: 'EduLearn Platform',
      image: 'https://images.pexels.com/photos/7688336/pexels-photo-7688336.jpeg?auto=compress&cs=tinysrgb&w=800',
      description: 'Engaging character-driven narrative for educational content series that boosted user engagement by 250%.',
      tags: ['Character Design', 'Storytelling', 'Education'],
      duration: '6 weeks',
      year: '2024',
      results: '+250% User Engagement'
    },
    {
      title: 'Product Launch Spectacular',
      category: 'Visual Effects',
      client: 'InnovateTech',
      image: 'https://images.pexels.com/photos/3945312/pexels-photo-3945312.jpeg?auto=compress&cs=tinysrgb&w=800',
      description: 'Compelling product demonstration with sleek animations and clear messaging that drove 400% increase in conversions.',
      tags: ['Product Demo', 'Marketing', 'VFX'],
      duration: '4 weeks',
      year: '2024',
      results: '+400% Conversions'
    },
    {
      title: 'Interactive Web Experience',
      category: 'Web Animation',
      client: 'DesignStudio Pro',
      image: 'https://images.pexels.com/photos/7688337/pexels-photo-7688337.jpeg?auto=compress&cs=tinysrgb&w=800',
      description: 'Interactive web animations that enhance user engagement and experience, resulting in 60% longer session times.',
      tags: ['Web Design', 'UX', 'Interactive'],
      duration: '2 weeks',
      year: '2024',
      results: '+60% Session Time'
    },
    {
      title: 'Corporate Identity Refresh',
      category: 'Motion Graphics',
      client: 'Global Finance Ltd.',
      image: 'https://images.pexels.com/photos/3584994/pexels-photo-3584994.jpeg?auto=compress&cs=tinysrgb&w=800',
      description: 'Modern motion graphics package for corporate communications that enhanced professional image.',
      tags: ['Corporate', 'Branding', 'Professional'],
      duration: '3 weeks',
      year: '2023',
      results: 'Enhanced Brand Image'
    },
    {
      title: 'Animated Explainer Series',
      category: '2D Animation',
      client: 'HealthTech Solutions',
      image: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=800',
      description: 'Complex medical concepts simplified through engaging 2D animations for patient education.',
      tags: ['Healthcare', 'Education', 'Explainer'],
      duration: '5 weeks',
      year: '2023',
      results: 'Improved Patient Understanding'
    }
  ];

  const filteredProjects = activeFilter === 'All' 
    ? projects 
    : projects.filter(project => project.category === activeFilter);

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="py-24 bg-gradient-to-br from-[#242424] via-gray-800 to-[#016952] relative overflow-hidden">
        <ParallaxSection direction="swirl" intensity={30}>
          <div className="absolute top-20 right-20 w-32 h-32 bg-[#ff9a1d]/20 rounded-full blur-xl"></div>
        </ParallaxSection>
        <ParallaxSection direction="left" intensity={40}>
          <div className="absolute bottom-20 left-20 w-24 h-24 bg-[#016952]/30 rounded-full blur-lg"></div>
        </ParallaxSection>
        
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl lg:text-7xl font-bold text-[#fefefe] mb-8">
              Our Portfolio
            </h1>
            <p className="text-xl lg:text-2xl text-gray-300 max-w-4xl mx-auto mb-12">
              A curated collection of our most impactful work, showcasing creativity, 
              technical excellence, and measurable results for our clients.
            </p>
          </motion.div>
          
          <motion.div 
            className="flex flex-wrap justify-center gap-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="bg-[#fefefe]/10 backdrop-blur-sm border border-[#fefefe]/20 rounded-full px-4 py-2 flex items-center space-x-2">
              <Award className="w-4 h-4 text-[#ff9a1d]" />
              <span className="text-sm font-medium text-[#fefefe]/90">Award-Winning Projects</span>
            </div>
            <div className="bg-[#fefefe]/10 backdrop-blur-sm border border-[#fefefe]/20 rounded-full px-4 py-2 flex items-center space-x-2">
              <Users className="w-4 h-4 text-[#ff9a1d]" />
              <span className="text-sm font-medium text-[#fefefe]/90">50+ Happy Clients</span>
            </div>
            <div className="bg-[#fefefe]/10 backdrop-blur-sm border border-[#fefefe]/20 rounded-full px-4 py-2 flex items-center space-x-2">
              <Calendar className="w-4 h-4 text-[#ff9a1d]" />
              <span className="text-sm font-medium text-[#fefefe]/90">500+ Projects Delivered</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-12 bg-[#fefefe] border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div 
            className="flex flex-wrap justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {filters.map((filter) => (
              <motion.button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  activeFilter === filter
                    ? 'bg-gradient-to-r from-[#ff9a1d] to-[#016952] text-[#fefefe] shadow-lg scale-105'
                    : 'bg-gray-100 text-[#242424] hover:bg-gray-200 hover:scale-105'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {filter}
              </motion.button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Portfolio Grid */}
      <section className="py-24 bg-[#fefefe]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            {filteredProjects.map((project, index) => (
              <ParallaxSection 
                key={index} 
                direction={index % 2 === 0 ? 'up' : 'down'} 
                intensity={20}
              >
                <motion.div
                  className="group"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <div className="relative overflow-hidden rounded-3xl bg-white shadow-lg hover:shadow-2xl transition-all duration-500">
                    <div className="aspect-[4/3] overflow-hidden">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      
                      {/* Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#242424]/80 via-[#242424]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <motion.div 
                            className="w-20 h-20 bg-[#fefefe]/20 backdrop-blur-sm rounded-full flex items-center justify-center"
                            whileHover={{ scale: 1.1 }}
                          >
                            <Play className="w-10 h-10 text-[#fefefe] ml-1" />
                          </motion.div>
                        </div>
                        
                        <div className="absolute top-6 right-6">
                          <ExternalLink className="w-6 h-6 text-[#fefefe]" />
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-8">
                      <div className="flex items-center justify-between mb-4">
                        <span className="px-3 py-1 bg-gradient-to-r from-[#ff9a1d] to-[#016952] text-[#fefefe] text-sm font-medium rounded-full">
                          {project.category}
                        </span>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {project.year}
                          </div>
                        </div>
                      </div>
                      
                      <h3 className="text-2xl font-bold text-[#242424] mb-3 group-hover:text-[#ff9a1d] transition-colors">
                        {project.title}
                      </h3>
                      
                      <div className="text-[#016952] font-semibold mb-3">
                        Client: {project.client}
                      </div>
                      
                      <p className="text-gray-600 mb-4 leading-relaxed">
                        {project.description}
                      </p>
                      
                      <div className="bg-gradient-to-r from-[#ff9a1d]/10 to-[#016952]/10 rounded-xl p-4 mb-4">
                        <div className="text-sm font-semibold text-[#242424] mb-1">Results:</div>
                        <div className="text-[#016952] font-bold">{project.results}</div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex flex-wrap gap-2">
                          {project.tags.map((tag, tagIndex) => (
                            <span
                              key={tagIndex}
                              className="px-3 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                        
                        <motion.button 
                          className="flex items-center gap-2 text-[#ff9a1d] hover:text-[#016952] font-medium transition-colors"
                          whileHover={{ x: 5 }}
                        >
                          View Project
                          <ExternalLink className="w-4 h-4" />
                        </motion.button>
                      </div>
                      
                      <div className="mt-4 pt-4 border-t border-gray-100">
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <Users className="w-4 h-4" />
                          Duration: {project.duration}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </ParallaxSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <ParallaxSection direction="up" intensity={30}>
        <section className="py-24 bg-gradient-to-r from-[#242424] to-[#016952] relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.05"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
          
          <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl lg:text-5xl font-bold text-[#fefefe] mb-6">
                Ready to Create Your Success Story?
              </h2>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                Let's collaborate to bring your vision to life with exceptional design and measurable results.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.a
                  href="/book-call"
                  className="phel-btn px-8 py-4 text-lg"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Start Your Project
                </motion.a>
                <motion.a
                  href="/case-studies"
                  className="border-2 border-[#fefefe]/30 text-[#fefefe] px-8 py-4 rounded-full text-lg font-semibold hover:bg-[#fefefe]/10 transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  View Case Studies
                </motion.a>
              </div>
            </motion.div>
          </div>
        </section>
      </ParallaxSection>
    </div>
  );
};

export default Portfolio;
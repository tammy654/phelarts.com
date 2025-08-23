import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Calendar, Users, Award } from 'lucide-react';
import ClientLogos from '../components/ClientLogos';
import ParallaxSection from '../components/ParallaxSection';

const Portfolio = () => {
  const projects = [
    {
      id: 1,
      title: 'Brand Animation Series',
      client: 'TechCorp',
      category: '2D Animation',
      year: '2024',
      image: 'https://images.pexels.com/photos/3945313/pexels-photo-3945313.jpeg?auto=compress&cs=tinysrgb&w=800',
      description: 'A comprehensive brand animation series that brought TechCorp\'s identity to life through dynamic motion graphics.',
      tags: ['Motion Graphics', 'Brand Identity', '2D Animation'],
      featured: true
    },
    {
      id: 2,
      title: 'Product Launch Campaign',
      client: 'InnovateLab',
      category: 'Motion Graphics',
      year: '2024',
      image: 'https://images.pexels.com/photos/7688336/pexels-photo-7688336.jpeg?auto=compress&cs=tinysrgb&w=800',
      description: 'High-impact motion graphics campaign for a revolutionary product launch.',
      tags: ['Product Launch', 'Motion Graphics', 'Marketing'],
      featured: true
    },
    {
      id: 3,
      title: 'Character Animation Short',
      client: 'StoryTech',
      category: '2D Animation',
      year: '2023',
      image: 'https://images.pexels.com/photos/3945312/pexels-photo-3945312.jpeg?auto=compress&cs=tinysrgb&w=800',
      description: 'Engaging character-driven animation that tells a compelling brand story.',
      tags: ['Character Design', 'Storytelling', '2D Animation'],
      featured: false
    },
    {
      id: 4,
      title: 'Web Interface Animations',
      client: 'DigitalFlow',
      category: 'Web Animation',
      year: '2023',
      image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800',
      description: 'Smooth, interactive animations that enhance user experience across web platforms.',
      tags: ['Web Animation', 'UI/UX', 'Interactive'],
      featured: false
    },
    {
      id: 5,
      title: 'Corporate Video Series',
      client: 'GlobalTech',
      category: 'Video Production',
      year: '2023',
      image: 'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=800',
      description: 'Professional video series showcasing corporate values and achievements.',
      tags: ['Video Production', 'Corporate', 'Storytelling'],
      featured: false
    },
    {
      id: 6,
      title: 'App Onboarding Flow',
      client: 'MobileFirst',
      category: 'App Animation',
      year: '2023',
      image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800',
      description: 'Intuitive animation sequences that guide users through app onboarding.',
      tags: ['App Animation', 'Onboarding', 'Mobile'],
      featured: false
    }
  ];

  const categories = ['All', '2D Animation', 'Motion Graphics', 'Web Animation', 'App Animation', 'Video Production'];
  const [activeCategory, setActiveCategory] = React.useState('All');

  const filteredProjects = activeCategory === 'All' 
    ? projects 
    : projects.filter(project => project.category === activeCategory);

  const featuredProjects = projects.filter(project => project.featured);

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="py-24 bg-gradient-to-br from-[#242424] via-gray-800 to-[#016952] relative overflow-hidden">
        <ParallaxSection direction="swirl" intensity={40}>
          <div className="absolute top-10 right-10 w-40 h-40 bg-[#ff9a1d]/20 rounded-full blur-2xl"></div>
        </ParallaxSection>
        <ParallaxSection direction="left" intensity={30}>
          <div className="absolute bottom-10 left-10 w-32 h-32 bg-[#016952]/30 rounded-full blur-xl"></div>
        </ParallaxSection>
        
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl lg:text-7xl font-bold text-[#fefefe] mb-8">
              Our Portfolio
            </h1>
            <p className="text-xl lg:text-2xl text-gray-300 max-w-4xl mx-auto mb-12">
              Explore our collection of creative projects that showcase the power of animation 
              and motion graphics in telling compelling stories.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Client Logos */}
      <ClientLogos />

      {/* Featured Projects */}
      <ParallaxSection direction="up" intensity={25}>
        <section className="py-24 bg-[#fefefe] relative overflow-hidden">
          <div className="absolute top-20 right-20 w-32 h-32 bg-[#ff9a1d]/10 rounded-full blur-2xl"></div>
          <div className="absolute bottom-20 left-20 w-24 h-24 bg-[#016952]/10 rounded-full blur-xl"></div>
          
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <motion.div 
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl lg:text-5xl font-bold text-[#242424] mb-6">
                Featured Work
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Highlighting our most impactful and creative projects that demonstrate our expertise.
              </p>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-12 mb-16">
              {featuredProjects.map((project, index) => (
                <motion.div 
                  key={project.id}
                  className="group cursor-pointer"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="relative overflow-hidden rounded-3xl mb-6 aspect-video">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#242424]/80 via-transparent to-transparent"></div>
                    <div className="absolute bottom-6 left-6 right-6">
                      <div className="flex items-center space-x-4 text-[#fefefe] mb-2">
                        <span className="text-sm font-medium bg-[#ff9a1d] px-3 py-1 rounded-full">
                          {project.category}
                        </span>
                        <span className="text-sm opacity-80">{project.year}</span>
                      </div>
                      <h3 className="text-2xl font-bold text-[#fefefe] mb-2">{project.title}</h3>
                      <p className="text-gray-300 text-sm">{project.client}</p>
                    </div>
                    <div className="absolute top-6 right-6">
                      <ExternalLink className="w-6 h-6 text-[#fefefe] opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </div>
                  <p className="text-gray-600 mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, tagIndex) => (
                      <span 
                        key={tagIndex}
                        className="text-sm text-[#016952] bg-[#016952]/10 px-3 py-1 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </ParallaxSection>

      {/* All Projects */}
      <ParallaxSection direction="right" intensity={20}>
        <section className="py-24 bg-gray-50">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <motion.div 
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl lg:text-5xl font-bold text-[#242424] mb-6">
                All Projects
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
                Browse through our complete portfolio of creative work across different categories.
              </p>

              {/* Category Filter */}
              <div className="flex flex-wrap justify-center gap-4">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                      activeCategory === category
                        ? 'bg-[#ff9a1d] text-[#fefefe] shadow-lg'
                        : 'bg-[#fefefe] text-[#242424] hover:bg-[#ff9a1d]/10 hover:text-[#ff9a1d]'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project, index) => (
                <motion.div 
                  key={project.id}
                  className="group cursor-pointer bg-[#fefefe] rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="relative overflow-hidden aspect-video">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#242424]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div className="absolute top-4 right-4">
                      <ExternalLink className="w-5 h-5 text-[#fefefe] opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm font-medium text-[#ff9a1d] bg-[#ff9a1d]/10 px-3 py-1 rounded-full">
                        {project.category}
                      </span>
                      <span className="text-sm text-gray-500">{project.year}</span>
                    </div>
                    <h3 className="text-xl font-bold text-[#242424] mb-2">{project.title}</h3>
                    <p className="text-[#016952] font-semibold mb-3">{project.client}</p>
                    <p className="text-gray-600 text-sm mb-4">{project.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.slice(0, 2).map((tag, tagIndex) => (
                        <span 
                          key={tagIndex}
                          className="text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </ParallaxSection>

      {/* Stats Section */}
      <ParallaxSection direction="left" intensity={25}>
        <section className="py-24 bg-[#fefefe] relative overflow-hidden">
          <div className="absolute top-20 left-20 w-32 h-32 bg-[#ff9a1d]/10 rounded-full blur-2xl"></div>
          <div className="absolute bottom-20 right-20 w-24 h-24 bg-[#016952]/10 rounded-full blur-xl"></div>
          
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <motion.div 
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl lg:text-5xl font-bold text-[#242424] mb-6">
                Portfolio Impact
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                The results speak for themselves across our diverse portfolio of projects.
              </p>
            </motion.div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { icon: Award, value: '500+', label: 'Projects Completed' },
                { icon: Users, value: '50+', label: 'Happy Clients' },
                { icon: Calendar, value: '5+', label: 'Years Experience' },
                { icon: ExternalLink, value: '98%', label: 'Client Satisfaction' },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  className="text-center p-8 rounded-2xl bg-gray-50 hover:bg-white hover:shadow-lg transition-all duration-300"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-[#ff9a1d] to-[#016952] rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <stat.icon className="w-8 h-8 text-[#fefefe]" />
                  </div>
                  <div className="text-4xl font-bold text-[#242424] mb-2">{stat.value}</div>
                  <div className="text-gray-600 font-medium">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </ParallaxSection>

      {/* CTA Section */}
      <ParallaxSection direction="up" intensity={30}>
        <section className="py-24 bg-gradient-to-r from-[#242424] to-gray-800 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%23ffffff%22 fill-opacity=%220.05%22%3E%3Ccircle cx=%2230%22 cy=%2230%22 r=%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
          
          <div className="max-w-4xl mx-auto text-center px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl lg:text-5xl font-bold text-[#fefefe] mb-6">
                Ready to start your project?
              </h2>
              <p className="text-xl text-gray-300 mb-8">
                Let's create something extraordinary together that tells your unique story.
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
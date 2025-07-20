import React, { useState } from 'react';
import { ExternalLink, Play, Filter } from 'lucide-react';

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
      year: '2024'
    },
    {
      title: 'Character Adventure Series',
      category: '2D Animation',
      client: 'EduLearn Platform',
      image: 'https://images.pexels.com/photos/7688336/pexels-photo-7688336.jpeg?auto=compress&cs=tinysrgb&w=800',
      description: 'Engaging character-driven narrative for educational content series that boosted user engagement by 250%.',
      tags: ['Character Design', 'Storytelling', 'Education'],
      duration: '6 weeks',
      year: '2024'
    },
    {
      title: 'Product Launch Spectacular',
      category: 'Visual Effects',
      client: 'InnovateTech',
      image: 'https://images.pexels.com/photos/3945312/pexels-photo-3945312.jpeg?auto=compress&cs=tinysrgb&w=800',
      description: 'Compelling product demonstration with sleek animations and clear messaging that drove 400% increase in conversions.',
      tags: ['Product Demo', 'Marketing', 'VFX'],
      duration: '4 weeks',
      year: '2024'
    },
    {
      title: 'Interactive Web Experience',
      category: 'Web Animation',
      client: 'DesignStudio Pro',
      image: 'https://images.pexels.com/photos/7688337/pexels-photo-7688337.jpeg?auto=compress&cs=tinysrgb&w=800',
      description: 'Interactive web animations that enhance user engagement and experience, resulting in 60% longer session times.',
      tags: ['Web Design', 'UX', 'Interactive'],
      duration: '2 weeks',
      year: '2024'
    },
    {
      title: 'Corporate Identity Refresh',
      category: 'Motion Graphics',
      client: 'Global Finance Ltd.',
      image: 'https://images.pexels.com/photos/3584994/pexels-photo-3584994.jpeg?auto=compress&cs=tinysrgb&w=800',
      description: 'Modern motion graphics package for corporate communications that enhanced professional image.',
      tags: ['Corporate', 'Branding', 'Professional'],
      duration: '3 weeks',
      year: '2023'
    },
    {
      title: 'Animated Explainer Series',
      category: '2D Animation',
      client: 'HealthTech Solutions',
      image: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=800',
      description: 'Complex medical concepts simplified through engaging 2D animations for patient education.',
      tags: ['Healthcare', 'Education', 'Explainer'],
      duration: '5 weeks',
      year: '2023'
    }
  ];

  const filteredProjects = activeFilter === 'All' 
    ? projects 
    : projects.filter(project => project.category === activeFilter);

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="py-24 bg-gradient-to-br from-[#242424] via-gray-800 to-[#016952]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <h1 className="text-5xl lg:text-7xl font-bold text-[#fefefe] mb-8">
            Our Portfolio
          </h1>
          <p className="text-xl lg:text-2xl text-gray-300 max-w-4xl mx-auto mb-12">
            A showcase of our recent projects that demonstrate our commitment to 
            exceptional design and storytelling.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <div className="bg-[#fefefe]/10 backdrop-blur-sm border border-[#fefefe]/20 rounded-full px-4 py-2">
              <span className="text-sm font-medium text-[#fefefe]/90">500+ Projects Completed</span>
            </div>
            <div className="bg-[#fefefe]/10 backdrop-blur-sm border border-[#fefefe]/20 rounded-full px-4 py-2">
              <span className="text-sm font-medium text-[#fefefe]/90">50+ Happy Clients</span>
            </div>
            <div className="bg-[#fefefe]/10 backdrop-blur-sm border border-[#fefefe]/20 rounded-full px-4 py-2">
              <span className="text-sm font-medium text-[#fefefe]/90">Award-Winning Work</span>
            </div>
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-12 bg-[#fefefe] border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  activeFilter === filter
                    ? 'bg-gradient-to-r from-[#ff9a1d] to-[#016952] text-[#fefefe] shadow-lg'
                    : 'bg-gray-100 text-[#242424] hover:bg-gray-200'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Grid */}
      <section className="py-24 bg-[#fefefe]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            {filteredProjects.map((project, index) => (
              <div
                key={index}
                className="group"
              >
                {/* Project Image */}
                <div className="relative overflow-hidden rounded-3xl bg-[#242424] aspect-[4/3] mb-8">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#242424]/80 via-[#242424]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-20 h-20 bg-[#fefefe]/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                        <Play className="w-10 h-10 text-[#fefefe] ml-1" />
                      </div>
                    </div>
                    
                    <div className="absolute top-6 right-6">
                      <ExternalLink className="w-6 h-6 text-[#fefefe]" />
                    </div>
                  </div>
                </div>

                {/* Project Info */}
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="inline-block bg-gradient-to-r from-[#ff9a1d] to-[#016952] bg-clip-text text-transparent text-sm font-semibold uppercase tracking-wider">
                      {project.category}
                    </div>
                    <div className="text-sm text-gray-500">{project.year}</div>
                  </div>
                  
                  <h3 className="text-3xl lg:text-4xl font-bold text-[#242424] leading-tight">
                    {project.title}
                  </h3>
                  
                  <div className="text-lg font-medium text-[#016952]">
                    Client: {project.client}
                  </div>
                  
                  <p className="text-lg text-gray-600 leading-relaxed">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-3">
                    {project.tags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="px-4 py-2 bg-gray-100 rounded-full text-sm font-medium text-[#242424]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between pt-4">
                    <div className="text-sm text-gray-500">
                      Duration: {project.duration}
                    </div>
                    <button className="text-[#ff9a1d] font-semibold text-lg flex items-center space-x-2 hover:text-[#016952] transition-colors group">
                      <span>View Case Study</span>
                      <ExternalLink className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            {[
              { value: '500+', label: 'Projects Completed' },
              { value: '50+', label: 'Happy Clients' },
              { value: '98%', label: 'Client Satisfaction' },
              { value: '5+', label: 'Years Experience' }
            ].map((stat, index) => (
              <div key={index} className="p-8 rounded-2xl bg-[#fefefe] shadow-lg">
                <div className="text-4xl lg:text-5xl font-bold text-[#242424] mb-2">{stat.value}</div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-[#242424] to-gray-800">
        <div className="max-w-4xl mx-auto text-center px-6 lg:px-8">
          <h2 className="text-4xl lg:text-5xl font-bold text-[#fefefe] mb-6">
            Ready to create your next project?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Let's discuss how we can bring your vision to life with stunning animation.
          </p>
          <a
            href="/book-call"
            className="bg-gradient-to-r from-[#ff9a1d] to-[#016952] text-[#fefefe] px-10 py-4 rounded-full text-lg font-semibold hover:shadow-xl hover:scale-105 transition-all duration-300 inline-flex items-center space-x-3"
          >
            <span>Start Your Project</span>
            <ExternalLink className="w-5 h-5" />
          </a>
        </div>
      </section>
    </div>
  );
};

export default Portfolio;
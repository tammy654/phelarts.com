import React, { useState } from 'react';
import { Filter, ExternalLink, Calendar, Users, Award } from 'lucide-react';

const OurWork = () => {
  const [activeFilter, setActiveFilter] = useState('All');

  const filters = ['All', 'Branding', 'Web Design', 'Motion Graphics', 'Print Design'];

  const projects = [
    {
      title: 'TechFlow Branding',
      category: 'Branding',
      image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800',
      description: 'Complete brand identity design for a tech startup including logo, color palette, and brand guidelines.',
      tags: ['Logo Design', 'Brand Identity', 'Guidelines'],
      year: '2024',
      client: 'TechFlow Inc.'
    },
    {
      title: 'EcoLife Website',
      category: 'Web Design',
      image: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=800',
      description: 'Responsive website design for an environmental organization with focus on sustainability.',
      tags: ['UI/UX', 'Responsive', 'Sustainability'],
      year: '2024',
      client: 'EcoLife Foundation'
    },
    {
      title: 'Product Launch Animation',
      category: 'Motion Graphics',
      image: 'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=800',
      description: 'Dynamic motion graphics for product launch campaign across multiple platforms.',
      tags: ['Animation', 'Product Launch', 'Social Media'],
      year: '2024',
      client: 'InnovateTech'
    },
    {
      title: 'Annual Report Design',
      category: 'Print Design',
      image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800',
      description: 'Comprehensive annual report design with infographics and data visualization.',
      tags: ['Print', 'Infographics', 'Data Viz'],
      year: '2023',
      client: 'Global Finance Corp'
    },
    {
      title: 'Restaurant Chain Rebrand',
      category: 'Branding',
      image: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=800',
      description: 'Complete rebranding for a restaurant chain including signage and packaging design.',
      tags: ['Rebranding', 'Packaging', 'Signage'],
      year: '2023',
      client: 'Taste Buds Restaurant'
    },
    {
      title: 'E-commerce Platform',
      category: 'Web Design',
      image: 'https://images.pexels.com/photos/3184317/pexels-photo-3184317.jpeg?auto=compress&cs=tinysrgb&w=800',
      description: 'Modern e-commerce platform with seamless user experience and mobile optimization.',
      tags: ['E-commerce', 'Mobile First', 'UX'],
      year: '2023',
      client: 'ShopSmart'
    }
  ];

  const filteredProjects = activeFilter === 'All' 
    ? projects 
    : projects.filter(project => project.category === activeFilter);

  return (
    <div className="min-h-screen bg-[#fefefe]">
      {/* Hero Section */}
      <section className="py-24 bg-gradient-to-br from-[#242424] via-gray-800 to-[#016952]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center" data-aos="fade-up">
          <h1 className="text-5xl lg:text-7xl font-bold text-[#fefefe] mb-8">
            Our Work
          </h1>
          <p className="text-xl lg:text-2xl text-gray-300 max-w-4xl mx-auto mb-12">
            A showcase of our recent projects that demonstrate our commitment to 
            exceptional design and storytelling.
          </p>
          <div className="flex flex-wrap justify-center gap-4" data-aos="fade-up" data-aos-delay="200">
            <div className="bg-[#fefefe]/10 backdrop-blur-sm border border-[#fefefe]/20 rounded-full px-4 py-2">
              <span className="text-sm font-medium text-[#fefefe]/90">500+ Projects Completed</span>
            </div>
            <div className="bg-[#fefefe]/10 backdrop-blur-sm border border-[#fefefe]/20 rounded-full px-4 py-2">
              <span className="text-sm font-medium text-[#fefefe]/90">98% Client Satisfaction</span>
            </div>
            <div className="bg-[#fefefe]/10 backdrop-blur-sm border border-[#fefefe]/20 rounded-full px-4 py-2">
              <span className="text-sm font-medium text-[#fefefe]/90">50+ Awards Won</span>
            </div>
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-12 bg-[#fefefe] border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-8" data-aos="fade-up">
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
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <div className="relative overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all duration-500">
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
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
                    
                    <p className="text-gray-600 mb-4 leading-relaxed">
                      {project.description}
                    </p>
                    
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
                      
                      <button className="flex items-center gap-2 text-[#ff9a1d] hover:text-[#016952] font-medium transition-colors">
                        View Project
                        <ExternalLink className="w-4 h-4" />
                      </button>
                    </div>
                    
                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Users className="w-4 h-4" />
                        Client: {project.client}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 bg-gradient-to-r from-[#242424] to-[#016952]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8" data-aos="fade-up">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-[#fefefe] mb-6">
              Our Impact in Numbers
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Every project tells a story of success, creativity, and client satisfaction.
            </p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { number: '500+', label: 'Projects Completed', icon: Award },
              { number: '98%', label: 'Client Satisfaction', icon: Users },
              { number: '50+', label: 'Awards Won', icon: Award },
              { number: '5+', label: 'Years Experience', icon: Calendar }
            ].map((stat, index) => (
              <div
                key={index}
                className="text-center"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-[#ff9a1d] rounded-full mb-4">
                  <stat.icon className="w-8 h-8 text-[#fefefe]" />
                </div>
                <div className="text-4xl lg:text-5xl font-bold text-[#fefefe] mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-300 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-[#fefefe]">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center" data-aos="fade-up">
          <h2 className="text-4xl lg:text-5xl font-bold text-[#242424] mb-6">
            Ready to Start Your Project?
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Let's collaborate to bring your vision to life with exceptional design and creativity.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-gradient-to-r from-[#ff9a1d] to-[#016952] text-[#fefefe] px-8 py-4 rounded-full font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105">
              Start a Project
            </button>
            <button className="border-2 border-[#242424] text-[#242424] px-8 py-4 rounded-full font-semibold hover:bg-[#242424] hover:text-[#fefefe] transition-all duration-300">
              View More Work
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default OurWork;
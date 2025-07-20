import React from 'react';
import { ExternalLink, Play } from 'lucide-react';

const Portfolio = () => {
  const projects = [
    {
      title: 'Brand Evolution',
      category: 'Motion Graphics',
      image: 'https://images.pexels.com/photos/3945313/pexels-photo-3945313.jpeg?auto=compress&cs=tinysrgb&w=800',
      description: 'Complete brand transformation through dynamic motion graphics and storytelling.',
      tags: ['Branding', 'Animation', 'Strategy'],
    },
    {
      title: 'Character Journey',
      category: '2D Animation',
      image: 'https://images.pexels.com/photos/7688336/pexels-photo-7688336.jpeg?auto=compress&cs=tinysrgb&w=800',
      description: 'Engaging character-driven narrative for educational content series.',
      tags: ['Character Design', 'Storytelling', 'Education'],
    },
    {
      title: 'Product Launch',
      category: 'Explainer Video',
      image: 'https://images.pexels.com/photos/3945312/pexels-photo-3945312.jpeg?auto=compress&cs=tinysrgb&w=800',
      description: 'Compelling product demonstration with sleek animations and clear messaging.',
      tags: ['Product Demo', 'Marketing', 'Animation'],
    },
    {
      title: 'Digital Experience',
      category: 'Web Animation',
      image: 'https://images.pexels.com/photos/7688337/pexels-photo-7688337.jpeg?auto=compress&cs=tinysrgb&w=800',
      description: 'Interactive web animations that enhance user engagement and experience.',
      tags: ['Web Design', 'UX', 'Interactive'],
    },
  ];

  return (
    <section id="portfolio" className="py-32 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-20">
          <h2 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6 tracking-tight">
            Selected work
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            A showcase of our recent projects that demonstrate our commitment to 
            exceptional design and storytelling.
          </p>
        </div>

        {/* Portfolio Grid */}
        <div className="space-y-20">
          {projects.map((project, index) => (
            <div
              key={index}
              className={`grid lg:grid-cols-2 gap-12 items-center ${
                index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
              }`}
            >
              {/* Project Image */}
              <div className={`relative group ${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                <div className="relative overflow-hidden rounded-3xl bg-gray-900 aspect-[4/3]">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                        <Play className="w-10 h-10 text-white ml-1" />
                      </div>
                    </div>
                    
                    <div className="absolute top-6 right-6">
                      <ExternalLink className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Project Info */}
              <div className={`space-y-6 ${index % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''}`}>
                <div className="inline-block bg-gradient-to-r from-orange-400 to-emerald-600 bg-clip-text text-transparent text-sm font-semibold uppercase tracking-wider">
                  {project.category}
                </div>
                
                <h3 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                  {project.title}
                </h3>
                
                <p className="text-xl text-gray-600 leading-relaxed">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-3">
                  {project.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="px-4 py-2 bg-white rounded-full text-sm font-medium text-gray-700 border border-gray-200"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                
                <button className="text-orange-500 font-semibold text-lg flex items-center space-x-2 hover:text-emerald-600 transition-colors group">
                  <span>View project</span>
                  <ExternalLink className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* View All CTA */}
        <div className="text-center mt-20">
          <a
            href="#contact"
            className="bg-gradient-to-r from-orange-400 to-emerald-600 text-white px-10 py-4 rounded-full text-lg font-semibold hover:shadow-xl hover:scale-105 transition-all duration-300 inline-flex items-center space-x-3"
          >
            <span>View All Projects</span>
            <ExternalLink className="w-5 h-5" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
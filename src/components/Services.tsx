import React from 'react';
import { Video, Palette, Zap, Globe, Film, Smartphone, ArrowRight } from 'lucide-react';

const Services = () => {
  const services = [
    {
      icon: Video,
      title: '2D Animation',
      description: 'Character-driven stories and explainer videos that engage and educate your audience.',
      features: ['Character Animation', 'Explainer Videos', 'Educational Content'],
    },
    {
      icon: Palette,
      title: 'Motion Graphics',
      description: 'Dynamic visual elements that bring your brand to life with style and sophistication.',
      features: ['Logo Animation', 'Brand Videos', 'Title Sequences'],
    },
    {
      icon: Zap,
      title: 'Visual Effects',
      description: 'Cutting-edge VFX and compositing that elevate your content to cinematic quality.',
      features: ['Compositing', 'Green Screen', 'Post-Production'],
    },
    {
      icon: Globe,
      title: 'Web Animation',
      description: 'Interactive animations that enhance user experience and drive engagement.',
      features: ['UI Animations', 'Interactive Elements', 'Micro-interactions'],
    },
    {
      icon: Film,
      title: 'Video Production',
      description: 'End-to-end video production from concept development to final delivery.',
      features: ['Concept Development', 'Storyboarding', 'Production'],
    },
    {
      icon: Smartphone,
      title: 'App Animations',
      description: 'Smooth, delightful animations that make mobile experiences memorable.',
      features: ['App Transitions', 'Loading Animations', 'UI Elements'],
    },
  ];

  return (
    <section id="services" className="py-32 bg-white">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-20">
          <h2 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6 tracking-tight">
            What we do
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            We specialize in creating compelling visual content that tells your story, 
            engages your audience, and drives meaningful results.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid lg:grid-cols-2 gap-12 mb-20">
          {services.map((service, index) => (
            <div
              key={index}
              className="group p-8 rounded-3xl bg-gray-50 hover:bg-white hover:shadow-2xl transition-all duration-500 border border-transparent hover:border-gray-100"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-emerald-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <service.icon className="w-8 h-8 text-white" />
              </div>
              
              <h3 className="text-2xl font-bold text-gray-900 mb-4">{service.title}</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">{service.description}</p>
              
              <ul className="space-y-2 mb-6">
                {service.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center text-gray-700">
                    <div className="w-1.5 h-1.5 bg-orange-400 rounded-full mr-3"></div>
                    {feature}
                  </li>
                ))}
              </ul>
              
              <button className="text-orange-500 font-semibold flex items-center space-x-2 group-hover:text-emerald-600 transition-colors">
                <span>Learn more</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gradient-to-r from-gray-900 to-gray-800 rounded-3xl p-12 lg:p-16">
          <h3 className="text-3xl lg:text-4xl font-bold text-white mb-6">
            Ready to bring your vision to life?
          </h3>
          <p className="text-xl text-white/70 mb-8 max-w-2xl mx-auto">
            Let's discuss your project and create something extraordinary together.
          </p>
          <a
            href="#contact"
            className="bg-gradient-to-r from-orange-400 to-emerald-600 text-white px-10 py-4 rounded-full text-lg font-semibold hover:shadow-xl hover:scale-105 transition-all duration-300 inline-flex items-center space-x-3"
          >
            <span>Start Your Project</span>
            <ArrowRight className="w-5 h-5" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Services;
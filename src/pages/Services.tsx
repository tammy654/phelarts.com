import React from 'react';
import { Video, Palette, Zap, Globe, Film, Smartphone, ArrowRight, Check } from 'lucide-react';

const Services = () => {
  const services = [
    {
      icon: Video,
      title: '2D Animation',
      description: 'Character-driven stories and explainer videos that engage and educate your audience with compelling narratives.',
      features: ['Character Animation', 'Explainer Videos', 'Educational Content', 'Storyboarding'],
      price: 'Starting at $2,500',
      timeline: '2-4 weeks'
    },
    {
      icon: Palette,
      title: 'Motion Graphics',
      description: 'Dynamic visual elements that bring your brand to life with style, sophistication, and memorable impact.',
      features: ['Logo Animation', 'Brand Videos', 'Title Sequences', 'Social Media Content'],
      price: 'Starting at $1,500',
      timeline: '1-3 weeks'
    },
    {
      icon: Zap,
      title: 'Visual Effects',
      description: 'Cutting-edge VFX and compositing that elevate your content to cinematic quality and professional standards.',
      features: ['Compositing', 'Green Screen', 'Post-Production', 'Color Grading'],
      price: 'Starting at $3,000',
      timeline: '3-5 weeks'
    },
    {
      icon: Globe,
      title: 'Web Animation',
      description: 'Interactive animations that enhance user experience and drive engagement across digital platforms.',
      features: ['UI Animations', 'Interactive Elements', 'Micro-interactions', 'Loading Animations'],
      price: 'Starting at $1,200',
      timeline: '1-2 weeks'
    },
    {
      icon: Film,
      title: 'Video Production',
      description: 'End-to-end video production from concept development to final delivery with professional quality.',
      features: ['Concept Development', 'Scriptwriting', 'Production', 'Post-Production'],
      price: 'Starting at $4,000',
      timeline: '4-6 weeks'
    },
    {
      icon: Smartphone,
      title: 'App Animations',
      description: 'Smooth, delightful animations that make mobile experiences memorable and user-friendly.',
      features: ['App Transitions', 'Loading Animations', 'UI Elements', 'Onboarding Flows'],
      price: 'Starting at $1,800',
      timeline: '2-3 weeks'
    },
  ];

  const process = [
    {
      step: '01',
      title: 'Discovery',
      description: 'We start by understanding your goals, target audience, and project requirements.'
    },
    {
      step: '02',
      title: 'Concept',
      description: 'Our team develops creative concepts and storyboards that align with your vision.'
    },
    {
      step: '03',
      title: 'Production',
      description: 'We bring your project to life with meticulous attention to detail and quality.'
    },
    {
      step: '04',
      title: 'Delivery',
      description: 'Final delivery with all necessary formats and ongoing support for your project.'
    }
  ];

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="py-24 bg-gradient-to-br from-[#242424] via-gray-800 to-[#016952]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center" data-aos="fade-up">
          <h1 className="text-5xl lg:text-7xl font-bold text-[#fefefe] mb-8">
            Our Services
          </h1>
          <p className="text-xl lg:text-2xl text-gray-300 max-w-4xl mx-auto mb-12">
            From concept to completion, we offer comprehensive animation and motion graphics 
            services that bring your vision to life.
          </p>
          <a
            href="/book-call"
            className="bg-gradient-to-r from-[#ff9a1d] to-[#016952] text-[#fefefe] px-8 py-4 rounded-full text-lg font-semibold hover:shadow-xl hover:scale-105 transition-all duration-300 inline-flex items-center space-x-2"
          >
            <span>Start a Project</span>
            <ArrowRight className="w-5 h-5" />
          </a>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 bg-[#fefefe]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8" data-aos="fade-up">
          <div className="grid lg:grid-cols-2 gap-12">
            {services.map((service, index) => (
              <div
                key={index}
                className="group p-8 rounded-3xl bg-gray-50 hover:bg-white hover:shadow-2xl transition-all duration-500 border border-transparent hover:border-gray-100"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <div className="w-16 h-16 bg-gradient-to-br from-[#ff9a1d] to-[#016952] rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <service.icon className="w-8 h-8 text-[#fefefe]" />
                </div>
                
                <h3 className="text-2xl font-bold text-[#242424] mb-4">{service.title}</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">{service.description}</p>
                
                <div className="grid md:grid-cols-2 gap-4 mb-6">
                  <div>
                    <h4 className="font-semibold text-[#242424] mb-3">What's included:</h4>
                    <ul className="space-y-2">
                      {service.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center text-gray-700">
                          <Check className="w-4 h-4 text-[#016952] mr-2 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <div className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Price</div>
                      <div className="text-lg font-bold text-[#242424]">{service.price}</div>
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Timeline</div>
                      <div className="text-lg font-bold text-[#242424]">{service.timeline}</div>
                    </div>
                  </div>
                </div>
                
                <a
                  href="/book-call"
                  className="text-[#ff9a1d] font-semibold flex items-center space-x-2 group-hover:text-[#016952] transition-colors"
                >
                  <span>Get Quote</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-[#242424] mb-6">
              Our Process
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              A proven methodology that ensures exceptional results for every project.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {process.map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-[#ff9a1d] to-[#016952] rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-bold text-[#fefefe]">{item.step}</span>
                </div>
                <h3 className="text-xl font-bold text-[#242424] mb-4">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-[#242424] to-gray-800">
        <div className="max-w-4xl mx-auto text-center px-6 lg:px-8">
          <h2 className="text-4xl lg:text-5xl font-bold text-[#fefefe] mb-6">
            Ready to get started?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Let's discuss your project and create something extraordinary together.
          </p>
          <a
            href="/book-call"
            className="bg-gradient-to-r from-[#ff9a1d] to-[#016952] text-[#fefefe] px-10 py-4 rounded-full text-lg font-semibold hover:shadow-xl hover:scale-105 transition-all duration-300 inline-flex items-center space-x-3"
          >
            <span>Book a Call</span>
            <ArrowRight className="w-5 h-5" />
          </a>
        </div>
      </section>
    </div>
  );
};

export default Services;
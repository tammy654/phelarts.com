import React from 'react';
import { ArrowRight, Sparkles, Play } from 'lucide-react';

const Hero = () => {
  return (
    <section id="home" className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-emerald-900 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-8 pt-32 pb-20">
        <div className="text-center max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-8">
            <Sparkles className="w-4 h-4 text-orange-400" />
            <span className="text-sm font-medium text-white/90">Award-winning animation studio</span>
          </div>
          
          {/* Main Heading */}
          <h1 className="text-6xl lg:text-8xl font-bold text-white mb-8 tracking-tight leading-none">
            We craft
            <span className="block bg-gradient-to-r from-orange-400 to-emerald-400 bg-clip-text text-transparent">
              visual stories
            </span>
            that move people
          </h1>
          
          {/* Subheading */}
          <p className="text-xl lg:text-2xl text-white/70 mb-12 max-w-3xl mx-auto leading-relaxed">
            From concept to completion, we create stunning motion graphics and 2D animations 
            that captivate audiences and drive results for forward-thinking brands.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-20">
            <a
              href="#portfolio"
              className="bg-gradient-to-r from-orange-400 to-emerald-600 text-white px-10 py-4 rounded-full text-lg font-semibold hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center space-x-3"
            >
              <Play className="w-5 h-5" />
              <span>View Our Work</span>
            </a>
            
            <a
              href="#contact"
              className="border-2 border-white/30 text-white px-10 py-4 rounded-full text-lg font-semibold hover:bg-white/10 hover:border-white/50 transition-all duration-300 flex items-center space-x-3"
            >
              <span>Start a Project</span>
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">500+</div>
              <div className="text-white/60 text-sm uppercase tracking-wider">Projects</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">50+</div>
              <div className="text-white/60 text-sm uppercase tracking-wider">Clients</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">5+</div>
              <div className="text-white/60 text-sm uppercase tracking-wider">Years</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-bounce"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
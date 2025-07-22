import React, { useState, useEffect } from 'react';
import { ArrowRight, Sparkles, Play, ChevronLeft, ChevronRight } from 'lucide-react';

const Hero = () => {
  const [currentVideo, setCurrentVideo] = useState(0);
  
  // Video sources - using placeholder videos for demo
  const videos = [
    'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4'
  ];

  // Auto-slide functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentVideo((prev) => (prev + 1) % videos.length);
    }, 8000); // Change video every 8 seconds

    return () => clearInterval(interval);
  }, [videos.length]);

  const nextVideo = () => {
    setCurrentVideo((prev) => (prev + 1) % videos.length);
  };

  const prevVideo = () => {
    setCurrentVideo((prev) => (prev - 1 + videos.length) % videos.length);
  };

  return (
    <section id="home" className="min-h-screen relative overflow-hidden">
      {/* Video Background Carousel */}
      <div className="absolute inset-0">
        {videos.map((video, index) => (
          <video
            key={index}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
              index === currentVideo ? 'opacity-100' : 'opacity-0'
            }`}
            autoPlay
            muted
            loop
            playsInline
          >
            <source src={video} type="video/mp4" />
          </video>
        ))}
        
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#242424]/80 via-[#242424]/60 to-[#016952]/40"></div>
      </div>

      {/* Video Controls */}
      <div className="absolute top-1/2 left-8 transform -translate-y-1/2 z-20">
        <button
          onClick={prevVideo}
          className="w-12 h-12 bg-[#fefefe]/3 backdrop-blur-xl border border-[#fefefe]/5 rounded-full flex items-center justify-center hover:bg-[#fefefe]/10 transition-all duration-300"
        >
          <ChevronLeft className="w-6 h-6 text-[#fefefe]/30" />
        </button>
      </div>
      
      <div className="absolute top-1/2 right-8 transform -translate-y-1/2 z-20">
        <button
          onClick={nextVideo}
          className="w-12 h-12 bg-[#fefefe]/3 backdrop-blur-xl border border-[#fefefe]/5 rounded-full flex items-center justify-center hover:bg-[#fefefe]/10 transition-all duration-300"
        >
          <ChevronRight className="w-6 h-6 text-[#fefefe]/30" />
        </button>
      </div>

      {/* Video Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 z-20">
        {videos.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentVideo(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentVideo ? 'bg-[#ff9a1d]' : 'bg-[#fefefe]/40 hover:bg-[#fefefe]/60'
            }`}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-8 pt-32 pb-20">
        <div className="text-center max-w-4xl mx-auto" data-aos="fade-up">
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 bg-[#fefefe]/10 backdrop-blur-sm border border-[#fefefe]/20 rounded-full px-4 py-2 mb-8">
            <Sparkles className="w-4 h-4 text-[#ff9a1d]" />
            <span className="text-sm font-medium text-[#fefefe]/90">Award-winning animation studio</span>
          </div>
          
          {/* Main Heading */}
          <h1 className="text-4xl lg:text-6xl font-bold text-[#fefefe] mb-6 tracking-tight leading-none">
            We craft
            <span className="block bg-gradient-to-r from-[#ff9a1d] to-[#016952] bg-clip-text text-transparent">
              visual stories
            </span>
            that connects people
          </h1>
          
          {/* Subheading */}
          <p className="text-base lg:text-lg text-[#fefefe]/70 mb-12 max-w-xl mx-auto leading-relaxed">
            From concept to completion, we create stunning motion graphics and 2D animations 
            that captivate audiences and drive results for forward-thinking brands.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-10">
            <a
              href="/our-work"
              className="phel-btn px-8 py-3 text-base space-x-3"
            >
              <Play className="w-5 h-5" />
              <span>View Our Work</span>
            </a>
            
            <a
              href="/book-call"
              className="border-2 border-[#fefefe]/30 text-[#fefefe] px-6 py-2 rounded-full text-base font-semibold hover:bg-[#fefefe]/10 hover:border-[#fefefe]/50 transition-all duration-300 flex items-center space-x-3"
            >
              <span>Start a Project</span>
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto" data-aos="fade-up" data-aos-delay="200">
            <div className="text-center">
              <div className="text-4xl font-bold text-[#fefefe] mb-2">500+</div>
              <div className="text-[#fefefe]/60 text-sm uppercase tracking-wider">Projects</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-[#fefefe] mb-2">50+</div>
              <div className="text-[#fefefe]/60 text-sm uppercase tracking-wider">Clients</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-[#fefefe] mb-2">5+</div>
              <div className="text-[#fefefe]/60 text-sm uppercase tracking-wider">Years</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
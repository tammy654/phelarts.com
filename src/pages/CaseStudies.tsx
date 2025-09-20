import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, TrendingUp, Users, Clock, Target, Award, ExternalLink } from 'lucide-react';
import ParallaxSection from '../components/ParallaxSection';

const CaseStudies = () => {
  const caseStudies = [
    {
      title: 'TechCorp Brand Revolution',
      client: 'TechCorp Inc.',
      category: 'Motion Graphics & Branding',
      image: 'https://images.pexels.com/photos/3945313/pexels-photo-3945313.jpeg?auto=compress&cs=tinysrgb&w=800',
      challenge: 'TechCorp needed to modernize their brand identity and create engaging content that would resonate with a younger, tech-savvy audience while maintaining their professional credibility.',
      solution: 'We developed a comprehensive motion graphics package including logo animations, brand videos, and social media content that balanced innovation with professionalism.',
      results: [
        { metric: 'Brand Recognition', value: '+300%', icon: TrendingUp },
        { metric: 'Social Engagement', value: '+450%', icon: Users },
        { metric: 'Lead Generation', value: '+200%', icon: Target },
        { metric: 'Project Duration', value: '3 weeks', icon: Clock }
      ],
      testimonial: {
        text: "Phel Arts transformed our brand identity beyond our expectations. The motion graphics they created perfectly captured our vision and significantly boosted our market presence.",
        author: "Sarah Johnson",
        position: "Marketing Director, TechCorp Inc."
      },
      tags: ['Motion Graphics', 'Brand Identity', 'Social Media', 'Logo Animation']
    },
    {
      title: 'EduLearn Engagement Boost',
      client: 'EduLearn Platform',
      category: '2D Animation & Educational Content',
      image: 'https://images.pexels.com/photos/7688336/pexels-photo-7688336.jpeg?auto=compress&cs=tinysrgb&w=800',
      challenge: 'EduLearn\'s educational content had low engagement rates and high dropout rates. Students found the material boring and difficult to understand.',
      solution: 'We created a series of character-driven 2D animations that simplified complex concepts and made learning fun and engaging through storytelling.',
      results: [
        { metric: 'User Engagement', value: '+250%', icon: TrendingUp },
        { metric: 'Course Completion', value: '+180%', icon: Target },
        { metric: 'Student Satisfaction', value: '95%', icon: Users },
        { metric: 'Content Series', value: '12 episodes', icon: Award }
      ],
      testimonial: {
        text: "The animated series revolutionized our platform. Students are now excited about learning, and our completion rates have never been higher.",
        author: "Dr. Michael Chen",
        position: "CEO, EduLearn Platform"
      },
      tags: ['2D Animation', 'Character Design', 'Educational Content', 'Storytelling']
    },
    {
      title: 'InnovateTech Product Launch',
      client: 'InnovateTech Solutions',
      category: 'Visual Effects & Product Demo',
      image: 'https://images.pexels.com/photos/3945312/pexels-photo-3945312.jpeg?auto=compress&cs=tinysrgb&w=800',
      challenge: 'InnovateTech needed to launch their complex software product with a compelling demonstration that would clearly communicate its value proposition to potential customers.',
      solution: 'We created a cinematic product demonstration using advanced visual effects, 3D elements, and clear messaging to showcase the software\'s capabilities.',
      results: [
        { metric: 'Conversion Rate', value: '+400%', icon: TrendingUp },
        { metric: 'Demo Requests', value: '+350%', icon: Target },
        { metric: 'Sales Qualified Leads', value: '+280%', icon: Users },
        { metric: 'Video Views', value: '500K+', icon: Award }
      ],
      testimonial: {
        text: "The product demo video exceeded all our expectations. It perfectly captured our software's complexity in a simple, engaging way that drove incredible results.",
        author: "Alex Rodriguez",
        position: "Product Manager, InnovateTech"
      },
      tags: ['Visual Effects', 'Product Demo', 'VFX', 'Marketing']
    }
  ];

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
        
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl lg:text-7xl font-bold text-[#fefefe] mb-8">
              Case Studies
            </h1>
            <p className="text-xl lg:text-2xl text-gray-300 max-w-4xl mx-auto mb-12">
              Deep dives into our most successful projects, showcasing the challenges we solved, 
              the creative solutions we implemented, and the measurable results we achieved.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="py-24 bg-[#fefefe]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {caseStudies.map((study, index) => (
            <ParallaxSection 
              key={index} 
              direction={index % 2 === 0 ? 'right' : 'left'} 
              intensity={25}
            >
              <motion.div
                className="mb-32 last:mb-0"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <div className={`grid lg:grid-cols-2 gap-16 items-center ${
                  index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
                }`}>
                  {/* Image */}
                  <div className={`relative group ${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                    <div className="relative overflow-hidden rounded-3xl aspect-[4/3]">
                      <img
                        src={study.image}
                        alt={study.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#242424]/60 to-transparent"></div>
                      <div className="absolute bottom-6 left-6 right-6">
                        <div className="text-[#fefefe] font-semibold text-lg">{study.client}</div>
                        <div className="text-[#ff9a1d] text-sm">{study.category}</div>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className={`space-y-8 ${index % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''}`}>
                    <div>
                      <h2 className="text-4xl lg:text-5xl font-bold text-[#242424] mb-4">
                        {study.title}
                      </h2>
                      <div className="text-[#ff9a1d] font-semibold text-lg mb-6">
                        {study.category}
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div>
                        <h3 className="text-xl font-bold text-[#242424] mb-3">The Challenge</h3>
                        <p className="text-gray-600 leading-relaxed">{study.challenge}</p>
                      </div>

                      <div>
                        <h3 className="text-xl font-bold text-[#242424] mb-3">Our Solution</h3>
                        <p className="text-gray-600 leading-relaxed">{study.solution}</p>
                      </div>
                    </div>

                    {/* Results Grid */}
                    <div className="grid grid-cols-2 gap-4">
                      {study.results.map((result, resultIndex) => (
                        <motion.div
                          key={resultIndex}
                          className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 border border-gray-100"
                          whileHover={{ scale: 1.05 }}
                          transition={{ duration: 0.2 }}
                        >
                          <div className="flex items-center space-x-3 mb-2">
                            <div className="w-8 h-8 bg-gradient-to-br from-[#ff9a1d] to-[#016952] rounded-lg flex items-center justify-center">
                              <result.icon className="w-4 h-4 text-[#fefefe]" />
                            </div>
                            <div className="text-sm font-medium text-gray-600">{result.metric}</div>
                          </div>
                          <div className="text-2xl font-bold text-[#242424]">{result.value}</div>
                        </motion.div>
                      ))}
                    </div>

                    {/* Testimonial */}
                    <div className="bg-gradient-to-r from-[#ff9a1d]/10 to-[#016952]/10 rounded-2xl p-8">
                      <div className="text-lg text-[#242424] mb-4 italic leading-relaxed">
                        "{study.testimonial.text}"
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-[#ff9a1d] to-[#016952] rounded-full flex items-center justify-center">
                          <Users className="w-6 h-6 text-[#fefefe]" />
                        </div>
                        <div>
                          <div className="font-bold text-[#242424]">{study.testimonial.author}</div>
                          <div className="text-gray-600 text-sm">{study.testimonial.position}</div>
                        </div>
                      </div>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-3">
                      {study.tags.map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <motion.button 
                      className="flex items-center space-x-2 text-[#ff9a1d] hover:text-[#016952] font-semibold text-lg transition-colors group"
                      whileHover={{ x: 5 }}
                    >
                      <span>View Full Case Study</span>
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            </ParallaxSection>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <ParallaxSection direction="up" intensity={40}>
        <section className="py-24 bg-gradient-to-r from-[#242424] to-gray-800">
          <div className="max-w-4xl mx-auto text-center px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl lg:text-5xl font-bold text-[#fefefe] mb-6">
                Ready to Write Your Success Story?
              </h2>
              <p className="text-xl text-gray-300 mb-8">
                Let's create a case study that showcases your brand's transformation and measurable results.
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
                  href="/portfolio"
                  className="border-2 border-[#fefefe]/30 text-[#fefefe] px-8 py-4 rounded-full text-lg font-semibold hover:bg-[#fefefe]/10 transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  View Portfolio
                </motion.a>
              </div>
            </motion.div>
          </div>
        </section>
      </ParallaxSection>
    </div>
  );
};

export default CaseStudies;
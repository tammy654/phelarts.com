import React from 'react';
import { motion } from 'framer-motion';
import Hero from '../components/Hero';
import ClientLogos from '../components/ClientLogos';
import ParallaxSection from '../components/ParallaxSection';

const Home = () => {
  return (
    <div>
      <Hero />
      
      {/* Client Logos */}
      <ClientLogos />
      
      {/* Quick Services Preview */}
      <ParallaxSection direction="up" intensity={30}>
        <section className="py-24 bg-[#fefefe] relative overflow-hidden">
          <div className="absolute top-20 right-20 w-32 h-32 bg-[#ff9a1d]/10 rounded-full blur-2xl"></div>
          <div className="absolute bottom-20 left-20 w-24 h-24 bg-[#016952]/10 rounded-full blur-xl"></div>
          
        <div className="max-w-7xl mx-auto px-6 lg:px-8" data-aos="fade-up">
            <motion.div 
              className="text-center mb-16"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
            <h2 className="text-4xl lg:text-5xl font-bold text-[#242424] mb-6">
              What we create
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From concept to completion, we bring your vision to life through stunning animation.
            </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: '2D Animation',
                description: 'Character-driven stories that captivate and engage your audience.',
                image: 'https://images.pexels.com/photos/7688336/pexels-photo-7688336.jpeg?auto=compress&cs=tinysrgb&w=600'
              },
              {
                title: 'Motion Graphics',
                description: 'Dynamic visual elements that bring your brand to life.',
                image: 'https://images.pexels.com/photos/3945313/pexels-photo-3945313.jpeg?auto=compress&cs=tinysrgb&w=600'
              },
              {
                title: 'Visual Effects',
                description: 'Cutting-edge VFX that elevate your content to cinematic quality.',
                image: 'https://images.pexels.com/photos/3945312/pexels-photo-3945312.jpeg?auto=compress&cs=tinysrgb&w=600'
              }
            ].map((service, index) => (
              <ParallaxSection 
                key={index} 
                direction={index % 2 === 0 ? 'up' : 'down'} 
                intensity={20}
              >
                <motion.div 
                  className="group cursor-pointer h-full"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                <div className="relative overflow-hidden rounded-2xl mb-6 aspect-[4/3]">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#242424]/60 to-transparent"></div>
                </div>
                <h3 className="text-2xl font-bold text-[#242424] mb-3">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
                </motion.div>
              </ParallaxSection>
            ))}
            </div>
        </div>
        </section>
      </ParallaxSection>

      {/* CTA Section */}
      <ParallaxSection direction="right" intensity={25}>
        <section className="py-24 bg-gradient-to-r from-[#242424] to-gray-800 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.05"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
          
        <div className="max-w-4xl mx-auto text-center px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
          <h2 className="text-4xl lg:text-5xl font-bold text-[#fefefe] mb-6">
            Ready to create something amazing?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Let's discuss your project and bring your vision to life.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
            <a
              href="/our-work"
              className="phel-btn px-6 py-2 text-base"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            >
              View Our Work
              </motion.a>
              <motion.a
            </a>
            <a
              href="/book-call"
              className="border-2 border-[#fefefe]/30 text-[#fefefe] px-6 py-2 rounded-full text-lg font-semibold hover:bg-[#fefefe]/10 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            >
              Start a Project
              </motion.a>
            </a>
          </div>
            </motion.div>
        </div>
        </section>
      </ParallaxSection>
    </div>
  );
};

export default Home;
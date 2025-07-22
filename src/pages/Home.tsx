import React from 'react';
import Hero from '../components/Hero';

const Home = () => {
  return (
    <div>
      <Hero />
      
      {/* Quick Services Preview */}
      <section className="py-24 bg-[#fefefe]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8" data-aos="fade-up">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-[#242424] mb-6">
              What we create
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From concept to completion, we bring your vision to life through stunning animation.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8" data-aos="fade-up" data-aos-delay="200">
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
              <div key={index} className="group cursor-pointer" data-aos="fade-up" data-aos-delay={index * 100}>
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
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-[#242424] to-gray-800">
        <div className="max-w-4xl mx-auto text-center px-6 lg:px-8">
          <h2 className="text-4xl lg:text-5xl font-bold text-[#fefefe] mb-6">
            Ready to create something amazing?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Let's discuss your project and bring your vision to life.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/our-work"
              className="phel-btn px-6 py-2 text-base"
            >
              View Our Work
            </a>
            <a
              href="/book-call"
              className="border-2 border-[#fefefe]/30 text-[#fefefe] px-6 py-2 rounded-full text-lg font-semibold hover:bg-[#fefefe]/10 transition-all duration-300"
            >
              Start a Project
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
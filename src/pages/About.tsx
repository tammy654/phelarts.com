import React from 'react';
import { motion } from 'framer-motion';
import { Award, Users, Clock, Target, ArrowRight, Heart, Lightbulb, Shield } from 'lucide-react';
import ClientLogos from '../components/ClientLogos';
import ParallaxSection from '../components/ParallaxSection';

const About = () => {
  const stats = [
    { icon: Award, value: '500+', label: 'Projects Delivered' },
    { icon: Users, value: '50+', label: 'Happy Clients' },
    { icon: Clock, value: '5+', label: 'Years Experience' },
    { icon: Target, value: '98%', label: 'Client Satisfaction' },
  ];

  const values = [
    {
      icon: Heart,
      title: 'Creativity First',
      description: 'We believe every project deserves a unique creative approach that stands out from the crowd and captures attention.',
    },
    {
      icon: Shield,
      title: 'Quality Obsessed',
      description: 'Attention to detail and technical excellence are at the core of everything we do, ensuring exceptional results.',
    },
    {
      icon: Lightbulb,
      title: 'Client Partnership',
      description: 'We work closely with our clients as true partners in bringing their vision to life and achieving their goals.',
    },
  ];

  const team = [
    {
      name: 'Alex Chen',
      role: 'Creative Director',
      image: 'https://images.pexels.com/photos/3777931/pexels-photo-3777931.jpeg?auto=compress&cs=tinysrgb&w=600',
      bio: '10+ years in animation and motion graphics with a passion for storytelling.'
    },
    {
      name: 'Sarah Johnson',
      role: 'Lead Animator',
      image: 'https://images.pexels.com/photos/3756679/pexels-photo-3756679.jpeg?auto=compress&cs=tinysrgb&w=600',
      bio: 'Specialist in character animation and bringing personalities to life through motion.'
    },
    {
      name: 'Mike Rodriguez',
      role: 'VFX Artist',
      image: 'https://images.pexels.com/photos/3785079/pexels-photo-3785079.jpeg?auto=compress&cs=tinysrgb&w=600',
      bio: 'Expert in visual effects and compositing with a background in film production.'
    },
    {
      name: 'Emma Davis',
      role: 'Motion Designer',
      image: 'https://images.pexels.com/photos/3756681/pexels-photo-3756681.jpeg?auto=compress&cs=tinysrgb&w=600',
      bio: 'Specializes in brand animation and creating compelling visual identities.'
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
        
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center" data-aos="fade-up">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
          <h1 className="text-5xl lg:text-7xl font-bold text-[#fefefe] mb-8">
            About Phel Arts
          </h1>
          <p className="text-xl lg:text-2xl text-gray-300 max-w-4xl mx-auto mb-12">
            We're a passionate team of animators, designers, and storytellers 
            dedicated to creating exceptional visual experiences that move people.
          </p>
          </motion.div>
        </div>
      </section>

      {/* Client Logos */}
      <ClientLogos />

      {/* Story Section */}
      <ParallaxSection direction="right" intensity={25}>
        <section className="py-24 bg-[#fefefe] relative overflow-hidden">
          <div className="absolute top-20 right-20 w-32 h-32 bg-[#ff9a1d]/10 rounded-full blur-2xl"></div>
          <div className="absolute bottom-20 left-20 w-24 h-24 bg-[#016952]/10 rounded-full blur-xl"></div>
          
        <div className="max-w-7xl mx-auto px-6 lg:px-8" data-aos="fade-up">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Story */}
              <motion.div 
                className="space-y-8"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
              <h2 className="text-4xl lg:text-5xl font-bold text-[#242424]">
                Our Story
              </h2>
              <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
                <p>
                  Founded in 2019 with a vision to transform how brands communicate through motion, 
                  Phel Arts has grown into a trusted partner for companies seeking to tell 
                  their stories through compelling visual narratives.
                </p>
                
                <p>
                  Our multidisciplinary team combines artistic vision with technical expertise, 
                  ensuring every project not only looks exceptional but also achieves its 
                  strategic objectives and drives meaningful results.
                </p>
                
                <p>
                  From Fortune 500 companies to innovative startups, we've helped brands 
                  across industries connect with their audiences through the power of animation, 
                  creating memorable experiences that last.
                </p>
              </div>

              <a
                href="/contact"
                className="inline-flex items-center space-x-3 text-[#ff9a1d] font-semibold text-lg hover:text-[#016952] transition-colors group"
              >
                <span>Work with us</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
              </motion.div>

            {/* Image */}
              <motion.div 
                className="relative"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
              <div className="relative overflow-hidden rounded-3xl">
                <img
                    src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Team collaboration"
                  className="w-full h-96 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#242424]/20 to-transparent"></div>
              </div>
              </motion.div>
          </div>
        </div>
        </section>
      </ParallaxSection>

      {/* Stats */}
      <ParallaxSection direction="up" intensity={30}>
        <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8" data-aos="fade-up">
            <motion.div 
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-[#242424] mb-6">
              By the Numbers
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our track record speaks for itself with consistent results and satisfied clients.
            </p>
          </div>
            </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="text-center p-8 rounded-2xl bg-[#fefefe] hover:shadow-lg transition-all duration-300"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="w-16 h-16 bg-gradient-to-br from-[#ff9a1d] to-[#016952] rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-8 h-8 text-[#fefefe]" />
                </div>
                <div className="text-4xl font-bold text-[#242424] mb-2">{stat.value}</div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
        </section>
      </ParallaxSection>

      {/* Values */}
      <ParallaxSection direction="left" intensity={25}>
        <section className="py-24 bg-[#fefefe] relative overflow-hidden">
          <div className="absolute top-20 left-20 w-32 h-32 bg-[#ff9a1d]/10 rounded-full blur-2xl"></div>
          <div className="absolute bottom-20 right-20 w-24 h-24 bg-[#016952]/10 rounded-full blur-xl"></div>
          
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <motion.div 
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-[#242424] mb-6">
              Our Values
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The principles that guide our work and relationships with clients.
            </p>
          </div>
            </motion.div>

          <div className="grid lg:grid-cols-3 gap-12">
            {values.map((value, index) => (
              <motion.div 
                key={index} 
                className="text-center p-8 rounded-2xl bg-gray-50 hover:bg-white hover:shadow-lg transition-all duration-300"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="w-16 h-16 bg-gradient-to-br from-[#ff9a1d] to-[#016952] rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <value.icon className="w-8 h-8 text-[#fefefe]" />
                </div>
                <h3 className="text-2xl font-bold text-[#242424] mb-4">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
        </section>
      </ParallaxSection>

      {/* Team */}
      <ParallaxSection direction="up" intensity={20}>
        <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <motion.div 
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-[#242424] mb-6">
              Meet Our Team
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Talented professionals who bring creativity and expertise to every project.
            </p>
          </div>
            </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <motion.div 
                key={index} 
                className="text-center group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="relative overflow-hidden rounded-3xl mb-6 aspect-square">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#242424]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <h3 className="text-xl font-bold text-[#242424] mb-2">{member.name}</h3>
                <div className="text-[#ff9a1d] font-semibold mb-3">{member.role}</div>
                <p className="text-gray-600 text-sm">{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </div>
        </section>
      </ParallaxSection>

      {/* CTA Section */}
      <ParallaxSection direction="right" intensity={30}>
        <section className="py-24 bg-gradient-to-r from-[#242424] to-gray-800 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%23ffffff%22 fill-opacity=%220.05%22%3E%3Ccircle cx=%2230%22 cy=%2230%22 r=%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
          
        <div className="max-w-4xl mx-auto text-center px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
          <h2 className="text-4xl lg:text-5xl font-bold text-[#fefefe] mb-6">
            Ready to work together?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Let's create something extraordinary that tells your story and achieves your goals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
              
            <motion.a
              href="/book-call"
              className="phel-btn px-8 py-4 text-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
              Book a Call
             
            </motion.a>
            <motion.a
              href="/our-work"
              className="border-2 border-[#fefefe]/30 text-[#fefefe] px-8 py-4 rounded-full text-lg font-semibold hover:bg-[#fefefe]/10 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            >
              View Our Work
            </motion.a>
          </div>
            </motion.div>
        </div>
        </section>
      </ParallaxSection>
    </div>
  );
}

export default About;
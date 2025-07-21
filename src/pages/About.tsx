import React from 'react';
import { Award, Users, Clock, Target, ArrowRight, Heart, Lightbulb, Shield } from 'lucide-react';

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
      image: 'https://images.pexels.com/photos/3777931/pexels-photo-3777931.jpeg?auto=compress&cs=tinysrgb&w=400',
      bio: '10+ years in animation and motion graphics with a passion for storytelling.'
    },
    {
      name: 'Sarah Johnson',
      role: 'Lead Animator',
      image: 'https://images.pexels.com/photos/3756679/pexels-photo-3756679.jpeg?auto=compress&cs=tinysrgb&w=400',
      bio: 'Specialist in character animation and bringing personalities to life through motion.'
    },
    {
      name: 'Mike Rodriguez',
      role: 'VFX Artist',
      image: 'https://images.pexels.com/photos/3785079/pexels-photo-3785079.jpeg?auto=compress&cs=tinysrgb&w=400',
      bio: 'Expert in visual effects and compositing with a background in film production.'
    },
    {
      name: 'Emma Davis',
      role: 'Motion Designer',
      image: 'https://images.pexels.com/photos/3756681/pexels-photo-3756681.jpeg?auto=compress&cs=tinysrgb&w=400',
      bio: 'Specializes in brand animation and creating compelling visual identities.'
    }
  ];

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="py-24 bg-gradient-to-br from-[#242424] via-gray-800 to-[#016952]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center" data-aos="fade-up">
          <h1 className="text-5xl lg:text-7xl font-bold text-[#fefefe] mb-8">
            About Phel Arts
          </h1>
          <p className="text-xl lg:text-2xl text-gray-300 max-w-4xl mx-auto mb-12">
            We're a passionate team of animators, designers, and storytellers 
            dedicated to creating exceptional visual experiences that move people.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-24 bg-[#fefefe]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8" data-aos="fade-up">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Story */}
            <div className="space-y-8" data-aos="fade-right">
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
            </div>

            {/* Image */}
            <div className="relative" data-aos="fade-left">
              <div className="relative overflow-hidden rounded-3xl">
                <img
                  src="https://images.pexels.com/photos/3584994/pexels-photo-3584994.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Team collaboration"
                  className="w-full h-96 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#242424]/20 to-transparent"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8" data-aos="fade-up">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-[#242424] mb-6">
              By the Numbers
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our track record speaks for itself with consistent results and satisfied clients.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="text-center p-8 rounded-2xl bg-[#fefefe] hover:shadow-lg transition-all duration-300"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <div className="w-16 h-16 bg-gradient-to-br from-[#ff9a1d] to-[#016952] rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-8 h-8 text-[#fefefe]" />
                </div>
                <div className="text-4xl font-bold text-[#242424] mb-2">{stat.value}</div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-[#fefefe]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-[#242424] mb-6">
              Our Values
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The principles that guide our work and relationships with clients.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-12">
            {values.map((value, index) => (
              <div key={index} className="text-center p-8 rounded-2xl bg-gray-50 hover:bg-white hover:shadow-lg transition-all duration-300">
                <div className="w-16 h-16 bg-gradient-to-br from-[#ff9a1d] to-[#016952] rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <value.icon className="w-8 h-8 text-[#fefefe]" />
                </div>
                <h3 className="text-2xl font-bold text-[#242424] mb-4">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-[#242424] mb-6">
              Meet Our Team
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Talented professionals who bring creativity and expertise to every project.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div key={index} className="text-center group">
                <div className="relative overflow-hidden rounded-2xl mb-6 aspect-square">
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
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-[#242424] to-gray-800">
        <div className="max-w-4xl mx-auto text-center px-6 lg:px-8">
          <h2 className="text-4xl lg:text-5xl font-bold text-[#fefefe] mb-6">
            Ready to work together?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Let's create something extraordinary that tells your story and achieves your goals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/book-call"
              className="bg-gradient-to-r from-[#ff9a1d] to-[#016952] text-[#fefefe] px-8 py-4 rounded-full text-lg font-semibold hover:shadow-xl hover:scale-105 transition-all duration-300"
            >
              Book a Call
            </a>
            <a
              href="/our-work"
              className="border-2 border-[#fefefe]/30 text-[#fefefe] px-8 py-4 rounded-full text-lg font-semibold hover:bg-[#fefefe]/10 transition-all duration-300"
            >
              View Our Work
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
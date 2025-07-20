import React from 'react';
import { Award, Users, Clock, Target, ArrowRight } from 'lucide-react';

const About = () => {
  const stats = [
    { icon: Award, value: '500+', label: 'Projects Delivered' },
    { icon: Users, value: '50+', label: 'Happy Clients' },
    { icon: Clock, value: '5+', label: 'Years Experience' },
    { icon: Target, value: '98%', label: 'Client Satisfaction' },
  ];

  const values = [
    {
      title: 'Creativity First',
      description: 'We believe every project deserves a unique creative approach that stands out.',
    },
    {
      title: 'Quality Obsessed',
      description: 'Attention to detail and technical excellence are at the core of everything we do.',
    },
    {
      title: 'Client Partnership',
      description: 'We work closely with our clients as true partners in bringing their vision to life.',
    },
  ];

  return (
    <section id="about" className="py-32 bg-white">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-20">
          <h2 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6 tracking-tight">
            About Phel Arts
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            We're a passionate team of animators, designers, and storytellers 
            dedicated to creating exceptional visual experiences.
          </p>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Story */}
          <div className="space-y-8">
            <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
              <p>
                Founded with a vision to transform how brands communicate through motion, 
                Phel Arts has grown into a trusted partner for companies seeking to tell 
                their stories through compelling visual narratives.
              </p>
              
              <p>
                Our multidisciplinary team combines artistic vision with technical expertise, 
                ensuring every project not only looks exceptional but also achieves its 
                strategic objectives.
              </p>
              
              <p>
                From Fortune 500 companies to innovative startups, we've helped brands 
                across industries connect with their audiences through the power of animation.
              </p>
            </div>

            <a
              href="#contact"
              className="inline-flex items-center space-x-3 text-orange-500 font-semibold text-lg hover:text-emerald-600 transition-colors group"
            >
              <span>Work with us</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>

          {/* Image */}
          <div className="relative">
            <div className="relative overflow-hidden rounded-3xl">
              <img
                src="https://images.pexels.com/photos/3584994/pexels-photo-3584994.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Team collaboration"
                className="w-full h-96 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/20 to-transparent"></div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="text-center p-8 rounded-2xl bg-gray-50 hover:bg-white hover:shadow-lg transition-all duration-300"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <stat.icon className="w-8 h-8 text-white" />
              </div>
              <div className="text-4xl font-bold text-gray-900 mb-2">{stat.value}</div>
              <div className="text-gray-600 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Values */}
        <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-3xl p-12 lg:p-16">
          <div className="text-center mb-12">
            <h3 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              Our values
            </h3>
            <p className="text-xl text-white/70 max-w-2xl mx-auto">
              The principles that guide our work and relationships with clients.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center">
                <h4 className="text-xl font-bold text-white mb-4">{value.title}</h4>
                <p className="text-white/70 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
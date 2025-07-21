import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, Clock, MessageCircle, Users } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    budget: '',
    message: '',
    projectType: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Handle form submission here
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const budgetOptions = [
    'Under $5,000',
    '$5,000 - $15,000',
    '$15,000 - $30,000',
    '$30,000 - $50,000',
    '$50,000+',
  ];

  const projectTypes = [
    '2D Animation',
    'Motion Graphics',
    'Visual Effects',
    'Web Animation',
    'Video Production',
    'App Animations',
    'Other',
  ];

  const contactMethods = [
    {
      icon: Mail,
      title: 'Email us',
      description: 'Send us an email and we\'ll respond within 24 hours',
      contact: 'hello@phelarts.studio',
      action: 'mailto:hello@phelarts.studio'
    },
    {
      icon: Phone,
      title: 'Call us',
      description: 'Speak directly with our team during business hours',
      contact: '+234 (906) 755-6062',
      action: 'tel:+2349067556062'
    },
    {
      icon: MessageCircle,
      title: 'Live chat',
      description: 'Chat with us in real-time for quick questions',
      contact: 'Available 9AM-6PM PST',
      action: '#'
    }
  ];

  const faqs = [
    {
      question: 'What is your typical project timeline?',
      answer: 'Project timelines vary based on complexity, but most projects take 2-6 weeks from concept to completion.'
    },
    {
      question: 'Do you offer revisions?',
      answer: 'Yes, we include unlimited revisions during the concept phase and 3 rounds of revisions during production.'
    },
    {
      question: 'What file formats do you deliver?',
      answer: 'We deliver in all major formats including MP4, MOV, GIF, and source files in After Effects or other software.'
    },
    {
      question: 'Can you work with tight deadlines?',
      answer: 'We can accommodate rush projects with additional fees. Contact us to discuss your specific timeline needs.'
    }
  ];

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="py-24 bg-gradient-to-br from-[#242424] via-gray-800 to-[#016952]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center" data-aos="fade-up">
          <h1 className="text-5xl lg:text-7xl font-bold text-[#fefefe] mb-8">
            Get in Touch
          </h1>
          <p className="text-xl lg:text-2xl text-gray-300 max-w-4xl mx-auto mb-12">
            Ready to bring your vision to life? We'd love to hear about your project 
            and explore how we can help you achieve your goals.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <div className="bg-[#fefefe]/10 backdrop-blur-sm border border-[#fefefe]/20 rounded-full px-4 py-2 flex items-center space-x-2">
              <Clock className="w-4 h-4 text-[#ff9a1d]" />
              <span className="text-sm font-medium text-[#fefefe]/90">24h Response Time</span>
            </div>
            <div className="bg-[#fefefe]/10 backdrop-blur-sm border border-[#fefefe]/20 rounded-full px-4 py-2 flex items-center space-x-2">
              <Users className="w-4 h-4 text-[#ff9a1d]" />
              <span className="text-sm font-medium text-[#fefefe]/90">Dedicated Project Manager</span>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-16 bg-[#fefefe]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8" data-aos="fade-up">
          <div className="grid md:grid-cols-3 gap-8">
            {contactMethods.map((method, index) => (
              <a
                key={index}
                href={method.action}
                className="group p-8 rounded-2xl bg-gray-50 hover:bg-white hover:shadow-lg transition-all duration-300 text-center"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <div className="w-16 h-16 bg-gradient-to-br from-[#ff9a1d] to-[#016952] rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <method.icon className="w-8 h-8 text-[#fefefe]" />
                </div>
                <h3 className="text-xl font-bold text-[#242424] mb-3">{method.title}</h3>
                <p className="text-gray-600 mb-4">{method.description}</p>
                <div className="text-[#ff9a1d] font-semibold">{method.contact}</div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Main Contact Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-16">
            {/* Contact Info */}
            <div className="lg:col-span-2 space-y-12">
              <div>
                <h2 className="text-3xl font-bold text-[#242424] mb-8">Let's start a conversation</h2>
                
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#ff9a1d] to-[#016952] rounded-2xl flex items-center justify-center flex-shrink-0">
                      <Mail className="w-6 h-6 text-[#fefefe]" />
                    </div>
                    <div>
                      <div className="font-semibold text-[#242424] mb-1">Email us</div>
                      <div className="text-gray-600">hello@phelarts.studio</div>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#ff9a1d] to-[#016952] rounded-2xl flex items-center justify-center flex-shrink-0">
                      <Phone className="w-6 h-6 text-[#fefefe]" />
                    </div>
                    <div>
                      <div className="font-semibold text-[#242424] mb-1">Call us</div>
                      <div className="text-gray-600">+234 (906) 755-6062</div>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#ff9a1d] to-[#016952] rounded-2xl flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-6 h-6 text-[#fefefe]" />
                    </div>
                    <div>
                      <div className="font-semibold text-[#242424] mb-1">Visit us</div>
                      <div className="text-gray-600">San Francisco, CA</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Why Choose Us */}
              <div className="bg-[#fefefe] rounded-2xl p-8">
                <h3 className="font-bold text-[#242424] mb-6">Why work with us?</h3>
                <ul className="space-y-4">
                  {[
                    'Fast turnaround times',
                    'Unlimited concept revisions',
                    'Professional quality guaranteed',
                    'Competitive pricing',
                    'Dedicated project manager',
                    'Post-delivery support',
                  ].map((item, index) => (
                    <li key={index} className="flex items-center text-gray-700">
                      <div className="w-2 h-2 bg-[#ff9a1d] rounded-full mr-3 flex-shrink-0"></div>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-3">
              <form onSubmit={handleSubmit} className="bg-[#fefefe] rounded-3xl p-8 lg:p-12 shadow-lg">
                <h3 className="text-2xl font-bold text-[#242424] mb-8">Tell us about your project</h3>
                
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-[#242424] mb-3">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-4 bg-gray-50 border border-gray-200 rounded-xl text-[#242424] placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#ff9a1d] focus:border-transparent transition-all"
                      placeholder="Your name"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-[#242424] mb-3">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-4 bg-gray-50 border border-gray-200 rounded-xl text-[#242424] placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#ff9a1d] focus:border-transparent transition-all"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label htmlFor="company" className="block text-sm font-semibold text-[#242424] mb-3">
                      Company Name
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full px-4 py-4 bg-gray-50 border border-gray-200 rounded-xl text-[#242424] placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#ff9a1d] focus:border-transparent transition-all"
                      placeholder="Your company"
                    />
                  </div>

                  <div>
                    <label htmlFor="projectType" className="block text-sm font-semibold text-[#242424] mb-3">
                      Project Type
                    </label>
                    <select
                      id="projectType"
                      name="projectType"
                      value={formData.projectType}
                      onChange={handleChange}
                      className="w-full px-4 py-4 bg-gray-50 border border-gray-200 rounded-xl text-[#242424] focus:outline-none focus:ring-2 focus:ring-[#ff9a1d] focus:border-transparent transition-all"
                    >
                      <option value="">Select project type</option>
                      {projectTypes.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="mb-6">
                  <label htmlFor="budget" className="block text-sm font-semibold text-[#242424] mb-3">
                    Project Budget
                  </label>
                  <select
                    id="budget"
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    className="w-full px-4 py-4 bg-gray-50 border border-gray-200 rounded-xl text-[#242424] focus:outline-none focus:ring-2 focus:ring-[#ff9a1d] focus:border-transparent transition-all"
                  >
                    <option value="">Select budget range</option>
                    {budgetOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mb-8">
                  <label htmlFor="message" className="block text-sm font-semibold text-[#242424] mb-3">
                    Project Details *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-4 bg-gray-50 border border-gray-200 rounded-xl text-[#242424] placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#ff9a1d] focus:border-transparent transition-all resize-none"
                    placeholder="Tell us about your project, goals, timeline, and any specific requirements..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-[#ff9a1d] to-[#016952] text-[#fefefe] px-8 py-4 rounded-xl text-lg font-semibold hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-3"
                >
                  <span>Send Message</span>
                  <Send className="w-5 h-5" />
                </button>

                <p className="text-sm text-gray-500 mt-4 text-center">
                  We'll get back to you within 24 hours.
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-[#fefefe]">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-[#242424] mb-6">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600">
              Quick answers to common questions about our services and process.
            </p>
          </div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-gray-50 rounded-2xl p-8 hover:bg-white hover:shadow-lg transition-all duration-300">
                <h3 className="text-xl font-bold text-[#242424] mb-4">{faq.question}</h3>
                <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
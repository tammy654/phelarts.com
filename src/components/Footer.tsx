import React from 'react';
import { useState } from 'react';
import { Play, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin, ArrowRight } from 'lucide-react';

const Footer = () => {
  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
  ];

  const quickLinks = [
    { href: '#home', label: 'Home' },
    { href: '#services', label: 'Services' },
    { href: '#portfolio', label: 'Work' },
    { href: '#about', label: 'About' },
    { href: '#contact', label: 'Contact' },
  ];

  const services = [
    '2D Animation',
    'Motion Graphics',
    'Visual Effects',
    'Web Animation',
    'Video Production',
    'App Animations',
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-6xl mx-auto px-6 lg:px-8 py-20">
        {/* Main Footer Content */}
        <div className="grid lg:grid-cols-4 gap-12 mb-16">
          {/* Company Info */}
          <div className="lg:col-span-2 space-y-8">
            <div className="flex items-center space-x-3">
              <img 
                src="/phelarts_logo.png" 
                alt="Phel Arts" 
                className="w-24 h-24"
              />
            </div>
            <p className="text-lg text-gray-300 leading-relaxed max-w-md">
              We create stunning motion graphics and 2D animations that   captivate audiences and elevate brands to new heights.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-3 text-gray-300">
                <Mail className="w-5 h-5 text-orange-400" />
                <span>hello@phelarts.studio</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-300">
                <Phone className="w-5 h-5 text-orange-400" />
                <span>+234 906 755 6062</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-300">
                <MapPin className="w-5 h-5 text-orange-400" />
                <span>Port Harcourt, Nigeria</span>
              </div>
            </div>

            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="w-12 h-12 bg-gray-800 rounded-xl flex items-center justify-center hover:bg-gradient-to-br hover:from-orange-400 hover:to-emerald-600 transition-all duration-300"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-6">Quick Links</h3>
            <ul className="space-y-4">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href.startsWith('#') ? '/' + link.href : link.href}
                    className="text-gray-300 hover:text-orange-400 transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-bold mb-6">Services</h3>
            <ul className="space-y-4">
              {services.map((service) => (
                <li key={service}>
                  <span className="text-gray-300">{service}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="bg-gradient-to-r from-[#016952] to-[#016952]/90 rounded-2xl px-6 py-10 md:px-12 md:py-16 mb-12 shadow-lg max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h3 className="text-2xl md:text-3xl font-bold text-[#ff9a1d] mb-3">
              Stay in the Loop
            </h3>
            <p className="text-[#fefefe] text-base md:text-lg leading-relaxed">
              Get the latest animation trends, tips, and project updates delivered to your inbox.
            </p>
          </div>

          <div className="bg-[#fefefe] rounded-2xl overflow-hidden shadow-lg border border-gray-100">
            <iframe 
              src="https://docs.google.com/forms/d/e/1FAIpQLScwu_rbqz3itky1arUn_SBkYTWaAe3DCaAopaQ1vs6EPYo61g/viewform?embedded=true" 
              width="100%" 
              height="451" 
              frameBorder="0" 
              marginHeight={0} 
              marginWidth={0}
              className="w-full border-none rounded-2xl"
              title="Newsletter Subscription Form"
              style={{ minHeight: '451px' }}
            >
              Loading newsletter form...
            </iframe>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col lg:flex-row justify-between items-center">
            <p className="text-gray-400 mb-4 lg:mb-0">
              © 2025 Phel Arts. All rights reserved.
            </p>
            <div className="flex space-x-8">
              <a href="#" className="text-gray-400 hover:text-orange-400 transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-orange-400 transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-gray-400 hover:text-orange-400 transition-colors">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

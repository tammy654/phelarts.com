import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Play, ChevronDown } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileDropdown, setMobileDropdown] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (!target.closest('.dropdown-container')) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const navItems = [
    { href: '/', label: 'Home' },
    {
      href: '/services',
      label: 'Services',
      dropdown: [
        {
          href: '/services/2d-animation',
          label: '2D Animation',
          description: 'Character-driven stories and explainer videos that engage audiences.'
        },
        {
          href: '/services/motion-graphics',
          label: 'Motion Graphics',
          description: 'Dynamic visual elements that bring your brand to life.'
        },
        {
          href: '/services/visual-effects',
          label: 'Visual Effects',
          description: 'Cutting-edge VFX and compositing for cinematic quality.'
        },
        {
          href: '/services/web-animation',
          label: 'Web Animation',
          description: 'Interactive animations for websites and digital platforms.'
        },
        {
          href: '/services/app-animation',
          label: 'App Animation',
          description: 'UI/UX motion designs for mobile and web applications.'
        },
        {
          href: '/services/video-production',
          label: 'Video Production',
          description: 'End-to-end video creation and professional editing.'
        }
      ]
    },
    {
      href: '/our-work',
      label: 'Our Work',
      dropdown: [
        {
          href: '/portfolio',
          label: 'Portfolio',
          description: 'Showcase of our best creative work and projects.'
        },
        {
          href: '/case-studies',
          label: 'Case Studies',
          description: 'In-depth analysis of our successful client projects.'
        }
      ]
    },
    {
      href: '/about',
      label: 'About',
      dropdown: [
        {
          href: '/about/about-us',
          label: 'About Us',
          description: 'Learn about our story, mission, and values.'
        },
        {
          href: '/about/our-team',
          label: 'Our Team',
          description: 'Meet the creative minds behind Phel Arts.'
        },
        {
          href: '/about/testimonials',
          label: 'Testimonials',
          description: 'What our clients say about working with us.'
        }
      ]
    },
    { href: '/pricing', label: 'Pricing' },
    {
      href: '/contact',
      label: 'Contact',
      dropdown: [
        {
          href: '/book-call',
          label: 'Book a Call',
          description: 'Schedule a free consultation with our team.'
        },
        {
          href: '/contact/support',
          label: 'Support',
          description: 'Get help with your existing projects.'
        }
      ]
    },
  ];

  const isActive = (path: string) => location.pathname === path;

  const toggleDropdown = (label: string, event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    setActiveDropdown(activeDropdown === label ? null : label);
  };

  const toggleMobileDropdown = (label: string) => {
    setMobileDropdown(mobileDropdown === label ? null : label);
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      isScrolled ? 'bg-[#fefefe]/95 backdrop-blur-xl border-b border-gray-100' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <img 
              src="/phelarts_logo.png" 
              alt="Phel Arts" 
              className="w-24 h-24 group-hover:scale-105 transition-transform"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <div
                key={item.href}
                className="relative dropdown-container"
              >
                {item.dropdown ? (
                  <button
                    onClick={(e) => toggleDropdown(item.label, e)}
                    className={`text-sm font-medium tracking-wide transition-all duration-300 hover:scale-105 relative flex items-center space-x-1 ${
                      isActive(item.href) || activeDropdown === item.label
                        ? 'text-[#ff9a1d]'
                        : isScrolled || location.pathname !== '/'
                        ? 'text-[#242424] hover:text-[#ff9a1d]'
                        : 'text-[#fefefe]/90 hover:text-[#ff9a1d]'
                    }`}
                  >
                    <span>{item.label}</span>
                    <ChevronDown className={`w-4 h-4 transition-transform ${
                      activeDropdown === item.label ? 'rotate-180' : ''
                    }`} />
                  </button>
                ) : (
                  <Link
                    to={item.href}
                    className={`text-sm font-medium tracking-wide transition-all duration-300 hover:scale-105 relative flex items-center space-x-1 ${
                      isActive(item.href)
                        ? 'text-[#ff9a1d]'
                        : isScrolled || location.pathname !== '/'
                        ? 'text-[#242424] hover:text-[#ff9a1d]'
                        : 'text-[#fefefe]/90 hover:text-[#ff9a1d]'
                    }`}
                  >
                    <span>{item.label}</span>
                  </Link>
                )}
                
                {isActive(item.href) && (
                  <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#ff9a1d] rounded-full"></div>
                )}

                {/* Dropdown Menu */}
                {item.dropdown && activeDropdown === item.label && (
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-80 bg-[#fefefe] shadow-2xl border border-gray-100 rounded-2xl py-4 z-50">
                    {item.dropdown.map((dropdownItem, index) => (
                      <Link
                        key={index}
                        to={dropdownItem.href}
                        className="flex flex-col p-4 hover:bg-gray-50 transition-colors group"
                        onClick={() => setActiveDropdown(null)}
                      >
                        <div className="font-semibold text-[#242424] group-hover:text-[#ff9a1d] transition-colors mb-1">
                          {dropdownItem.label}
                        </div>
                        <div className="text-sm text-gray-600 leading-relaxed">
                          {dropdownItem.description}
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden lg:block">
            <Link
              to="/book-call"
              className="phel-btn text-sm px-6 py-3"
            >
              Book a Call
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className={`w-6 h-6 ${
                isScrolled || location.pathname !== '/' ? 'text-[#242424]' : 'text-[#fefefe]'
              }`} />
            ) : (
              <Menu className={`w-6 h-6 ${
                isScrolled || location.pathname !== '/' ? 'text-[#242424]' : 'text-[#fefefe]'
              }`} />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden bg-[#fefefe] rounded-2xl shadow-2xl mt-4 py-6 border border-gray-100">
            {navItems.map((item) => (
              <div key={item.href}>
                {item.dropdown ? (
                  <div>
                    <button
                      onClick={() => toggleMobileDropdown(item.label)}
                      className={`w-full text-left px-6 py-3 font-medium hover:bg-[#ff9a1d]/10 transition-colors flex items-center justify-between ${
                        isActive(item.href) ? 'text-[#ff9a1d]' : 'text-[#242424] hover:text-[#ff9a1d]'
                      }`}
                    >
                      <span>{item.label}</span>
                      <ChevronDown className={`w-4 h-4 transition-transform ${
                        mobileDropdown === item.label ? 'rotate-180' : ''
                      }`} />
                    </button>
                    {mobileDropdown === item.label && (
                      <div className="bg-gray-50 border-l-4 border-[#ff9a1d] ml-4">
                        {item.dropdown.map((dropdownItem, index) => (
                          <Link
                            key={index}
                            to={dropdownItem.href}
                            className="block px-6 py-3 text-sm text-gray-600 hover:text-[#ff9a1d] hover:bg-[#ff9a1d]/5 transition-colors"
                            onClick={() => {
                              setIsMenuOpen(false);
                              setMobileDropdown(null);
                            }}
                          >
                            {dropdownItem.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    to={item.href}
                    className={`block px-6 py-3 font-medium hover:bg-[#ff9a1d]/10 transition-colors ${
                      isActive(item.href) ? 'text-[#ff9a1d]' : 'text-[#242424] hover:text-[#ff9a1d]'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
            <div className="px-6 pt-4">
              <Link
                to="/book-call"
                className="phel-btn block text-center"
                onClick={() => setIsMenuOpen(false)}
              >
                Book a Call
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
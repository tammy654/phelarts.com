import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Play, ChevronDown } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { href: '/', label: 'Home' },
    {
      href: '/services',
      label: 'Services',
      dropdown: [
        {
          href: '/services#visual-effects',
          label: 'Visual Effects',
          description: 'Creating realistic visual elements and CGI enhancements.'
        },
        {
          href: '/services#motion-graphics',
          label: 'Motion Graphics',
          description: 'Animated graphic design for branding and storytelling.'
        },
        {
          href: '/services#2d-animation',
          label: '2D Animation',
          description: 'Traditional or digital two-dimensional character animations.'
        },
        {
          href: '/services#video-production',
          label: 'Video Production/Editing',
          description: 'End-to-end video creation and professional editing.'
        },
        {
          href: '/services#documentary-production',
          label: 'Documentary Production',
          description: 'Full-service production of documentary films.'
        },
        {
          href: '/services#web-animation',
          label: 'Web Animation',
          description: 'Interactive animations for websites and digital platforms.'
        },
        {
          href: '/services#app-animation',
          label: 'App Animation',
          description: 'UI/UX motion designs tailored for mobile and web apps.'
        }
      ]
    },
    { href: '/our-work', label: 'Our Work' },
    {
      href: '/about',
      label: 'About',
      dropdown: [
        {
          href: '/about#about-us',
          label: 'About Us',
          description: 'Learn about our story and mission.'
        },
        {
          href: '/about#our-team',
          label: 'Our Team',
          description: 'Meet the creative minds behind Phel Arts.'
        },
        {
          href: '/about#testimonials',
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
          href: '/contact#support',
          label: 'Support',
          description: 'Get help with your existing projects.'
        }
      ]
    },
  ];

  const isActive = (path: string) => location.pathname === path;

  const handleDropdownEnter = (label: string) => {
    setActiveDropdown(label);
  };

  const handleDropdownLeave = () => {
    setActiveDropdown(null);
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
              src="/favicon.ico" 
              alt="Phel Arts" 
              className="w-20 h-20 group-hover:scale-105 transition-transform"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <div
                key={item.href}
                className="relative"
                onMouseEnter={() => item.dropdown && handleDropdownEnter(item.label)}
                onMouseLeave={handleDropdownLeave}
              >
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
                  {item.dropdown && (
                    <ChevronDown className={`w-4 h-4 transition-transform ${
                      activeDropdown === item.label ? 'rotate-180' : ''
                    }`} />
                  )}
                </Link>
                
                {isActive(item.href) && (
                  <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#ff9a1d] rounded-full"></div>
                )}

                {/* Dropdown Menu */}
                {item.dropdown && activeDropdown === item.label && (
                  <div className="absolute top-full left-0 mt-2 w-96 bg-[#fefefe] rounded-2xl shadow-2xl border border-gray-100 py-4 z-50">
                    {item.dropdown.map((dropdownItem, index) => (
                      <Link
                        key={index}
                        to={dropdownItem.href}
                        className="flex items-start px-6 py-4 hover:bg-gray-50 transition-colors group"
                        onClick={() => setActiveDropdown(null)}
                      >
                        <div className="flex-1">
                          <div className="font-semibold text-[#242424] group-hover:text-[#ff9a1d] transition-colors mb-1">
                            {dropdownItem.label}
                          </div>
                          <div className="text-sm text-gray-600 leading-relaxed">
                            {dropdownItem.description}
                          </div>
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
              className="bg-gradient-to-r from-[#ff9a1d] to-[#016952] text-[#fefefe] px-6 py-3 rounded-full text-sm font-semibold hover:shadow-xl hover:scale-105 transition-all duration-300"
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
                <Link
                  to={item.href}
                  className={`block px-6 py-3 font-medium hover:bg-[#ff9a1d]/10 transition-colors ${
                    isActive(item.href) ? 'text-[#ff9a1d]' : 'text-[#242424] hover:text-[#ff9a1d]'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
                {item.dropdown && (
                  <div className="ml-4 border-l-2 border-gray-100">
                    {item.dropdown.map((dropdownItem, index) => (
                      <Link
                        key={index}
                        to={dropdownItem.href}
                        className="block px-6 py-2 text-sm text-gray-600 hover:text-[#ff9a1d] transition-colors"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {dropdownItem.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div className="px-6 pt-4">
              <Link
                to="/book-call"
                className="block bg-gradient-to-r from-[#ff9a1d] to-[#016952] text-[#fefefe] px-6 py-3 rounded-full text-center font-semibold"
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

import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileDropdown, setMobileDropdown] = useState<string | null>(null);
  const location = useLocation();
  const navRef = useRef<HTMLDivElement>(null);

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
      if (
        navRef.current &&
        !navRef.current.contains(event.target as Node)
      ) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navItems = [
    { href: '/', label: 'Home' },
    {
      href: '/services',
      label: 'Services',
      dropdown: [
        { href: '/services#visual-effects', label: 'Visual Effects', description: 'Creating realistic visual elements and CGI enhancements.' },
        { href: '/services#motion-graphics', label: 'Motion Graphics', description: 'Animated graphic design for branding and storytelling.' },
        { href: '/services#2d-animation', label: '2D Animation', description: 'Traditional or digital two-dimensional character animations.' },
        { href: '/services#video-production', label: 'Video Production/Editing', description: 'End-to-end video creation and professional editing.' },
        { href: '/services#documentary-production', label: 'Documentary Production', description: 'Full-service production of documentary films.' },
        { href: '/services#web-animation', label: 'Web Animation', description: 'Interactive animations for websites and digital platforms.' },
        { href: '/services#app-animation', label: 'App Animation', description: 'UI/UX motion designs tailored for mobile and web apps.' }
      ]
    },
    { href: '/our-work', label: 'Our Work' },
    {
      href: '/about',
      label: 'About',
      dropdown: [
        { href: '/about#about-us', label: 'About Us', description: 'Learn about our story and mission.' },
        { href: '/about#our-team', label: 'Our Team', description: 'Meet the creative minds behind Phel Arts.' },
        { href: '/about#testimonials', label: 'Testimonials', description: 'What our clients say about working with us.' }
      ]
    },
    { href: '/pricing', label: 'Pricing' },
    {
      href: '/contact',
      label: 'Contact',
      dropdown: [
        { href: '/book-call', label: 'Book a Call', description: 'Schedule a free consultation with our team.' },
        { href: '/contact#support', label: 'Support', description: 'Get help with your existing projects.' }
      ]
    }
  ];

  const isActive = (path: string) => location.pathname === path;

  const toggleMobileDropdown = (label: string) => {
    setMobileDropdown(mobileDropdown === label ? null : label);
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      isScrolled ? 'bg-[#fefefe]/95 backdrop-blur-xl border-b border-gray-100' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8" ref={navRef}>
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="flex items-center space-x-3 group">
            <img src="/phelarts_logo.png" alt="Phel Arts" className="w-24 h-24 group-hover:scale-105 transition-transform" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <div key={item.href} className="relative">
                <button
                  onClick={() =>
                    setActiveDropdown(activeDropdown === item.label ? null : item.label)
                  }
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
                    <ChevronDown
                      className={`w-4 h-4 transition-transform ${
                        activeDropdown === item.label ? 'rotate-180' : ''
                      }`}
                    />
                  )}
                </button>

                {isActive(item.href) && (
                  <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#ff9a1d] rounded-full"></div>
                )}

                {item.dropdown && activeDropdown === item.label && (
                  <div className="absolute top-full left-0 mt-2 bg-[#fefefe] shadow-2xl border-t border-gray-100 py-8 z-50 w-screen">
                    <div className="max-w-7xl mx-auto px-6 lg:px-8">
                      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {item.dropdown.map((dropdownItem, index) => (
                          <Link
                            key={index}
                            to={dropdownItem.href}
                            className="flex flex-col p-6 rounded-xl hover:bg-gray-50 transition-colors group"
                            onClick={() => setActiveDropdown(null)}
                          >
                            <div className="font-medium text-gray-900 mb-2 group-hover:text-[#ff9a1d] transition-colors">
                              {dropdownItem.label}
                            </div>
                            <div className="text-sm text-gray-600 group-hover:text-gray-700 transition-colors">
                              {dropdownItem.description}
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;

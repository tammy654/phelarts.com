import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Play } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
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
    { href: '/services', label: 'Services' },
    { href: '/portfolio', label: 'Portfolio' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      isScrolled ? 'bg-[#fefefe]/95 backdrop-blur-xl border-b border-gray-100' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#ff9a1d] to-[#016952] flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
              <Play className="w-5 h-5 text-[#fefefe]" />
            </div>
            <span className={`text-2xl font-bold tracking-tight transition-colors ${
              isScrolled ? 'text-[#242424]' : location.pathname === '/' ? 'text-[#fefefe]' : 'text-[#242424]'
            }`}>Phel Arts</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={`text-sm font-medium tracking-wide transition-all duration-300 hover:scale-105 relative ${
                  isActive(item.href)
                    ? 'text-[#ff9a1d]'
                    : isScrolled || location.pathname !== '/'
                    ? 'text-[#242424] hover:text-[#ff9a1d]'
                    : 'text-[#fefefe]/90 hover:text-[#ff9a1d]'
                }`}
              >
                {item.label}
                {isActive(item.href) && (
                  <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#ff9a1d] rounded-full"></div>
                )}
              </Link>
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
              <Link
                key={item.href}
                to={item.href}
                className={`block px-6 py-3 font-medium hover:bg-[#ff9a1d]/10 transition-colors ${
                  isActive(item.href) ? 'text-[#ff9a1d]' : 'text-[#242424] hover:text-[#ff9a1d]'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
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
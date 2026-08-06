import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, ArrowUpRight } from 'lucide-react';

interface DropdownItem {
  href: string;
  label: string;
  description: string;
}

interface NavItem {
  href: string;
  label: string;
  dropdown?: DropdownItem[];
}

const navItems: NavItem[] = [
  { href: '/', label: 'Home' },
  {
    href: '/services',
    label: 'Services',
    dropdown: [
      { href: '/services', label: '2D Animation', description: 'Character-driven stories and explainer videos.' },
      { href: '/services', label: 'Motion Graphics', description: 'Dynamic visuals that bring brands to life.' },
      { href: '/services', label: 'Visual Effects', description: 'Cinematic VFX and compositing.' },
      { href: '/services', label: 'Web & App Animation', description: 'Interactive motion for digital products.' },
      { href: '/services', label: 'Video Production', description: 'End-to-end video, concept to delivery.' },
    ],
  },
  {
    href: '/our-work',
    label: 'Work',
    dropdown: [
      { href: '/our-work', label: 'Portfolio', description: 'A showcase of selected projects.' },
      { href: '/case-studies', label: 'Case Studies', description: 'Deep dives into client results.' },
    ],
  },
  { href: '/about', label: 'About' },
  { href: '/pricing', label: 'Pricing' },
  {
    href: '/contact',
    label: 'Contact',
    dropdown: [
      { href: '/contact', label: 'General Inquiry', description: 'Tell us about your project.' },
      { href: '/book-call', label: 'Book a Call', description: 'Free 30-minute consultation.' },
    ],
  },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileDropdown, setMobileDropdown] = useState<string | null>(null);
  const location = useLocation();
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
    setActiveDropdown(null);
    setMobileDropdown(null);
  }, [location.pathname]);

  const isHome = location.pathname === '/';
  const useDarkText = isScrolled || !isHome;

  const isActive = (path: string) => location.pathname === path;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        useDarkText ? 'bg-[#f7f5f1]/85 backdrop-blur-xl border-b border-black/[0.06]' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center h-20" ref={navRef as never}>
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <img src="/phelarts_logo.png" alt="Phel Arts" className="h-11 w-11 object-contain" />
            <span
              className={`font-display font-bold text-xl tracking-tight transition-colors ${
                useDarkText ? 'text-[#16161a]' : 'text-[#f7f5f1]'
              }`}
            >
              Phel Arts
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <div key={item.label} className="relative">
                {item.dropdown ? (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveDropdown(activeDropdown === item.label ? null : item.label);
                    }}
                    className={`flex items-center gap-1 px-4 py-2 text-sm font-medium rounded-full transition-colors ${
                      activeDropdown === item.label
                        ? 'text-[#f59e0b]'
                        : useDarkText
                        ? 'text-[#3a3a42] hover:text-[#16161a]'
                        : 'text-[#f7f5f1]/85 hover:text-[#f7f5f1]'
                    }`}
                  >
                    {item.label}
                    <ChevronDown
                      className={`w-3.5 h-3.5 transition-transform ${activeDropdown === item.label ? 'rotate-180' : ''}`}
                    />
                  </button>
                ) : (
                  <Link
                    to={item.href}
                    className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${
                      isActive(item.href)
                        ? 'text-[#f59e0b]'
                        : useDarkText
                        ? 'text-[#3a3a42] hover:text-[#16161a]'
                        : 'text-[#f7f5f1]/85 hover:text-[#f7f5f1]'
                    }`}
                  >
                    {item.label}
                  </Link>
                )}

                {/* Dropdown */}
                {item.dropdown && activeDropdown === item.label && (
                  <div className="absolute top-full left-0 mt-3 w-[300px] bg-white rounded-2xl shadow-2xl border border-black/[0.06] p-3 reveal">
                    {item.dropdown.map((d, i) => (
                      <Link
                        key={i}
                        to={d.href}
                        className="block px-4 py-3 rounded-xl hover:bg-[#f7f5f1] transition-colors group"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-[#16161a] text-sm group-hover:text-[#f59e0b] transition-colors">
                            {d.label}
                          </span>
                          <ArrowUpRight className="w-3.5 h-3.5 text-[#9a9a9a] group-hover:text-[#f59e0b] transition-colors" />
                        </div>
                        <p className="text-xs text-[#6b6b73] mt-1 leading-relaxed">{d.description}</p>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden lg:block">
            <Link to="/book-call" className="btn-primary">
              Book a Call
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            className="lg:hidden p-2 -mr-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className={`w-6 h-6 ${useDarkText ? 'text-[#16161a]' : 'text-[#f7f5f1]'}`} />
            ) : (
              <Menu className={`w-6 h-6 ${useDarkText ? 'text-[#16161a]' : 'text-[#f7f5f1]'}`} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-[#f7f5f1] border-t border-black/[0.06] max-h-[80vh] overflow-y-auto">
          <div className="px-6 py-6 space-y-1">
            {navItems.map((item) => (
              <div key={item.label}>
                {item.dropdown ? (
                  <>
                    <button
                      onClick={() => setMobileDropdown(mobileDropdown === item.label ? null : item.label)}
                      className="w-full flex items-center justify-between py-3 font-medium text-[#16161a]"
                    >
                      {item.label}
                      <ChevronDown
                        className={`w-4 h-4 transition-transform ${mobileDropdown === item.label ? 'rotate-180' : ''}`}
                      />
                    </button>
                    {mobileDropdown === item.label && (
                      <div className="pl-4 border-l-2 border-[#f59e0b]/30 space-y-1 pb-2">
                        {item.dropdown.map((d, i) => (
                          <Link
                            key={i}
                            to={d.href}
                            className="block py-2 text-sm text-[#6b6b73] hover:text-[#f59e0b] transition-colors"
                          >
                            {d.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    to={item.href}
                    className="block py-3 font-medium text-[#16161a] hover:text-[#f59e0b] transition-colors"
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
            <Link to="/book-call" className="btn-primary w-full mt-4">
              Book a Call
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

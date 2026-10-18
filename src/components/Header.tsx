import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Clapperboard } from 'lucide-react';

const navItems = [
  { href: '/about', label: 'Characters' },
  { href: '/about', label: 'About Studio' },
  { href: '/our-work', label: 'Portfolio' },
  { href: '/case-studies', label: 'Showreel' },
  { href: '/services', label: 'Services' },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#0b1b2b]/95 backdrop-blur-xl">
      <div className="mx-auto flex h-[82px] max-w-7xl items-center justify-between px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#ffd000] to-[#ff6500] text-[#07111c] shadow-lg shadow-orange-500/20">
            <Clapperboard className="h-5 w-5" />
          </span>
          <span className="font-display text-2xl tracking-tight text-white">Phel<span className="text-[#ffd000]">Motion</span></span>
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {navItems.map((item) => (
            <Link key={item.label} to={item.href} className={`text-sm font-semibold transition-colors hover:text-[#ffd000] ${location.pathname === item.href ? 'text-[#ffd000]' : 'text-[#c2cedb]'}`}>
              {item.label}
            </Link>
          ))}
        </nav>

        <Link to="/book-call" className="btn-primary hidden lg:inline-flex">Book Screening</Link>
        <button className="text-white lg:hidden" onClick={() => setOpen(!open)} aria-label="Toggle navigation">
          {open ? <X /> : <Menu />}
        </button>
      </div>
      {open && (
        <nav className="border-t border-white/10 bg-[#0b1b2b] px-6 py-5 lg:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-4">
            {navItems.map((item) => <Link key={item.label} to={item.href} onClick={() => setOpen(false)} className="text-base font-semibold text-[#c2cedb] hover:text-[#ffd000]">{item.label}</Link>)}
            <Link to="/book-call" onClick={() => setOpen(false)} className="btn-primary mt-2 w-full">Book Screening</Link>
          </div>
        </nav>
      )}
    </header>
  );
}

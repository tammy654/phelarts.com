import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, ArrowUpRight } from 'lucide-react';

interface DropdownItem { href: string; label: string; description: string; }
interface NavItem { href: string; label: string; dropdown?: DropdownItem[]; }

const navItems: NavItem[] = [
  { href: '/', label: 'Home' },
  { href: '/services', label: 'Services', dropdown: [
    { href: '/services', label: '2D Animation', description: 'Character-driven stories and explainer videos.' },
    { href: '/services', label: 'Motion Graphics', description: 'Dynamic visuals that bring brands to life.' },
    { href: '/services', label: 'Web & App Animation', description: 'Interactive motion for digital products.' },
    { href: '/services', label: 'Video Production', description: 'End-to-end video, concept to delivery.' },
  ]},
  { href: '/our-work', label: 'Work', dropdown: [
    { href: '/our-work', label: 'Portfolio', description: 'A showcase of selected projects.' },
    { href: '/case-studies', label: 'Case Studies', description: 'Deep dives into client results.' },
  ]},
  { href: '/about', label: 'About' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/contact', label: 'Contact', dropdown: [
    { href: '/contact', label: 'General Inquiry', description: 'Tell us about your project.' },
    { href: '/book-call', label: 'Book a Call', description: 'Free 30-minute consultation.' },
  ]},
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileDropdown, setMobileDropdown] = useState<string | null>(null);
  const location = useLocation();
  const isHome = location.pathname === '/';
  const darkText = !isHome;

  return <header className={`fixed inset-x-0 top-0 z-50 transition-all ${darkText ? 'border-b border-black/[0.06] bg-[#f7f5f1]/95 backdrop-blur-xl' : 'bg-[#16161a]/95 backdrop-blur-xl'}`}>
    <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-8">
      <Link to="/" onClick={() => setOpen(false)}><img src="/phelarts_logo.png" alt="Phel Arts" className="h-16 w-16 object-contain" /></Link>
      <nav className="hidden items-center gap-1 lg:flex">
        {navItems.map((item) => <div key={item.label} className="relative">
          {item.dropdown ? <button onClick={() => setActiveDropdown(activeDropdown === item.label ? null : item.label)} className={`flex items-center gap-1 rounded-full px-4 py-2 text-sm font-medium transition-colors ${activeDropdown === item.label ? 'text-[#f59e0b]' : darkText ? 'text-[#3a3a42] hover:text-[#16161a]' : 'text-[#f7f5f1]/85 hover:text-[#f7f5f1]'}`}>{item.label}<ChevronDown className={`h-3.5 w-3.5 transition-transform ${activeDropdown === item.label ? 'rotate-180' : ''}`} /></button> : <Link to={item.href} className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${location.pathname === item.href ? 'text-[#f59e0b]' : darkText ? 'text-[#3a3a42] hover:text-[#16161a]' : 'text-[#f7f5f1]/85 hover:text-[#f7f5f1]'}`}>{item.label}</Link>}
          {item.dropdown && activeDropdown === item.label && <div className="absolute left-0 top-full mt-3 w-[300px] rounded-2xl border border-black/[0.06] bg-white p-3 shadow-2xl">{item.dropdown.map((d) => <Link key={d.label} to={d.href} onClick={() => setActiveDropdown(null)} className="group block rounded-xl px-4 py-3 hover:bg-[#f7f5f1]"><div className="flex items-center justify-between"><span className="text-sm font-semibold text-[#16161a] group-hover:text-[#f59e0b]">{d.label}</span><ArrowUpRight className="h-3.5 w-3.5 text-[#9a9a9a]" /></div><p className="mt-1 text-xs leading-relaxed text-[#6b6b73]">{d.description}</p></Link>)}</div>}
        </div>)}
      </nav>
      <Link to="/book-call" className="btn-primary hidden lg:inline-flex">Book a Call</Link>
      <button className={`lg:hidden ${darkText ? 'text-[#16161a]' : 'text-[#f7f5f1]'}`} onClick={() => setOpen(!open)} aria-label="Toggle menu">{open ? <X /> : <Menu />}</button>
    </div>
    {open && <div className="border-t border-black/[0.06] bg-[#f7f5f1] px-6 py-5 lg:hidden"><div className="mx-auto flex max-w-7xl flex-col gap-1">{navItems.map((item) => item.dropdown ? <div key={item.label}><button onClick={() => setMobileDropdown(mobileDropdown === item.label ? null : item.label)} className="flex w-full items-center justify-between py-3 font-medium text-[#16161a]">{item.label}<ChevronDown className={`h-4 w-4 ${mobileDropdown === item.label ? 'rotate-180' : ''}`} /></button>{mobileDropdown === item.label && <div className="space-y-1 border-l-2 border-[#f59e0b]/30 pb-2 pl-4">{item.dropdown.map((d) => <Link key={d.label} to={d.href} onClick={() => setOpen(false)} className="block py-2 text-sm text-[#6b6b73]">{d.label}</Link>)}</div>}</div> : <Link key={item.label} to={item.href} onClick={() => setOpen(false)} className="py-3 font-medium text-[#16161a]">{item.label}</Link>)}<Link to="/book-call" onClick={() => setOpen(false)} className="btn-primary mt-4 w-full">Book a Call</Link></div></div>}
  </header>;
}

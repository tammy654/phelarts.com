import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, ArrowRight, Instagram, Linkedin, Twitter, Youtube } from 'lucide-react';
import toast from 'react-hot-toast';
import { subscribeToNewsletter } from '../services/emailService';

const socials = [
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Youtube, href: '#', label: 'YouTube' },
];

const linkGroups = [
  {
    title: 'Studio',
    links: [
      { href: '/', label: 'Home' },
      { href: '/about', label: 'About' },
      { href: '/our-work', label: 'Work' },
      { href: '/case-studies', label: 'Case Studies' },
    ],
  },
  {
    title: 'Services',
    links: [
      { href: '/services', label: '2D Animation' },
      { href: '/services', label: 'Motion Graphics' },
      { href: '/services', label: 'Visual Effects' },
      { href: '/services', label: 'Video Production' },
    ],
  },
  {
    title: 'Connect',
    links: [
      { href: '/contact', label: 'Contact' },
      { href: '/book-call', label: 'Book a Call' },
      { href: '/pricing', label: 'Pricing' },
    ],
  },
];

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribing, setSubscribing] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) {
      toast.error('Please enter a valid email');
      return;
    }
    setSubscribing(true);
    try {
      await subscribeToNewsletter({ email });
      toast.success('You are subscribed. Welcome aboard!');
      setEmail('');
    } catch {
      toast.error('Could not subscribe. Please try again.');
    } finally {
      setSubscribing(false);
    }
  };

  return (
    <footer className="bg-[#16161a] text-[#f7f5f1]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20">
        {/* Top: brand + newsletter */}
        <div className="grid lg:grid-cols-2 gap-12 pb-16 border-b border-white/10">
          <div>
            <Link to="/" className="flex items-center gap-3 mb-6">
              <img src="/phelarts_logo.png" alt="Phel Arts" className="h-11 w-11 object-contain" />
              <span className="font-display font-bold text-xl">Phel Arts</span>
            </Link>
            <p className="text-[#f7f5f1]/55 max-w-md leading-relaxed">
              A motion graphics and 2D animation studio crafting visual stories that move people
              and drive results.
            </p>
            <div className="mt-8 space-y-3">
              <a href="mailto:hello@phelarts.studio" className="flex items-center gap-3 text-[#f7f5f1]/70 hover:text-[#f59e0b] transition-colors">
                <Mail className="w-4 h-4" /> hello@phelarts.studio
              </a>
              <a href="tel:+2349067556062" className="flex items-center gap-3 text-[#f7f5f1]/70 hover:text-[#f59e0b] transition-colors">
                <Phone className="w-4 h-4" /> +234 906 755 6062
              </a>
              <div className="flex items-center gap-3 text-[#f7f5f1]/70">
                <MapPin className="w-4 h-4" /> Port Harcourt, Nigeria
              </div>
            </div>
          </div>

          <div className="lg:pl-12">
            <h3 className="font-display font-bold text-2xl mb-3">Stay in the loop</h3>
            <p className="text-[#f7f5f1]/55 mb-6 max-w-md">
              Get the latest animation trends, behind-the-scenes updates, and studio news.
            </p>
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="flex-1 px-5 py-3.5 rounded-full bg-white/[0.06] border border-white/10 text-[#f7f5f1] placeholder-[#f7f5f1]/35 focus:outline-none focus:border-[#f59e0b] transition-colors"
              />
              <button
                type="submit"
                disabled={subscribing}
                className="btn-light disabled:opacity-60"
              >
                {subscribing ? 'Subscribing...' : 'Subscribe'}
                {!subscribing && <ArrowRight className="w-4 h-4" />}
              </button>
            </form>
          </div>
        </div>

        {/* Middle: link groups */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-16">
          {linkGroups.map((group) => (
            <div key={group.title}>
              <h4 className="text-xs font-semibold tracking-[0.18em] uppercase text-[#f7f5f1]/40 mb-5">
                {group.title}
              </h4>
              <ul className="space-y-3">
                {group.links.map((link, i) => (
                  <li key={i}>
                    <Link to={link.href} className="text-[#f7f5f1]/70 hover:text-[#f59e0b] transition-colors text-sm">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div>
            <h4 className="text-xs font-semibold tracking-[0.18em] uppercase text-[#f7f5f1]/40 mb-5">
              Follow
            </h4>
            <div className="flex gap-3">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="w-10 h-10 rounded-full bg-white/[0.06] border border-white/10 flex items-center justify-center hover:bg-[#f59e0b] hover:border-[#f59e0b] hover:text-[#16161a] transition-all duration-300"
                >
                  <s.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-[#f7f5f1]/40">© 2025 Phel Arts. All rights reserved.</p>
          <div className="flex gap-8 text-sm text-[#f7f5f1]/40">
            <a href="#" className="hover:text-[#f59e0b] transition-colors">Privacy</a>
            <a href="#" className="hover:text-[#f59e0b] transition-colors">Terms</a>
            <a href="#" className="hover:text-[#f59e0b] transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

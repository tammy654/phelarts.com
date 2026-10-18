import { Link } from 'react-router-dom';
import { Clapperboard } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#07111c] text-[#c2cedb]">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-20">
        <div className="grid gap-12 md:grid-cols-4">
          <div>
            <Link to="/" className="mb-6 flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-[#ffd000] to-[#ff6500] text-[#07111c]"><Clapperboard className="h-4 w-4" /></span>
              <span className="font-display text-2xl text-white">Phel<span className="text-[#ffd000]">Motion</span></span>
            </Link>
            <p className="max-w-xs text-sm leading-relaxed text-[#91a9c1]">Creating unforgettable 2D and 3D character animation experiences for global audiences.</p>
          </div>
          <div><h3 className="mb-5 text-sm tracking-wide text-white">Quick Links</h3><div className="space-y-3 text-sm"><Link className="block hover:text-[#ffd000]" to="/about">Characters</Link><Link className="block hover:text-[#ffd000]" to="/about">About Studio</Link><Link className="block hover:text-[#ffd000]" to="/our-work">Portfolio</Link><Link className="block hover:text-[#ffd000]" to="/services">Services</Link></div></div>
          <div><h3 className="mb-5 text-sm tracking-wide text-white">Contact Studio</h3><div className="space-y-3 text-sm text-[#91a9c1]"><a className="block hover:text-[#ffd000]" href="mailto:producer@phelmotion.com">producer@phelmotion.com</a><a className="block hover:text-[#ffd000]" href="tel:+18005557435">+1 (800) 555-PHEL</a></div></div>
          <div><h3 className="mb-5 text-sm tracking-wide text-white">Mobile App</h3><p className="mb-5 text-sm leading-relaxed text-[#91a9c1]">Download the Kinohod / Screening App for exclusive early screenings.</p><div className="flex gap-3"><span className="rounded-xl bg-[#1b2734] px-4 py-2 text-xs font-bold text-white">App Store</span><span className="rounded-xl bg-[#1b2734] px-4 py-2 text-xs font-bold text-white">Google Play</span></div></div>
        </div>
        <div className="mt-14 flex flex-col justify-between gap-4 border-t border-white/10 pt-8 text-xs text-[#91a9c1] sm:flex-row"><span>© 2026 Phel Motion Studio. All rights reserved.</span><div className="flex gap-6"><a href="#" className="hover:text-[#ffd000]">Privacy Policy</a><a href="#" className="hover:text-[#ffd000]">Terms of Service</a></div></div>
      </div>
    </footer>
  );
}

import { motion } from 'framer-motion';
import { ArrowDown, Play } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative flex min-h-[720px] items-center overflow-hidden bg-[#0b1b2b] pt-28">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_35%,rgba(255,101,0,.22),transparent_30%),radial-gradient(circle_at_20%_80%,rgba(255,208,0,.12),transparent_28%)]" />
      <div className="absolute right-[-8%] top-[18%] h-[520px] w-[520px] rounded-full border border-[#ffd000]/20 bg-[#ff6500]/10 blur-3xl" />
      <div className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-14 px-6 py-20 lg:grid-cols-[1.05fr_.95fr] lg:px-8">
        <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .7 }}>
          <span className="eyebrow inline-flex rounded-full border border-[#ffd000]/30 bg-[#ffd000]/10 px-4 py-2">Original characters. Limitless worlds.</span>
          <h1 className="mt-7 max-w-3xl text-6xl leading-[.9] text-white sm:text-7xl lg:text-8xl">Stories that <span className="text-[#ffd000]">move.</span></h1>
          <p className="mt-7 max-w-xl text-lg leading-relaxed text-[#b9c8d8]">Phel Motion is an animation studio creating bold 2D and 3D character experiences for brands, broadcasters, and audiences everywhere.</p>
          <div className="mt-9 flex flex-wrap gap-4"><a href="/our-work" className="btn-primary"><Play className="h-4 w-4 fill-current" /> Watch the showreel</a><a href="/services" className="btn-ghost">Explore the studio</a></div>
          <div className="mt-14 flex gap-10"><div><strong className="font-display text-4xl text-[#ffd000]">100+</strong><p className="mt-1 text-xs uppercase tracking-wider text-[#91a9c1]">Custom character rigs</p></div><div><strong className="font-display text-4xl text-[#ffd000]">4K</strong><p className="mt-1 text-xs uppercase tracking-wider text-[#91a9c1]">Broadcast quality output</p></div></div>
        </motion.div>
        <motion.div initial={{ opacity: 0, scale: .96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: .9, delay: .15 }} className="relative">
          <div className="float-slow relative overflow-hidden rounded-[2rem] border-2 border-[#ffd000]/50 shadow-2xl shadow-orange-950/40"><img src="https://images.pexels.com/photos/12966745/pexels-photo-12966745.jpeg?auto=compress&cs=tinysrgb&w=1000" alt="Colorful animation artwork" className="h-[440px] w-full object-cover" /><div className="absolute inset-0 bg-gradient-to-t from-[#07111c]/80 via-transparent to-transparent" /><div className="absolute bottom-7 left-7"><span className="eyebrow">Official featurette</span><h2 className="mt-2 text-3xl text-white">Behind the scenes</h2></div><button className="absolute left-1/2 top-1/2 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#ffd000] text-[#07111c] shadow-xl transition-transform hover:scale-110" aria-label="Play featurette"><Play className="ml-1 h-7 w-7 fill-current" /></button></div>
        </motion.div>
      </div>
      <div className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 items-center gap-3 text-xs uppercase tracking-[.2em] text-[#91a9c1] md:flex"><ArrowDown className="h-4 w-4 text-[#ffd000]" /> Scroll to explore</div>
    </section>
  );
}

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Play, X, Target, Layers3, SlidersHorizontal, Truck } from 'lucide-react';
import { AnimatePresence } from 'framer-motion';
import Hero from '../components/Hero';
import ClientLogos from '../components/ClientLogos';
type Reel = {
  title: string;
  client: string;
  category: string;
  image: string;
  video: string;
};

const featuredReels: Reel[] = [
  {
    title: 'Brand Animation Series',
    client: 'TechCorp',
    category: 'Motion Graphics',
    image: 'https://images.pexels.com/photos/12966745/pexels-photo-12966745.jpeg?auto=compress&cs=tinysrgb&w=1600',
    video: 'https://cdn.coverr.co/videos/coverr-abstract-motion-graphics-1572/1080p.mp4',
  },
  {
    title: 'Character Animation Short',
    client: 'StoryTech',
    category: '2D Animation',
    image: 'https://images.pexels.com/photos/12198536/pexels-photo-12198536.jpeg?auto=compress&cs=tinysrgb&w=1600',
    video: 'https://cdn.coverr.co/videos/coverr-drawing-on-a-tablet-1572/1080p.mp4',
  },
  {
    title: 'Corporate Video Series',
    client: 'GlobalTech',
    category: 'Video Production',
    image: 'https://images.pexels.com/photos/8102676/pexels-photo-8102676.jpeg?auto=compress&cs=tinysrgb&w=1600',
    video: 'https://cdn.coverr.co/videos/coverr-working-in-an-office-1572/1080p.mp4',
  },
];

function FeaturedReel({ reel, onPlay }: { reel: Reel; onPlay: (r: Reel) => void }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hovered, setHovered] = useState(false);

  const enter = () => {
    setHovered(true);
    const v = videoRef.current;
    if (v) {
      v.currentTime = 0;
      v.play().catch(() => {});
    }
  };
  const leave = () => {
    setHovered(false);
    const v = videoRef.current;
    if (v) v.pause();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      viewport={{ once: true, margin: '-60px' }}
      onMouseEnter={enter}
      onMouseLeave={leave}
      onClick={() => onPlay(reel)}
      className="group relative aspect-[16/9] sm:aspect-[21/9] max-h-[520px] overflow-hidden bg-[#16161a] cursor-pointer rounded-2xl"
    >
      <img
        src={reel.image}
        alt={reel.title}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
          hovered ? 'opacity-0' : 'opacity-100'
        }`}
      />
      <video
        ref={videoRef}
        src={reel.video}
        muted
        loop
        playsInline
        preload="none"
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
          hovered ? 'opacity-100' : 'opacity-0'
        }`}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#16161a]/80 via-[#16161a]/10 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-10 flex items-end justify-between gap-6">
        <div>
          <div className="text-[11px] uppercase tracking-[0.2em] text-[#f59e0b] mb-2 font-semibold">
            {reel.category}
          </div>
          <h3 className="font-display font-bold text-[#f7f5f1] text-2xl lg:text-4xl leading-tight">
            {reel.title}
          </h3>
          <div className="text-[#f7f5f1]/55 text-sm mt-2 font-medium">{reel.client}</div>
        </div>
        <div
          className={`shrink-0 w-14 h-14 lg:w-16 lg:h-16 rounded-full bg-[#f59e0b] flex items-center justify-center shadow-2xl transition-all duration-500 ${
            hovered ? 'scale-100 opacity-100' : 'scale-90 opacity-0'
          }`}
        >
          <Play className="w-5 h-5 text-[#16161a] fill-[#16161a] ml-0.5" />
        </div>
      </div>
    </motion.div>
  );
}

const services = [
  {
    title: '2D Animation',
    level: 'Character & Explainer Films',
    description: 'Create memorable character-driven stories and explainer videos with expressive movement, thoughtful pacing, and a distinct visual style.',
    image: 'https://images.pexels.com/photos/12198536/pexels-photo-12198536.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    title: 'Motion Graphics',
    level: 'Brand & Campaign Visuals',
    description: 'Bring your brand to life with dynamic visual systems, bold transitions, and polished motion built for campaigns, launches, and digital platforms.',
    image: 'https://images.pexels.com/photos/12966745/pexels-photo-12966745.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    title: 'Video Production',
    level: 'Concept to Final Delivery',
    description: 'Produce engaging films from first idea to final cut with creative direction, cinematography, editing, colour, and sound handled with care.',
    image: 'https://images.pexels.com/photos/8102676/pexels-photo-8102676.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
];

const process = [
  { step: '01', title: 'Discovery', description: 'We learn your goals, audience, and project requirements.', icon: Target },
  { step: '02', title: 'Concept', description: 'We develop creative concepts and storyboards aligned to your vision.', icon: Layers3 },
  { step: '03', title: 'Production', description: 'We bring the project to life with meticulous craft and detail.', icon: SlidersHorizontal },
  { step: '04', title: 'Delivery', description: 'Final delivery in all formats, with ongoing support.', icon: Truck },
];

export default function Home() {
  const [selected, setSelected] = useState<Reel | null>(null);

  return (
    <div>
      <Hero />

      {/* Hero statement — below the showreel */}
      <section className="relative overflow-hidden bg-[#16161a] py-24 lg:py-32">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -left-48 top-0 h-[32rem] w-[32rem] rounded-full bg-[#f59e0b]/10 blur-[140px]" />
          <div className="absolute -right-48 bottom-0 h-[30rem] w-[30rem] rounded-full bg-[#0f5132]/30 blur-[140px]" />
          <div className="absolute inset-x-0 top-1/2 h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />
          <div className="absolute -right-24 -top-32 h-[34rem] w-[18rem] rotate-[34deg] bg-gradient-to-b from-[#f59e0b]/25 via-[#f59e0b]/[0.06] to-transparent blur-3xl" />
          <svg className="absolute inset-0 h-full w-full opacity-80" viewBox="0 0 1200 720" fill="none" preserveAspectRatio="none" aria-hidden="true">
            <defs>
              <filter id="hero-glow" x="-30%" y="-30%" width="160%" height="160%">
                <feGaussianBlur stdDeviation="8" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            <path d="M-80 650C180 510 260 470 470 500C720 535 860 405 1280 80" stroke="#f59e0b" strokeWidth="18" opacity="0.08" filter="url(#hero-glow)" />
            <path d="M-80 650C180 510 260 470 470 500C720 535 860 405 1280 80" stroke="#f59e0b" strokeWidth="2" opacity="0.38" />
            <path d="M650 420C790 360 900 270 1010 145C1080 65 1150 30 1280 -20" stroke="#fbbf24" strokeWidth="5" opacity="0.25" filter="url(#hero-glow)" />
            <path d="M700 455C820 400 930 290 1040 155C1100 80 1170 42 1280 5" stroke="#f59e0b" strokeWidth="1.5" opacity="0.65" />
          </svg>
          <div className="absolute left-[28%] top-[42%] h-2 w-2 rounded-full bg-[#fbbf24] shadow-[0_0_18px_6px_rgba(245,158,11,0.45)] animate-pulse" />
          <div className="absolute right-[19%] top-[24%] h-1.5 w-1.5 rounded-full bg-[#f7f5f1]/80 shadow-[0_0_14px_5px_rgba(247,245,241,0.25)] animate-pulse" />
          <div className="absolute right-[12%] top-[17%] h-1 w-1 rounded-full bg-[#f59e0b] shadow-[0_0_12px_4px_rgba(245,158,11,0.5)]" />
          <div className="absolute left-[13%] bottom-[20%] h-1.5 w-1.5 rounded-full bg-[#f59e0b]/80 shadow-[0_0_16px_5px_rgba(245,158,11,0.35)] animate-pulse" />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-[1.08fr_0.92fr] gap-14 lg:gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <span className="eyebrow text-[#f59e0b]">Motion Graphics & 2D Animation Studio</span>
              <h1 className="font-display font-extrabold text-[#f7f5f1] text-5xl sm:text-6xl lg:text-8xl leading-[0.96] mt-6 tracking-[-0.04em]">
                We craft
                <span className="block text-[#f59e0b]">visual stories</span>
                <span className="block">that move</span>
                <span className="block text-[#f7f5f1]/55">people.</span>
              </h1>
              <p className="text-lg text-[#f7f5f1]/60 max-w-xl leading-relaxed mt-8">
                From concept to completion, we create motion graphics and 2D animations that captivate audiences and drive results for forward-thinking brands.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mt-10">
                <a href="/our-work" className="btn-light">
                  <Play className="w-4 h-4" />
                  View Our Work
                </a>
                <a
                  href="/book-call"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full text-[#f7f5f1] font-semibold border border-white/15 hover:border-[#f59e0b]/60 hover:bg-[#f59e0b]/10 transition-all duration-300 hover:-translate-y-0.5"
                >
                  Start a Project
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, delay: 0.15 }}
              viewport={{ once: true }}
              className="relative min-h-[420px] lg:min-h-[520px] flex items-center justify-center"
            >
              <div className="absolute inset-8 rounded-[2.5rem] border border-white/10 rotate-6" />
              <div className="absolute inset-8 rounded-[2.5rem] border border-[#f59e0b]/25 -rotate-6" />
              <div className="relative w-full max-w-[30rem] aspect-[4/5] rounded-[2.5rem] border border-white/15 bg-white/[0.055] backdrop-blur-sm p-5 shadow-2xl overflow-hidden">
                <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full border border-[#f59e0b]/30" />
                <div className="absolute -right-8 -top-8 h-40 w-40 rounded-full bg-[#f59e0b]/20 blur-2xl" />
                <div className="absolute -left-20 bottom-0 h-52 w-52 rounded-full bg-[#0f5132]/50 blur-3xl" />
                <div className="relative flex items-center justify-between text-[10px] uppercase tracking-[0.22em] text-[#f7f5f1]/45">
                  <span>Story / 001</span>
                  <span className="text-[#f59e0b]">In motion</span>
                </div>
                <div className="relative mt-8 h-[15rem] overflow-hidden rounded-3xl bg-[#242424]">
                  <div className="absolute inset-0 bg-[linear-gradient(135deg,transparent_45%,rgba(245,158,11,0.8)_46%,rgba(245,158,11,0.08)_58%,transparent_59%)]" />
                  <div className="absolute left-8 top-10 h-28 w-28 rounded-full border-[18px] border-[#f59e0b] shadow-[0_0_45px_rgba(245,158,11,0.45)]" />
                  <div className="absolute bottom-[-4rem] right-[-2rem] h-52 w-52 rounded-full border-[22px] border-[#0f5132] opacity-90" />
                  <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between">
                    <span className="font-display text-3xl font-bold text-[#f7f5f1]">Ideas<br />in motion.</span>
                    <span className="mb-1 h-3 w-3 rounded-full bg-[#f59e0b] shadow-[0_0_18px_#f59e0b]" />
                  </div>
                </div>
                <div className="relative mt-7 grid grid-cols-3 gap-3 text-[10px] uppercase tracking-[0.16em] text-[#f7f5f1]/45">
                  <div><span className="mb-2 block h-1 w-8 bg-[#f59e0b]" />Concept</div>
                  <div><span className="mb-2 block h-1 w-8 bg-[#0f5132]" />Craft</div>
                  <div><span className="mb-2 block h-1 w-8 bg-[#f7f5f1]/40" />Impact</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured reels — contained with side margins */}
      <section className="bg-[#16161a] py-16 lg:py-24 border-t border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 mb-10 lg:mb-14 flex items-end justify-between gap-6">
          <div>
            <span className="eyebrow text-[#f59e0b]">Featured Work</span>
            <h2 className="font-display font-bold text-4xl lg:text-5xl text-[#f7f5f1] mt-4">
              Recent reels.
            </h2>
          </div>
          <a href="/our-work" className="hidden sm:inline-flex items-center gap-2 text-sm font-semibold text-[#f7f5f1]/70 hover:text-[#f59e0b] transition-colors">
            View all
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
        <div className="max-w-7xl mx-auto px-6 lg:px-8 space-y-6">
          {featuredReels.map((reel) => (
            <div key={reel.title} className="relative rounded-2xl overflow-hidden">
              <FeaturedReel reel={reel} onPlay={setSelected} />
            </div>
          ))}
        </div>
      </section>

      <ClientLogos />

      {/* Services preview */}
      <section className="py-28 bg-[#f7f5f1]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-2xl mb-16">
            <span className="eyebrow">What we create</span>
            <h2 className="font-display font-bold text-4xl lg:text-5xl text-[#16161a] mt-4">
              Animation that moves your audience.
            </h2>
            <p className="text-lg text-[#6b6b73] mt-5 leading-relaxed">
              From concept to completion, we bring your vision to life through stunning animation
              and motion design.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {services.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="group lift rounded-3xl overflow-hidden bg-white border border-black/[0.06] flex flex-col"
              >
                <div className="px-6 py-7 text-center min-h-[132px] flex flex-col justify-center">
                  <h3 className="font-display font-bold text-2xl text-[#16161a] leading-tight">
                    {s.title}
                  </h3>
                  <p className="text-[#6b6b73] text-sm mt-2">{s.level}</p>
                </div>
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={s.image}
                    alt={s.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#16161a]/20 to-transparent" />
                </div>
                <div className="p-7 flex flex-col flex-1">
                  <p className="text-[#6b6b73] leading-relaxed flex-1">{s.description}</p>
                  <a
                    href="/services"
                    className="inline-flex items-center justify-center gap-2 mt-7 w-full rounded-xl bg-[#f59e0b] px-5 py-3.5 text-[#16161a] font-bold hover:bg-[#d97706] hover:-translate-y-0.5 transition-all duration-300"
                  >
                    Explore service
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-12">
            <a href="/services" className="btn-ghost">
              Explore all services
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="relative overflow-hidden bg-[#16161a] py-16 lg:py-20">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute left-1/2 top-1/2 h-[34rem] w-[34rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#f59e0b]/10" />
          <div className="absolute left-1/2 top-1/2 h-[24rem] w-[24rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#0f5132]/30" />
          <div className="absolute -left-40 bottom-0 h-80 w-80 rounded-full bg-[#0f5132]/20 blur-[120px]" />
          <div className="absolute -right-40 top-0 h-80 w-80 rounded-full bg-[#f59e0b]/10 blur-[120px]" />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-2xl mb-12 lg:mb-14">
            <span className="eyebrow text-[#f59e0b]">How we work</span>
            <h2 className="font-display font-bold text-4xl lg:text-6xl text-[#f7f5f1] mt-4 leading-[1.05]">
              A proven path to exceptional results.
            </h2>
            <p className="text-lg text-[#f7f5f1]/55 mt-6 max-w-xl leading-relaxed">
              Every project moves through a considered creative process, keeping the big picture clear while we obsess over every frame.
            </p>
          </div>

          <div className="relative grid md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
            <div className="hidden lg:block absolute left-[10%] right-[10%] top-1/2 h-px bg-gradient-to-r from-[#f59e0b]/30 via-[#f59e0b] to-[#0f5132]" />
            {process.map((p, i) => (
              <motion.div
                key={p.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true, margin: '-80px' }}
                className={`group relative z-10 rounded-3xl border p-5 lg:p-6 min-h-[240px] flex flex-col transition-all duration-500 ${
                  i === 2
                    ? 'border-[#f59e0b]/70 bg-gradient-to-br from-[#f59e0b]/20 via-[#242424] to-[#0f5132]/30 shadow-[0_0_50px_rgba(245,158,11,0.12)]'
                    : 'border-white/10 bg-white/[0.055] hover:border-[#f59e0b]/40 hover:bg-white/[0.09]'
                }`}
              >
                <div className="flex items-start justify-between">
                  <span className={`font-display font-extrabold text-5xl leading-none ${i === 2 ? 'text-[#f59e0b]' : 'text-[#f7f5f1]/25 group-hover:text-[#f59e0b]/70'} transition-colors`}>
                    {p.step}
                  </span>
                  <div className={`flex h-12 w-12 items-center justify-center rounded-2xl border ${i === 2 ? 'border-[#f59e0b]/50 bg-[#f59e0b] text-[#16161a]' : 'border-white/15 bg-white/[0.06] text-[#f7f5f1]/60 group-hover:border-[#f59e0b]/50 group-hover:text-[#f59e0b]'} transition-colors`}>
                    <p.icon className="h-5 w-5" />
                  </div>
                </div>
                <div className="mt-auto">
                  <div className="mb-3 h-px w-10 bg-[#f59e0b]" />
                  <h3 className="font-display font-bold text-2xl text-[#f7f5f1]">{p.title}</h3>
                  <p className="text-[#f7f5f1]/55 leading-relaxed mt-3">{p.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-10 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#f7f5f1]/40">
            <span className="h-px w-10 bg-[#f59e0b]" />
            <span>Our production pipeline</span>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-28 bg-[#f7f5f1]">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="relative rounded-[2.5rem] bg-[#16161a] overflow-hidden p-12 lg:p-20 text-center"
          >
            <div className="absolute top-0 left-0 w-64 h-64 bg-[#f59e0b]/15 rounded-full blur-[100px] -translate-x-1/3 -translate-y-1/3" />
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-[#0f5132]/30 rounded-full blur-[100px] translate-x-1/4 translate-y-1/4" />
            <div className="relative">
              <span className="inline-flex items-center gap-2 text-[#f59e0b] mb-6">
                <Sparkles className="w-4 h-4" />
                <span className="text-xs font-semibold tracking-[0.18em] uppercase">Let's build together</span>
              </span>
              <h2 className="font-display font-bold text-4xl lg:text-5xl text-[#f7f5f1] max-w-2xl mx-auto">
                Ready to create something amazing?
              </h2>
              <p className="text-lg text-[#f7f5f1]/60 mt-5 max-w-xl mx-auto">
                Let's discuss your project and bring your vision to life.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
                <a href="/book-call" className="btn-light">
                  Book a Call
                  <ArrowRight className="w-4 h-4" />
                </a>
                <a
                  href="/our-work"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full text-[#f7f5f1] font-semibold border border-white/15 hover:bg-white/10 transition-all duration-300 hover:-translate-y-0.5"
                >
                  View Our Work
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Reel modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setSelected(null)}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md p-4 lg:p-12"
          >
            <motion.div
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.94, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-6xl bg-[#16161a] rounded-2xl overflow-hidden shadow-2xl"
            >
              <button
                onClick={() => setSelected(null)}
                className="absolute top-4 right-4 z-10 w-11 h-11 rounded-full bg-white/10 hover:bg-[#f59e0b] flex items-center justify-center transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5 text-[#f7f5f1]" />
              </button>
              <div className="aspect-video">
                <video src={selected.video} autoPlay controls className="w-full h-full object-cover" />
              </div>
              <div className="p-6 lg:p-8">
                <div className="text-[11px] uppercase tracking-[0.2em] text-[#f59e0b] mb-1.5 font-semibold">
                  {selected.category}
                </div>
                <h3 className="font-display font-bold text-xl lg:text-2xl text-[#f7f5f1]">
                  {selected.title}
                </h3>
                <div className="text-[#f7f5f1]/50 text-sm mt-1">{selected.client}</div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

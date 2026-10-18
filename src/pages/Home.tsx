import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Play, X } from 'lucide-react';
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
      className="group relative aspect-[21/9] overflow-hidden bg-[#16161a] cursor-pointer"
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
    description: 'Character-driven stories and explainer videos that engage and educate.',
    image: 'https://images.pexels.com/photos/12198536/pexels-photo-12198536.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    title: 'Motion Graphics',
    description: 'Dynamic visual elements that bring your brand to life with style.',
    image: 'https://images.pexels.com/photos/12966745/pexels-photo-12966745.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    title: 'Video Production',
    description: 'End-to-end video production from concept to final delivery.',
    image: 'https://images.pexels.com/photos/8102676/pexels-photo-8102676.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
];

const process = [
  { step: '01', title: 'Discovery', description: 'We learn your goals, audience, and project requirements.' },
  { step: '02', title: 'Concept', description: 'We develop creative concepts and storyboards aligned to your vision.' },
  { step: '03', title: 'Production', description: 'We bring the project to life with meticulous craft and detail.' },
  { step: '04', title: 'Delivery', description: 'Final delivery in all formats, with ongoing support.' },
];

export default function Home() {
  const [selected, setSelected] = useState<Reel | null>(null);

  return (
    <div>
      <Hero />

      {/* Featured reels — full bleed cinematic showcase */}
      <section className="bg-[#16161a] py-16 lg:py-24">
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
        <div className="space-y-1">
          {featuredReels.map((reel) => (
            <FeaturedReel key={reel.title} reel={reel} onPlay={setSelected} />
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
                className="group lift rounded-3xl overflow-hidden bg-white border border-black/[0.06] cursor-pointer"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={s.image}
                    alt={s.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#16161a]/50 to-transparent" />
                  <h3 className="absolute bottom-5 left-5 font-display font-bold text-xl text-[#f7f5f1]">
                    {s.title}
                  </h3>
                </div>
                <p className="p-6 text-[#6b6b73] leading-relaxed">{s.description}</p>
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
      <section className="py-28 bg-white border-y border-black/[0.06]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="eyebrow">How we work</span>
            <h2 className="font-display font-bold text-4xl lg:text-5xl text-[#16161a] mt-4">
              A proven path to exceptional results.
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {process.map((p, i) => (
              <motion.div
                key={p.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="font-display font-extrabold text-5xl text-[#f59e0b]/20 mb-4">
                  {p.step}
                </div>
                <h3 className="font-display font-bold text-xl text-[#16161a] mb-2">{p.title}</h3>
                <p className="text-[#6b6b73] leading-relaxed">{p.description}</p>
              </motion.div>
            ))}
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

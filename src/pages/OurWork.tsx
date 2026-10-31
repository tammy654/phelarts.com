import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, X, Play, Volume2 } from 'lucide-react';

const filters = ['All', '2D Animation', 'Motion Graphics', 'Video Production', 'AI Videos'];

type Reel = {
  title: string;
  client: string;
  category: string;
  image: string;
  video: string;
  year: string;
  featured?: boolean;
};

const reels: Reel[] = [
  {
    title: 'Brand Animation Series',
    client: 'TechCorp',
    category: 'Motion Graphics',
    image: 'https://images.pexels.com/photos/12966745/pexels-photo-12966745.jpeg?auto=compress&cs=tinysrgb&w=1600',
    video: 'https://cdn.coverr.co/videos/coverr-abstract-motion-graphics-1572/1080p.mp4',
    year: '2024',
    featured: true,
  },
  {
    title: 'Product Launch Campaign',
    client: 'InnovateLab',
    category: 'Motion Graphics',
    image: 'https://images.pexels.com/photos/12833265/pexels-photo-12833265.jpeg?auto=compress&cs=tinysrgb&w=1200',
    video: 'https://cdn.coverr.co/videos/coverr-a-colorful-paint-mix-1572/1080p.mp4',
    year: '2024',
  },
  {
    title: 'Character Animation Short',
    client: 'StoryTech',
    category: '2D Animation',
    image: 'https://images.pexels.com/photos/12198536/pexels-photo-12198536.jpeg?auto=compress&cs=tinysrgb&w=1200',
    video: 'https://cdn.coverr.co/videos/coverr-drawing-on-a-tablet-1572/1080p.mp4',
    year: '2023',
  },
  {
    title: 'AI Assisted Brand Film',
    client: 'NovaBrand',
    category: 'AI Videos',
    image: 'https://images.pexels.com/photos/31899138/pexels-photo-31899138.jpeg?auto=compress&cs=tinysrgb&w=1200',
    video: 'https://cdn.coverr.co/videos/coverr-typing-on-a-laptop-1572/1080p.mp4',
    year: '2023',
  },
  {
    title: 'Corporate Video Series',
    client: 'GlobalTech',
    category: 'Video Production',
    image: 'https://images.pexels.com/photos/8102676/pexels-photo-8102676.jpeg?auto=compress&cs=tinysrgb&w=1600',
    video: 'https://cdn.coverr.co/videos/coverr-working-in-an-office-1572/1080p.mp4',
    year: '2023',
    featured: true,
  },
  {
    title: 'Explainer Series',
    client: 'BrightPath',
    category: '2D Animation',
    image: 'https://images.pexels.com/photos/3781338/pexels-photo-3781338.jpeg?auto=compress&cs=tinysrgb&w=1200',
    video: 'https://cdn.coverr.co/videos/coverr-drawing-on-a-tablet-1572/1080p.mp4',
    year: '2024',
  },
  {
    title: 'Brand Identity Motion',
    client: 'Lumen Co.',
    category: 'Motion Graphics',
    image: 'https://images.pexels.com/photos/3781098/pexels-photo-3781098.jpeg?auto=compress&cs=tinysrgb&w=1200',
    video: 'https://cdn.coverr.co/videos/coverr-a-colorful-paint-mix-1572/1080p.mp4',
    year: '2024',
  },
];

function ReelCard({ reel, onPlay }: { reel: Reel; onPlay: (r: Reel) => void }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hovered, setHovered] = useState(false);

  const handleEnter = () => {
    setHovered(true);
    const v = videoRef.current;
    if (v) {
      v.currentTime = 0;
      v.play().catch(() => {});
    }
  };
  const handleLeave = () => {
    setHovered(false);
    const v = videoRef.current;
    if (v) {
      v.pause();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true, margin: '-80px' }}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      onClick={() => onPlay(reel)}
      className={`group relative overflow-hidden bg-[#16161a] cursor-pointer rounded-2xl max-h-[520px] ${
        reel.featured ? 'aspect-[16/9] lg:aspect-[21/9]' : 'aspect-[16/9]'
      }`}
    >
      {/* Poster */}
      <img
        src={reel.image}
        alt={reel.title}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
          hovered ? 'opacity-0' : 'opacity-100'
        }`}
      />
      {/* Video on hover */}
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
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#16161a]/80 via-[#16161a]/10 to-transparent pointer-events-none" />

      {/* Hover indicator */}
      <div
        className={`absolute top-6 right-6 flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-[#f7f5f1] transition-opacity duration-300 ${
          hovered ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <Volume2 className="w-3.5 h-3.5" />
        <span>Reel</span>
      </div>

      {/* Caption */}
      <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-10 flex items-end justify-between gap-6">
        <div>
          <div className="text-[11px] uppercase tracking-[0.2em] text-[#f59e0b] mb-2 font-semibold">
            {reel.category}
          </div>
          <h3 className={`font-display font-bold text-[#f7f5f1] leading-tight ${
            reel.featured ? 'text-3xl lg:text-5xl' : 'text-2xl lg:text-3xl'
          }`}>
            {reel.title}
          </h3>
          <div className="text-[#f7f5f1]/55 text-sm mt-2 font-medium">{reel.client} · {reel.year}</div>
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

export default function OurWork() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [selected, setSelected] = useState<Reel | null>(null);

  const filtered = activeFilter === 'All' ? reels : reels.filter((r) => r.category === activeFilter);
  const featured = filtered.filter((r) => r.featured);
  const standard = filtered.filter((r) => !r.featured);

  return (
    <div className="pt-28 bg-[#16161a]">
      {/* Hero */}
      <section className="page-hero">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#f59e0b]/15 rounded-full blur-[120px] -translate-y-1/3 translate-x-1/4" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#0f5132]/30 rounded-full blur-[120px] translate-y-1/3 -translate-x-1/4" />
        <div className="relative mx-auto grid w-full max-w-7xl items-center gap-12 px-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:px-8">
          <motion.div className="text-left" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <span className="eyebrow text-[#f59e0b]">Our Work</span>
            <h1 className="font-display font-bold text-5xl lg:text-7xl text-[#f7f5f1] mt-5">
              The reel.
            </h1>
            <p className="max-w-xl text-lg leading-relaxed text-[#f7f5f1]/55 lg:mr-auto">
              A selection of recent work. Hover to play, click to watch in full.
            </p>
          </motion.div>
          <div className="page-hero-visual">
            <img src="/image.png" alt="Phel Arts creative direction preview" />
          </div>
        </div>
      </section>

      {/* Featured reels — contained */}
      {featured.length > 0 && (
        <section className="max-w-7xl mx-auto px-6 lg:px-8 space-y-5">
          {featured.map((reel) => (
            <ReelCard key={reel.title} reel={reel} onPlay={setSelected} />
          ))}
        </section>
      )}

      {/* Filters */}
      <section className="py-12 lg:py-16 bg-[#16161a] sticky top-20 z-30 border-y border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-2.5">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                  activeFilter === f
                    ? 'bg-[#f59e0b] text-[#16161a]'
                    : 'bg-white/[0.04] text-[#f7f5f1]/65 border border-white/[0.08] hover:text-[#f7f5f1] hover:border-white/20'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Standard reels — two column wide grid */}
      <section className="bg-[#16161a] pt-5">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 grid md:grid-cols-2 gap-5">
          {standard.map((reel) => (
            <ReelCard key={reel.title} reel={reel} onPlay={setSelected} />
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-28 bg-[#16161a] border-t border-white/[0.06] relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#f59e0b]/10 rounded-full blur-[140px] -translate-y-1/2" />
        <div className="relative max-w-4xl mx-auto text-center px-6 lg:px-8">
          <h2 className="font-display font-bold text-4xl lg:text-5xl text-[#f7f5f1]">
            Have a story to tell?
          </h2>
          <p className="text-lg text-[#f7f5f1]/55 mt-5 max-w-lg mx-auto">
            Let's make it move. We'd love to hear what you're building.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
            <a href="/book-call" className="btn-light">
              Start a Project
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="/case-studies"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full text-[#f7f5f1] font-semibold border border-white/15 hover:bg-white/10 transition-all duration-300 hover:-translate-y-0.5"
            >
              View Case Studies
            </a>
          </div>
        </div>
      </section>

      {/* Video Modal */}
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
              <div className="p-6 lg:p-8 flex items-center justify-between gap-4">
                <div>
                  <div className="text-[11px] uppercase tracking-[0.2em] text-[#f59e0b] mb-1.5 font-semibold">
                    {selected.category}
                  </div>
                  <h3 className="font-display font-bold text-xl lg:text-2xl text-[#f7f5f1]">
                    {selected.title}
                  </h3>
                  <div className="text-[#f7f5f1]/50 text-sm mt-1">{selected.client} · {selected.year}</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

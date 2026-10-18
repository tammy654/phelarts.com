import { motion } from 'framer-motion';
import { ArrowRight, Play } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-[#16161a]">
      {/* Ambient gradient backdrop */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-[60vw] h-[60vw] bg-[#f59e0b]/15 rounded-full blur-[120px] -translate-x-1/3 -translate-y-1/3" />
        <div className="absolute bottom-0 right-0 w-[50vw] h-[50vw] bg-[#0f5132]/30 rounded-full blur-[120px] translate-x-1/4 translate-y-1/4" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%220%200%2040%2040%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.03%22%3E%3Ccircle%20cx%3D%2220%22%20cy%3D%2220%22%20r%3D%221%22/%3E%3C/g%3E%3C/svg%3E')]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 pt-32 pb-20 w-full">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          {/* Left: copy */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.06] border border-white/10 backdrop-blur-sm mb-8"
            >
              <span className="w-2 h-2 rounded-full bg-[#f59e0b] animate-pulse" />
              <span className="text-xs font-semibold tracking-[0.18em] uppercase text-[#f7f5f1]/80">
                Motion Graphics & 2D Animation Studio
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="font-display font-extrabold text-[#f7f5f1] text-5xl lg:text-7xl leading-[1.02]"
            >
              We craft{' '}
              <span className="relative inline-block">
                <span className="bg-gradient-to-r from-[#f59e0b] to-[#fbbf24] bg-clip-text text-transparent">
                  visual stories
                </span>
                <svg
                  className="absolute -bottom-2 left-0 w-full"
                  viewBox="0 0 300 12"
                  fill="none"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M2 9C75 3 225 3 298 9"
                    stroke="#f59e0b"
                    strokeWidth="3"
                    strokeLinecap="round"
                    opacity="0.5"
                  />
                </svg>
              </span>
              <br />
              that move people.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mt-8 text-lg text-[#f7f5f1]/65 max-w-xl leading-relaxed"
            >
              From concept to completion, we create motion graphics and 2D animations that
              captivate audiences and drive results for forward-thinking brands.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="mt-10 flex flex-col sm:flex-row gap-4"
            >
              <a href="/our-work" className="btn-light">
                <Play className="w-4 h-4" />
                View Our Work
              </a>
              <a
                href="/book-call"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full text-[#f7f5f1] font-semibold border border-white/15 hover:bg-white/10 transition-all duration-300 hover:-translate-y-0.5"
              >
                Start a Project
                <ArrowRight className="w-4 h-4" />
              </a>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="mt-16 grid grid-cols-3 gap-8 max-w-md"
            >
              {[
                { value: '500+', label: 'Projects' },
                { value: '50+', label: 'Clients' },
                { value: '5+', label: 'Years' },
              ].map((s) => (
                <div key={s.label}>
                  <div className="font-display font-bold text-3xl text-[#f7f5f1]">{s.value}</div>
                  <div className="text-xs uppercase tracking-[0.15em] text-[#f7f5f1]/45 mt-1">
                    {s.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right: floating image card */}
          <div className="lg:col-span-5 hidden lg:block">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="relative"
            >
              <div className="float-slow relative rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl">
                <img
                  src="https://images.pexels.com/photos/12966745/pexels-photo-12966745.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Abstract motion graphics"
                  className="w-full h-[420px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#16161a]/60 via-transparent to-transparent" />
              </div>

              {/* Floating badge */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.7 }}
                className="absolute -bottom-6 -left-6 bg-[#f7f5f1] rounded-2xl p-5 shadow-2xl max-w-[200px]"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#f59e0b] flex items-center justify-center">
                    <Play className="w-4 h-4 text-[#16161a] fill-[#16161a]" />
                  </div>
                  <div>
                    <div className="font-display font-bold text-[#16161a] text-sm">Award-winning</div>
                    <div className="text-xs text-[#6b6b73]">animation studio</div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 hidden md:flex flex-col items-center gap-2">
        <span className="text-[10px] uppercase tracking-[0.2em] text-[#f7f5f1]/40">Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-[#f7f5f1]/40 to-transparent" />
      </div>
    </section>
  );
}

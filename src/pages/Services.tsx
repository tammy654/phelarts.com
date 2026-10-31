import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { Video, Palette, Film, Sparkles, ArrowRight, Check } from 'lucide-react';
import { servicesSummary, formatUsd, formatNgn } from '../config/pricing';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  '2d-animation': Video,
  'motion-graphics': Palette,
  'video-production': Film,
  'ai-videos': Sparkles,
};

const process = [
  { step: '01', title: 'Discovery', description: 'We start by understanding your goals, target audience, and project requirements.' },
  { step: '02', title: 'Concept', description: 'Our team develops creative concepts and storyboards that align with your vision.' },
  { step: '03', title: 'Production', description: 'We bring your project to life with meticulous attention to detail and quality.' },
  { step: '04', title: 'Delivery', description: 'Final delivery with all necessary formats and ongoing support for your project.' },
];

export default function Services() {
  const location = useLocation();
  const [highlightedService, setHighlightedService] = useState<string | null>(null);
  const [currency, setCurrency] = useState<'USD' | 'NGN'>('USD');

  useEffect(() => {
    if (!location.hash) return;

    const serviceId = decodeURIComponent(location.hash.slice(1));
    const target = document.getElementById(serviceId);
    if (!target) return;

    const scrollTimer = window.setTimeout(() => {
      target.scrollIntoView({ behavior: 'smooth', block: 'center' });
      setHighlightedService(serviceId);
    }, 50);
    const highlightTimer = window.setTimeout(() => setHighlightedService(null), 2400);

    return () => {
      window.clearTimeout(scrollTimer);
      window.clearTimeout(highlightTimer);
    };
  }, [location.hash]);

  return (
    <div className="pt-28">
      {/* Hero */}
      <section className="page-hero">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#f59e0b]/15 rounded-full blur-[120px] -translate-y-1/3 translate-x-1/4" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#0f5132]/30 rounded-full blur-[120px] translate-y-1/3 -translate-x-1/4" />
        <div className="relative mx-auto grid w-full max-w-7xl items-center gap-12 px-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:px-8">
          <motion.div className="text-left" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <span className="eyebrow text-[#f59e0b]">Our Services</span>
            <h1 className="font-display font-bold text-5xl lg:text-7xl text-[#f7f5f1] mt-5">
              Everything we create.
            </h1>
            <p className="max-w-2xl text-xl leading-relaxed text-[#f7f5f1]/60 lg:mr-auto">
              From concept to completion, we offer comprehensive animation and motion graphics
              services that bring your vision to life.
            </p>
            <div className="mt-10">
              <a href="/book-call" className="btn-light">
                Start a Project
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </motion.div>
          <div className="page-hero-visual">
            <img src="/image.png" alt="Phel Arts creative direction preview" />
          </div>
        </div>
      </section>

      {/* Currency toggle */}
      <div className="flex justify-center py-8 bg-[#f7f5f1]">
        <div className="inline-flex items-center gap-1 rounded-full border border-[#242424]/10 bg-[#fefefe] p-1 shadow-sm" role="group" aria-label="Choose currency">
          {(['USD', 'NGN'] as const).map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => setCurrency(option)}
              aria-pressed={currency === option}
              className={`rounded-full px-4 py-2 text-xs font-bold tracking-[0.12em] transition-all duration-300 ${
                currency === option
                  ? 'bg-[#016952] text-[#fefefe] shadow-md'
                  : 'text-[#242424]/55 hover:bg-[#242424]/[0.06] hover:text-[#242424]'
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      {/* Services grid — 2×2 on desktop, 1 column on mobile */}
      <section className="pb-28 bg-[#f7f5f1]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-6">
            {servicesSummary.map((s, i) => {
              const Icon = iconMap[s.id] ?? Video;
              const priceText = currency === 'USD' ? `Starting at ${formatUsd(s.startingUsd)}` : `Starting at ${formatNgn(s.startingNgn)}`;
              const cardContent = (
                <>
                  <div className="flex items-start justify-between mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-[#16161a] flex items-center justify-center group-hover:bg-[#f59e0b] transition-colors duration-300">
                      <Icon className="w-6 h-6 text-[#f7f5f1] group-hover:text-[#16161a] transition-colors duration-300" />
                    </div>
                    <div className="text-right">
                      <div className="font-display font-bold text-lg text-[#16161a]">{priceText}</div>
                      <div className="text-sm text-[#6b6b73]">{s.timeline}</div>
                    </div>
                  </div>
                  <h3 className="font-display font-bold text-2xl text-[#16161a] mb-3">{s.title}</h3>
                  <p className="text-[#6b6b73] leading-relaxed mb-6">{s.description}</p>
                  <ul className="grid grid-cols-2 gap-2 mb-6">
                    {s.features.map((f) => (
                      <li key={f} className="flex items-center text-sm text-[#3a3a42]">
                        <Check className="w-4 h-4 text-[#0f5132] mr-2 flex-shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <span className="inline-flex items-center gap-2 text-[#f59e0b] font-semibold text-sm hover:gap-3 transition-all">
                    {s.href ? 'Explore AI Videos' : 'Get a Quote'}
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </>
              );

              if (s.href) {
                return (
                  <Link
                    key={s.id}
                    to={s.href}
                    id={s.id}
                    className={`group lift scroll-mt-28 rounded-3xl border bg-white p-8 transition-all duration-500 block ${
                      highlightedService === s.id
                        ? 'border-[#f59e0b] ring-4 ring-[#f59e0b]/20 shadow-[0_18px_45px_rgba(245,158,11,0.2)]'
                        : 'border-black/[0.06]'
                    }`}
                  >
                    {cardContent}
                  </Link>
                );
              }

              return (
                <motion.div
                  key={s.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: (i % 2) * 0.1 }}
                  viewport={{ once: true }}
                  id={s.id}
                  className={`group lift scroll-mt-28 rounded-3xl border bg-white p-8 transition-all duration-500 ${
                    highlightedService === s.id
                      ? 'border-[#f59e0b] ring-4 ring-[#f59e0b]/20 shadow-[0_18px_45px_rgba(245,158,11,0.2)]'
                      : 'border-black/[0.06]'
                  }`}
                >
                  {cardContent}
                  <a href="/book-call" className="inline-flex items-center gap-2 text-[#f59e0b] font-semibold text-sm hover:gap-3 transition-all mt-6">
                    Get a Quote
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-28 bg-white border-y border-black/[0.06]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="eyebrow">How we work</span>
            <h2 className="font-display font-bold text-4xl lg:text-5xl text-[#16161a] mt-4">
              A proven methodology.
            </h2>
            <p className="text-lg text-[#6b6b73] mt-5">
              A clear path that ensures exceptional results for every project.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {process.map((p, i) => (
              <motion.div
                key={p.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="font-display font-extrabold text-5xl text-[#f59e0b]/20 mb-4">{p.step}</div>
                <h3 className="font-display font-bold text-xl text-[#16161a] mb-2">{p.title}</h3>
                <p className="text-[#6b6b73] leading-relaxed">{p.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-28 bg-[#f7f5f1]">
        <div className="max-w-4xl mx-auto text-center px-6 lg:px-8">
          <h2 className="font-display font-bold text-4xl lg:text-5xl text-[#16161a]">
            Ready to get started?
          </h2>
          <p className="text-xl text-[#6b6b73] mt-5">
            Let's discuss your project and create something extraordinary together.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
            <a href="/book-call" className="btn-primary">
              Book a Call
              <ArrowRight className="w-4 h-4" />
            </a>
            <a href="/pricing" className="btn-ghost">
              View Pricing
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

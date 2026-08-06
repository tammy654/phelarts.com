import { motion } from 'framer-motion';
import { Video, Palette, Zap, Globe, Film, Smartphone, ArrowRight, Check } from 'lucide-react';

const services = [
  {
    icon: Video,
    title: '2D Animation',
    description: 'Character-driven stories and explainer videos that engage and educate your audience with compelling narratives.',
    features: ['Character Animation', 'Explainer Videos', 'Educational Content', 'Storyboarding'],
    price: 'Starting at $2,500',
    timeline: '2–4 weeks',
  },
  {
    icon: Palette,
    title: 'Motion Graphics',
    description: 'Dynamic visual elements that bring your brand to life with style, sophistication, and memorable impact.',
    features: ['Logo Animation', 'Brand Videos', 'Title Sequences', 'Social Content'],
    price: 'Starting at $1,500',
    timeline: '1–3 weeks',
  },
  {
    icon: Zap,
    title: 'Visual Effects',
    description: 'Cutting-edge VFX and compositing that elevate your content to cinematic quality and professional standards.',
    features: ['Compositing', 'Green Screen', 'Post-Production', 'Color Grading'],
    price: 'Starting at $3,000',
    timeline: '3–5 weeks',
  },
  {
    icon: Globe,
    title: 'Web Animation',
    description: 'Interactive animations that enhance user experience and drive engagement across digital platforms.',
    features: ['UI Animations', 'Interactive Elements', 'Micro-interactions', 'Loaders'],
    price: 'Starting at $1,200',
    timeline: '1–2 weeks',
  },
  {
    icon: Film,
    title: 'Video Production',
    description: 'End-to-end video production from concept development to final delivery with professional quality.',
    features: ['Concept Development', 'Scriptwriting', 'Production', 'Post-Production'],
    price: 'Starting at $4,000',
    timeline: '4–6 weeks',
  },
  {
    icon: Smartphone,
    title: 'App Animations',
    description: 'Smooth, delightful animations that make mobile experiences memorable and user-friendly.',
    features: ['App Transitions', 'Loading Animations', 'UI Elements', 'Onboarding'],
    price: 'Starting at $1,800',
    timeline: '2–3 weeks',
  },
];

const process = [
  { step: '01', title: 'Discovery', description: 'We start by understanding your goals, target audience, and project requirements.' },
  { step: '02', title: 'Concept', description: 'Our team develops creative concepts and storyboards that align with your vision.' },
  { step: '03', title: 'Production', description: 'We bring your project to life with meticulous attention to detail and quality.' },
  { step: '04', title: 'Delivery', description: 'Final delivery with all necessary formats and ongoing support for your project.' },
];

export default function Services() {
  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="py-28 bg-[#16161a] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#f59e0b]/15 rounded-full blur-[120px] -translate-y-1/3 translate-x-1/4" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#0f5132]/30 rounded-full blur-[120px] translate-y-1/3 -translate-x-1/4" />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <span className="eyebrow text-[#f59e0b]">Our Services</span>
            <h1 className="font-display font-bold text-5xl lg:text-7xl text-[#f7f5f1] mt-5">
              Everything we create.
            </h1>
            <p className="text-xl text-[#f7f5f1]/60 max-w-2xl mx-auto mt-6 leading-relaxed">
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
        </div>
      </section>

      {/* Services grid */}
      <section className="py-28 bg-[#f7f5f1]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-6">
            {services.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: (i % 2) * 0.1 }}
                viewport={{ once: true }}
                className="group lift p-8 rounded-3xl bg-white border border-black/[0.06]"
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-[#16161a] flex items-center justify-center group-hover:bg-[#f59e0b] transition-colors duration-300">
                    <s.icon className="w-6 h-6 text-[#f7f5f1] group-hover:text-[#16161a] transition-colors duration-300" />
                  </div>
                  <div className="text-right">
                    <div className="font-display font-bold text-lg text-[#16161a]">{s.price}</div>
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
                <a href="/book-call" className="inline-flex items-center gap-2 text-[#f59e0b] font-semibold text-sm hover:gap-3 transition-all">
                  Get a Quote
                  <ArrowRight className="w-4 h-4" />
                </a>
              </motion.div>
            ))}
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

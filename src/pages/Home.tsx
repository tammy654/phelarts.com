import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import Hero from '../components/Hero';
import ClientLogos from '../components/ClientLogos';

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
    title: 'Visual Effects',
    description: 'Cinematic VFX and compositing that elevate content to the next level.',
    image: 'https://images.pexels.com/photos/11894290/pexels-photo-11894290.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
];

const process = [
  { step: '01', title: 'Discovery', description: 'We learn your goals, audience, and project requirements.' },
  { step: '02', title: 'Concept', description: 'We develop creative concepts and storyboards aligned to your vision.' },
  { step: '03', title: 'Production', description: 'We bring the project to life with meticulous craft and detail.' },
  { step: '04', title: 'Delivery', description: 'Final delivery in all formats, with ongoing support.' },
];

export default function Home() {
  return (
    <div>
      <Hero />
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
    </div>
  );
}

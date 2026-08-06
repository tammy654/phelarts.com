import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Calendar, Users } from 'lucide-react';
import ClientLogos from '../components/ClientLogos';

const filters = ['All', '2D Animation', 'Motion Graphics', 'Visual Effects', 'Web Animation', 'Video Production'];

const projects = [
  {
    title: 'Brand Animation Series',
    category: 'Motion Graphics',
    image: 'https://images.pexels.com/photos/12966745/pexels-photo-12966745.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'A comprehensive brand animation series that brought TechCorp\'s identity to life through dynamic motion graphics.',
    tags: ['Motion Graphics', 'Brand Identity'],
    year: '2024',
    client: 'TechCorp',
  },
  {
    title: 'Product Launch Campaign',
    category: 'Motion Graphics',
    image: 'https://images.pexels.com/photos/12833265/pexels-photo-12833265.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'High-impact motion graphics campaign for a revolutionary product launch.',
    tags: ['Product Launch', 'Marketing'],
    year: '2024',
    client: 'InnovateLab',
  },
  {
    title: 'Character Animation Short',
    category: '2D Animation',
    image: 'https://images.pexels.com/photos/12198536/pexels-photo-12198536.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Engaging character-driven animation that tells a compelling brand story.',
    tags: ['Character Design', 'Storytelling'],
    year: '2023',
    client: 'StoryTech',
  },
  {
    title: 'Web Interface Animations',
    category: 'Web Animation',
    image: 'https://images.pexels.com/photos/31899138/pexels-photo-31899138.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Smooth, interactive animations that enhance user experience across web platforms.',
    tags: ['Web Animation', 'UI/UX'],
    year: '2023',
    client: 'DigitalFlow',
  },
  {
    title: 'Corporate Video Series',
    category: 'Video Production',
    image: 'https://images.pexels.com/photos/8102676/pexels-photo-8102676.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Professional video series showcasing corporate values and achievements.',
    tags: ['Video Production', 'Corporate'],
    year: '2023',
    client: 'GlobalTech',
  },
  {
    title: 'Cinematic VFX Reel',
    category: 'Visual Effects',
    image: 'https://images.pexels.com/photos/11894290/pexels-photo-11894290.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Cinematic visual effects and compositing work for a film production studio.',
    tags: ['VFX', 'Compositing'],
    year: '2024',
    client: 'CineStudio',
  },
];

export default function OurWork() {
  const [activeFilter, setActiveFilter] = useState('All');
  const filtered = activeFilter === 'All' ? projects : projects.filter((p) => p.category === activeFilter);

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="py-28 bg-[#16161a] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#f59e0b]/15 rounded-full blur-[120px] -translate-y-1/3 translate-x-1/4" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#0f5132]/30 rounded-full blur-[120px] translate-y-1/3 -translate-x-1/4" />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <span className="eyebrow text-[#f59e0b]">Our Work</span>
            <h1 className="font-display font-bold text-5xl lg:text-7xl text-[#f7f5f1] mt-5">
              Selected projects.
            </h1>
            <p className="text-xl text-[#f7f5f1]/60 max-w-2xl mx-auto mt-6 leading-relaxed">
              A showcase of recent work that demonstrates our commitment to exceptional design
              and storytelling.
            </p>
          </motion.div>
        </div>
      </section>

      <ClientLogos />

      {/* Filter + grid */}
      <section className="py-20 bg-[#f7f5f1]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                  activeFilter === f
                    ? 'bg-[#16161a] text-[#f7f5f1]'
                    : 'bg-white text-[#3a3a42] border border-black/[0.06] hover:border-[#16161a]/30'
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((p, i) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: (i % 3) * 0.1 }}
                viewport={{ once: true }}
                className="group lift rounded-3xl overflow-hidden bg-white border border-black/[0.06] cursor-pointer"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={p.image}
                    alt={p.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#16161a]/70 via-transparent to-transparent" />
                  <div className="absolute bottom-5 left-5 right-5">
                    <span className="text-xs font-semibold text-[#16161a] bg-[#f59e0b] px-3 py-1 rounded-full">
                      {p.category}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between text-xs text-[#6b6b73] mb-3">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5" /> {p.year}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5" /> {p.client}
                    </span>
                  </div>
                  <h3 className="font-display font-bold text-xl text-[#16161a] mb-2 group-hover:text-[#f59e0b] transition-colors">
                    {p.title}
                  </h3>
                  <p className="text-[#6b6b73] text-sm leading-relaxed mb-4">{p.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {p.tags.map((t) => (
                      <span key={t} className="text-xs text-[#3a3a42] bg-[#f7f5f1] px-3 py-1 rounded-full">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-28 bg-white border-t border-black/[0.06]">
        <div className="max-w-4xl mx-auto text-center px-6 lg:px-8">
          <h2 className="font-display font-bold text-4xl lg:text-5xl text-[#16161a]">
            Ready to start your project?
          </h2>
          <p className="text-xl text-[#6b6b73] mt-5">
            Let's collaborate to bring your vision to life with exceptional design and creativity.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
            <a href="/book-call" className="btn-primary">
              Start a Project
              <ArrowRight className="w-4 h-4" />
            </a>
            <a href="/case-studies" className="btn-ghost">
              View Case Studies
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

import { motion } from 'framer-motion';
import { Award, Users, Clock, Target, ArrowRight, Heart, Shield, Lightbulb } from 'lucide-react';
import ClientLogos from '../components/ClientLogos';

const stats = [
  { icon: Award, value: '500+', label: 'Projects Delivered' },
  { icon: Users, value: '50+', label: 'Happy Clients' },
  { icon: Clock, value: '5+', label: 'Years Experience' },
  { icon: Target, value: '98%', label: 'Client Satisfaction' },
];

const values = [
  { icon: Heart, title: 'Creativity First', description: 'Every project deserves a unique creative approach that stands out and captures attention.' },
  { icon: Shield, title: 'Quality Obsessed', description: 'Attention to detail and technical excellence are at the core of everything we do.' },
  { icon: Lightbulb, title: 'Client Partnership', description: 'We work closely with our clients as true partners in bringing their vision to life.' },
];

const team = [
  { name: 'Alex Chen', role: 'Creative Director', image: 'https://images.pexels.com/photos/3777931/pexels-photo-3777931.jpeg?auto=compress&cs=tinysrgb&w=600', bio: '10+ years in animation and motion graphics with a passion for storytelling.' },
  { name: 'Sarah Johnson', role: 'Lead Animator', image: 'https://images.pexels.com/photos/3756679/pexels-photo-3756679.jpeg?auto=compress&cs=tinysrgb&w=600', bio: 'Specialist in character animation and bringing personalities to life through motion.' },
  { name: 'Mike Rodriguez', role: 'VFX Artist', image: 'https://images.pexels.com/photos/3785079/pexels-photo-3785079.jpeg?auto=compress&cs=tinysrgb&w=600', bio: 'Expert in visual effects and compositing with a background in film production.' },
  { name: 'Emma Davis', role: 'Motion Designer', image: 'https://images.pexels.com/photos/3756681/pexels-photo-3756681.jpeg?auto=compress&cs=tinysrgb&w=600', bio: 'Specializes in brand animation and creating compelling visual identities.' },
];

export default function About() {
  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="py-28 bg-[#16161a] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#f59e0b]/15 rounded-full blur-[120px] -translate-y-1/3 translate-x-1/4" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#0f5132]/30 rounded-full blur-[120px] translate-y-1/3 -translate-x-1/4" />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <span className="eyebrow text-[#f59e0b]">About Us</span>
            <h1 className="font-display font-bold text-5xl lg:text-7xl text-[#f7f5f1] mt-5">
              About Phel Arts.
            </h1>
            <p className="text-xl lg:text-2xl text-[#f7f5f1]/60 max-w-3xl mx-auto mt-6 leading-relaxed">
              We're a passionate team of animators, designers, and storytellers dedicated to
              creating exceptional visual experiences that move people.
            </p>
          </motion.div>
        </div>
      </section>

      <ClientLogos />

      {/* Story */}
      <section className="py-28 bg-[#f7f5f1]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <span className="eyebrow">Our Story</span>
            <h2 className="font-display font-bold text-4xl lg:text-5xl text-[#16161a]">
              A studio built on craft.
            </h2>
            <div className="space-y-5 text-lg text-[#6b6b73] leading-relaxed">
              <p>
                Founded in 2019 with a vision to transform how brands communicate through motion,
                Phel Arts has grown into a trusted partner for companies seeking to tell their
                stories through compelling visual narratives.
              </p>
              <p>
                Our multidisciplinary team combines artistic vision with technical expertise,
                ensuring every project not only looks exceptional but also achieves its strategic
                objectives and drives meaningful results.
              </p>
              <p>
                From Fortune 500 companies to innovative startups, we've helped brands across
                industries connect with their audiences through the power of animation.
              </p>
            </div>
            <a href="/contact" className="inline-flex items-center gap-2 text-[#f59e0b] font-semibold hover:gap-3 transition-all">
              Work with us
              <ArrowRight className="w-4 h-4" />
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <div className="relative overflow-hidden rounded-3xl">
              <img
                src="https://images.pexels.com/photos/6044300/pexels-photo-6044300.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Team collaboration"
                className="w-full h-[480px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#16161a]/30 to-transparent" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 bg-white border-y border-black/[0.06]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-14 h-14 rounded-2xl bg-[#16161a] flex items-center justify-center mx-auto mb-4">
                  <s.icon className="w-6 h-6 text-[#f59e0b]" />
                </div>
                <div className="font-display font-bold text-4xl text-[#16161a]">{s.value}</div>
                <div className="text-[#6b6b73] text-sm mt-1">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-28 bg-[#f7f5f1]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="eyebrow">Our Values</span>
            <h2 className="font-display font-bold text-4xl lg:text-5xl text-[#16161a] mt-4">
              What guides our work.
            </h2>
          </div>
          <div className="grid lg:grid-cols-3 gap-6">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="lift p-8 rounded-3xl bg-white border border-black/[0.06]"
              >
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#f59e0b] to-[#0f5132] flex items-center justify-center mb-6">
                  <v.icon className="w-6 h-6 text-[#f7f5f1]" />
                </div>
                <h3 className="font-display font-bold text-xl text-[#16161a] mb-3">{v.title}</h3>
                <p className="text-[#6b6b73] leading-relaxed">{v.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-28 bg-white border-y border-black/[0.06]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="eyebrow">Our Team</span>
            <h2 className="font-display font-bold text-4xl lg:text-5xl text-[#16161a] mt-4">
              The creative minds.
            </h2>
            <p className="text-lg text-[#6b6b73] mt-5">
              Talented professionals who bring creativity and expertise to every project.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((m, i) => (
              <motion.div
                key={m.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <div className="relative overflow-hidden rounded-3xl aspect-square mb-5">
                  <img
                    src={m.image}
                    alt={m.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#16161a]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <h3 className="font-display font-bold text-lg text-[#16161a]">{m.name}</h3>
                <div className="text-[#f59e0b] font-semibold text-sm mb-2">{m.role}</div>
                <p className="text-[#6b6b73] text-sm leading-relaxed">{m.bio}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-28 bg-[#f7f5f1]">
        <div className="max-w-4xl mx-auto text-center px-6 lg:px-8">
          <h2 className="font-display font-bold text-4xl lg:text-5xl text-[#16161a]">
            Ready to work together?
          </h2>
          <p className="text-xl text-[#6b6b73] mt-5">
            Let's create something extraordinary that tells your story and achieves your goals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
            <a href="/book-call" className="btn-primary">
              Book a Call
              <ArrowRight className="w-4 h-4" />
            </a>
            <a href="/our-work" className="btn-ghost">
              View Our Work
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

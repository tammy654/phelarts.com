import { motion } from 'framer-motion';
import { ArrowRight, TrendingUp, Users, Clock, Target, Award } from 'lucide-react';

const caseStudies = [
  {
    title: 'TechCorp Brand Revolution',
    client: 'TechCorp Inc.',
    category: 'Motion Graphics & Branding',
    image: 'https://images.pexels.com/photos/12966745/pexels-photo-12966745.jpeg?auto=compress&cs=tinysrgb&w=800',
    challenge: 'TechCorp needed to modernize their brand identity and create engaging content that would resonate with a younger, tech-savvy audience while maintaining professional credibility.',
    solution: 'We developed a comprehensive motion graphics package including logo animations, brand videos, and social media content that balanced innovation with professionalism.',
    results: [
      { metric: 'Brand Recognition', value: '+300%', icon: TrendingUp },
      { metric: 'Social Engagement', value: '+450%', icon: Users },
      { metric: 'Lead Generation', value: '+200%', icon: Target },
      { metric: 'Project Duration', value: '3 weeks', icon: Clock },
    ],
    testimonial: {
      text: 'Phel Arts transformed our brand identity beyond our expectations. The motion graphics perfectly captured our vision and significantly boosted our market presence.',
      author: 'Sarah Johnson',
      position: 'Marketing Director, TechCorp Inc.',
    },
    tags: ['Motion Graphics', 'Brand Identity', 'Social Media'],
  },
  {
    title: 'EduLearn Engagement Boost',
    client: 'EduLearn Platform',
    category: '2D Animation & Educational Content',
    image: 'https://images.pexels.com/photos/12198536/pexels-photo-12198536.jpeg?auto=compress&cs=tinysrgb&w=800',
    challenge: 'EduLearn\'s educational content had low engagement and high dropout rates. Students found the material boring and difficult to understand.',
    solution: 'We created a series of character-driven 2D animations that simplified complex concepts and made learning fun through storytelling.',
    results: [
      { metric: 'User Engagement', value: '+250%', icon: TrendingUp },
      { metric: 'Course Completion', value: '+180%', icon: Target },
      { metric: 'Student Satisfaction', value: '95%', icon: Users },
      { metric: 'Content Series', value: '12 episodes', icon: Award },
    ],
    testimonial: {
      text: 'The animated series revolutionized our platform. Students are now excited about learning, and our completion rates have never been higher.',
      author: 'Dr. Michael Chen',
      position: 'CEO, EduLearn Platform',
    },
    tags: ['2D Animation', 'Character Design', 'Educational'],
  },
  {
    title: 'InnovateTech Product Launch',
    client: 'InnovateTech Solutions',
    category: 'Visual Effects & Product Demo',
    image: 'https://images.pexels.com/photos/11894290/pexels-photo-11894290.jpeg?auto=compress&cs=tinysrgb&w=800',
    challenge: 'InnovateTech needed to launch their complex software product with a compelling demonstration that clearly communicated its value proposition.',
    solution: 'We created a cinematic product demonstration using advanced visual effects, 3D elements, and clear messaging to showcase the software\'s capabilities.',
    results: [
      { metric: 'Conversion Rate', value: '+400%', icon: TrendingUp },
      { metric: 'Demo Requests', value: '+350%', icon: Target },
      { metric: 'Qualified Leads', value: '+280%', icon: Users },
      { metric: 'Video Views', value: '500K+', icon: Award },
    ],
    testimonial: {
      text: 'The product demo video exceeded all our expectations. It perfectly captured our software\'s complexity in a simple, engaging way that drove incredible results.',
      author: 'Alex Rodriguez',
      position: 'Product Manager, InnovateTech',
    },
    tags: ['Visual Effects', 'Product Demo', 'Marketing'],
  },
];

export default function CaseStudies() {
  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="py-28 bg-[#16161a] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#f59e0b]/15 rounded-full blur-[120px] -translate-y-1/3 translate-x-1/4" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#0f5132]/30 rounded-full blur-[120px] translate-y-1/3 -translate-x-1/4" />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <span className="eyebrow text-[#f59e0b]">Case Studies</span>
            <h1 className="font-display font-bold text-5xl lg:text-7xl text-[#f7f5f1] mt-5">
              Results that speak.
            </h1>
            <p className="text-xl text-[#f7f5f1]/60 max-w-2xl mx-auto mt-6 leading-relaxed">
              Deep dives into our most successful projects — the challenges we solved, the solutions
              we built, and the measurable results we achieved.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Case studies */}
      <section className="py-28 bg-[#f7f5f1]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 space-y-24">
          {caseStudies.map((study, index) => (
            <motion.div
              key={study.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
              className={`grid lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''}`}
            >
              {/* Image */}
              <div className={`relative group ${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                <div className="relative overflow-hidden rounded-3xl aspect-[4/3]">
                  <img
                    src={study.image}
                    alt={study.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#16161a]/60 to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6">
                    <div className="text-[#f7f5f1] font-semibold">{study.client}</div>
                    <div className="text-[#f59e0b] text-sm">{study.category}</div>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className={`space-y-6 ${index % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''}`}>
                <div>
                  <h2 className="font-display font-bold text-3xl lg:text-4xl text-[#16161a]">{study.title}</h2>
                  <div className="text-[#f59e0b] font-semibold mt-2">{study.category}</div>
                </div>

                <div className="space-y-5">
                  <div>
                    <h3 className="font-display font-bold text-lg text-[#16161a] mb-2">The Challenge</h3>
                    <p className="text-[#6b6b73] leading-relaxed">{study.challenge}</p>
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-lg text-[#16161a] mb-2">Our Solution</h3>
                    <p className="text-[#6b6b73] leading-relaxed">{study.solution}</p>
                  </div>
                </div>

                {/* Results */}
                <div className="grid grid-cols-2 gap-3">
                  {study.results.map((r) => (
                    <div key={r.metric} className="bg-white rounded-2xl p-4 border border-black/[0.06]">
                      <div className="flex items-center gap-2 mb-1">
                        <div className="w-7 h-7 rounded-lg bg-[#16161a] flex items-center justify-center">
                          <r.icon className="w-3.5 h-3.5 text-[#f7f5f1]" />
                        </div>
                        <span className="text-xs text-[#6b6b73]">{r.metric}</span>
                      </div>
                      <div className="font-display font-bold text-xl text-[#16161a]">{r.value}</div>
                    </div>
                  ))}
                </div>

                {/* Testimonial */}
                <div className="bg-white rounded-2xl p-6 border border-black/[0.06]">
                  <p className="text-[#3a3a42] italic leading-relaxed mb-4">"{study.testimonial.text}"</p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#f59e0b] to-[#0f5132] flex items-center justify-center">
                      <Users className="w-4 h-4 text-[#f7f5f1]" />
                    </div>
                    <div>
                      <div className="font-semibold text-[#16161a] text-sm">{study.testimonial.author}</div>
                      <div className="text-xs text-[#6b6b73]">{study.testimonial.position}</div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {study.tags.map((t) => (
                    <span key={t} className="px-3 py-1.5 bg-white text-[#3a3a42] rounded-full text-xs border border-black/[0.06]">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-28 bg-[#16161a] relative overflow-hidden">
        <div className="absolute top-0 left-0 w-80 h-80 bg-[#f59e0b]/15 rounded-full blur-[120px] -translate-x-1/3 -translate-y-1/3" />
        <div className="relative max-w-4xl mx-auto text-center px-6 lg:px-8">
          <h2 className="font-display font-bold text-4xl lg:text-5xl text-[#f7f5f1]">
            Ready to write your success story?
          </h2>
          <p className="text-xl text-[#f7f5f1]/60 mt-5">
            Let's create a case study that showcases your brand's transformation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
            <a href="/book-call" className="btn-light">
              Start Your Project
              <ArrowRight className="w-4 h-4" />
            </a>
            <a href="/our-work" className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full text-[#f7f5f1] font-semibold border border-white/15 hover:bg-white/10 transition-all duration-300 hover:-translate-y-0.5">
              View Portfolio
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

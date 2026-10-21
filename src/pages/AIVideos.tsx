import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Play,
  Sparkles,
  PenLine,
  Clapperboard,
  AudioLines,
  RefreshCw,
  ClipboardList,
  LayoutGrid,
  Wand2,
  PackageCheck,
  Film,
  ShieldCheck,
} from 'lucide-react';

const aiCapabilities = [
  {
    icon: PenLine,
    title: 'Script and concept development',
    description: 'We use AI to draft and explore script directions faster, then refine the strongest idea with you.',
  },
  {
    icon: Clapperboard,
    title: 'Scene and character generation',
    description: 'AI generated visuals help us build scenes and characters quickly before the final polish.',
  },
  {
    icon: AudioLines,
    title: 'Voiceover and sound design',
    description: 'AI assisted voice and sound options give us more room to experiment before the final mix.',
  },
  {
    icon: RefreshCw,
    title: 'Fast revision rounds',
    description: 'AI speeds up iteration, so you see new versions sooner without extra cost pressure.',
  },
];

const timeline = [
  { icon: ClipboardList, step: '01', title: 'Brief', description: 'We capture your goals, audience, and tone in a short kickoff.' },
  { icon: LayoutGrid, step: '02', title: 'Storyboard', description: 'We sketch the story beat by beat for your approval.' },
  { icon: Wand2, step: '03', title: 'Generate and animate', description: 'We produce visuals and motion using AI tools and human direction.' },
  { icon: PackageCheck, step: '04', title: 'Final delivery', description: 'We finish, color, and master the cut for the formats you need.' },
];

const packages = [
  { name: 'Starter', days: '[X] days' },
  { name: 'Professional', days: '[X] days' },
  { name: 'Enterprise', days: '[X] days' },
];

const samples = [
  { title: 'Brand story short', type: 'Motion Graphics', turnaround: '[X] days' },
  { title: 'Product explainer', type: '2D Animation', turnaround: '[X] days' },
  { title: 'Founder narrative', type: 'AI Video', turnaround: '[X] days' },
  { title: 'Social campaign cut', type: 'Motion Graphics', turnaround: '[X] days' },
  { title: 'Character pilot', type: '2D Animation', turnaround: '[X] days' },
  { title: 'Announcement teaser', type: 'AI Video', turnaround: '[X] days' },
];

export default function AIVideos() {
  return (
    <div className="pt-28">
      {/* Hero */}
      <section className="page-hero">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#f59e0b]/15 rounded-full blur-[120px] -translate-y-1/3 translate-x-1/4" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#0f5132]/30 rounded-full blur-[120px] translate-y-1/3 -translate-x-1/4" />
        <div className="relative mx-auto grid w-full max-w-7xl items-center gap-12 px-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:px-8">
          <div className="text-left">
            <span className="eyebrow text-[#f59e0b]">AI Videos</span>
            <h1 className="font-display font-bold text-5xl lg:text-7xl text-[#f7f5f1] mt-5 leading-[1.02] tracking-[-0.03em]">
              AI video storytelling, delivered faster.
            </h1>
            <p className="max-w-2xl text-xl leading-relaxed text-[#f7f5f1]/60 lg:mr-auto mt-6">
              We combine AI tools with human creative direction to produce animated stories in less time,
              without losing the emotional impact your audience needs.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Link to="/book-call" className="btn-light">
                Book a screening
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="#samples"
                className="inline-flex items-center justify-center gap-2 px-7 py-3 rounded-full text-[#f7f5f1] font-semibold border border-white/15 hover:border-[#f59e0b]/60 hover:bg-[#f59e0b]/10 transition-all duration-300 hover:-translate-y-0.5"
              >
                See AI samples
                <Play className="w-4 h-4" />
              </a>
            </div>
          </div>
          <div className="page-hero-visual">
            <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden border border-white/10 bg-[#242424]">
              <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(245,158,11,0.25)_0%,transparent_45%,rgba(15,81,50,0.4)_100%)]" />
              <div className="absolute left-6 top-6 flex items-center gap-2 text-[10px] uppercase tracking-[0.22em] text-[#f7f5f1]/55">
                <Sparkles className="w-3.5 h-3.5 text-[#f59e0b]" />
                <span>AI assisted cut</span>
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-20 h-20 rounded-full bg-[#f59e0b] flex items-center justify-center shadow-[0_0_40px_rgba(245,158,11,0.5)]">
                  <Play className="w-7 h-7 text-[#16161a] fill-[#16161a] ml-1" />
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-[#16161a] to-transparent">
                <div className="text-[#f7f5f1] font-display font-bold text-lg">Sample preview</div>
                <div className="text-[#f7f5f1]/55 text-sm">Replace with a real clip you have rights to</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What AI helps us do */}
      <section className="py-24 bg-[#f7f5f1]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-2xl mb-14">
            <span className="eyebrow">What AI helps us do</span>
            <h2 className="font-display font-bold text-4xl lg:text-5xl text-[#16161a] mt-4 leading-tight">
              Faster steps, same craft.
            </h2>
            <p className="text-lg text-[#6b6b73] mt-5 leading-relaxed">
              AI handles the repetitive work, while our team keeps the story, tone, and quality where they need to be.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {aiCapabilities.map((c, i) => (
              <motion.div
                key={c.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                viewport={{ once: true, margin: '-60px' }}
                className="lift rounded-3xl bg-white border border-black/[0.06] p-7 flex flex-col"
              >
                <div className="w-12 h-12 rounded-2xl bg-[#f59e0b]/15 border border-[#f59e0b]/30 flex items-center justify-center text-[#b45309]">
                  <c.icon className="w-6 h-6" />
                </div>
                <h3 className="font-display font-bold text-xl text-[#16161a] mt-5 leading-snug">{c.title}</h3>
                <p className="text-[#6b6b73] leading-relaxed mt-3 text-sm">{c.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Turnaround timeline */}
      <section className="relative overflow-hidden bg-[#16161a] py-24">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -left-32 bottom-0 h-80 w-80 rounded-full bg-[#0f5132]/25 blur-[120px]" />
          <div className="absolute -right-32 top-0 h-80 w-80 rounded-full bg-[#f59e0b]/15 blur-[120px]" />
        </div>
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-2xl mb-14">
            <span className="eyebrow text-[#f59e0b]">Turnaround</span>
            <h2 className="font-display font-bold text-4xl lg:text-5xl text-[#f7f5f1] mt-4 leading-tight">
              A clear path from brief to delivery.
            </h2>
            <p className="text-lg text-[#f7f5f1]/55 mt-5 leading-relaxed">
              Every AI video project moves through four steps. Timelines depend on scope and package.
            </p>
          </div>

          {/* Timeline */}
          <div className="relative grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            <div className="hidden lg:block absolute left-[10%] right-[10%] top-[3.25rem] h-px bg-gradient-to-r from-[#f59e0b]/30 via-[#f59e0b] to-[#0f5132]" />
            {timeline.map((t, i) => (
              <motion.div
                key={t.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true, margin: '-80px' }}
                className="relative z-10 rounded-3xl border border-white/10 bg-white/[0.055] p-6 min-h-[220px] flex flex-col hover:border-[#f59e0b]/40 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <span className="font-display font-extrabold text-4xl text-[#f7f5f1]/25">{t.step}</span>
                  <div className="w-12 h-12 rounded-2xl border border-white/15 bg-white/[0.06] text-[#f59e0b] flex items-center justify-center">
                    <t.icon className="w-5 h-5" />
                  </div>
                </div>
                <div className="mt-auto">
                  <div className="mb-3 h-px w-10 bg-[#f59e0b]" />
                  <h3 className="font-display font-bold text-2xl text-[#f7f5f1]">{t.title}</h3>
                  <p className="text-[#f7f5f1]/55 leading-relaxed mt-2 text-sm">{t.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Packages */}
          <div className="mt-12 rounded-3xl border border-white/10 bg-white/[0.04] p-7 lg:p-8">
            <div className="text-xs font-semibold tracking-[0.18em] uppercase text-[#f7f5f1]/45 mb-5">
              Typical turnaround by package
            </div>
            <ul className="divide-y divide-white/10">
              {packages.map((p) => (
                <li key={p.name} className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 py-4">
                  <div className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-[#f59e0b]" />
                    <span className="font-display font-bold text-lg text-[#f7f5f1]">{p.name}</span>
                  </div>
                  <span className="text-[#f7f5f1]/70 font-medium">{p.days}</span>
                </li>
              ))}
            </ul>
            <p className="text-sm text-[#f7f5f1]/45 mt-5">
              Replace the bracketed figures above with your real turnaround times before publishing.
            </p>
          </div>
        </div>
      </section>

      {/* Samples */}
      <section id="samples" className="py-24 bg-[#f7f5f1] scroll-mt-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-2xl mb-14">
            <span className="eyebrow">AI samples</span>
            <h2 className="font-display font-bold text-4xl lg:text-5xl text-[#16161a] mt-4 leading-tight">
              Selected AI video work.
            </h2>
            <p className="text-lg text-[#6b6b73] mt-5 leading-relaxed">
              A preview of the kinds of stories we produce with AI assisted tools. Swap these for real clips you have rights to.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {samples.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                viewport={{ once: true, margin: '-60px' }}
                className="lift group rounded-3xl overflow-hidden bg-white border border-black/[0.06] flex flex-col"
              >
                <div className="relative aspect-video bg-[#242424] overflow-hidden">
                  <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(245,158,11,0.18)_0%,transparent_50%,rgba(15,81,50,0.35)_100%)]" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-14 h-14 rounded-full bg-[#f59e0b]/90 flex items-center justify-center transition-transform duration-500 group-hover:scale-110">
                      <Play className="w-5 h-5 text-[#16161a] fill-[#16161a] ml-0.5" />
                    </div>
                  </div>
                  <div className="absolute left-4 top-4 text-[10px] uppercase tracking-[0.18em] font-semibold text-[#f7f5f1]/70 bg-[#16161a]/40 backdrop-blur-sm px-2.5 py-1 rounded-full">
                    Thumbnail placeholder
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <div className="text-xs font-semibold tracking-[0.18em] uppercase text-[#b45309]">{s.type}</div>
                  <h3 className="font-display font-bold text-xl text-[#16161a] mt-2 leading-snug">{s.title}</h3>
                  <div className="mt-4 pt-4 border-t border-black/[0.06] flex items-center justify-between text-sm">
                    <span className="text-[#6b6b73]">Turnaround</span>
                    <span className="font-semibold text-[#16161a]">{s.turnaround}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Human led process */}
      <section className="py-24 bg-white border-y border-black/[0.06]">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[#0f5132]/10 border border-[#0f5132]/25 text-[#0f5132] mb-6">
            <ShieldCheck className="w-7 h-7" />
          </div>
          <span className="eyebrow">Human led process</span>
          <h2 className="font-display font-bold text-4xl lg:text-5xl text-[#16161a] mt-4 leading-tight">
            Creative direction stays human.
          </h2>
          <p className="text-lg text-[#6b6b73] mt-6 leading-relaxed">
            Every project is guided by a creative director. Scripts and storyboards are approved before any generation starts,
            and final edits are finished by our team.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#f7f5f1] border border-black/[0.06] text-sm text-[#16161a] font-medium">
              <Film className="w-4 h-4 text-[#b45309]" /> Scripts approved first
            </div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#f7f5f1] border border-black/[0.06] text-sm text-[#16161a] font-medium">
              <LayoutGrid className="w-4 h-4 text-[#b45309]" /> Storyboards signed off
            </div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#f7f5f1] border border-black/[0.06] text-sm text-[#16161a] font-medium">
              <PackageCheck className="w-4 h-4 text-[#b45309]" /> Final edits by our team
            </div>
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="relative overflow-hidden bg-[#16161a] py-20 lg:py-28">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -left-32 bottom-[-10rem] h-[30rem] w-[30rem] rounded-full bg-[#0f5132]/25 blur-[120px]" />
          <div className="absolute -right-24 top-[-8rem] h-[28rem] w-[28rem] rounded-full bg-[#f59e0b]/15 blur-[120px]" />
        </div>
        <div className="relative max-w-5xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="relative rounded-[2.5rem] bg-gradient-to-br from-[#f59e0b]/70 via-white/20 to-[#0f5132]/80 p-px shadow-[0_24px_80px_rgba(0,0,0,0.35)]"
          >
            <div className="relative overflow-hidden rounded-[2.45rem] bg-[#242424]/90 px-6 py-14 text-center backdrop-blur-xl sm:px-10 lg:px-20 lg:py-20">
              <div className="absolute -right-24 -top-28 h-80 w-80 rounded-full bg-[#f59e0b]/10 blur-[90px]" />
              <div className="absolute -left-24 bottom-[-12rem] h-96 w-96 rounded-full bg-[#0f5132]/25 blur-[100px]" />
              <div className="relative">
                <span className="mb-6 inline-flex items-center gap-2 text-[#f59e0b]">
                  <Sparkles className="h-4 w-4" />
                  <span className="text-xs font-semibold uppercase tracking-[0.18em]">AI videos</span>
                </span>
                <h2 className="mx-auto max-w-3xl font-display text-4xl font-bold leading-[1.05] text-[#f7f5f1] sm:text-5xl lg:text-6xl">
                  Ready to tell your story faster?
                </h2>
                <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-[#f7f5f1]/60">
                  Book a screening and we will map your AI video project together.
                </p>
                <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
                  <Link
                    to="/book-call"
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-[#f59e0b] bg-[#f59e0b] px-7 py-3 font-bold text-[#16161a] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#fbbf24] hover:shadow-[0_12px_30px_-10px_rgba(245,158,11,0.7)]"
                  >
                    Start your project
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

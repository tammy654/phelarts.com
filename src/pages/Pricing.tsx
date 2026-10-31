import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Sparkles, Tag } from 'lucide-react';
import PricingContent from '../components/PricingContent';
import {
  standardPlans,
  aiPlans,
  addOns,
  pricingBadges,
} from '../config/pricing';

type Mode = 'standard' | 'ai';

export default function Pricing() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialMode: Mode = searchParams.get('mode') === 'ai' ? 'ai' : 'standard';
  const [mode, setMode] = useState<Mode>(initialMode);

  const switchMode = (next: Mode) => {
    setMode(next);
    const params = new URLSearchParams(searchParams);
    if (next === 'ai') params.set('mode', 'ai');
    else params.delete('mode');
    setSearchParams(params, { replace: true });
  };

  const isAI = mode === 'ai';
  const heading = isAI ? 'AI Pricing' : 'Pricing';
  const heroSubtitle = isAI
    ? 'Pricing reflects AI assisted production with human creative direction.'
    : 'Exceptional creativity. Flexible pricing. Explore our tailored animation and motion design packages, crafted to bring your vision to life without compromising on quality.';

  return (
    <div className="pt-28">
      {/* Hero Section */}
      <section
        className="relative overflow-hidden bg-cover bg-center py-24"
        style={{
          backgroundImage: "linear-gradient(rgba(10, 24, 34, 0.18), rgba(10, 24, 34, 0.18)), url('/Pricing.jpg')",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center" data-aos="fade-up">
          {/* Mode toggle */}
          <div className="mb-8 flex justify-center">
            <div
              className="inline-flex items-center gap-1 rounded-full border border-[#fefefe]/25 bg-[#fefefe]/10 p-1 backdrop-blur-sm"
              role="group"
              aria-label="Switch pricing type"
            >
              <button
                type="button"
                onClick={() => switchMode('standard')}
                aria-pressed={!isAI}
                className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-bold tracking-[0.08em] transition-all duration-300 ${
                  !isAI
                    ? 'bg-[#f59e0b] text-[#16161a] shadow-md'
                    : 'text-[#fefefe]/70 hover:text-[#fefefe]'
                }`}
              >
                <Tag className="w-4 h-4" />
                Pricing
              </button>
              <button
                type="button"
                onClick={() => switchMode('ai')}
                aria-pressed={isAI}
                className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-bold tracking-[0.08em] transition-all duration-300 ${
                  isAI
                    ? 'bg-[#f59e0b] text-[#16161a] shadow-md'
                    : 'text-[#fefefe]/70 hover:text-[#fefefe]'
                }`}
              >
                <Sparkles className="w-4 h-4" />
                AI Pricing
              </button>
            </div>
          </div>

          <h1 className="text-5xl lg:text-7xl font-bold text-[#fefefe] mb-8">
            {heading}
          </h1>
          <p className="text-xl lg:text-2xl text-gray-300 max-w-4xl mx-auto mb-12">
            {heroSubtitle}
          </p>
          <div className="flex flex-wrap justify-center gap-4" data-aos="fade-up" data-aos-delay="200">
            {pricingBadges.map((badge) => (
              <div key={badge} className="bg-[#fefefe]/10 backdrop-blur-sm border border-[#fefefe]/20 rounded-full px-4 py-2">
                <span className="text-sm font-medium text-[#fefefe]/90">{badge}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <PricingContent
        key={mode}
        plans={isAI ? aiPlans : standardPlans}
        addOns={addOns}
        isAI={isAI}
        badge={isAI ? 'AI Pricing' : undefined}
        subtitle={isAI ? 'Pricing reflects AI assisted production with human creative direction.' : undefined}
        accentBorder={isAI}
        bookCtaHref="/book-call"
        enquiryCtaHref="/contact#enquiry"
      />
    </div>
  );
}

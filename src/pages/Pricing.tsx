import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Sparkles, Tag } from 'lucide-react';
import PricingContent from '../components/PricingContent';
import {
  pricingServices,
  addOns,
  pricingBadges,
} from '../config/pricing';

const DEFAULT_MODE = pricingServices[0].id;

export default function Pricing() {
  const [searchParams, setSearchParams] = useSearchParams();
  const requested = searchParams.get('mode');
  const initialMode = pricingServices.some((s) => s.id === requested) ? (requested as string) : DEFAULT_MODE;
  const [mode, setMode] = useState<string>(initialMode);

  const switchMode = (next: string) => {
    setMode(next);
    const params = new URLSearchParams(searchParams);
    if (next !== DEFAULT_MODE) params.set('mode', next);
    else params.delete('mode');
    setSearchParams(params, { replace: true });
  };

  const service = pricingServices.find((s) => s.id === mode) ?? pricingServices[0];
  const isAI = service.isAI;
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
              className="inline-flex flex-wrap items-center justify-center gap-1 rounded-3xl border border-[#fefefe]/25 bg-[#fefefe]/10 p-1 backdrop-blur-sm"
              role="group"
              aria-label="Switch pricing type"
            >
              {pricingServices.map((svc) => {
                const active = svc.id === mode;
                const Icon = svc.isAI ? Sparkles : Tag;
                return (
                  <button
                    key={svc.id}
                    type="button"
                    onClick={() => switchMode(svc.id)}
                    aria-pressed={active}
                    className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-bold tracking-[0.08em] transition-all duration-300 ${
                      active
                        ? 'bg-[#f59e0b] text-[#16161a] shadow-md'
                        : 'text-[#fefefe]/70 hover:text-[#fefefe]'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {svc.label}
                  </button>
                );
              })}
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
        service={service}
        addOns={addOns}
        badge={isAI ? 'AI Pricing' : undefined}
        subtitle={isAI ? 'Pricing reflects AI assisted production with human creative direction.' : undefined}
        accentBorder={isAI}
        bookCtaHref="/book-call"
        enquiryCtaHref="/contact#enquiry"
      />
    </div>
  );
}

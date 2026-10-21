import PricingContent from '../components/PricingContent';
import { aiPlans, aiAddOns } from '../config/pricing';

export default function AIPricing() {
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
          <h1 className="text-5xl lg:text-7xl font-bold text-[#fefefe] mb-8">
            AI Pricing
          </h1>
          <p className="text-xl lg:text-2xl text-gray-300 max-w-4xl mx-auto mb-12">
            Exceptional creativity. Flexible pricing. Explore our tailored animation and motion design packages, crafted to bring your vision to life without compromising on quality.
          </p>
          <div className="flex flex-wrap justify-center gap-4" data-aos="fade-up" data-aos-delay="200">
            <div className="bg-[#fefefe]/10 backdrop-blur-sm border border-[#fefefe]/20 rounded-full px-4 py-2">
              <span className="text-sm font-medium text-[#fefefe]/90">No Hidden Fees</span>
            </div>
            <div className="bg-[#fefefe]/10 backdrop-blur-sm border border-[#fefefe]/20 rounded-full px-4 py-2">
              <span className="text-sm font-medium text-[#fefefe]/90">Flexible Payment Plans</span>
            </div>
            <div className="bg-[#fefefe]/10 backdrop-blur-sm border border-[#fefefe]/20 rounded-full px-4 py-2">
              <span className="text-sm font-medium text-[#fefefe]/90">100% Satisfaction Guarantee</span>
            </div>
          </div>
        </div>
      </section>

      <PricingContent
        plans={aiPlans}
        addOns={aiAddOns}
        priceFactor={1}
        badge="AI Pricing"
        subtitle="Pricing reflects AI assisted production with human creative direction."
        accentBorder
        bookCtaHref="/book-call"
        enquiryCtaHref="/contact#enquiry"
      />
    </div>
  );
}

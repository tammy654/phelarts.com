import { motion } from 'framer-motion';

const clients = [
  'TechCorp',
  'EcoLife',
  'InnovateTech',
  'Global Finance',
  'Taste Buds',
  'ShopSmart',
  'HealthTech',
  'DesignStudio',
  'Northwind',
  'Lumen',
];

export default function ClientLogos() {
  const row = [...clients, ...clients];

  return (
    <section className="py-16 bg-[#f7f5f1] border-y border-black/[0.06] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 mb-10">
        <p className="text-center text-xs font-semibold tracking-[0.2em] uppercase text-[#6b6b73]">
          Trusted by forward-thinking brands
        </p>
      </div>
      <div className="relative">
        <div className="flex w-max marquee-track">
          {row.map((name, i) => (
            <div key={i} className="flex items-center gap-12 px-6">
              <span className="font-display font-bold text-2xl text-[#16161a]/30 hover:text-[#16161a]/70 transition-colors duration-300 whitespace-nowrap">
                {name}
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#f59e0b]/40" />
            </div>
          ))}
        </div>
        {/* Edge fades */}
        <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#f7f5f1] to-transparent pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#f7f5f1] to-transparent pointer-events-none" />
      </div>
    </section>
  );
}

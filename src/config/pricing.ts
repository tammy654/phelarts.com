// Single source of truth for pricing. The Pricing page, Services page, and
// AI Videos page all read from these values. No hard-coded prices elsewhere.

export interface PlanData {
  name: string;
  usd: number | 'custom';
  ngn: number | 'custom';
  // For Enterprise plans, the "From" price shown before the custom quote.
  fromUsd?: number;
  fromNgn?: number;
  period: string;
  description: string;
  features: string[];
  popular: boolean;
  cta: string;
}

export interface AddOnData {
  name: string;
  description: string;
  unit?: string;
  // For range, percentage, or per-variant priced add-ons, usd/ngn are display strings.
  usd: number | string;
  ngn: number | string;
  // Per-variant add-ons have different standard vs AI prices.
  usdAI?: number | string;
  ngnAI?: number | string;
}

export interface ServiceSummaryData {
  id: string;
  title: string;
  startingUsd: number;
  startingNgn: number;
  timeline: string;
  description: string;
  features: string[];
  href?: string;
}

// STANDARD plans ----------------------------------------------------------

export const standardPlans: PlanData[] = [
  {
    name: 'Starter',
    usd: 450,
    ngn: 675000,
    period: 'per project',
    description:
      'Your first animated project, built for small businesses and startups that need quality content without agency costs.',
    features: [
      'Up to 60 seconds',
      'Motion graphics or simple 2D animation',
      'Script assistance',
      'Storyboard',
      '3 revision rounds',
      '1080p delivery',
      'Basic sound design and licensed music',
      '2 to 3 week turnaround',
    ],
    popular: false,
    cta: 'Start Project',
  },
  {
    name: 'Professional',
    usd: 1200,
    ngn: 1800000,
    period: 'per project',
    description:
      'For established businesses that want animation with the polish to stand out in a crowded market.',
    features: [
      'Up to 120 seconds',
      'Advanced 2D character animation',
      'Complex motion graphics',
      'Professional script',
      'Storyboard and animatic',
      '5 revision rounds',
      '4K delivery',
      'Pro sound design and licensed music',
      '3 social formats (16:9, 9:16, 1:1)',
      'Dedicated project manager',
      '3 to 4 week turnaround',
    ],
    popular: true,
    cta: 'Choose Professional',
  },
  {
    name: 'Enterprise',
    usd: 'custom',
    ngn: 'custom',
    fromUsd: 3000,
    fromNgn: 4500000,
    period: 'quote',
    description:
      'End to end animation production for large organizations, with the scale and coordination complex projects demand.',
    features: [
      'Custom length',
      'Premium 2D and motion graphics',
      'Full brand integration',
      'Revisions unlimited within agreed scope',
      '4K delivery',
      'Original music',
      'Multi language versions',
      'Priority support',
      'Dedicated creative team',
      'Rush available',
      'Scheduled timeline',
    ],
    popular: false,
    cta: 'Get Custom Quote',
  },
];

// AI plans ----------------------------------------------------------------

export const aiPlans: PlanData[] = [
  {
    name: 'Starter',
    usd: 250,
    ngn: 375000,
    period: 'per project',
    description:
      'AI assisted visuals with human creative direction, ideal for fast turnaround content.',
    features: [
      'Up to 60 seconds',
      'AI assisted visuals with human creative direction',
      'AI script draft refined with you',
      'AI voiceover included',
      '2 revision rounds',
      '1080p delivery',
      '3 to 5 working days',
    ],
    popular: false,
    cta: 'Start Project',
  },
  {
    name: 'Professional',
    usd: 650,
    ngn: 975000,
    period: 'per project',
    description:
      'AI generated scenes and characters with human polish, for richer stories at speed.',
    features: [
      'Up to 120 seconds',
      'AI generated scenes and characters with human polish',
      'AI voiceover included (human VO optional add on)',
      '3 revision rounds',
      '4K delivery',
      '3 social formats',
      '5 to 7 working days',
    ],
    popular: true,
    cta: 'Choose Professional',
  },
  {
    name: 'Enterprise',
    usd: 'custom',
    ngn: 'custom',
    fromUsd: 1800,
    fromNgn: 2700000,
    period: 'quote',
    description:
      'Custom length, campaign series, and brand trained style for organizations running AI video at scale.',
    features: [
      'Custom length',
      'Campaign series',
      'Brand trained style',
      'Revisions within agreed scope',
      'Scheduled timeline',
    ],
    popular: false,
    cta: 'Get Custom Quote',
  },
];

// Add-ons (shown on both tabs) --------------------------------------------

export const addOns: AddOnData[] = [
  {
    name: 'Rush Delivery',
    description: 'Get your project completed in half the standard time',
    usd: '+50% of project cost',
    ngn: '+50% of project cost',
  },
  {
    name: 'Additional Revision Round',
    description: 'Extra revision rounds beyond the included amount',
    unit: 'per round',
    usd: 100,
    ngn: 150000,
  },
  {
    name: 'Extended Length',
    description: 'Additional animation time beyond package limits',
    unit: 'per extra 10 seconds',
    usd: 80,
    ngn: 120000,
    usdAI: 40,
    ngnAI: 60000,
  },
  {
    name: 'Human Voice Over',
    description: 'Professional voice over recording and integration',
    unit: 'per language',
    usd: '150 to 400',
    ngn: '225000 to 600000',
  },
  {
    name: 'Original Music',
    description: 'Custom music composition for your animation',
    usd: '300 to 800',
    ngn: '450000 to 1200000',
  },
  {
    name: 'Additional Language Version',
    description: 'Additional language versions of your animation',
    unit: 'per language',
    usd: 200,
    ngn: 300000,
  },
  {
    name: 'Extra Aspect Ratio (Starter only)',
    description: 'Additional aspect ratios beyond the included format',
    unit: 'each',
    usd: 60,
    ngn: 90000,
  },
  {
    name: 'Source Project Files',
    description: 'Editable source files for your project',
    usd: '+25% of project cost',
    ngn: '+25% of project cost',
  },
];

// Services summary (for Services page) -----------------------------------

export const servicesSummary: ServiceSummaryData[] = [
  {
    id: '2d-animation',
    title: '2D Animation',
    startingUsd: 450,
    startingNgn: 675000,
    timeline: '2 to 4 weeks',
    description: 'Character driven stories and explainer videos that engage and educate your audience with compelling narratives.',
    features: ['Character Animation', 'Explainer Videos', 'Educational Content', 'Storyboarding'],
  },
  {
    id: 'motion-graphics',
    title: 'Motion Graphics',
    startingUsd: 450,
    startingNgn: 675000,
    timeline: '1 to 3 weeks',
    description: 'Dynamic visual elements that bring your brand to life with style, sophistication, and memorable impact.',
    features: ['Logo Animation', 'Brand Videos', 'Title Sequences', 'Social Content'],
  },
  {
    id: 'video-production',
    title: 'Video Production',
    startingUsd: 1500,
    startingNgn: 2250000,
    timeline: '3 to 6 weeks',
    description: 'End to end video production from concept development to final delivery with professional quality.',
    features: ['Concept Development', 'Scriptwriting', 'Production', 'Post Production'],
  },
  {
    id: 'ai-videos',
    title: 'AI Videos',
    startingUsd: 250,
    startingNgn: 375000,
    timeline: '3 to 5 days',
    description: 'AI assisted video storytelling with human creative direction, delivered faster.',
    features: ['AI Assisted Visuals', 'AI Voiceover', 'Human Creative Direction', 'Fast Turnaround'],
    href: '/ai-videos',
  },
];

// AI Videos turnaround by package ----------------------------------------

export const aiVideoTurnaround = [
  { name: 'Starter', days: '3 to 5 working days' },
  { name: 'Professional', days: '5 to 7 working days' },
  { name: 'Enterprise', days: 'Scheduled per scope' },
];

// FAQ ---------------------------------------------------------------------

export const pricingFaqs = [
  {
    question: "What's included in the base price?",
    answer:
      'Each package includes concept development, storyboarding, animation production, basic sound design, and the specified number of revision rounds. Delivery is 1080p unless 4K is listed in the package.',
  },
  {
    question: 'How long does a typical project take?',
    answer:
      'Project timelines vary by complexity and package. Starter projects typically take 2 to 3 weeks, Professional projects 3 to 4 weeks, and Enterprise projects are scheduled based on scope. AI projects: Starter 3 to 5 working days, Professional 5 to 7 working days.',
  },
  {
    question: 'Can I make changes during production?',
    answer:
      "Yes! Each package includes revision rounds. Major changes during production may require additional time and cost, which we'll discuss with you before proceeding.",
  },
  {
    question: 'Do you offer payment plans?',
    answer:
      'Yes, we offer flexible payment plans for all projects. We require 70% upfront and the remaining 30% upon completion, and we can work with you on a schedule that fits your needs.',
  },
  {
    question: 'What if I need something not listed in the packages?',
    answer:
      "We love custom projects! If your needs don't fit our standard packages, we'll create a custom quote tailored to your specific requirements. Contact us to discuss your unique project.",
  },
];

// Hero badges -------------------------------------------------------------

export const pricingBadges = ['No Hidden Fees', 'Flexible Payment Plans', 'Clear Revision Rounds'];

// Formatting helpers ------------------------------------------------------

export function formatUsd(value: number | 'custom'): string {
  if (value === 'custom') return 'Custom';
  return `${value.toLocaleString('en-US')}`;
}

export function formatNgn(value: number | 'custom'): string {
  if (value === 'custom') return 'Custom';
  return `₦${value.toLocaleString('en-US')}`;
}

export function formatAddonUsd(addon: AddOnData, isAI: boolean): string {
  const v = isAI && addon.usdAI !== undefined ? addon.usdAI : addon.usd;
  if (typeof v === 'number') return `$${v.toLocaleString('en-US')}`;
  if (typeof v === 'string' && v.includes('%')) return v;
  if (typeof v === 'string') {
    const parts = v.split(' to ').map((p) => `$${parseInt(p.trim(), 10).toLocaleString('en-US')}`);
    return parts.join(' to ');
  }
  return String(v);
}

export function formatAddonNgn(addon: AddOnData, isAI: boolean): string {
  const v = isAI && addon.ngnAI !== undefined ? addon.ngnAI : addon.ngn;
  if (typeof v === 'number') return `₦${v.toLocaleString('en-US')}`;
  if (typeof v === 'string' && v.includes('%')) return v;
  if (typeof v === 'string') {
    const parts = v.split(' to ').map((p) => `₦${parseInt(p.trim(), 10).toLocaleString('en-US')}`);
    return parts.join(' to ');
  }
  return String(v);
}

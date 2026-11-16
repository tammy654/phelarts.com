// Single source of truth for pricing. The Pricing page, Services page, and
// AI Videos page all read from these values. No hard-coded prices elsewhere.

export interface PlanData {
  name: string;
  ngn: number;
  usd: number;
  // Enterprise plans show "From" before the price.
  from?: boolean;
  period: string;
  description?: string;
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

export interface ExtraCharge {
  label: string;
  ngn: number;
  usd: number;
}

export interface PricingService {
  // URL value for /pricing?mode=... ('2d-standard' is the default, no param).
  id: string;
  label: string;
  plans: PlanData[];
  isAI: boolean;
  showAddOns: boolean;
  notes: string[];
  extras: ExtraCharge[];
  policy?: string[];
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

export const turnaroundNote = 'The 48 hours runs from receipt of all footage and assets, or from script approval.';

// 2D ANIMATION (STANDARD) plans --------------------------------------------

export const standardPlans: PlanData[] = [
  {
    name: 'Starter',
    ngn: 250000,
    usd: 190,
    period: 'per project',
    description:
      'Your first animated project, built for small businesses and startups that need quality content without agency costs.',
    features: [
      'Up to 60 seconds',
      'Simple 2D animation',
      'Script assistance',
      'Storyboard',
      '2 revision rounds',
      '1080p delivery',
      'Basic sound design and licensed music',
      'First draft in 48 hours (animatic and a short sample of about 3 seconds)',
      'Final delivery 2 to 4 weeks',
    ],
    popular: false,
    cta: 'Start Project',
  },
  {
    name: 'Professional',
    ngn: 550000,
    usd: 400,
    period: 'per project',
    description:
      'For established businesses that want animation with the polish to stand out in a crowded market.',
    features: [
      'Up to 120 seconds',
      'Advanced 2D character animation',
      'Complex motion graphics',
      'Professional script',
      'Storyboard and animatic',
      '3 revision rounds',
      '4K delivery',
      'Pro sound design and licensed music',
      '3 social formats (16:9, 9:16, 1:1)',
      'Dedicated project manager',
      'First draft in 48 hours (animatic and a short sample of about 3 seconds)',
      'Final delivery 2 to 4 weeks',
    ],
    popular: true,
    cta: 'Choose Professional',
  },
  {
    name: 'Enterprise',
    ngn: 800000,
    usd: 590,
    from: true,
    period: 'quote',
    description:
      'End to end animation production for large organizations, with the scale and coordination complex projects demand.',
    features: [
      'Custom length',
      'Premium 2D and motion graphics',
      'Full brand integration',
      'Revision rounds agreed',
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

// 2D ANIMATION (HIGH END) plans --------------------------------------------

export const highEndPlans: PlanData[] = [
  {
    name: 'Starter',
    ngn: 620000,
    usd: 450,
    period: 'per project',
    description:
      'Premium 2D animation for short, high impact pieces, with richer detail and character work in every frame.',
    features: [
      'Up to 60 seconds',
      '2 revision rounds',
      'First draft in 48 hours (animatic and a short sample of about 3 seconds)',
      'Final delivery 2 to 4 weeks',
    ],
    popular: false,
    cta: 'Start Project',
  },
  {
    name: 'Professional',
    ngn: 900000,
    usd: 660,
    period: 'per project',
    description:
      'Cinematic 2D animation with the craft and polish to make your brand story unforgettable.',
    features: [
      'Up to 120 seconds',
      '3 revision rounds',
      'First draft in 48 hours (animatic and a short sample of about 3 seconds)',
      'Final delivery 2 to 4 weeks',
    ],
    popular: true,
    cta: 'Choose Professional',
  },
  {
    name: 'Enterprise',
    ngn: 1800000,
    usd: 1310,
    from: true,
    period: 'quote',
    description:
      'Large scale, high end 2D animation for organizations that need standout, broadcast ready work.',
    features: ['Custom length', 'Revision rounds agreed'],
    popular: false,
    cta: 'Get Custom Quote',
  },
];

// MOTION GRAPHICS plans ----------------------------------------------------

export const motionGraphicsPlans: PlanData[] = [
  {
    name: 'Starter',
    ngn: 180000,
    usd: 140,
    period: 'per project',
    description:
      'Clean, eye catching motion graphics for social posts, logo reveals and quick brand messages.',
    features: ['Up to 60 seconds', '2 revision rounds', 'First draft in 48 hours', 'Final delivery 72 hours'],
    popular: false,
    cta: 'Start Project',
  },
  {
    name: 'Professional',
    ngn: 350000,
    usd: 260,
    period: 'per project',
    description:
      'Polished motion design for campaigns, product explainers and launches that need to stand out.',
    features: ['Up to 120 seconds', '3 revision rounds', 'First draft in 48 hours', 'Final delivery 72 hours'],
    popular: true,
    cta: 'Choose Professional',
  },
  {
    name: 'Enterprise',
    ngn: 500000,
    usd: 370,
    from: true,
    period: 'quote',
    description:
      'Motion graphics systems and campaign series built around your brand, at any scale.',
    features: ['Custom length', 'Revision rounds agreed'],
    popular: false,
    cta: 'Get Custom Quote',
  },
];

// VIDEO PRODUCTION plans ---------------------------------------------------

export const videoProductionPlans: PlanData[] = [
  {
    name: 'Starter',
    ngn: 300000,
    usd: 220,
    period: 'per project',
    description:
      'A focused one day shoot for brand stories, interviews and promo videos.',
    features: ['1 shoot day', '2 revision rounds', 'First cut 48 hours after the shoot', 'Final delivery 3 to 6 weeks'],
    popular: false,
    cta: 'Start Project',
  },
  {
    name: 'Professional',
    ngn: 600000,
    usd: 440,
    period: 'per project',
    description:
      'A two day production for brand films and adverts that need more scenes and more coverage.',
    features: ['2 shoot days', '3 revision rounds', 'First cut 48 hours after the shoot', 'Final delivery 3 to 6 weeks'],
    popular: true,
    cta: 'Choose Professional',
  },
  {
    name: 'Enterprise',
    ngn: 2000000,
    usd: 1460,
    from: true,
    period: 'quote',
    description:
      'Full scale productions planned around your project, for commercials, campaigns and corporate films.',
    features: ['Shoot days agreed per project', 'Revision rounds agreed'],
    popular: false,
    cta: 'Get Custom Quote',
  },
];

// AI VIDEOS plans ----------------------------------------------------------

export const aiPlans: PlanData[] = [
  {
    name: 'Starter',
    ngn: 375000,
    usd: 280,
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
      'First draft in 48 hours',
      'Final delivery 3 to 5 days',
    ],
    popular: false,
    cta: 'Start Project',
  },
  {
    name: 'Professional',
    ngn: 750000,
    usd: 550,
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
      'First draft in 48 hours',
      'Final delivery 3 to 5 days',
    ],
    popular: true,
    cta: 'Choose Professional',
  },
  {
    name: 'Enterprise',
    ngn: 1800000,
    usd: 1310,
    from: true,
    period: 'quote',
    description:
      'Custom length, campaign series, and brand trained style for organizations running AI video at scale.',
    features: [
      'Custom length',
      'Campaign series',
      'Brand trained style',
      'Revision rounds agreed',
      'Scheduled timeline',
    ],
    popular: false,
    cta: 'Get Custom Quote',
  },
];

export const aiPolicy = [
  'Still frames are approved first, before any video is generated.',
  'Changes that do not need regeneration are free within the included revision rounds.',
  'Regenerated shots included: up to 3 on Starter, up to 6 on Professional.',
];

export const aiExtraShot: ExtraCharge = { label: 'Each extra AI regenerated shot', ngn: 20000, usd: 20 };

// VIDEO EDITING plans ------------------------------------------------------

export const videoEditingPlans: PlanData[] = [
  {
    name: 'Starter',
    ngn: 120000,
    usd: 90,
    period: 'per project',
    description:
      'Turn your raw footage into ready to post social edits and a polished main video.',
    features: [
      '3 social or ad edits (up to 60 seconds each) and a main video up to 3 minutes',
      'Footage you send us: up to 2 hours',
      '2 revision rounds',
      'First cut in 48 hours',
      'Final delivery 3 to 7 days',
    ],
    popular: false,
    cta: 'Start Project',
  },
  {
    name: 'Professional',
    ngn: 350000,
    usd: 260,
    period: 'per project',
    description:
      'More edits and a longer main video for brands publishing content regularly.',
    features: [
      'Up to 5 edits (60 seconds each) and a main video up to 5 minutes',
      'Footage you send us: up to 4 hours',
      '3 revision rounds',
      'First cut in 48 hours',
      'Final delivery 3 to 7 days',
    ],
    popular: true,
    cta: 'Choose Professional',
  },
  {
    name: 'Enterprise',
    ngn: 500000,
    usd: 370,
    from: true,
    period: 'quote',
    description:
      'Long form, multi camera and series editing for organizations with ongoing content needs.',
    features: ['Long form, multi camera or series', 'Revision rounds agreed'],
    popular: false,
    cta: 'Get Custom Quote',
  },
];

// Pricing page tabs, in display order --------------------------------------

export const pricingServices: PricingService[] = [
  { id: '2d-standard', label: '2D Animation (Standard)', plans: standardPlans, isAI: false, showAddOns: true, notes: [turnaroundNote], extras: [] },
  { id: '2d-high-end', label: '2D Animation (High End)', plans: highEndPlans, isAI: false, showAddOns: true, notes: [turnaroundNote], extras: [] },
  { id: 'motion-graphics', label: 'Motion Graphics', plans: motionGraphicsPlans, isAI: false, showAddOns: true, notes: [turnaroundNote], extras: [] },
  { id: 'video-production', label: 'Video Production', plans: videoProductionPlans, isAI: false, showAddOns: false, notes: [turnaroundNote], extras: [] },
  { id: 'ai', label: 'AI Videos', plans: aiPlans, isAI: true, showAddOns: true, notes: [turnaroundNote], extras: [aiExtraShot], policy: aiPolicy },
  {
    id: 'video-editing',
    label: 'Video Editing',
    plans: videoEditingPlans,
    isAI: false,
    showAddOns: false,
    notes: [
      '"Footage you send us" is the raw material you supply for editing, not the length of the finished video.',
      turnaroundNote,
    ],
    extras: [{ label: 'Each extra hour of footage', ngn: 25000, usd: 20 }],
  },
];

// Festive packages ---------------------------------------------------------

export const festivePackages: { name: string; ngn: number; usd: number; from: boolean }[] = [
  { name: 'Festive Promo Ad', ngn: 180000, usd: 140, from: true },
  { name: "Animated Season's Greetings", ngn: 100000, usd: 80, from: false },
  { name: 'Event Coverage + Highlight Edit', ngn: 300000, usd: 220, from: true },
  { name: 'Year in Review Video', ngn: 120000, usd: 90, from: true },
  { name: 'New Year Brand Video', ngn: 600000, usd: 440, from: true },
];

// Terms (shown near the pricing) -------------------------------------------

export const pricingTerms = [
  '70% deposit to book.',
  'Balance due after the watermarked final is sent, unless agreed otherwise. The clean file is released on payment.',
  'FESTIVE: 10% off festive packages booked by 13 December 2026.',
  'LAUNCH: free consult and 10% off your first project, valid until 5 February 2027.',
];

// Add-ons (shown on the animation and AI tabs) --------------------------------------------

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
    startingUsd: 190,
    startingNgn: 250000,
    timeline: '2 to 4 weeks',
    description: 'Character driven stories and explainer videos that engage and educate your audience with compelling narratives.',
    features: ['Character Animation', 'Explainer Videos', 'Educational Content', 'Storyboarding'],
  },
  {
    id: 'motion-graphics',
    title: 'Motion Graphics',
    startingUsd: 140,
    startingNgn: 180000,
    timeline: '72 hours',
    description: 'Dynamic visual elements that bring your brand to life with style, sophistication, and memorable impact.',
    features: ['Logo Animation', 'Brand Videos', 'Title Sequences', 'Social Content'],
  },
  {
    id: 'video-production',
    title: 'Video Production',
    startingUsd: 220,
    startingNgn: 300000,
    timeline: '3 to 6 weeks',
    description: 'End to end video production from concept development to final delivery with professional quality.',
    features: ['Concept Development', 'Scriptwriting', 'Production', 'Post Production'],
  },
  {
    id: 'ai-videos',
    title: 'AI Videos',
    startingUsd: 280,
    startingNgn: 375000,
    timeline: '3 to 5 days',
    description: 'AI assisted video storytelling with human creative direction, delivered faster.',
    features: ['AI Assisted Visuals', 'AI Voiceover', 'Human Creative Direction', 'Fast Turnaround'],
    href: '/ai-videos',
  },
  {
    id: 'video-editing',
    title: 'Video Editing',
    startingUsd: 90,
    startingNgn: 120000,
    timeline: '3 to 7 days',
    description: 'Social or ad edits and a main video, cut from the footage you send us.',
    features: ['Social or Ad Edits', 'Main Video', 'Long Form', 'Multi Camera or Series'],
  },
];

// AI Videos turnaround by package ----------------------------------------

export const aiVideoTurnaround = [
  { name: 'First draft', days: '48 hours' },
  { name: 'Final delivery', days: '3 to 5 days' },
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
      'Project timelines vary by complexity and package. 2D Animation: first draft in 48 hours (animatic and a short sample of about 3 seconds), final delivery 2 to 4 weeks. Motion Graphics: first draft in 48 hours, final delivery 72 hours. Video Production: first cut 48 hours after the shoot, final delivery 3 to 6 weeks. AI Videos: first draft in 48 hours, final delivery 3 to 5 days. Video Editing: first cut in 48 hours, final delivery 3 to 7 days. Enterprise projects are scheduled based on scope. ' +
      turnaroundNote,
  },
  {
    question: 'Can I make changes during production?',
    answer:
      "Yes! Each package includes revision rounds. Major changes during production may require additional time and cost, which we'll discuss with you before proceeding.",
  },
  {
    question: 'Do you offer payment plans?',
    answer:
      'Yes, we offer flexible payment plans for all projects. We require a 70% deposit to book, and the balance is due after the watermarked final is sent, unless agreed otherwise. The clean file is released on payment.',
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

export function formatUsd(value: number): string {
  return `$${value.toLocaleString('en-US')}`;
}

export function formatNgn(value: number): string {
  return `₦${value.toLocaleString('en-US')}`;
}

// "₦250,000 ($190)", or "From ₦800,000 ($590)".
export function formatBoth(ngn: number, usd: number, from = false): string {
  return `${from ? 'From ' : ''}${formatNgn(ngn)} (${formatUsd(usd)})`;
}

function formatAddonValue(v: number | string, symbol: string): string {
  if (typeof v === 'number') return `${symbol}${v.toLocaleString('en-US')}`;
  if (v.includes('%')) return v;
  return v
    .split(' to ')
    .map((p) => `${symbol}${parseInt(p.trim(), 10).toLocaleString('en-US')}`)
    .join(' to ');
}

// Naira first, USD in brackets. Percentage add-ons are the same in both.
export function formatAddon(addon: AddOnData, isAI: boolean): string {
  const ngn = isAI && addon.ngnAI !== undefined ? addon.ngnAI : addon.ngn;
  const usd = isAI && addon.usdAI !== undefined ? addon.usdAI : addon.usd;
  if (typeof ngn === 'string' && ngn.includes('%')) return ngn;
  return `${formatAddonValue(ngn, '₦')} (${formatAddonValue(usd, '$')})`;
}

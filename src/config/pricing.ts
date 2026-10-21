// Single source of truth for pricing. Both the standard Pricing page and the
// AI Pricing page read from these values. The standard page multiplies the AI
// base prices by the standard multiplier (1.10).

export interface PlanData {
  name: string;
  usd: number | 'custom';
  ngn: number | 'custom';
  period: string;
  description: string;
  features: string[];
  popular: boolean;
  cta: string;
}

export interface AddOnData {
  name: string;
  description: string;
  // For range or percentage based add-ons, price is a display string and is not multiplied.
  usd: number | string;
  ngn: number | string;
  multiply: boolean;
}

export const STANDARD_MULTIPLIER = 1.10;

// AI base prices (kept exactly as the original Pricing page values).
export const aiPlans: PlanData[] = [
  {
    name: 'Starter',
    usd: 299.99,
    ngn: 450000,
    period: 'per project',
    description:
      'Your first animated project, built for small businesses and startups that need quality content without agency costs.',
    features: [
      'Up to 60 seconds of animation',
      '2D character animation',
      'Basic motion graphics',
      'Script writing assistance',
      'Storyboard creation',
      '3 rounds of revisions',
      'HD video delivery',
      'Basic sound design',
      '2 to 3 week turnaround',
    ],
    popular: false,
    cta: 'Start Project',
  },
  {
    name: 'Professional',
    usd: 899.99,
    ngn: 1350000,
    period: 'per project',
    description:
      'For established businesses that want animation with the polish to stand out in a crowded market.',
    features: [
      'Up to 120 seconds of animation',
      'Advanced 2D character animation',
      'Complex motion graphics',
      'Professional script writing',
      'Detailed storyboard and animatic',
      'Unlimited revisions',
      '4K video delivery',
      'Professional sound design and music',
      'Social media formats included',
      '3 to 4 week turnaround',
      'Dedicated project manager',
    ],
    popular: true,
    cta: 'Choose Professional',
  },
  {
    name: 'Enterprise',
    usd: 'custom',
    ngn: 'custom',
    period: 'quote',
    description:
      'End to end animation production for large organizations, with the scale and coordination complex projects demand.',
    features: [
      'Unlimited animation length',
      'Premium 2D and motion graphics',
      'Multiple video formats',
      'Complete brand integration',
      'Advanced storyboarding',
      'Unlimited revisions',
      '4K and 8K delivery options',
      'Original music composition',
      'Multi language versions',
      'Priority support',
      'Dedicated creative team',
      'Rush delivery available',
    ],
    popular: false,
    cta: 'Get Custom Quote',
  },
];

export const aiAddOns: AddOnData[] = [
  {
    name: 'Rush Delivery',
    description: 'Get your project completed in half the standard time',
    usd: '+50% of project cost',
    ngn: '+50% of project cost',
    multiply: false,
  },
  {
    name: 'Additional Revisions',
    description: 'Extra revision rounds beyond the included amount',
    usd: 150,
    ngn: 225000,
    multiply: true,
  },
  {
    name: 'Extended Length',
    description: 'Additional animation time beyond package limits',
    usd: 50,
    ngn: 75000,
    multiply: true,
  },
  {
    name: 'Voice Over',
    description: 'Professional voice over recording and integration',
    usd: '300 to 600',
    ngn: '450000 to 900000',
    multiply: true,
  },
  {
    name: 'Original Music',
    description: 'Custom music composition for your animation',
    usd: '500 to 1000',
    ngn: '750000 to 1500000',
    multiply: true,
  },
  {
    name: 'Multi Language',
    description: 'Additional language versions of your animation',
    usd: 170,
    ngn: 255000,
    multiply: true,
  },
];

export const faqs = [
  {
    question: "What's included in the base price?",
    answer:
      'Each package includes concept development, storyboarding, animation production, basic sound design, and the specified number of revision rounds. All deliverables are provided in HD quality unless otherwise specified.',
  },
  {
    question: 'How long does a typical project take?',
    answer:
      'Project timelines vary by complexity and package. Starter projects typically take 2 to 3 weeks, Professional projects 3 to 4 weeks, and Enterprise projects are scheduled based on scope and requirements.',
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

// Formatting helpers -------------------------------------------------------

export function formatUsd(value: number | 'custom'): string {
  if (value === 'custom') return 'Custom';
  const rounded = Math.round(value);
  return `$${rounded.toLocaleString('en-US')}`;
}

export function formatNgn(value: number | 'custom'): string {
  if (value === 'custom') return 'Custom';
  const rounded = Math.round(value);
  return `₦${rounded.toLocaleString('en-US')}`;
}

export function multiplyNumeric(value: number | 'custom', factor: number): number | 'custom' {
  if (value === 'custom') return 'custom';
  return value * factor;
}

function multiplyRangeString(str: string, factor: number, formatter: (n: number) => string): string {
  const parts = str.split(' to ').map((p) => parseFloat(p.trim()));
  if (parts.some((n) => Number.isNaN(n))) return str;
  const multiplied = parts.map((n) => formatter(Math.round(n * factor)));
  return multiplied.join(' to ');
}

export function formatAddonUsd(addon: AddOnData, factor: number): string {
  if (typeof addon.usd === 'number') {
    return formatUsd(factor === 1 ? addon.usd : Math.round(addon.usd * factor));
  }
  // string form: either a percentage note, or a "min to max" range string
  if (addon.usd.includes('%')) return addon.usd;
  if (addon.multiply) return multiplyRangeString(addon.usd, factor, (n) => `$${n.toLocaleString('en-US')}`);
  return addon.usd;
}

export function formatAddonNgn(addon: AddOnData, factor: number): string {
  if (typeof addon.ngn === 'number') {
    return formatNgn(factor === 1 ? addon.ngn : Math.round(addon.ngn * factor));
  }
  if (addon.ngn.includes('%')) return addon.ngn;
  if (addon.multiply) return multiplyRangeString(addon.ngn, factor, (n) => `₦${n.toLocaleString('en-US')}`);
  return addon.ngn;
}

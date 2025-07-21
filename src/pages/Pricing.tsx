import React from 'react';
import { Check, ArrowRight, Star, Zap, Crown } from 'lucide-react';

const Pricing = () => {
  const plans = [
    {
      name: 'Starter',
      icon: Star,
      price: '$2,500',
      period: 'per project',
      description: 'Perfect for small businesses and startups looking to create their first animated content.',
      features: [
        'Up to 60 seconds of animation',
        '2D character animation',
        'Basic motion graphics',
        'Script writing assistance',
        'Storyboard creation',
        '3 rounds of revisions',
        'HD video delivery',
        'Basic sound design',
        '2-3 week turnaround'
      ],
      popular: false,
      cta: 'Start Project'
    },
    {
      name: 'Professional',
      icon: Zap,
      price: '$5,500',
      period: 'per project',
      description: 'Ideal for established businesses wanting high-quality animated content that stands out.',
      features: [
        'Up to 120 seconds of animation',
        'Advanced 2D character animation',
        'Complex motion graphics',
        'Professional script writing',
        'Detailed storyboard & animatic',
        'Unlimited revisions',
        '4K video delivery',
        'Professional sound design & music',
        'Social media formats included',
        '3-4 week turnaround',
        'Dedicated project manager'
      ],
      popular: true,
      cta: 'Most Popular'
    },
    {
      name: 'Enterprise',
      icon: Crown,
      price: 'Custom',
      period: 'quote',
      description: 'Comprehensive animation solutions for large organizations and complex projects.',
      features: [
        'Unlimited animation length',
        'Premium 2D & motion graphics',
        'Multiple video formats',
        'Complete brand integration',
        'Advanced storyboarding',
        'Unlimited revisions',
        '4K & 8K delivery options',
        'Original music composition',
        'Multi-language versions',
        'Priority support',
        'Dedicated creative team',
        'Rush delivery available'
      ],
      popular: false,
      cta: 'Contact Us'
    }
  ];

  const addOns = [
    {
      name: 'Rush Delivery',
      description: 'Get your project completed in half the standard time',
      price: '+50% of project cost'
    },
    {
      name: 'Additional Revisions',
      description: 'Extra revision rounds beyond the included amount',
      price: '$200 per round'
    },
    {
      name: 'Extended Length',
      description: 'Additional animation time beyond package limits',
      price: '$50 per additional second'
    },
    {
      name: 'Voice Over',
      description: 'Professional voice over recording and integration',
      price: '$500 - $1,500'
    },
    {
      name: 'Original Music',
      description: 'Custom music composition for your animation',
      price: '$800 - $2,000'
    },
    {
      name: 'Multi-Language',
      description: 'Additional language versions of your animation',
      price: '$300 per language'
    }
  ];

  const faqs = [
    {
      question: 'What\'s included in the base price?',
      answer: 'Each package includes concept development, storyboarding, animation production, basic sound design, and the specified number of revision rounds. All deliverables are provided in HD quality unless otherwise specified.'
    },
    {
      question: 'How long does a typical project take?',
      answer: 'Project timelines vary by complexity and package. Starter projects typically take 2-3 weeks, Professional projects 3-4 weeks, and Enterprise projects are scheduled based on scope and requirements.'
    },
    {
      question: 'Can I make changes during production?',
      answer: 'Yes! Each package includes revision rounds. Major changes during production may require additional time and cost, which we\'ll discuss with you before proceeding.'
    },
    {
      question: 'Do you offer payment plans?',
      answer: 'Yes, we offer flexible payment plans for all projects. Typically, we require 50% upfront and 50% upon completion, but we can work with you on a schedule that fits your needs.'
    },
    {
      question: 'What if I need something not listed in the packages?',
      answer: 'We love custom projects! If your needs don\'t fit our standard packages, we\'ll create a custom quote tailored to your specific requirements. Contact us to discuss your unique project.'
    }
  ];

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="py-24 bg-gradient-to-br from-[#242424] via-gray-800 to-[#016952]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center" data-aos="fade-up">
          <h1 className="text-5xl lg:text-7xl font-bold text-[#fefefe] mb-8">
            Pricing
          </h1>
          <p className="text-xl lg:text-2xl text-gray-300 max-w-4xl mx-auto mb-12">
            Transparent pricing for exceptional animation services. Choose the package 
            that fits your project needs and budget.
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

      {/* Pricing Plans */}
      <section className="py-24 bg-[#fefefe]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <div
                key={index}
                className={`relative p-8 rounded-3xl transition-all duration-300 ${
                  plan.popular
                    ? 'bg-gradient-to-br from-[#ff9a1d]/5 to-[#016952]/5 border-2 border-[#ff9a1d] shadow-2xl scale-105'
                    : 'bg-gray-50 border border-gray-200 hover:shadow-xl hover:scale-105'
                }`}
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-gradient-to-r from-[#ff9a1d] to-[#016952] text-[#fefefe] px-6 py-2 rounded-full text-sm font-semibold">
                      Most Popular
                    </div>
                  </div>
                )}

                <div className="text-center mb-8">
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 ${
                    plan.popular
                      ? 'bg-gradient-to-br from-[#ff9a1d] to-[#016952]'
                      : 'bg-gray-200'
                  }`}>
                    <plan.icon className={`w-8 h-8 ${plan.popular ? 'text-[#fefefe]' : 'text-gray-600'}`} />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-[#242424] mb-2">{plan.name}</h3>
                  <p className="text-gray-600 mb-6">{plan.description}</p>
                  
                  <div className="mb-6">
                    <span className="text-4xl lg:text-5xl font-bold text-[#242424]">{plan.price}</span>
                    <span className="text-gray-500 ml-2">{plan.period}</span>
                  </div>
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      <Check className="w-5 h-5 text-[#016952] mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href="/book-call"
                  className={`w-full py-4 px-6 rounded-xl font-semibold text-center transition-all duration-300 flex items-center justify-center space-x-2 ${
                    plan.popular
                      ? 'bg-gradient-to-r from-[#ff9a1d] to-[#016952] text-[#fefefe] hover:shadow-xl hover:scale-105'
                      : 'bg-[#242424] text-[#fefefe] hover:bg-gray-800'
                  }`}
                >
                  <span>{plan.cta}</span>
                  <ArrowRight className="w-5 h-5" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Add-ons Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16" data-aos="fade-up">
            <h2 className="text-4xl lg:text-5xl font-bold text-[#242424] mb-6">
              Add-ons & Extras
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Enhance your animation project with these additional services and options.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {addOns.map((addon, index) => (
              <div
                key={index}
                className="p-6 bg-[#fefefe] rounded-2xl border border-gray-200 hover:shadow-lg transition-all duration-300"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <h3 className="text-xl font-bold text-[#242424] mb-3">{addon.name}</h3>
                <p className="text-gray-600 mb-4">{addon.description}</p>
                <div className="text-lg font-semibold text-[#ff9a1d]">{addon.price}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-[#fefefe]">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16" data-aos="fade-up">
            <h2 className="text-4xl lg:text-5xl font-bold text-[#242424] mb-6">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600">
              Common questions about our pricing and services.
            </p>
          </div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-gray-50 rounded-2xl p-8 hover:bg-white hover:shadow-lg transition-all duration-300"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <h3 className="text-xl font-bold text-[#242424] mb-4">{faq.question}</h3>
                <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-[#242424] to-gray-800">
        <div className="max-w-4xl mx-auto text-center px-6 lg:px-8" data-aos="fade-up">
          <h2 className="text-4xl lg:text-5xl font-bold text-[#fefefe] mb-6">
            Ready to get started?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Let's discuss your project and find the perfect package for your needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/book-call"
              className="bg-gradient-to-r from-[#ff9a1d] to-[#016952] text-[#fefefe] px-8 py-4 rounded-full text-lg font-semibold hover:shadow-xl hover:scale-105 transition-all duration-300"
            >
              Book a Call
            </a>
            <a
              href="/contact"
              className="border-2 border-[#fefefe]/30 text-[#fefefe] px-8 py-4 rounded-full text-lg font-semibold hover:bg-[#fefefe]/10 transition-all duration-300"
            >
              Get Custom Quote
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Pricing;
import React, { useState } from 'react';
import { Check, ArrowRight, Star, Zap, Crown, X, Calendar, Send } from 'lucide-react';
import toast from 'react-hot-toast';
import LoadingSpinner from './LoadingSpinner';
import { submitBookingForm, submitContactForm } from '../services/emailService';
import {
  type PlanData,
  type AddOnData,
  pricingFaqs,
  pricingBadges,
  formatUsd,
  formatNgn,
  formatAddonUsd,
  formatAddonNgn,
} from '../config/pricing';

const to24h = (display: string): string => {
  const m = display.trim().match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
  if (!m) return display;
  let h = parseInt(m[1], 10) % 12;
  if (/PM$/i.test(display)) h += 12;
  return `${String(h).padStart(2, '0')}:${m[2]}`;
};

const planIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  Starter: Star,
  Professional: Zap,
  Enterprise: Crown,
};

const projectTypeOptions = ['2D Animation', 'Motion Graphics', 'Video Production', 'AI Videos', 'Other'];

interface PricingContentProps {
  plans: PlanData[];
  addOns: AddOnData[];
  isAI: boolean;
  badge?: string;
  subtitle?: string;
  accentBorder?: boolean;
  bookCtaHref: string;
  enquiryCtaHref: string;
}

export default function PricingContent({
  plans,
  addOns,
  isAI,
  badge,
  subtitle,
  accentBorder,
  bookCtaHref,
  enquiryCtaHref,
}: PricingContentProps) {
  const [currency, setCurrency] = useState<'USD' | 'NGN'>('USD');
  const [activeModal, setActiveModal] = useState<'call' | 'enquiry' | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [callForm, setCallForm] = useState({ name: '', email: '', date: '', time: '', message: '' });
  const [enquiryForm, setEnquiryForm] = useState({ name: '', email: '', projectType: '', budget: '', message: '' });

  const updateCallForm = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setCallForm({ ...callForm, [e.target.name]: e.target.value });
  };

  const updateEnquiryForm = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setEnquiryForm({ ...enquiryForm, [e.target.name]: e.target.value });
  };

  const closeModal = () => {
    if (!isSubmitting) setActiveModal(null);
  };

  const handleCallSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!callForm.name.trim() || !callForm.email.trim() || !callForm.date || !callForm.time) {
      toast.error('Please complete your name, email, date, and time.');
      return;
    }
    setIsSubmitting(true);
    try {
      await submitBookingForm({
        full_name: callForm.name,
        email: callForm.email,
        company: '',
        phone: '',
        project_type: '',
        call_type: 'Video Call',
        preferred_date: callForm.date,
        preferred_time: to24h(callForm.time),
        project_details: callForm.message,
      });
      toast.success("Call request sent! We'll contact you within 24 hours.");
      setCallForm({ name: '', email: '', date: '', time: '', message: '' });
      setActiveModal(null);
    } catch {
      toast.error('Failed to submit your call request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEnquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!enquiryForm.name.trim() || !enquiryForm.email.trim() || !enquiryForm.message.trim()) {
      toast.error('Please complete your name, email, and project details.');
      return;
    }
    setIsSubmitting(true);
    try {
      await submitContactForm({
        full_name: enquiryForm.name,
        email: enquiryForm.email,
        company: '',
        phone: '',
        project_type: enquiryForm.projectType as never,
        project_details: enquiryForm.message,
      });
      toast.success("Enquiry sent! We'll get back to you within 24 hours.");
      setEnquiryForm({ name: '', email: '', projectType: '', budget: '', message: '' });
      setActiveModal(null);
    } catch {
      toast.error('Failed to send your enquiry. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="fixed right-4 top-24 z-40 sm:right-6" role="group" aria-label="Choose pricing currency">
        <div className="flex items-center gap-1 rounded-full border border-[#242424]/10 bg-[#fefefe]/95 p-1 shadow-xl shadow-[#242424]/10 backdrop-blur-md">
          {(['USD', 'NGN'] as const).map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => setCurrency(option)}
              aria-pressed={currency === option}
              className={`rounded-full px-3 py-2 text-xs font-bold tracking-[0.12em] transition-all duration-300 sm:px-4 ${
                currency === option
                  ? 'bg-[#016952] text-[#fefefe] shadow-md shadow-[#016952]/20'
                  : 'text-[#242424]/55 hover:bg-[#242424]/[0.06] hover:text-[#242424]'
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      {/* Pricing Plans */}
      <section className="py-24 bg-[#fefefe]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {badge && (
            <div className="mb-8 flex justify-center" data-aos="fade-up">
              <span className="inline-flex items-center gap-2 rounded-full border border-[#ff9a1d]/40 bg-[#ff9a1d]/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-[#ff9a1d]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#ff9a1d]" />
                {badge}
              </span>
            </div>
          )}
          {subtitle && (
            <p className="mb-12 text-center text-lg text-gray-600 max-w-3xl mx-auto" data-aos="fade-up">
              {subtitle}
            </p>
          )}
          <div className="grid lg:grid-cols-3 gap-8">
            {plans.map((plan, index) => {
              const Icon = planIcons[plan.name] ?? Star;
              const isCustom = plan.usd === 'custom';
              const usdText = isCustom && plan.fromUsd ? `From ${formatUsd(plan.fromUsd)}` : formatUsd(plan.usd);
              const ngnText = isCustom && plan.fromNgn ? `From ${formatNgn(plan.fromNgn)}` : formatNgn(plan.ngn);
              return (
                <div
                  key={index}
                  className={`relative flex flex-col p-8 rounded-3xl transition-all duration-300 ${
                    plan.popular
                      ? 'bg-gradient-to-br from-[#ff9a1d]/5 to-[#016952]/5 border-2 border-[#ff9a1d] shadow-2xl scale-105'
                      : accentBorder
                      ? 'bg-gray-50 border-2 border-[#ff9a1d]/70 hover:shadow-xl hover:scale-105'
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
                      plan.popular ? 'bg-gradient-to-br from-[#ff9a1d] to-[#016952]' : 'bg-gray-200'
                    }`}>
                      <Icon className={`w-8 h-8 ${plan.popular ? 'text-[#fefefe]' : 'text-gray-600'}`} />
                    </div>
                    <h3 className="text-2xl font-bold text-[#242424] mb-2">{plan.name}</h3>
                    <p className="text-gray-600 mb-6">{plan.description}</p>
                    <div className="mb-6 text-center">
                      <span className="block whitespace-nowrap text-[clamp(2rem,7vw,2.75rem)] font-bold leading-none tracking-[-0.04em] text-[#242424]">
                        {currency === 'USD' ? usdText : ngnText}
                      </span>
                      <span className="mt-2 block text-gray-500">{plan.period}</span>
                    </div>
                  </div>

                  <ul className="flex-1 space-y-4 mb-8">
                    {plan.features.map((feature, fi) => (
                      <li key={fi} className="flex items-start">
                        <Check className="w-5 h-5 text-[#016952] mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <button
                    type="button"
                    onClick={() => setActiveModal(plan.name === 'Enterprise' ? 'enquiry' : 'call')}
                    className={`group/cta mt-auto flex w-full items-center justify-between rounded-2xl border px-5 py-3 text-left font-semibold transition-all duration-300 hover:-translate-y-1 ${
                      plan.popular
                        ? 'border-[#f59e0b] bg-[#f59e0b] text-[#242424] shadow-lg shadow-[#f59e0b]/20 hover:bg-[#ffb347] hover:shadow-xl hover:shadow-[#f59e0b]/30'
                        : 'border-[#242424]/15 bg-transparent text-[#242424] hover:border-[#016952] hover:bg-[#016952] hover:text-[#fefefe] hover:shadow-lg hover:shadow-[#016952]/15'
                    }`}
                  >
                    <span>{plan.cta}</span>
                    <span className={`flex h-9 w-9 items-center justify-center rounded-full transition-transform duration-300 group-hover/cta:translate-x-1 ${
                      plan.popular ? 'bg-[#242424] text-[#fefefe]' : 'bg-[#242424]/[0.06] group-hover/cta:bg-[#fefefe]/15'
                    }`}>
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {activeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-[#16161a]/75 p-4 backdrop-blur-sm" role="dialog" aria-modal="true" aria-labelledby="pricing-modal-title">
          <div className="relative my-8 max-h-[calc(100vh-4rem)] w-full max-w-2xl overflow-y-auto rounded-3xl bg-[#f7f5f1] p-6 shadow-2xl sm:p-10">
            <button type="button" onClick={closeModal} aria-label="Close dialog" className="absolute right-5 top-5 rounded-full p-2 text-[#242424]/60 transition-colors hover:bg-[#242424]/10 hover:text-[#242424]"><X className="h-5 w-5" /></button>
            {activeModal === 'call' ? (
              <form onSubmit={handleCallSubmit}>
                <div className="mb-8 pr-8">
                  <span className="eyebrow text-[#016952]">Schedule your call</span>
                  <h2 id="pricing-modal-title" className="mt-3 text-3xl font-bold text-[#242424]">Let’s find the right fit.</h2>
                  <p className="mt-2 text-[#6b6b73]">Book a free 30-minute consultation with our team.</p>
                </div>
                <div className="grid gap-5 sm:grid-cols-2">
                  <input required name="name" value={callForm.name} onChange={updateCallForm} placeholder="Your name *" className="w-full rounded-xl border border-black/[0.08] bg-white px-4 py-3.5 text-[#16161a] outline-none focus:border-[#f59e0b]" />
                  <input required type="email" name="email" value={callForm.email} onChange={updateCallForm} placeholder="Your email *" className="w-full rounded-xl border border-black/[0.08] bg-white px-4 py-3.5 text-[#16161a] outline-none focus:border-[#f59e0b]" />
                  <label className="text-sm font-semibold text-[#242424]">Preferred date<input required type="date" name="date" value={callForm.date} onChange={updateCallForm} className="mt-2 w-full rounded-xl border border-black/[0.08] bg-white px-4 py-3.5 font-normal" /></label>
                  <label className="text-sm font-semibold text-[#242424]">Preferred time<select required name="time" value={callForm.time} onChange={updateCallForm} className="mt-2 w-full rounded-xl border border-black/[0.08] bg-white px-4 py-3.5 font-normal"><option value="">Select time</option>{['9:00 AM', '11:00 AM', '1:00 PM', '3:00 PM', '5:00 PM'].map((time) => <option key={time}>{time}</option>)}</select></label>
                </div>
                <textarea name="message" rows={4} value={callForm.message} onChange={updateCallForm} placeholder="What would you like to discuss?" className="mt-5 w-full resize-none rounded-xl border border-black/[0.08] bg-white px-4 py-3.5 text-[#16161a] outline-none focus:border-[#f59e0b]" />
                <button type="submit" disabled={isSubmitting} className="btn-primary mt-6 w-full disabled:opacity-60">{isSubmitting ? <><LoadingSpinner size="sm" color="#f7f5f1" /><span>Sending...</span></> : <><span>Schedule Your Call</span><Calendar className="h-4 w-4" /></>}</button>
              </form>
            ) : (
              <form onSubmit={handleEnquirySubmit}>
                <div className="mb-8 pr-8">
                  <span className="eyebrow text-[#016952]">Project enquiry</span>
                  <h2 id="pricing-modal-title" className="mt-3 text-3xl font-bold text-[#242424]">Tell us about your project.</h2>
                  <p className="mt-2 text-[#6b6b73]">Share a few details and we’ll prepare a custom quote.</p>
                </div>
                <div className="grid gap-5 sm:grid-cols-2">
                  <input required name="name" value={enquiryForm.name} onChange={updateEnquiryForm} placeholder="Full name *" className="w-full rounded-xl border border-black/[0.08] bg-white px-4 py-3.5 text-[#16161a] outline-none focus:border-[#f59e0b]" />
                  <input required type="email" name="email" value={enquiryForm.email} onChange={updateEnquiryForm} placeholder="Email *" className="w-full rounded-xl border border-black/[0.08] bg-white px-4 py-3.5 text-[#16161a] outline-none focus:border-[#f59e0b]" />
                  <select name="projectType" value={enquiryForm.projectType} onChange={updateEnquiryForm} className="w-full rounded-xl border border-black/[0.08] bg-white px-4 py-3.5 text-[#16161a]"><option value="">Project type</option>{projectTypeOptions.map((type) => <option key={type}>{type}</option>)}</select>
                  <select name="budget" value={enquiryForm.budget} onChange={updateEnquiryForm} className="w-full rounded-xl border border-black/[0.08] bg-white px-4 py-3.5 text-[#16161a]"><option value="">Budget range</option>{['Under $5,000', '$5,000 to $15,000', '$15,000 to $30,000', '$30,000+'].map((budget) => <option key={budget}>{budget}</option>)}</select>
                </div>
                <textarea required name="message" rows={5} value={enquiryForm.message} onChange={updateEnquiryForm} placeholder="Tell us about your project, goals, and timeline *" className="mt-5 w-full resize-none rounded-xl border border-black/[0.08] bg-white px-4 py-3.5 text-[#16161a] outline-none focus:border-[#f59e0b]" />
                <button type="submit" disabled={isSubmitting} className="btn-primary mt-6 w-full disabled:opacity-60">{isSubmitting ? <><LoadingSpinner size="sm" color="#f7f5f1" /><span>Sending...</span></> : <><span>Get Custom Quote</span><Send className="h-4 w-4" /></>}</button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Add-ons Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16" data-aos="fade-up">
            <h2 className="text-4xl lg:text-5xl font-bold text-[#242424] mb-6">
              Add ons and extras
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Enhance your animation project with these additional services and options.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {addOns.map((addon, index) => (
              <div
                key={index}
                className="p-6 bg-[#fefefe] rounded-2xl border border-gray-200 hover:shadow-lg transition-all duration-300"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <h3 className="text-xl font-bold text-[#242424] mb-3">{addon.name}</h3>
                <p className="text-gray-600 mb-4 text-sm">{addon.description}</p>
                <div className="text-lg font-semibold text-[#ff9a1d]">
                  {currency === 'USD' ? formatAddonUsd(addon, isAI) : formatAddonNgn(addon, isAI)}
                  {addon.unit && <span className="text-sm font-normal text-gray-500 ml-1">{addon.unit}</span>}
                </div>
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
            {pricingFaqs.map((faq, index) => (
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
              href={bookCtaHref}
              className="inline-flex items-center justify-center rounded-full bg-[#f59e0b] px-8 py-3 text-lg font-semibold text-[#242424] transition-all duration-300 hover:-translate-y-1 hover:bg-[#ffb347] hover:shadow-lg hover:shadow-[#f59e0b]/25"
            >
              Book a Call
            </a>
            <a
              href={enquiryCtaHref}
              className="border-2 border-[#fefefe]/30 text-[#fefefe] px-8 py-3 rounded-full text-lg font-semibold hover:bg-[#fefefe]/10 transition-all duration-300"
            >
              Get Custom Quote
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

import { useState } from 'react';
import toast from 'react-hot-toast';
import { Mail, Phone, MapPin, Send, Clock, Users, MessageCircle } from 'lucide-react';
import { submitContactForm, ContactData } from '../services/emailService';
import LoadingSpinner from '../components/LoadingSpinner';

const contactMethods = [
  { icon: Mail, title: 'Email us', description: 'We respond within 24 hours', contact: 'hello@phelarts.studio', action: 'mailto:hello@phelarts.studio' },
  { icon: Phone, title: 'Call us', description: 'Speak directly with our team', contact: '+234 (906) 755-6062', action: 'tel:+2349067556062' },
  { icon: MessageCircle, title: 'Live chat', description: 'Quick questions, real-time', contact: 'Available 9AM–6PM WAT', action: '#' },
];

const budgetOptions = ['Under $5,000', '$5,000 – $15,000', '$15,000 – $30,000', '$30,000 – $50,000', '$50,000+'];
const projectTypes = ['2D Animation', 'Motion Graphics', 'Visual Effects', 'Web Animation', 'Video Production', 'App Animations', 'Other'];

const faqs = [
  { question: 'What is your typical project timeline?', answer: 'Timelines vary by complexity, but most projects take 2–6 weeks from concept to completion.' },
  { question: 'Do you offer revisions?', answer: 'Yes, we include unlimited revisions during the concept phase and 3 rounds during production.' },
  { question: 'What file formats do you deliver?', answer: 'We deliver in all major formats including MP4, MOV, GIF, and source files in After Effects.' },
  { question: 'Can you work with tight deadlines?', answer: 'We can accommodate rush projects with additional fees. Contact us to discuss your timeline.' },
];

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '', email: '', company: '', subject: '', budget: '', message: '', projectType: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) return toast.error('Please enter your name');
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) return toast.error('Please enter a valid email');
    if (!formData.message.trim()) return toast.error('Please enter a message');

    const submit = async () => {
      setIsSubmitting(true);
      try {
        await submitContactForm(formData as ContactData);
        toast.success("Message sent! We'll get back to you within 24 hours.");
        setFormData({ name: '', email: '', company: '', subject: '', budget: '', message: '', projectType: '' });
      } catch {
        toast.error('Failed to send message. Please try again.');
      } finally {
        setIsSubmitting(false);
      }
    };
    submit();
  };

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="py-28 bg-[#16161a] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#f59e0b]/15 rounded-full blur-[120px] -translate-y-1/3 translate-x-1/4" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#0f5132]/30 rounded-full blur-[120px] translate-y-1/3 -translate-x-1/4" />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <span className="eyebrow text-[#f59e0b]">Contact</span>
          <h1 className="font-display font-bold text-5xl lg:text-7xl text-[#f7f5f1] mt-5">
            Get in touch.
          </h1>
          <p className="text-xl text-[#f7f5f1]/60 max-w-2xl mx-auto mt-6 leading-relaxed">
            Ready to bring your vision to life? We'd love to hear about your project and explore
            how we can help you achieve your goals.
          </p>
          <div className="flex flex-wrap justify-center gap-3 mt-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.06] border border-white/10">
              <Clock className="w-4 h-4 text-[#f59e0b]" />
              <span className="text-sm text-[#f7f5f1]/80">24h Response</span>
            </div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.06] border border-white/10">
              <Users className="w-4 h-4 text-[#f59e0b]" />
              <span className="text-sm text-[#f7f5f1]/80">Dedicated Project Manager</span>
            </div>
          </div>
        </div>
      </section>

      {/* Contact methods */}
      <section className="py-20 bg-[#f7f5f1]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 grid md:grid-cols-3 gap-6">
          {contactMethods.map((m) => (
            <a
              key={m.title}
              href={m.action}
              className="lift group p-8 rounded-3xl bg-white border border-black/[0.06] text-center"
            >
              <div className="w-14 h-14 rounded-2xl bg-[#16161a] flex items-center justify-center mx-auto mb-5 group-hover:bg-[#f59e0b] transition-colors duration-300">
                <m.icon className="w-6 h-6 text-[#f7f5f1] group-hover:text-[#16161a] transition-colors duration-300" />
              </div>
              <h3 className="font-display font-bold text-lg text-[#16161a] mb-2">{m.title}</h3>
              <p className="text-sm text-[#6b6b73] mb-3">{m.description}</p>
              <div className="text-[#f59e0b] font-semibold text-sm">{m.contact}</div>
            </a>
          ))}
        </div>
      </section>

      {/* Form + info */}
      <section className="py-20 bg-white border-y border-black/[0.06]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 grid lg:grid-cols-5 gap-12">
          {/* Info */}
          <div className="lg:col-span-2 space-y-10">
            <div>
              <h2 className="font-display font-bold text-3xl text-[#16161a] mb-8">Let's start a conversation</h2>
              <div className="space-y-5">
                {[
                  { icon: Mail, label: 'Email us', value: 'hello@phelarts.studio' },
                  { icon: Phone, label: 'Call us', value: '+234 (906) 755-6062' },
                  { icon: MapPin, label: 'Visit us', value: 'Port Harcourt, Nigeria' },
                ].map((c) => (
                  <div key={c.label} className="flex items-start gap-4">
                    <div className="w-11 h-11 rounded-xl bg-[#16161a] flex items-center justify-center flex-shrink-0">
                      <c.icon className="w-5 h-5 text-[#f59e0b]" />
                    </div>
                    <div>
                      <div className="font-semibold text-[#16161a]">{c.label}</div>
                      <div className="text-[#6b6b73]">{c.value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[#f7f5f1] rounded-2xl p-8 border border-black/[0.06]">
              <h3 className="font-display font-bold text-[#16161a] mb-5">Why work with us?</h3>
              <ul className="space-y-3">
                {['Fast turnaround times', 'Unlimited concept revisions', 'Professional quality guaranteed', 'Competitive pricing', 'Dedicated project manager', 'Post-delivery support'].map((item) => (
                  <li key={item} className="flex items-center text-[#3a3a42] text-sm">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#f59e0b] mr-3 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-3">
            <form onSubmit={handleSubmit} className="bg-[#f7f5f1] rounded-3xl p-8 lg:p-10 border border-black/[0.06]">
              <h3 className="font-display font-bold text-2xl text-[#16161a] mb-8">Tell us about your project</h3>

              <div className="grid md:grid-cols-2 gap-5 mb-5">
                <div>
                  <label className="block text-sm font-semibold text-[#16161a] mb-2">Full Name *</label>
                  <input type="text" name="name" required value={formData.name} onChange={handleChange}
                    className="w-full px-4 py-3.5 bg-white border border-black/[0.08] rounded-xl text-[#16161a] placeholder-[#9a9a9a] focus:outline-none focus:border-[#f59e0b] transition-colors"
                    placeholder="Your name" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#16161a] mb-2">Email *</label>
                  <input type="email" name="email" required value={formData.email} onChange={handleChange}
                    className="w-full px-4 py-3.5 bg-white border border-black/[0.08] rounded-xl text-[#16161a] placeholder-[#9a9a9a] focus:outline-none focus:border-[#f59e0b] transition-colors"
                    placeholder="your@email.com" />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-5 mb-5">
                <div>
                  <label className="block text-sm font-semibold text-[#16161a] mb-2">Company</label>
                  <input type="text" name="company" value={formData.company} onChange={handleChange}
                    className="w-full px-4 py-3.5 bg-white border border-black/[0.08] rounded-xl text-[#16161a] placeholder-[#9a9a9a] focus:outline-none focus:border-[#f59e0b] transition-colors"
                    placeholder="Your company" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#16161a] mb-2">Subject</label>
                  <input type="text" name="subject" value={formData.subject} onChange={handleChange}
                    className="w-full px-4 py-3.5 bg-white border border-black/[0.08] rounded-xl text-[#16161a] placeholder-[#9a9a9a] focus:outline-none focus:border-[#f59e0b] transition-colors"
                    placeholder="What's this about?" />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-5 mb-5">
                <div>
                  <label className="block text-sm font-semibold text-[#16161a] mb-2">Project Type</label>
                  <select name="projectType" value={formData.projectType} onChange={handleChange}
                    className="w-full px-4 py-3.5 bg-white border border-black/[0.08] rounded-xl text-[#16161a] focus:outline-none focus:border-[#f59e0b] transition-colors">
                    <option value="">Select type</option>
                    {projectTypes.map((t) => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#16161a] mb-2">Budget</label>
                  <select name="budget" value={formData.budget} onChange={handleChange}
                    className="w-full px-4 py-3.5 bg-white border border-black/[0.08] rounded-xl text-[#16161a] focus:outline-none focus:border-[#f59e0b] transition-colors">
                    <option value="">Select range</option>
                    {budgetOptions.map((b) => <option key={b} value={b}>{b}</option>)}
                  </select>
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-semibold text-[#16161a] mb-2">Project Details *</label>
                <textarea name="message" required rows={5} value={formData.message} onChange={handleChange}
                  className="w-full px-4 py-3.5 bg-white border border-black/[0.08] rounded-xl text-[#16161a] placeholder-[#9a9a9a] focus:outline-none focus:border-[#f59e0b] transition-colors resize-none"
                  placeholder="Tell us about your project, goals, timeline, and any specific requirements..." />
              </div>

              <button type="submit" disabled={isSubmitting}
                className="btn-primary w-full disabled:opacity-60">
                {isSubmitting ? (
                  <><LoadingSpinner size="sm" color="#f7f5f1" /><span>Sending...</span></>
                ) : (
                  <><span>Send Message</span><Send className="w-4 h-4" /></>
                )}
              </button>
              <p className="text-sm text-[#6b6b73] mt-4 text-center">We'll get back to you within 24 hours.</p>
            </form>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-28 bg-[#f7f5f1]">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="eyebrow">FAQ</span>
            <h2 className="font-display font-bold text-4xl lg:text-5xl text-[#16161a] mt-4">
              Frequently asked questions.
            </h2>
          </div>
          <div className="space-y-4">
            {faqs.map((f) => (
              <div key={f.question} className="bg-white rounded-2xl p-7 border border-black/[0.06] lift">
                <h3 className="font-display font-bold text-lg text-[#16161a] mb-3">{f.question}</h3>
                <p className="text-[#6b6b73] leading-relaxed">{f.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

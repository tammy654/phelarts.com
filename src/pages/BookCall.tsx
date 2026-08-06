import { useState } from 'react';
import toast from 'react-hot-toast';
import { Calendar, Clock, Video, Phone, MessageCircle, Check, ArrowRight } from 'lucide-react';
import { submitBookingForm, BookingData } from '../services/emailService';
import LoadingSpinner from '../components/LoadingSpinner';

const timeSlots = ['9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'];

const callTypes = [
  { id: 'video', icon: Video, label: 'Video Call', description: 'Face-to-face via Zoom' },
  { id: 'phone', icon: Phone, label: 'Phone Call', description: 'Traditional phone call' },
  { id: 'chat', icon: MessageCircle, label: 'Chat Session', description: 'Text consultation' },
];

const benefits = [
  'Free 30-minute consultation', 'Project scope discussion', 'Timeline and budget planning',
  'Creative direction guidance', 'No-obligation quote', 'Expert recommendations',
];

const faqs = [
  { question: 'Is the consultation really free?', answer: 'Yes! Our 30-minute consultation is completely free with no strings attached.' },
  { question: 'What should I prepare?', answer: 'Come with a basic idea of your goals, audience, and timeline. Reference materials help too.' },
  { question: 'Will I get a quote on the call?', answer: 'We can provide a rough estimate; detailed quotes are sent within 24 hours after.' },
  { question: 'Can I reschedule?', answer: 'Of course. Email us at least 2 hours before and we will find a new slot.' },
];

export default function BookCall() {
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [callType, setCallType] = useState('video');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', company: '', phone: '', projectType: '', budget: '', message: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const generateDates = () => {
    const dates = [];
    const today = new Date();
    for (let i = 1; i <= 14; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() + i);
      dates.push(d);
    }
    return dates;
  };

  const formatDate = (d: Date) => d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) return toast.error('Please enter your name');
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) return toast.error('Please enter a valid email');
    if (!formData.message.trim()) return toast.error('Please enter a message');
    if (!selectedDate) return toast.error('Please select a preferred date');
    if (!selectedTime) return toast.error('Please select a preferred time');

    const submit = async () => {
      setIsSubmitting(true);
      try {
        await submitBookingForm({ ...formData, selectedDate, selectedTime, callType } as BookingData);
        toast.success("Booking submitted! We'll contact you within 24 hours.");
        setFormData({ name: '', email: '', company: '', phone: '', projectType: '', budget: '', message: '' });
        setSelectedDate('');
        setSelectedTime('');
        setCallType('video');
      } catch {
        toast.error('Failed to submit booking. Please try again.');
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
          <span className="eyebrow text-[#f59e0b]">Book a Call</span>
          <h1 className="font-display font-bold text-5xl lg:text-7xl text-[#f7f5f1] mt-5">
            Schedule a consultation.
          </h1>
          <p className="text-xl text-[#f7f5f1]/60 max-w-2xl mx-auto mt-6 leading-relaxed">
            A free 30-minute call to discuss your project and discover how we can bring your
            vision to life through stunning animation.
          </p>
          <div className="flex flex-wrap justify-center gap-3 mt-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.06] border border-white/10">
              <Clock className="w-4 h-4 text-[#f59e0b]" />
              <span className="text-sm text-[#f7f5f1]/80">30 Minutes Free</span>
            </div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.06] border border-white/10">
              <Calendar className="w-4 h-4 text-[#f59e0b]" />
              <span className="text-sm text-[#f7f5f1]/80">Flexible Scheduling</span>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 bg-[#f7f5f1]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="font-display font-bold text-3xl text-[#16161a]">What you'll get</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {benefits.map((b) => (
              <div key={b} className="flex items-center gap-3 p-4 rounded-2xl bg-white border border-black/[0.06]">
                <div className="w-6 h-6 rounded-full bg-[#f59e0b] flex items-center justify-center flex-shrink-0">
                  <Check className="w-3.5 h-3.5 text-[#16161a]" />
                </div>
                <span className="text-[#16161a] font-medium text-sm">{b}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Booking form */}
      <section className="py-20 bg-white border-y border-black/[0.06]">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <form onSubmit={handleSubmit} className="bg-[#f7f5f1] rounded-3xl p-8 lg:p-12 border border-black/[0.06]">
            <h2 className="font-display font-bold text-3xl text-[#16161a] mb-8 text-center">Schedule Your Call</h2>

            {/* Personal info */}
            <div className="mb-8">
              <h3 className="font-display font-bold text-lg text-[#16161a] mb-5">Your Information</h3>
              <div className="grid md:grid-cols-2 gap-5">
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
                <div>
                  <label className="block text-sm font-semibold text-[#16161a] mb-2">Company</label>
                  <input type="text" name="company" value={formData.company} onChange={handleChange}
                    className="w-full px-4 py-3.5 bg-white border border-black/[0.08] rounded-xl text-[#16161a] placeholder-[#9a9a9a] focus:outline-none focus:border-[#f59e0b] transition-colors"
                    placeholder="Your company" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#16161a] mb-2">Phone</label>
                  <input type="tel" name="phone" value={formData.phone} onChange={handleChange}
                    className="w-full px-4 py-3.5 bg-white border border-black/[0.08] rounded-xl text-[#16161a] placeholder-[#9a9a9a] focus:outline-none focus:border-[#f59e0b] transition-colors"
                    placeholder="+1 (555) 123-4567" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-[#16161a] mb-2">Project Type</label>
                  <select name="projectType" value={formData.projectType} onChange={handleChange}
                    className="w-full px-4 py-3.5 bg-white border border-black/[0.08] rounded-xl text-[#16161a] focus:outline-none focus:border-[#f59e0b] transition-colors">
                    <option value="">Select project type</option>
                    <option value="2d-animation">2D Animation</option>
                    <option value="motion-graphics">Motion Graphics</option>
                    <option value="visual-effects">Visual Effects</option>
                    <option value="web-animation">Web Animation</option>
                    <option value="video-production">Video Production</option>
                    <option value="app-animations">App Animations</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Call type */}
            <div className="mb-8">
              <h3 className="font-display font-bold text-lg text-[#16161a] mb-5">Preferred Call Type</h3>
              <div className="grid md:grid-cols-3 gap-4">
                {callTypes.map((t) => (
                  <button key={t.id} type="button" onClick={() => setCallType(t.id)}
                    className={`p-5 rounded-2xl border-2 transition-all duration-300 text-left ${callType === t.id ? 'border-[#f59e0b] bg-[#f59e0b]/5' : 'border-black/[0.08] hover:border-black/20'}`}>
                    <div className="flex items-center gap-3 mb-2">
                      <t.icon className={`w-5 h-5 ${callType === t.id ? 'text-[#f59e0b]' : 'text-[#6b6b73]'}`} />
                      <span className={`font-semibold ${callType === t.id ? 'text-[#f59e0b]' : 'text-[#16161a]'}`}>{t.label}</span>
                    </div>
                    <p className="text-sm text-[#6b6b73]">{t.description}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Date */}
            <div className="mb-8">
              <h3 className="font-display font-bold text-lg text-[#16161a] mb-5">Select Date</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
                {generateDates().map((d) => {
                  const iso = d.toISOString().split('T')[0];
                  return (
                    <button key={iso} type="button" onClick={() => setSelectedDate(iso)}
                      className={`p-3 rounded-xl border-2 text-center transition-all duration-300 ${selectedDate === iso ? 'border-[#f59e0b] bg-[#f59e0b]/5 text-[#f59e0b]' : 'border-black/[0.08] hover:border-black/20 text-[#16161a]'}`}>
                      <span className="text-xs font-semibold">{formatDate(d)}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Time */}
            <div className="mb-8">
              <h3 className="font-display font-bold text-lg text-[#16161a] mb-5">Select Time (WAT)</h3>
              <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
                {timeSlots.map((t) => (
                  <button key={t} type="button" onClick={() => setSelectedTime(t)}
                    className={`p-3 rounded-xl border-2 text-center transition-all duration-300 ${selectedTime === t ? 'border-[#f59e0b] bg-[#f59e0b]/5 text-[#f59e0b]' : 'border-black/[0.08] hover:border-black/20 text-[#16161a]'}`}>
                    <span className="text-sm font-semibold">{t}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Message */}
            <div className="mb-8">
              <label className="block text-sm font-semibold text-[#16161a] mb-2">Tell us about your project</label>
              <textarea name="message" rows={4} value={formData.message} onChange={handleChange}
                className="w-full px-4 py-3.5 bg-white border border-black/[0.08] rounded-xl text-[#16161a] placeholder-[#9a9a9a] focus:outline-none focus:border-[#f59e0b] transition-colors resize-none"
                placeholder="Brief description of your project, goals, or questions you'd like to discuss..." />
            </div>

            <button type="submit" disabled={!selectedDate || !selectedTime || isSubmitting}
              className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed">
              {isSubmitting ? (
                <><LoadingSpinner size="sm" color="#f7f5f1" /><span>Submitting...</span></>
              ) : (
                <><span>Book Your Call</span><ArrowRight className="w-4 h-4" /></>
              )}
            </button>
            <p className="text-sm text-[#6b6b73] mt-4 text-center">
              You'll receive a confirmation email with call details within 5 minutes.
            </p>
          </form>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-28 bg-[#f7f5f1]">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="eyebrow">FAQ</span>
            <h2 className="font-display font-bold text-4xl lg:text-5xl text-[#16161a] mt-4">
              Call questions, answered.
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

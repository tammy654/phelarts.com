import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { Calendar, Clock, Video, Phone, MessageCircle, Check, ArrowRight } from 'lucide-react';
import { submitBookingForm, BookingData } from '../services/emailService';
import LoadingSpinner from '../components/LoadingSpinner';

const BookCall = () => {
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [callType, setCallType] = useState('video');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    projectType: '',
    budget: '',
    message: '',
  });

  const timeSlots = [
    '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
    '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'
  ];

  const callTypes = [
    { id: 'video', icon: Video, label: 'Video Call', description: 'Face-to-face discussion via Zoom' },
    { id: 'phone', icon: Phone, label: 'Phone Call', description: 'Traditional phone conversation' },
    { id: 'chat', icon: MessageCircle, label: 'Chat Session', description: 'Text-based consultation' },
  ];

  const benefits = [
    'Free 30-minute consultation',
    'Project scope discussion',
    'Timeline and budget planning',
    'Creative direction guidance',
    'No obligation quote',
    'Expert recommendations'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.name.trim()) {
      toast.error('Please enter your name');
      return;
    }
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) {
      toast.error('Please enter a valid email address');
      return;
    }
    if (!formData.message.trim()) {
      toast.error('Please enter a message');
      return;
    }
    if (!selectedDate) {
      toast.error('Please select a preferred date');
      return;
    }
    if (!selectedTime) {
      toast.error('Please select a preferred time');
      return;
    }

    const submitBooking = async () => {
      setIsSubmitting(true);
      try {
        const bookingData: BookingData = {
          ...formData,
          selectedDate,
          selectedTime,
          callType
        };

        await submitBookingForm(bookingData);
        
        toast.success('Booking submitted successfully! We\'ll contact you within 24 hours.');
        
        // Reset form
        setFormData({
          name: '',
          email: '',
          company: '',
          phone: '',
          projectType: '',
          budget: '',
          message: '',
        });
        setSelectedDate('');
        setSelectedTime('');
        setCallType('video');
        
      } catch (error) {
        console.error('Error submitting booking:', error);
        toast.error('Failed to submit booking. Please try again.');
      } finally {
        setIsSubmitting(false);
      }
    };

    submitBooking();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Generate next 14 days for date selection
  const generateDates = () => {
    const dates = [];
    const today = new Date();
    for (let i = 1; i <= 14; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      dates.push(date);
    }
    return dates;
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="py-24 bg-gradient-to-br from-[#242424] via-gray-800 to-[#016952]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center" data-aos="fade-up">
          <h1 className="text-5xl lg:text-7xl font-bold text-[#fefefe] mb-8">
            Book a Call
          </h1>
          <p className="text-xl lg:text-2xl text-gray-300 max-w-4xl mx-auto mb-12">
            Schedule a free consultation to discuss your project and discover how 
            we can bring your vision to life through stunning animation.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <div className="bg-[#fefefe]/10 backdrop-blur-sm border border-[#fefefe]/20 rounded-full px-4 py-2 flex items-center space-x-2">
              <Clock className="w-4 h-4 text-[#ff9a1d]" />
              <span className="text-sm font-medium text-[#fefefe]/90">30 Minutes Free</span>
            </div>
            <div className="bg-[#fefefe]/10 backdrop-blur-sm border border-[#fefefe]/20 rounded-full px-4 py-2 flex items-center space-x-2">
              <Calendar className="w-4 h-4 text-[#ff9a1d]" />
              <span className="text-sm font-medium text-[#fefefe]/90">Flexible Scheduling</span>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-[#fefefe]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8" data-aos="fade-up">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#242424] mb-4">What you'll get</h2>
            <p className="text-gray-600">Everything you need to make an informed decision about your project.</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6" data-aos="fade-up" data-aos-delay="200">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-center space-x-3 p-4 rounded-xl bg-gray-50" data-aos="fade-up" data-aos-delay={index * 50}>
                <div className="w-6 h-6 bg-gradient-to-br from-[#ff9a1d] to-[#016952] rounded-full flex items-center justify-center flex-shrink-0">
                  <Check className="w-4 h-4 text-[#fefefe]" />
                </div>
                <span className="text-[#242424] font-medium">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Booking Form */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 lg:px-8" data-aos="fade-up">
          <form onSubmit={handleSubmit} className="bg-[#fefefe] rounded-3xl p-8 lg:p-12 shadow-lg">
            <h2 className="text-3xl font-bold text-[#242424] mb-8 text-center">Schedule Your Call</h2>
            
            {/* Personal Information */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-[#242424] mb-6">Your Information</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-[#242424] mb-3">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-4 bg-gray-50 border border-gray-200 rounded-xl text-[#242424] placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#ff9a1d] focus:border-transparent transition-all"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-[#242424] mb-3">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-4 bg-gray-50 border border-gray-200 rounded-xl text-[#242424] placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#ff9a1d] focus:border-transparent transition-all"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label htmlFor="company" className="block text-sm font-semibold text-[#242424] mb-3">
                    Company Name
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full px-4 py-4 bg-gray-50 border border-gray-200 rounded-xl text-[#242424] placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#ff9a1d] focus:border-transparent transition-all"
                    placeholder="Your company"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-semibold text-[#242424] mb-3">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-4 bg-gray-50 border border-gray-200 rounded-xl text-[#242424] placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#ff9a1d] focus:border-transparent transition-all"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>

                <div>
                  <label htmlFor="projectType" className="block text-sm font-semibold text-[#242424] mb-3">
                    Project Type
                  </label>
                  <select
                    id="projectType"
                    name="projectType"
                    value={formData.projectType}
                    onChange={handleChange}
                    className="w-full px-4 py-4 bg-gray-50 border border-gray-200 rounded-xl text-[#242424] focus:outline-none focus:ring-2 focus:ring-[#ff9a1d] focus:border-transparent transition-all"
                  >
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

            {/* Call Type Selection */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-[#242424] mb-6">Preferred Call Type</h3>
              <div className="grid md:grid-cols-3 gap-4">
                {callTypes.map((type) => (
                  <button
                    key={type.id}
                    type="button"
                    onClick={() => setCallType(type.id)}
                    className={`p-6 rounded-xl border-2 transition-all duration-300 text-left ${
                      callType === type.id
                        ? 'border-[#ff9a1d] bg-[#ff9a1d]/5'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center space-x-3 mb-3">
                      <type.icon className={`w-6 h-6 ${callType === type.id ? 'text-[#ff9a1d]' : 'text-gray-400'}`} />
                      <span className={`font-semibold ${callType === type.id ? 'text-[#ff9a1d]' : 'text-[#242424]'}`}>
                        {type.label}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">{type.description}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Date Selection */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-[#242424] mb-6">Select Date</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
                {generateDates().map((date, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => setSelectedDate(date.toISOString().split('T')[0])}
                    className={`p-4 rounded-xl border-2 transition-all duration-300 text-center ${
                      selectedDate === date.toISOString().split('T')[0]
                        ? 'border-[#ff9a1d] bg-[#ff9a1d]/5 text-[#ff9a1d]'
                        : 'border-gray-200 hover:border-gray-300 text-[#242424]'
                    }`}
                  >
                    <div className="text-sm font-semibold">{formatDate(date)}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Time Selection */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-[#242424] mb-6">Select Time (PST)</h3>
              <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
                {timeSlots.map((time) => (
                  <button
                    key={time}
                    type="button"
                    onClick={() => setSelectedTime(time)}
                    className={`p-3 rounded-xl border-2 transition-all duration-300 text-center ${
                      selectedTime === time
                        ? 'border-[#ff9a1d] bg-[#ff9a1d]/5 text-[#ff9a1d]'
                        : 'border-gray-200 hover:border-gray-300 text-[#242424]'
                    }`}
                  >
                    <div className="text-sm font-semibold">{time}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Additional Information */}
            <div className="mb-8">
              <label htmlFor="message" className="block text-sm font-semibold text-[#242424] mb-3">
                Tell us about your project (Optional)
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                value={formData.message}
                onChange={handleChange}
                className="w-full px-4 py-4 bg-gray-50 border border-gray-200 rounded-xl text-[#242424] placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#ff9a1d] focus:border-transparent transition-all resize-none"
                placeholder="Brief description of your project, goals, or any specific questions you'd like to discuss..."
              />
            </div>

            <button
              type="submit"
              disabled={!selectedDate || !selectedTime || isSubmitting}
              className="w-full bg-gradient-to-r from-[#ff9a1d] to-[#016952] text-[#fefefe] px-8 py-4 rounded-xl text-lg font-semibold hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-3 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {isSubmitting ? (
                <>
                  <LoadingSpinner size="sm" color="#fefefe" />
                  <span>Submitting...</span>
                </>
              ) : (
                <>
                  <span>Book Your Call</span>
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>

            <p className="text-sm text-gray-500 mt-4 text-center">
              You'll receive a confirmation email with call details within 5 minutes.
            </p>
          </form>
          <Toaster 
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#fefefe',
                color: '#242424',
                border: '1px solid #e5e7eb',
                borderRadius: '12px',
                fontSize: '14px',
                fontWeight: '500',
              },
              success: {
                iconTheme: {
                  primary: '#016952',
                  secondary: '#fefefe',
                },
              },
              error: {
                iconTheme: {
                  primary: '#ef4444',
                  secondary: '#fefefe',
                },
              },
            }}
          />
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-[#fefefe]">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#242424] mb-6">
              Call FAQ
            </h2>
            <p className="text-xl text-gray-600">
              Common questions about our consultation calls.
            </p>
          </div>

          <div className="space-y-6">
            {[
              {
                question: 'Is the consultation really free?',
                answer: 'Yes, absolutely! Our 30-minute consultation is completely free with no strings attached. We want to understand your project and see if we\'re a good fit.'
              },
              {
                question: 'What should I prepare for the call?',
                answer: 'Come with a basic idea of your project goals, target audience, and timeline. If you have reference materials or examples, feel free to share them during the call.'
              },
              {
                question: 'Will I get a quote during the call?',
                answer: 'We can provide a rough estimate during the call, but detailed quotes are typically sent within 24 hours after we\'ve discussed all project requirements.'
              },
              {
                question: 'Can I reschedule if needed?',
                answer: 'Of course! Life happens. Just email us at least 2 hours before your scheduled time and we\'ll help you find a new slot that works.'
              }
            ].map((faq, index) => (
              <div key={index} className="bg-gray-50 rounded-2xl p-8">
                <h3 className="text-xl font-bold text-[#242424] mb-4">{faq.question}</h3>
                <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default BookCall;
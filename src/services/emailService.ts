import { supabase } from '../lib/supabase';

export type ProjectType =
  | '2D Animation'
  | 'Motion Graphics'
  | 'Web Animation'
  | 'Video Production'
  | 'App Animations'
  | 'Other';

export type CallType = 'Video Call' | 'Phone Call' | 'Chat Session';

export interface BookingData {
  full_name: string;
  email: string;
  company?: string;
  phone?: string;
  project_type?: ProjectType | '';
  call_type: CallType;
  preferred_date: string; // YYYY-MM-DD
  preferred_time: string; // HH:MM (24h)
  project_details: string;
}

export interface InquiryData {
  full_name: string;
  email: string;
  company?: string;
  phone?: string;
  project_type?: ProjectType | '';
  call_type?: CallType | '';
  preferred_date?: string; // YYYY-MM-DD
  preferred_time?: string; // HH:MM (24h)
  project_details: string;
}

export interface NewsletterData {
  email: string;
}

const isValidEmail = (email: string): boolean =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const to24h = (display: string): string | null => {
  const m = display.trim().match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
  if (!m) return null;
  let h = parseInt(m[1], 10) % 12;
  if (/PM$/i.test(display)) h += 12;
  return `${String(h).padStart(2, '0')}:${m[2]}`;
};

export const submitBookingForm = async (data: BookingData): Promise<void> => {
  if (!data.full_name?.trim()) throw new Error('Please enter your name');
  if (!data.email?.trim() || !isValidEmail(data.email.trim()))
    throw new Error('Please enter a valid email');
  if (!data.call_type) throw new Error('Please select a call type');
  if (!data.preferred_date) throw new Error('Please select a preferred date');
  if (!data.preferred_time) throw new Error('Please select a preferred time');
  if (!data.project_details?.trim()) throw new Error('Please tell us about your project');

  const { error } = await supabase.from('bookings').insert({
    full_name: data.full_name.trim(),
    email: data.email.trim(),
    company: data.company?.trim() || null,
    phone: data.phone?.trim() || null,
    project_type: data.project_type?.trim() || null,
    call_type: data.call_type,
    preferred_date: data.preferred_date,
    preferred_time: data.preferred_time,
    project_details: data.project_details.trim(),
  });

  if (error) throw new Error('Failed to submit booking. Please try again.');
};

export const submitContactForm = async (data: InquiryData): Promise<void> => {
  if (!data.full_name?.trim()) throw new Error('Please enter your name');
  if (!data.email?.trim() || !isValidEmail(data.email.trim()))
    throw new Error('Please enter a valid email');
  if (!data.project_details?.trim()) throw new Error('Please enter a message');

  const time24 = data.preferred_time ? to24h(data.preferred_time) : null;

  const { error } = await supabase.from('inquiries').insert({
    full_name: data.full_name.trim(),
    email: data.email.trim(),
    company: data.company?.trim() || null,
    phone: data.phone?.trim() || null,
    project_type: data.project_type?.trim() || null,
    call_type: data.call_type?.trim() || null,
    preferred_date: data.preferred_date || null,
    preferred_time: time24,
    project_details: data.project_details.trim(),
  });

  if (error) throw new Error('Failed to send message. Please try again.');
};

export const subscribeToNewsletter = async (data: NewsletterData): Promise<'subscribed' | 'already_subscribed'> => {
  const email = data.email?.trim();
  if (!email || !isValidEmail(email)) throw new Error('Please enter a valid email');

  const { data: result, error } = await supabase.rpc('subscribe_to_newsletter', {
    subscriber_email: email,
  });

  if (error) throw new Error('Could not subscribe. Please try again.');
  return result === 'already_subscribed' ? 'already_subscribed' : 'subscribed';
};

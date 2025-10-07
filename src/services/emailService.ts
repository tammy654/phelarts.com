import emailjs from 'emailjs-com';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../config/firebase';

// EmailJS configuration
const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

export interface BookingData {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  projectType?: string;
  budget?: string;
  message: string;
  selectedDate?: string;
  selectedTime?: string;
  callType?: string;
}

export interface ContactData {
  name: string;
  email: string;
  company?: string;
  subject?: string;
  projectType?: string;
  budget?: string;
  message: string;
}

export interface NewsletterData {
  email: string;
}

// Initialize EmailJS
emailjs.init(EMAILJS_PUBLIC_KEY);

export const submitBookingForm = async (data: BookingData): Promise<void> => {
  try {
    // Store in Firestore
    await addDoc(collection(db, 'bookings'), {
      ...data,
      timestamp: serverTimestamp(),
      status: 'pending'
    });

    // Send email notification
    const emailData = {
      to_email: 'pheldesignstudios@gmail.com',
      from_name: data.name,
      from_email: data.email,
      subject: 'New Booking from Phel Arts Website',
      message: `
        New booking request received:
        
        Name: ${data.name}
        Email: ${data.email}
        Company: ${data.company || 'Not provided'}
        Phone: ${data.phone || 'Not provided'}
        Project Type: ${data.projectType || 'Not specified'}
        Budget: ${data.budget || 'Not specified'}
        Preferred Date: ${data.selectedDate || 'Not specified'}
        Preferred Time: ${data.selectedTime || 'Not specified'}
        Call Type: ${data.callType || 'Not specified'}
        
        Message:
        ${data.message}
      `,
      reply_to: data.email
    };

    await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, emailData);

    // Send confirmation email to user
    const confirmationData = {
      to_email: data.email,
      to_name: data.name,
      from_name: 'Phel Arts',
      from_email: 'pheldesignstudios@gmail.com',
      subject: 'Booking Confirmation - Phel Arts',
      message: `
        Hi ${data.name},
        
        Thank you for booking a call with Phel Arts! We've received your request and will get back to you within 24 hours.
        
        Your booking details:
        - Date: ${data.selectedDate || 'To be confirmed'}
        - Time: ${data.selectedTime || 'To be confirmed'}
        - Call Type: ${data.callType || 'Video call'}
        
        We're excited to discuss your project and explore how we can bring your vision to life.
        
        Best regards,
        The Phel Arts Team
      `,
      reply_to: 'pheldesignstudios@gmail.com'
    };

    await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, confirmationData);

  } catch (error) {
    console.error('Error submitting booking form:', error);
    throw new Error('Failed to submit booking. Please try again.');
  }
};

export const submitContactForm = async (data: ContactData): Promise<void> => {
  try {
    // Store in Firestore
    await addDoc(collection(db, 'contacts'), {
      ...data,
      timestamp: serverTimestamp(),
      status: 'pending'
    });

    // Send email notification
    const emailData = {
      to_email: 'pheldesignstudios@gmail.com',
      from_name: data.name,
      from_email: data.email,
      subject: data.subject || 'New Contact Form Submission - Phel Arts',
      message: `
        New contact form submission:
        
        Name: ${data.name}
        Email: ${data.email}
        Company: ${data.company || 'Not provided'}
        Subject: ${data.subject || 'General Inquiry'}
        Project Type: ${data.projectType || 'Not specified'}
        Budget: ${data.budget || 'Not specified'}
        
        Message:
        ${data.message}
      `,
      reply_to: data.email
    };

    await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, emailData);

    // Send confirmation email to user
    const confirmationData = {
      to_email: data.email,
      to_name: data.name,
      from_name: 'Phel Arts',
      from_email: 'pheldesignstudios@gmail.com',
      subject: 'Message Received - Phel Arts',
      message: `
        Hi ${data.name},
        
        Thank you for contacting Phel Arts! We've received your message and will respond within 24 hours.
        
        Your inquiry: ${data.subject || 'General Inquiry'}
        
        We appreciate your interest in our services and look forward to discussing your project.
        
        Best regards,
        The Phel Arts Team
      `,
      reply_to: 'pheldesignstudios@gmail.com'
    };

    await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, confirmationData);

  } catch (error) {
    console.error('Error submitting contact form:', error);
    throw new Error('Failed to submit message. Please try again.');
  }
};

export const subscribeToNewsletter = async (data: NewsletterData): Promise<void> => {
  try {
    // Store in Firestore
    await addDoc(collection(db, 'newsletter'), {
      ...data,
      timestamp: serverTimestamp(),
      status: 'subscribed'
    });

    // Send welcome email
    const emailData = {
      to_email: data.email,
      to_name: 'Valued Subscriber',
      from_name: 'Phel Arts',
      from_email: 'pheldesignstudios@gmail.com',
      subject: 'Welcome to Phel Arts Newsletter!',
      message: `
        Welcome to the Phel Arts community!
        
        Thank you for subscribing to our newsletter. You'll now receive:
        - Latest animation trends and tips
        - Behind-the-scenes project updates
        - Exclusive offers and early access to new services
        - Industry insights and creative inspiration
        
        We're excited to have you on board!
        
        Best regards,
        The Phel Arts Team
      `,
      reply_to: 'pheldesignstudios@gmail.com'
    };

    await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, emailData);

  } catch (error) {
    console.error('Error subscribing to newsletter:', error);
    throw new Error('Failed to subscribe. Please try again.');
  }
};
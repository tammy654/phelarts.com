import { useEffect, useState } from 'react';
import { ArrowRight, BookOpen, CheckCircle2, LogOut, Mail, RefreshCw, ShieldCheck, Users } from 'lucide-react';
import type { Session } from '@supabase/supabase-js';
import toast from 'react-hot-toast';
import { supabase } from '../config/supabase';

type Booking = {
  id: string;
  name: string;
  email: string;
  company: string | null;
  project_type: string | null;
  budget: string | null;
  selected_date: string | null;
  selected_time: string | null;
  call_type: string | null;
  message: string;
  status: string | null;
  created_at: string;
};

type Contact = {
  id: string;
  name: string;
  email: string;
  company: string | null;
  subject: string | null;
  project_type: string | null;
  budget: string | null;
  message: string;
  status: string | null;
  created_at: string;
};

type Subscriber = {
  id: string;
  email: string;
  status: string | null;
  created_at: string;
};

type Records = {
  bookings: Booking[];
  contacts: Contact[];
  subscribers: Subscriber[];
};

const adminEmail = 'phelarts@gmail.com';

const emptyRecords: Records = { bookings: [], contacts: [], subscribers: [] };

function formatDate(value: string) {
  return new Intl.DateTimeFormat('en', { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(value));
}

function StatCard({ icon: Icon, label, value }: { icon: typeof Mail; label: string; value: number }) {
  return (
    <div className="rounded-2xl border border-black/[0.06] bg-white p-5 shadow-sm">
      <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-xl bg-[#16161a] text-[#f59e0b]">
        <Icon className="h-5 w-5" />
      </div>
      <div className="text-3xl font-bold text-[#16161a]">{value}</div>
      <div className="mt-1 text-sm text-[#6b6b73]">{label}</div>
    </div>
  );
}

function AdminLogin({ onSignedIn }: { onSignedIn: (session: Session) => void }) {
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);

    const { data, error } = await supabase.auth.signInWithPassword({ email: adminEmail, password });

    if (error || !data.session) {
      toast.error('The admin login details could not be verified.');
      setIsSubmitting(false);
      return;
    }

    onSignedIn(data.session);
    setIsSubmitting(false);
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#16161a] px-6 py-12">
      <div className="w-full max-w-md rounded-[2rem] border border-white/10 bg-[#222228] p-8 shadow-2xl sm:p-10">
        <div className="mb-10 flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#f59e0b] text-[#16161a]">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#f59e0b]">Phel Arts</p>
            <p className="mt-1 text-sm text-[#f7f5f1]/55">Private studio access</p>
          </div>
        </div>
        <h1 className="font-display text-4xl font-bold text-[#f7f5f1]">Welcome back.</h1>
        <p className="mt-3 leading-relaxed text-[#f7f5f1]/60">Sign in to review your bookings, inquiries, and newsletter audience.</p>
        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <div>
            <label className="mb-2 block text-sm font-semibold text-[#f7f5f1]" htmlFor="admin-username">Username</label>
            <input
              id="admin-username"
              type="text"
              value="admin"
              readOnly
              className="w-full rounded-xl border border-white/10 bg-white/[0.06] px-4 py-3.5 text-[#f7f5f1]/75 outline-none"
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-semibold text-[#f7f5f1]" htmlFor="admin-password">Password</label>
            <input
              id="admin-password"
              type="password"
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="w-full rounded-xl border border-white/10 bg-white/[0.06] px-4 py-3.5 text-[#f7f5f1] outline-none transition focus:border-[#f59e0b]"
              placeholder="Enter your password"
            />
          </div>
          <button type="submit" disabled={isSubmitting} className="btn-light w-full disabled:cursor-not-allowed disabled:opacity-60">
            {isSubmitting ? 'Checking access...' : 'Enter dashboard'}
            {!isSubmitting && <ArrowRight className="h-4 w-4" />}
          </button>
        </form>
      </div>
    </main>
  );
}

function AdminDashboard({ session }: { session: Session }) {
  const [records, setRecords] = useState<Records>(emptyRecords);
  const [isLoading, setIsLoading] = useState(true);
  const [isSigningOut, setIsSigningOut] = useState(false);

  const loadRecords = async () => {
    setIsLoading(true);
    const [bookingsResult, contactsResult, newsletterResult] = await Promise.all([
      supabase.from('bookings').select('*').order('created_at', { ascending: false }),
      supabase.from('contacts').select('*').order('created_at', { ascending: false }),
      supabase.from('newsletter').select('*').order('created_at', { ascending: false }),
    ]);

    if (bookingsResult.error || contactsResult.error || newsletterResult.error) {
      console.error('Admin records could not be loaded', bookingsResult.error || contactsResult.error || newsletterResult.error);
      toast.error('We could not load your website records.');
      setIsLoading(false);
      return;
    }

    setRecords({
      bookings: (bookingsResult.data || []) as Booking[],
      contacts: (contactsResult.data || []) as Contact[],
      subscribers: (newsletterResult.data || []) as Subscriber[],
    });
    setIsLoading(false);
  };

  useEffect(() => {
    void loadRecords();
  }, []);

  const handleSignOut = async () => {
    setIsSigningOut(true);
    await supabase.auth.signOut();
    setIsSigningOut(false);
  };

  return (
    <main className="min-h-screen bg-[#f7f5f1]">
      <header className="border-b border-black/[0.06] bg-[#16161a] text-[#f7f5f1]">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-5 lg:px-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#f59e0b]">Phel Arts admin</p>
            <h1 className="mt-2 font-display text-2xl font-bold">Studio overview</h1>
          </div>
          <div className="flex items-center gap-3">
            <button type="button" onClick={() => void loadRecords()} className="rounded-full border border-white/15 p-3 text-[#f7f5f1]/80 transition hover:border-[#f59e0b] hover:text-[#f59e0b]" aria-label="Refresh records">
              <RefreshCw className="h-4 w-4" />
            </button>
            <button type="button" onClick={() => void handleSignOut()} disabled={isSigningOut} className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2.5 text-sm font-semibold text-[#f7f5f1] transition hover:border-[#f59e0b] hover:text-[#f59e0b]">
              <LogOut className="h-4 w-4" />
              Sign out
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-6 py-10 lg:px-8 lg:py-14">
        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm text-[#6b6b73]">Signed in as {session.user.email}</p>
            <h2 className="mt-2 font-display text-3xl font-bold text-[#16161a]">Your website records</h2>
          </div>
          <div className="inline-flex items-center gap-2 text-sm font-medium text-[#0f5132]"><CheckCircle2 className="h-4 w-4" /> Private and protected</div>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <StatCard icon={BookOpen} label="Bookings" value={records.bookings.length} />
          <StatCard icon={Mail} label="Contact inquiries" value={records.contacts.length} />
          <StatCard icon={Users} label="Newsletter subscribers" value={records.subscribers.length} />
        </div>

        {isLoading ? (
          <div className="mt-8 rounded-3xl border border-black/[0.06] bg-white p-10 text-center text-[#6b6b73]">Loading your records...</div>
        ) : (
          <div className="mt-8 space-y-8">
            <section className="overflow-hidden rounded-3xl border border-black/[0.06] bg-white">
              <div className="border-b border-black/[0.06] px-6 py-5"><h3 className="font-display text-xl font-bold text-[#16161a]">Bookings</h3></div>
              <div className="overflow-x-auto"><table className="w-full min-w-[760px] text-left text-sm"><thead className="bg-[#f7f5f1] text-[#6b6b73]"><tr><th className="px-6 py-4 font-semibold">Client</th><th className="px-6 py-4 font-semibold">Call</th><th className="px-6 py-4 font-semibold">Date requested</th><th className="px-6 py-4 font-semibold">Received</th></tr></thead><tbody className="divide-y divide-black/[0.06]">{records.bookings.length === 0 ? <tr><td colSpan={4} className="px-6 py-8 text-center text-[#6b6b73]">No bookings yet.</td></tr> : records.bookings.map((booking) => <tr key={booking.id} className="align-top"><td className="px-6 py-5"><div className="font-semibold text-[#16161a]">{booking.name}</div><div className="mt-1 text-[#6b6b73]">{booking.email}</div>{booking.company && <div className="mt-1 text-xs text-[#9a9a9a]">{booking.company}</div>}</td><td className="px-6 py-5 text-[#3a3a42]">{booking.call_type || 'Video'}<div className="mt-1 text-xs text-[#6b6b73]">{booking.project_type || 'General inquiry'}</div></td><td className="px-6 py-5 text-[#3a3a42]">{booking.selected_date || 'To be confirmed'}<div className="mt-1 text-xs text-[#6b6b73]">{booking.selected_time || ''}</div></td><td className="px-6 py-5 text-[#6b6b73]">{formatDate(booking.created_at)}</td></tr>)}</tbody></table></div>
            </section>

            <section className="overflow-hidden rounded-3xl border border-black/[0.06] bg-white">
              <div className="border-b border-black/[0.06] px-6 py-5"><h3 className="font-display text-xl font-bold text-[#16161a]">Contact inquiries</h3></div>
              <div className="overflow-x-auto"><table className="w-full min-w-[760px] text-left text-sm"><thead className="bg-[#f7f5f1] text-[#6b6b73]"><tr><th className="px-6 py-4 font-semibold">From</th><th className="px-6 py-4 font-semibold">Subject</th><th className="px-6 py-4 font-semibold">Message</th><th className="px-6 py-4 font-semibold">Received</th></tr></thead><tbody className="divide-y divide-black/[0.06]">{records.contacts.length === 0 ? <tr><td colSpan={4} className="px-6 py-8 text-center text-[#6b6b73]">No contact inquiries yet.</td></tr> : records.contacts.map((contact) => <tr key={contact.id} className="align-top"><td className="px-6 py-5"><div className="font-semibold text-[#16161a]">{contact.name}</div><div className="mt-1 text-[#6b6b73]">{contact.email}</div></td><td className="px-6 py-5 text-[#3a3a42]">{contact.subject || 'General Inquiry'}</td><td className="max-w-md px-6 py-5 text-[#6b6b73]">{contact.message}</td><td className="px-6 py-5 text-[#6b6b73]">{formatDate(contact.created_at)}</td></tr>)}</tbody></table></div>
            </section>

            <section className="overflow-hidden rounded-3xl border border-black/[0.06] bg-white">
              <div className="border-b border-black/[0.06] px-6 py-5"><h3 className="font-display text-xl font-bold text-[#16161a]">Newsletter subscribers</h3></div>
              <div className="overflow-x-auto"><table className="w-full min-w-[520px] text-left text-sm"><thead className="bg-[#f7f5f1] text-[#6b6b73]"><tr><th className="px-6 py-4 font-semibold">Email</th><th className="px-6 py-4 font-semibold">Status</th><th className="px-6 py-4 font-semibold">Subscribed</th></tr></thead><tbody className="divide-y divide-black/[0.06]">{records.subscribers.length === 0 ? <tr><td colSpan={3} className="px-6 py-8 text-center text-[#6b6b73]">No subscribers yet.</td></tr> : records.subscribers.map((subscriber) => <tr key={subscriber.id}><td className="px-6 py-5 font-medium text-[#16161a]">{subscriber.email}</td><td className="px-6 py-5"><span className="rounded-full bg-[#e7f3ec] px-3 py-1 text-xs font-semibold capitalize text-[#0f5132]">{subscriber.status || 'subscribed'}</span></td><td className="px-6 py-5 text-[#6b6b73]">{formatDate(subscriber.created_at)}</td></tr>)}</tbody></table></div>
            </section>
          </div>
        )}
      </div>
    </main>
  );
}

export default function Admin() {
  const [session, setSession] = useState<Session | null>(null);
  const [isCheckingSession, setIsCheckingSession] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const loadSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (isMounted) {
        setSession(data.session);
        setIsCheckingSession(false);
      }
    };

    void loadSession();
    const { data: listener } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      if (isMounted) setSession(nextSession);
    });

    return () => {
      isMounted = false;
      listener.subscription.unsubscribe();
    };
  }, []);

  if (isCheckingSession) return <main className="flex min-h-screen items-center justify-center bg-[#16161a] text-[#f7f5f1]">Checking access...</main>;
  if (!session) return <AdminLogin onSignedIn={setSession} />;
  return <AdminDashboard session={session} />;
}

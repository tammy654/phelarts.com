import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Lock, Mail, ArrowRight } from 'lucide-react';
import { supabase } from '../../config/supabase';
import LoadingSpinner from '../../components/LoadingSpinner';

const ADMIN_EMAIL = 'phelarts@gmail.com';

export default function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [linkSent, setLinkSent] = useState(false);

  useEffect(() => {
    let mounted = true;
    (async () => {
      const { data } = await supabase.auth.getSession();
      if (!mounted) return;
      if (data.session) {
        const sessionEmail = data.session.user.email?.toLowerCase();
        if (sessionEmail === ADMIN_EMAIL) {
          navigate('/admin', { replace: true });
        } else {
          await supabase.auth.signOut();
          toast.error('This account does not have admin access.');
        }
      }
    })();
    return () => { mounted = false; };
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return toast.error('Enter your email');
    if (email.trim().toLowerCase() !== ADMIN_EMAIL) {
      toast.error('This account does not have admin access.');
      return;
    }
    setIsSubmitting(true);
    try {
      const { error } = await supabase.auth.signInWithOtp({
        email: email.trim(),
        options: {
          emailRedirectTo: `${window.location.origin}/admin`,
        },
      });
      if (error) throw error;
      setLinkSent(true);
      toast.success('Check your email for the sign-in link.');
    } catch {
      toast.error('Could not send sign-in link. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#16161a] px-6 py-12">
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#f59e0b]/15 rounded-full blur-[120px] -translate-y-1/3 translate-x-1/4" />
      <div className="relative w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[#f59e0b] mb-5">
            <Lock className="w-6 h-6 text-[#16161a]" />
          </div>
          <h1 className="font-display font-bold text-3xl text-[#f7f5f1]">Admin Sign In</h1>
          <p className="text-[#f7f5f1]/55 mt-2 text-sm">Sign in to manage submissions.</p>
        </div>

        {linkSent ? (
          <div className="bg-white/[0.04] border border-white/10 rounded-3xl p-8 backdrop-blur-xl text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#f59e0b]/15 mb-4">
              <Mail className="w-5 h-5 text-[#f59e0b]" />
            </div>
            <p className="text-[#f7f5f1] font-semibold mb-2">Check your email</p>
            <p className="text-[#f7f5f1]/55 text-sm">
              We sent a sign-in link to <span className="text-[#f7f5f1]">{email.trim()}</span>.
              Click the link to access the dashboard.
            </p>
            <button
              onClick={() => { setLinkSent(false); setEmail(''); }}
              className="mt-6 text-sm text-[#f59e0b] font-medium hover:underline"
            >
              Use a different email
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-white/[0.04] border border-white/10 rounded-3xl p-8 backdrop-blur-xl space-y-5">
            <div>
              <label className="block text-sm font-semibold text-[#f7f5f1] mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#f7f5f1]/40" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-white/[0.06] border border-white/10 text-[#f7f5f1] placeholder-[#f7f5f1]/35 focus:outline-none focus:border-[#f59e0b] transition-colors"
                />
              </div>
            </div>

            <button type="submit" disabled={isSubmitting} className="btn-primary w-full disabled:opacity-60">
              {isSubmitting ? (
                <><LoadingSpinner size="sm" color="#f7f5f1" /><span>Sending link...</span></>
              ) : (
                <><span>Send Sign-In Link</span><ArrowRight className="w-4 h-4" /></>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Lock, Mail, ArrowRight, KeyRound } from 'lucide-react';
import { supabase } from '../../config/supabase';
import LoadingSpinner from '../../components/LoadingSpinner';

export const ADMIN_EMAIL = 'phelarts@gmail.com';
// Old local flag from the previous login system; removed on sign-in/out.
const LEGACY_SESSION_KEY = 'phelarts_admin_session';

type AdminRole = 'super' | 'manager';
interface AdminSession {
  email: string;
  role: AdminRole;
}

// The admin is whoever is signed in to Supabase Auth as ADMIN_EMAIL.
// Database access is enforced by Supabase row level security, not by this check.
export async function getAdminSession(): Promise<AdminSession | null> {
  try {
    const { data } = await supabase.auth.getSession();
    const email = data.session?.user.email?.toLowerCase();
    if (email !== ADMIN_EMAIL) return null;
    return { email, role: 'super' };
  } catch {
    return null;
  }
}

export async function clearAdminSession() {
  try {
    localStorage.removeItem(LEGACY_SESSION_KEY);
  } catch {
    // ignore
  }
  try {
    await supabase.auth.signOut();
  } catch {
    // ignore
  }
}

export default function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    getAdminSession().then((session) => {
      if (session) navigate('/admin', { replace: true });
    });
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return toast.error('Enter your email');
    if (!password) return toast.error('Enter your password');

    setIsSubmitting(true);
    const normalizedEmail = email.trim().toLowerCase();

    try {
      if (normalizedEmail !== ADMIN_EMAIL) {
        toast.error('Invalid email or password.');
        return;
      }
      const { error } = await supabase.auth.signInWithPassword({
        email: normalizedEmail,
        password,
      });
      if (error) {
        console.error('Admin sign-in failed:', error);
        toast.error('Invalid email or password.');
        return;
      }
      try {
        localStorage.removeItem(LEGACY_SESSION_KEY);
      } catch {
        // ignore
      }
      toast.success('Welcome back');
      navigate('/admin', { replace: true });
    } catch {
      toast.error('Could not sign in. Please try again.');
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

          <div>
            <label className="block text-sm font-semibold text-[#f7f5f1] mb-2">Password</label>
            <div className="relative">
              <KeyRound className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#f7f5f1]/40" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-white/[0.06] border border-white/10 text-[#f7f5f1] placeholder-[#f7f5f1]/35 focus:outline-none focus:border-[#f59e0b] transition-colors"
              />
            </div>
          </div>

          <button type="submit" disabled={isSubmitting} className="btn-primary w-full disabled:opacity-60">
            {isSubmitting ? (
              <><LoadingSpinner size="sm" color="#f7f5f1" /><span>Signing in...</span></>
            ) : (
              <><span>Sign In</span><ArrowRight className="w-4 h-4" /></>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

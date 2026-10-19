import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Lock, Mail, ArrowRight, KeyRound } from 'lucide-react';
import LoadingSpinner from '../../components/LoadingSpinner';
import { supabase } from '../../lib/supabase';

export const SUPER_ADMIN_EMAIL = 'phelarts@gmail.com';

export type AdminRole = 'super' | 'manager';

export interface AdminUser {
  id: string;
  email: string;
  role: AdminRole;
}

export function roleFromEmail(email: string | undefined | null): AdminRole {
  return email && email.toLowerCase() === SUPER_ADMIN_EMAIL ? 'super' : 'manager';
}

export async function getCurrentAdmin(): Promise<AdminUser | null> {
  const { data, error } = await supabase.auth.getUser();
  if (error || !data.user) return null;
  const email = data.user.email ?? '';
  return { id: data.user.id, email, role: roleFromEmail(email) };
}

export default function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    let mounted = true;
    (async () => {
      const admin = await getCurrentAdmin();
      if (!mounted) return;
      if (admin) navigate('/admin', { replace: true });
    })();
    return () => { mounted = false; };
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password) {
      toast.error('Please enter your email and password.');
      return;
    }

    setIsSubmitting(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
      if (error) {
        console.error('Supabase sign-in error:', error);
        toast.error('Invalid email or password.');
        return;
      }
      if (!data.user) throw new Error('No user returned');
      const role = roleFromEmail(data.user.email);
      toast.success(role === 'super' ? 'Welcome back, Super Admin' : 'Welcome back');
      navigate('/admin', { replace: true });
    } catch (err) {
      console.error('Admin login failed:', err);
      toast.error('Invalid email or password.');
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

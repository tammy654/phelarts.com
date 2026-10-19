import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { LogOut, Search, Download, Calendar, Inbox, Mail } from 'lucide-react';
import { supabase } from '../../config/supabase';
import LoadingSpinner from '../../components/LoadingSpinner';

type TabKey = 'bookings' | 'inquiries' | 'newsletter';

interface LeadRow {
  id: string;
  full_name?: string;
  email: string;
  company?: string | null;
  phone?: string | null;
  project_type?: string | null;
  call_type?: string | null;
  preferred_date?: string | null;
  preferred_time?: string | null;
  project_details?: string | null;
  created_at: string;
}

interface NewsletterRow {
  id: string;
  email: string;
  created_at: string;
}

const TABS: { key: TabKey; label: string; icon: typeof Calendar }[] = [
  { key: 'bookings', label: 'Bookings', icon: Calendar },
  { key: 'inquiries', label: 'Inquiries', icon: Inbox },
  { key: 'newsletter', label: 'Newsletter Subscribers', icon: Mail },
];

const fmtDate = (iso: string) => new Date(iso).toLocaleString('en-US', {
  year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit',
});

const exportCsv = (filename: string, rows: Record<string, unknown>[], columns: { key: string; label: string }[]) => {
  const escape = (val: unknown) => {
    const s = val == null ? '' : String(val);
    return `"${s.replace(/"/g, '""')}"`;
  };
  const header = columns.map((c) => escape(c.label)).join(',');
  const body = rows.map((r) => columns.map((c) => escape(r[c.key])).join(',')).join('\n');
  const csv = `${header}\n${body}`;
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
};

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [ready, setReady] = useState(false);
  const [activeTab, setActiveTab] = useState<TabKey>('bookings');
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [bookings, setBookings] = useState<LeadRow[]>([]);
  const [inquiries, setInquiries] = useState<LeadRow[]>([]);
  const [subscribers, setSubscribers] = useState<NewsletterRow[]>([]);

  useEffect(() => {
    let mounted = true;
    (async () => {
      const { data } = await supabase.auth.getSession();
      if (!mounted) return;
      if (!data.session) {
        navigate('/admin/login', { replace: true });
        return;
      }
      if (data.session.user.email?.toLowerCase() !== 'phelarts@gmail.com') {
        await supabase.auth.signOut();
        toast.error('This account does not have admin access.');
        navigate('/admin/login', { replace: true });
        return;
      }
      setReady(true);
    })();
    return () => { mounted = false; };
  }, [navigate]);

  useEffect(() => {
    if (!ready) return;
    let mounted = true;
    (async () => {
      setLoading(true);
      try {
        if (activeTab === 'bookings') {
          const { data, error } = await supabase
            .from('bookings')
            .select('*')
            .order('created_at', { ascending: false });
          if (error) throw error;
          if (mounted) setBookings((data as LeadRow[]) ?? []);
        } else if (activeTab === 'inquiries') {
          const { data, error } = await supabase
            .from('inquiries')
            .select('*')
            .order('created_at', { ascending: false });
          if (error) throw error;
          if (mounted) setInquiries((data as LeadRow[]) ?? []);
        } else {
          const { data, error } = await supabase
            .from('newsletter_subscribers')
            .select('*')
            .order('created_at', { ascending: false });
          if (error) throw error;
          if (mounted) setSubscribers((data as NewsletterRow[]) ?? []);
        }
      } catch {
        toast.error('Could not load submissions.');
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, [activeTab, ready]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/admin/login', { replace: true });
  };

  const filteredRows = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (activeTab === 'newsletter') {
      const rows = subscribers;
      if (!q) return rows;
      return rows.filter((r) => r.email.toLowerCase().includes(q));
    }
    const rows = activeTab === 'bookings' ? bookings : inquiries;
    if (!q) return rows;
    return rows.filter((r) =>
      (r.full_name ?? '').toLowerCase().includes(q) ||
      r.email.toLowerCase().includes(q),
    );
  }, [activeTab, query, bookings, inquiries, subscribers]);

  const leadColumns = [
    { key: 'full_name', label: 'Name' },
    { key: 'email', label: 'Email' },
    { key: 'company', label: 'Company' },
    { key: 'phone', label: 'Phone' },
    { key: 'project_type', label: 'Project Type' },
    { key: 'call_type', label: 'Call Type' },
    { key: 'preferred_date', label: 'Preferred Date' },
    { key: 'preferred_time', label: 'Preferred Time' },
    { key: 'project_details', label: 'Project Details' },
    { key: 'created_at', label: 'Submitted' },
  ];

  const newsletterColumns = [
    { key: 'email', label: 'Email' },
    { key: 'created_at', label: 'Subscribed' },
  ];

  if (!ready) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f7f5f1]">
        <LoadingSpinner size="lg" color="#16161a" />
      </div>
    );
  }

  const totalCount =
    activeTab === 'bookings' ? bookings.length :
    activeTab === 'inquiries' ? inquiries.length :
    subscribers.length;

  const currentColumns = activeTab === 'newsletter' ? newsletterColumns : leadColumns;
  const exportName = `${activeTab}-${new Date().toISOString().slice(0, 10)}.csv`;

  return (
    <div className="min-h-screen bg-[#f7f5f1]">
      {/* Top bar */}
      <header className="bg-[#16161a] sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/phelarts_logo.png" alt="Phel Arts" className="h-12 w-12 object-contain" />
            <div>
              <div className="font-display font-bold text-[#f7f5f1]">Admin Dashboard</div>
              <div className="text-xs text-[#f7f5f1]/50">phelarts@gmail.com</div>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.06] border border-white/10 text-[#f7f5f1] text-sm font-medium hover:bg-[#f59e0b] hover:text-[#16161a] hover:border-[#f59e0b] transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 lg:px-8 py-10">
        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {TABS.map((tab) => {
            const count =
              tab.key === 'bookings' ? bookings.length :
              tab.key === 'inquiries' ? inquiries.length :
              subscribers.length;
            const active = activeTab === tab.key;
            return (
              <button
                key={tab.key}
                onClick={() => { setActiveTab(tab.key); setQuery(''); }}
                className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-colors ${
                  active
                    ? 'bg-[#f59e0b] text-[#16161a] border border-[#f59e0b]'
                    : 'bg-white border border-black/[0.08] text-[#16161a] hover:border-black/20'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span>{tab.label}</span>
                <span className={`text-xs px-2 py-0.5 rounded-full ${active ? 'bg-[#16161a]/10' : 'bg-black/[0.06]'}`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6 items-stretch sm:items-center justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6b6b73]" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={activeTab === 'newsletter' ? 'Search by email...' : 'Search by name or email...'}
              className="w-full pl-11 pr-4 py-3 rounded-xl bg-white border border-black/[0.08] text-[#16161a] placeholder-[#9a9a9a] focus:outline-none focus:border-[#f59e0b] transition-colors"
            />
          </div>
          <button
            onClick={() => exportCsv(exportName, filteredRows as unknown as Record<string, unknown>[], currentColumns)}
            disabled={filteredRows.length === 0}
            className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Download className="w-4 h-4" />
            <span>Export CSV</span>
          </button>
        </div>

        <div className="mb-4 text-sm text-[#6b6b73]">
          Showing {filteredRows.length} of {totalCount} {activeTab === 'newsletter' ? 'subscribers' : 'submissions'}
        </div>

        {/* Content */}
        <div className="bg-white rounded-3xl border border-black/[0.06] overflow-hidden">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <LoadingSpinner size="lg" color="#16161a" />
            </div>
          ) : filteredRows.length === 0 ? (
            <div className="py-20 text-center">
              <div className="text-[#16161a] font-semibold mb-1">
                {totalCount === 0 ? 'Nothing here yet' : 'No matches found'}
              </div>
              <div className="text-sm text-[#6b6b73]">
                {totalCount === 0
                  ? activeTab === 'bookings'
                    ? 'Bookings will appear here once people schedule a call.'
                    : activeTab === 'inquiries'
                      ? 'Inquiries will appear here once people submit the contact form.'
                      : 'Subscribers will appear here once people sign up for the newsletter.'
                  : 'Try a different search term.'}
              </div>
            </div>
          ) : activeTab === 'newsletter' ? (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-[#f7f5f1] text-left text-[#6b6b73]">
                    <th className="px-5 py-3 font-semibold">Email</th>
                    <th className="px-5 py-3 font-semibold">Subscribed</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredRows.map((row) => (
                    <tr key={row.id} className="border-t border-black/[0.05]">
                      <td className="px-5 py-3 text-[#16161a] font-medium">{row.email}</td>
                      <td className="px-5 py-3 text-[#6b6b73]">{fmtDate(row.created_at)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="divide-y divide-black/[0.05]">
              {filteredRows.map((row) => (
                <div key={row.id} className="p-5">
                  <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                    <div>
                      <div className="font-display font-bold text-lg text-[#16161a]">{row.full_name || '—'}</div>
                      <div className="text-sm text-[#f59e0b] font-medium">{row.email}</div>
                    </div>
                    <div className="text-xs text-[#6b6b73]">{fmtDate(row.created_at)}</div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-sm">
                    <div><span className="text-[#6b6b73]">Company:</span> <span className="text-[#16161a]">{row.company || '—'}</span></div>
                    <div><span className="text-[#6b6b73]">Phone:</span> <span className="text-[#16161a]">{row.phone || '—'}</span></div>
                    <div><span className="text-[#6b6b73]">Project Type:</span> <span className="text-[#16161a]">{row.project_type || '—'}</span></div>
                    <div><span className="text-[#6b6b73]">Call Type:</span> <span className="text-[#16161a]">{row.call_type || '—'}</span></div>
                    <div><span className="text-[#6b6b73]">Preferred Date:</span> <span className="text-[#16161a]">{row.preferred_date || '—'}</span></div>
                    <div><span className="text-[#6b6b73]">Preferred Time:</span> <span className="text-[#16161a]">{row.preferred_time || '—'}</span></div>
                  </div>
                  {row.project_details && (
                    <div className="mt-3 text-sm">
                      <span className="text-[#6b6b73]">Project Details:</span>
                      <p className="text-[#16161a] mt-1 whitespace-pre-wrap">{row.project_details}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

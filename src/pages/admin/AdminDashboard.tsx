import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { LogOut, Search, Download, Calendar, Inbox, Mail, FolderKanban, ArrowRight, Loader2, Trash2, ShieldCheck } from 'lucide-react';
import { supabase } from '../../config/supabase';
import LoadingSpinner from '../../components/LoadingSpinner';
import { getAdminSession, clearAdminSession } from './AdminLogin';

type TabKey = 'bookings' | 'inquiries' | 'newsletter' | 'projects';
type ProjectStatus = 'ongoing' | 'completed' | 'canceled';
type AdminRole = 'super' | 'manager';

interface AdminSession {
  email: string;
  role: AdminRole;
}

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

interface ProjectRow {
  id: string;
  source_type: 'booking' | 'inquiry';
  source_id: string | null;
  full_name: string | null;
  email: string | null;
  company: string | null;
  phone: string | null;
  project_type: string | null;
  call_type: string | null;
  preferred_date: string | null;
  preferred_time: string | null;
  project_details: string | null;
  status: ProjectStatus;
  created_at: string;
  updated_at: string;
}

const TABS: { key: TabKey; label: string; icon: typeof Calendar }[] = [
  { key: 'bookings', label: 'Bookings', icon: Calendar },
  { key: 'inquiries', label: 'Inquiries', icon: Inbox },
  { key: 'projects', label: 'Projects', icon: FolderKanban },
  { key: 'newsletter', label: 'Newsletter Subscribers', icon: Mail },
];

const STATUS_STYLES: Record<ProjectStatus, { label: string; badge: string; dot: string }> = {
  ongoing: { label: 'Ongoing', badge: 'bg-[#f59e0b]/15 text-[#b45309] border-[#f59e0b]/30', dot: 'bg-[#f59e0b]' },
  completed: { label: 'Completed', badge: 'bg-[#0f5132]/15 text-[#0f5132] border-[#0f5132]/30', dot: 'bg-[#0f5132]' },
  canceled: { label: 'Canceled', badge: 'bg-red-500/10 text-red-600 border-red-500/30', dot: 'bg-red-500' },
};

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
  const [session, setSession] = useState<AdminSession | null>(null);
  const [ready, setReady] = useState(false);
  const [activeTab, setActiveTab] = useState<TabKey>('bookings');
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [bookings, setBookings] = useState<LeadRow[]>([]);
  const [inquiries, setInquiries] = useState<LeadRow[]>([]);
  const [subscribers, setSubscribers] = useState<NewsletterRow[]>([]);
  const [projects, setProjects] = useState<ProjectRow[]>([]);
  const [projectFilter, setProjectFilter] = useState<ProjectStatus | 'all'>('all');
  const [movingIds, setMovingIds] = useState<Set<string>>(new Set());
  const [deletingIds, setDeletingIds] = useState<Set<string>>(new Set());
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  const isSuperAdmin = session?.role === 'super';

  useEffect(() => {
    const s = getAdminSession();
    if (!s) {
      navigate('/admin/login', { replace: true });
      return;
    }
    setSession(s);
    setReady(true);
  }, [navigate]);

  // Track which source rows have been moved to projects
  const movedSources = useMemo(() => {
    const set = new Set<string>();
    for (const p of projects) {
      if (p.source_id) set.add(`${p.source_type}:${p.source_id}`);
    }
    return set;
  }, [projects]);

  useEffect(() => {
    if (!ready) return;
    let mounted = true;
    (async () => {
      setLoading(true);
      try {
        if (activeTab === 'bookings') {
          const { data, error } = await supabase.from('bookings').select('*').order('created_at', { ascending: false });
          if (error) throw error;
          if (mounted) setBookings((data as LeadRow[]) ?? []);
        } else if (activeTab === 'inquiries') {
          const { data, error } = await supabase.from('inquiries').select('*').order('created_at', { ascending: false });
          if (error) throw error;
          if (mounted) setInquiries((data as LeadRow[]) ?? []);
        } else if (activeTab === 'newsletter') {
          const { data, error } = await supabase.from('newsletter_subscribers').select('*').order('created_at', { ascending: false });
          if (error) throw error;
          if (mounted) setSubscribers((data as NewsletterRow[]) ?? []);
        } else if (activeTab === 'projects') {
          const { data, error } = await supabase.from('projects').select('*').order('updated_at', { ascending: false });
          if (error) throw error;
          if (mounted) setProjects((data as ProjectRow[]) ?? []);
        }
      } catch {
        toast.error('Could not load submissions.');
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, [activeTab, ready]);

  // Always load projects on mount so move-state highlighting works across tabs
  useEffect(() => {
    if (!ready) return;
    let mounted = true;
    (async () => {
      const { data, error } = await supabase.from('projects').select('*').order('updated_at', { ascending: false });
      if (!error && data && mounted) setProjects(data as ProjectRow[]);
    })();
    return () => { mounted = false; };
  }, [ready]);

  const refreshProjects = async () => {
    const { data, error } = await supabase.from('projects').select('*').order('updated_at', { ascending: false });
    if (!error && data) setProjects(data as ProjectRow[]);
  };

  const moveToProjects = async (row: LeadRow, sourceType: 'booking' | 'inquiry') => {
    const key = `${sourceType}:${row.id}`;
    if (movedSources.has(key)) {
      toast.error('Already moved to Projects.');
      return;
    }
    setMovingIds((prev) => new Set(prev).add(row.id));
    try {
      const { error } = await supabase.from('projects').insert({
        source_type: sourceType,
        source_id: row.id,
        full_name: row.full_name ?? null,
        email: row.email,
        company: row.company ?? null,
        phone: row.phone ?? null,
        project_type: row.project_type ?? null,
        call_type: row.call_type ?? null,
        preferred_date: row.preferred_date ?? null,
        preferred_time: row.preferred_time ?? null,
        project_details: row.project_details ?? null,
        status: 'ongoing',
      });
      if (error) throw error;
      await refreshProjects();
      toast.success('Moved to Projects.');
    } catch {
      toast.error('Could not move to Projects.');
    } finally {
      setMovingIds((prev) => {
        const next = new Set(prev);
        next.delete(row.id);
        return next;
      });
    }
  };

  const updateProjectStatus = async (projectId: string, status: ProjectStatus) => {
    const prev = projects;
    setProjects((cur) => cur.map((p) => (p.id === projectId ? { ...p, status } : p)));
    try {
      const { error } = await supabase.from('projects').update({ status, updated_at: new Date().toISOString() }).eq('id', projectId);
      if (error) throw error;
    } catch {
      setProjects(prev);
      toast.error('Could not update project status.');
    }
  };

  const handleDelete = async () => {
    if (!confirmDeleteId) return;
    const id = confirmDeleteId;
    setConfirmDeleteId(null);
    setDeletingIds((prev) => new Set(prev).add(id));
    try {
      const table =
        activeTab === 'bookings' ? 'bookings' :
        activeTab === 'inquiries' ? 'inquiries' :
        activeTab === 'newsletter' ? 'newsletter_subscribers' :
        'projects';
      const { error } = await supabase.from(table).delete().eq('id', id);
      if (error) throw error;
      if (activeTab === 'bookings') setBookings((c) => c.filter((r) => r.id !== id));
      else if (activeTab === 'inquiries') setInquiries((c) => c.filter((r) => r.id !== id));
      else if (activeTab === 'newsletter') setSubscribers((c) => c.filter((r) => r.id !== id));
      else setProjects((c) => c.filter((r) => r.id !== id));
      toast.success('Deleted.');
    } catch {
      toast.error('Could not delete.');
    } finally {
      setDeletingIds((prev) => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
    }
  };

  const handleLogout = () => {
    clearAdminSession();
    navigate('/admin/login', { replace: true });
  };

  const filteredRows = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (activeTab === 'newsletter') {
      const rows = subscribers;
      if (!q) return rows;
      return rows.filter((r) => r.email.toLowerCase().includes(q));
    }
    if (activeTab === 'projects') {
      const byStatus = projectFilter === 'all' ? projects : projects.filter((p) => p.status === projectFilter);
      if (!q) return byStatus;
      return byStatus.filter((r) =>
        (r.full_name ?? '').toLowerCase().includes(q) ||
        (r.email ?? '').toLowerCase().includes(q),
      );
    }
    const rows = activeTab === 'bookings' ? bookings : inquiries;
    if (!q) return rows;
    return rows.filter((r) =>
      (r.full_name ?? '').toLowerCase().includes(q) ||
      r.email.toLowerCase().includes(q),
    );
  }, [activeTab, query, bookings, inquiries, subscribers, projects, projectFilter]);

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
    activeTab === 'newsletter' ? subscribers.length :
    projects.length;

  const currentColumns = activeTab === 'newsletter' ? newsletterColumns : leadColumns;
  const exportName = `${activeTab}-${new Date().toISOString().slice(0, 10)}.csv`;

  const DeleteButton = ({ id }: { id: string }) => {
    if (!isSuperAdmin) return null;
    const isDeleting = deletingIds.has(id);
    return (
      <button
        onClick={() => setConfirmDeleteId(id)}
        disabled={isDeleting}
        title="Delete"
        className="inline-flex items-center justify-center w-9 h-9 rounded-full border border-red-500/30 text-red-600 hover:bg-red-500 hover:text-white hover:border-red-500 transition-colors disabled:opacity-50"
      >
        {isDeleting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
      </button>
    );
  };

  const renderLeadRow = (row: LeadRow, sourceType: 'booking' | 'inquiry') => {
    const moved = movedSources.has(`${sourceType}:${row.id}`);
    const isMoving = movingIds.has(row.id);
    return (
      <div
        key={row.id}
        className={`p-5 transition-colors ${
          moved ? 'bg-[#0f5132]/[0.04] border-l-4 border-[#0f5132]' : ''
        }`}
      >
        <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <div className="font-display font-bold text-lg text-[#16161a]">{row.full_name || '—'}</div>
              {moved && (
                <span className="inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full bg-[#0f5132]/10 text-[#0f5132] border border-[#0f5132]/20">
                  <FolderKanban className="w-3 h-3" /> In Projects
                </span>
              )}
            </div>
            <div className="text-xs text-[#6b6b73]">{fmtDate(row.created_at)}</div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => moveToProjects(row, sourceType)}
              disabled={moved || isMoving}
              className={`inline-flex items-center gap-1.5 text-sm font-semibold px-3.5 py-2 rounded-full border transition-colors ${
                moved
                  ? 'bg-transparent border-[#0f5132]/30 text-[#0f5132]/60 cursor-default'
                  : 'bg-[#16161a] text-[#f7f5f1] border-[#16161a] hover:bg-[#f59e0b] hover:text-[#16161a] hover:border-[#f59e0b] disabled:opacity-60'
              }`}
            >
              {isMoving ? (
                <><Loader2 className="w-4 h-4 animate-spin" /><span>Moving...</span></>
              ) : moved ? (
                <><FolderKanban className="w-4 h-4" /><span>Moved</span></>
              ) : (
                <><ArrowRight className="w-4 h-4" /><span>Move to Project</span></>
              )}
            </button>
            <DeleteButton id={row.id} />
          </div>
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
    );
  };

  return (
    <div className="min-h-screen bg-[#f7f5f1]">
      {/* Top bar */}
      <header className="bg-[#16161a] sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/phelarts_logo.png" alt="Phel Arts" className="h-12 w-12 object-contain" />
            <div>
              <div className="flex items-center gap-2">
                <span className="font-display font-bold text-[#f7f5f1]">Admin Dashboard</span>
                {isSuperAdmin && (
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#f59e0b]/20 text-[#f59e0b] border border-[#f59e0b]/30">
                    <ShieldCheck className="w-3 h-3" /> Super Admin
                  </span>
                )}
              </div>
              <div className="text-xs text-[#f7f5f1]/50">{session?.email}</div>
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
              tab.key === 'newsletter' ? subscribers.length :
              projects.length;
            const active = activeTab === tab.key;
            return (
              <button
                key={tab.key}
                onClick={() => { setActiveTab(tab.key); setQuery(''); setProjectFilter('all'); }}
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
          <div className="flex flex-1 gap-3 max-w-xl">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6b6b73]" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={
                  activeTab === 'newsletter' ? 'Search by email...' :
                  activeTab === 'projects' ? 'Search by name or email...' :
                  'Search by name or email...'
                }
                className="w-full pl-11 pr-4 py-3 rounded-xl bg-white border border-black/[0.08] text-[#16161a] placeholder-[#9a9a9a] focus:outline-none focus:border-[#f59e0b] transition-colors"
              />
            </div>
            {activeTab === 'projects' && (
              <div className="flex gap-1.5 bg-white border border-black/[0.08] rounded-xl p-1">
                {(['all', 'ongoing', 'completed', 'canceled'] as const).map((f) => (
                  <button
                    key={f}
                    onClick={() => setProjectFilter(f)}
                    className={`px-3 py-2 rounded-lg text-sm font-semibold capitalize transition-colors ${
                      projectFilter === f
                        ? 'bg-[#16161a] text-[#f7f5f1]'
                        : 'text-[#6b6b73] hover:text-[#16161a]'
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            )}
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
          Showing {filteredRows.length} of {totalCount}{' '}
          {activeTab === 'newsletter' ? 'subscribers' : activeTab === 'projects' ? 'projects' : 'submissions'}
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
                      : activeTab === 'newsletter'
                        ? 'Subscribers will appear here once people sign up for the newsletter.'
                        : 'Projects moved here from Bookings or Inquiries will appear here.'
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
                    {isSuperAdmin && <th className="px-5 py-3 font-semibold text-right">Action</th>}
                  </tr>
                </thead>
                <tbody>
                  {(filteredRows as NewsletterRow[]).map((row) => (
                    <tr key={row.id} className="border-t border-black/[0.05]">
                      <td className="px-5 py-3 text-[#16161a] font-medium">{row.email}</td>
                      <td className="px-5 py-3 text-[#6b6b73]">{fmtDate(row.created_at)}</td>
                      {isSuperAdmin && (
                        <td className="px-5 py-3 text-right">
                          <DeleteButton id={row.id} />
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : activeTab === 'projects' ? (
            <div className="divide-y divide-black/[0.05]">
              {(filteredRows as ProjectRow[]).map((p) => {
                const st = STATUS_STYLES[p.status];
                return (
                  <div key={p.id} className="p-5">
                    <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <div className="font-display font-bold text-lg text-[#16161a]">{p.full_name || '—'}</div>
                          <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full border ${st.badge}`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${st.dot}`} />
                            {st.label}
                          </span>
                          <span className="text-xs px-2 py-0.5 rounded-full bg-black/[0.05] text-[#6b6b73] capitalize">
                            from {p.source_type}
                          </span>
                        </div>
                        <div className="text-xs text-[#6b6b73] mt-0.5">
                          Added {fmtDate(p.created_at)} · Updated {fmtDate(p.updated_at)}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex gap-1.5 bg-[#f7f5f1] border border-black/[0.06] rounded-xl p-1">
                          {(['ongoing', 'completed', 'canceled'] as const).map((s) => (
                            <button
                              key={s}
                              onClick={() => updateProjectStatus(p.id, s)}
                              className={`px-3 py-1.5 rounded-lg text-sm font-semibold capitalize transition-colors ${
                                p.status === s ? STATUS_STYLES[s].badge : 'text-[#6b6b73] hover:text-[#16161a]'
                              }`}
                            >
                              {s}
                            </button>
                          ))}
                        </div>
                        <DeleteButton id={p.id} />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-sm">
                      <div><span className="text-[#6b6b73]">Email:</span> <span className="text-[#16161a]">{p.email || '—'}</span></div>
                      <div><span className="text-[#6b6b73]">Company:</span> <span className="text-[#16161a]">{p.company || '—'}</span></div>
                      <div><span className="text-[#6b6b73]">Phone:</span> <span className="text-[#16161a]">{p.phone || '—'}</span></div>
                      <div><span className="text-[#6b6b73]">Project Type:</span> <span className="text-[#16161a]">{p.project_type || '—'}</span></div>
                      <div><span className="text-[#6b6b73]">Call Type:</span> <span className="text-[#16161a]">{p.call_type || '—'}</span></div>
                      <div><span className="text-[#6b6b73]">Preferred Date:</span> <span className="text-[#16161a]">{p.preferred_date || '—'}</span></div>
                      <div><span className="text-[#6b6b73]">Preferred Time:</span> <span className="text-[#16161a]">{p.preferred_time || '—'}</span></div>
                    </div>
                    {p.project_details && (
                      <div className="mt-3 text-sm">
                        <span className="text-[#6b6b73]">Project Details:</span>
                        <p className="text-[#16161a] mt-1 whitespace-pre-wrap">{p.project_details}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="divide-y divide-black/[0.05]">
              {(filteredRows as LeadRow[]).map((row) =>
                renderLeadRow(row, activeTab === 'bookings' ? 'booking' : 'inquiry'),
              )}
            </div>
          )}
        </div>
      </main>

      {/* Delete confirmation modal */}
      {confirmDeleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl border border-black/[0.08] max-w-sm w-full p-6 shadow-xl">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center">
                <Trash2 className="w-5 h-5 text-red-600" />
              </div>
              <h3 className="font-display font-bold text-lg text-[#16161a]">Delete this entry?</h3>
            </div>
            <p className="text-sm text-[#6b6b73] mb-6">
              This permanently removes it from {activeTab === 'newsletter' ? 'subscribers' : activeTab}. This cannot be undone.
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setConfirmDeleteId(null)}
                className="px-4 py-2 rounded-full text-sm font-semibold text-[#16161a] border border-black/[0.1] hover:bg-black/[0.03] transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold bg-red-600 text-white hover:bg-red-700 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
                <span>Delete</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

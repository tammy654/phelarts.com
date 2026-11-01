import { supabase } from '../../config/supabase';

export type LeadStage = 'new' | 'call_booked' | 'quote_sent' | 'won' | 'lost';
export type DraftKind = 'after_call' | 'quote_check_in' | 'nudge' | 'custom';
export type SourceType = 'booking' | 'inquiry';

export const STAGES: { key: LeadStage; label: string; badge: string }[] = [
  { key: 'new', label: 'New', badge: 'bg-sky-500/10 text-sky-700 border-sky-500/30' },
  { key: 'call_booked', label: 'Call booked', badge: 'bg-[#f59e0b]/15 text-[#b45309] border-[#f59e0b]/30' },
  { key: 'quote_sent', label: 'Quote sent', badge: 'bg-violet-500/10 text-violet-700 border-violet-500/30' },
  { key: 'won', label: 'Won', badge: 'bg-[#0f5132]/15 text-[#0f5132] border-[#0f5132]/30' },
  { key: 'lost', label: 'Lost', badge: 'bg-red-500/10 text-red-600 border-red-500/30' },
];

export const stageInfo = (key: string | null | undefined) => STAGES.find((s) => s.key === key) ?? STAGES[0];

export const DRAFT_KINDS: { key: DraftKind; label: string }[] = [
  { key: 'after_call', label: 'After the call' },
  { key: 'quote_check_in', label: 'Quote check-in' },
  { key: 'nudge', label: 'Friendly nudge' },
  { key: 'custom', label: 'Custom (tell the AI what to say)' },
];

export interface FollowUpDraft {
  id: string;
  source_type: SourceType;
  source_id: string;
  to_email: string;
  to_name: string | null;
  kind: DraftKind;
  subject: string;
  body: string;
  status: 'pending' | 'sent' | 'discarded';
  created_at: string;
  sent_at: string | null;
}

// Calls a Supabase Edge Function as the signed-in admin and surfaces its error message.
export async function invokeFunction<T>(name: string, body: Record<string, unknown>): Promise<T> {
  const { data, error } = await supabase.functions.invoke(name, { body });
  if (error) {
    let message = error.message;
    const ctx = (error as { context?: Response }).context;
    if (ctx && typeof ctx.json === 'function') {
      try {
        const payload = await ctx.json();
        if (payload?.error) message = payload.error;
      } catch {
        // keep the default message
      }
    }
    console.error(`Function ${name} failed:`, error);
    throw new Error(message);
  }
  return data as T;
}

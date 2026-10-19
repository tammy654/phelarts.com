import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl) {
  console.error('Missing Supabase environment variable: VITE_SUPABASE_URL');
}
if (!supabaseAnonKey) {
  console.error('Missing Supabase environment variable: VITE_SUPABASE_ANON_KEY');
}
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Supabase client cannot start because required environment variables are missing.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

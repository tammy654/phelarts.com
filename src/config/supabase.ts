import { createClient, type SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const missingEnvMessage =
  'Missing Supabase environment variables (VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY)';

if (!supabaseUrl || !supabaseAnonKey) {
  console.error(missingEnvMessage);
}

// If the env vars are missing, the site still renders; only calls that use
// Supabase (forms, admin) fail, and their error handlers show a message.
export const supabase: SupabaseClient =
  supabaseUrl && supabaseAnonKey
    ? createClient(supabaseUrl, supabaseAnonKey)
    : (new Proxy({} as SupabaseClient, {
        get() {
          throw new Error(missingEnvMessage);
        },
      }));

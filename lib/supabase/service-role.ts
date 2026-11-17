import { createClient as createSupabaseClient } from '@supabase/supabase-js';

// Server-only runtime safeguard
if (typeof window !== 'undefined') {
  throw new Error('This module can only be executed on the server. Never import service-role into client code.');
}

/**
 * Server-only Supabase client initialized with the SERVICE_ROLE_KEY.
 * NEVER import this file into client components or client-facing code.
 */
export function createAdminServiceClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRoleKey) {
    throw new Error('Supabase URL or Service Role Key missing from server environment.');
  }

  return createSupabaseClient(supabaseUrl, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}

import { createClient } from '../supabase/server';

export interface AdminUser {
  id: string;
  email?: string;
  role: string;
}

/**
 * Server-side helper to verify that the current session belongs to an authorized administrator.
 * Validates Supabase authentication session, admin_users table, or admin metadata.
 */
export async function verifyAdminSession(): Promise<{ authorized: boolean; user?: AdminUser }> {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  // In development/test mode without live credentials, handle safely
  if (!supabaseUrl || !supabaseAnonKey || supabaseUrl.includes('placeholder')) {
    if (process.env.NODE_ENV !== 'production') {
      return { authorized: true, user: { id: 'dev-admin', email: 'admin@gcekbpatna.ac.in', role: 'admin' } };
    }
    return { authorized: false };
  }

  try {
    const supabase = await createClient();
    if (!supabase) {
      return { authorized: false };
    }
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (error || !user) {
      return { authorized: false };
    }

    // Check JWT claims
    const appRole = (user.app_metadata as Record<string, unknown>)?.role;
    const userRole = (user.user_metadata as Record<string, unknown>)?.role;
    if (appRole === 'admin' || userRole === 'admin') {
      return {
        authorized: true,
        user: { id: user.id, email: user.email, role: 'admin' },
      };
    }

    // Check database admin_users table
    const { data: adminRecord } = await supabase
      .from('admin_users')
      .select('id, email, role')
      .eq('id', user.id)
      .maybeSingle();

    if (adminRecord) {
      return {
        authorized: true,
        user: { id: adminRecord.id, email: adminRecord.email, role: adminRecord.role },
      };
    }

    return { authorized: false };
  } catch (err) {
    console.error('Failed to verify admin session:', err);
    return { authorized: false };
  }
}

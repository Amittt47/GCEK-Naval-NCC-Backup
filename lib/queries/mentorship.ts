import { createClient } from '../supabase/server';
import { Database } from '../types/database';

export type MentorshipRequest = Database['public']['Tables']['mentorship_requests']['Row'];

export async function getMentorshipRequests(): Promise<MentorshipRequest[]> {
  try {
    const supabase = await createClient();
    if (!supabase) return [];

    const { data, error } = await supabase
      .from('mentorship_requests')
      .select('*')
      .order('created_at', { ascending: false });

    if (error || !data) return [];
    return (data as any[]) as MentorshipRequest[];
  } catch (err) {
    console.warn('getMentorshipRequests error:', err);
    return [];
  }
}

export async function submitMentorshipRequest(payload: {
  cadetName: string;
  cadetEmail: string;
  cadetPhone?: string;
  cadetYearBranch?: string;
  alumniId: string;
  subject: string;
  message: string;
}): Promise<{ success: boolean; error?: string }> {
  try {
    const supabase = await createClient();
    if (!supabase) {
      // In offline / demo mode, return simulated success
      return { success: true };
    }

    const { error } = await (supabase.from('mentorship_requests') as any).insert({
      cadet_name: payload.cadetName,
      cadet_email: payload.cadetEmail,
      cadet_phone: payload.cadetPhone || null,
      cadet_year_branch: payload.cadetYearBranch || null,
      alumni_id: payload.alumniId,
      subject: payload.subject,
      message: payload.message,
      status: 'pending',
    });

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (err) {
    return { success: false, error: (err as Error).message };
  }
}

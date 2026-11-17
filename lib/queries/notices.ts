import { createClient } from '../supabase/server';
import { INITIAL_NOTICES } from '../constants/mockData';
import { Notice } from '../../src/types';

export async function getNotices(): Promise<Notice[]> {
  try {
    const supabase = await createClient();
    if (!supabase) return INITIAL_NOTICES;

    const { data, error } = await supabase
      .from('notices')
      .select('*')
      .eq('published', true)
      .order('priority', { ascending: false })
      .order('notice_date', { ascending: false });

    if (error || !data || (data as any[]).length === 0) {
      return INITIAL_NOTICES;
    }

    return (data as any[]).map((n) => ({
      id: n.id,
      title: n.title,
      content: n.description,
      category: (n.notice_type as Notice['category']) || 'Parade Order',
      date: n.notice_date,
      isPinned: n.priority,
      issuedBy: n.created_by || 'Office of the CTO, GCEK Naval NCC',
      attachmentName: n.attachment_name || undefined,
      attachmentSize: n.attachment_size || undefined,
    }));
  } catch (err) {
    console.warn('Supabase getNotices error, using fallback:', err);
    return INITIAL_NOTICES;
  }
}

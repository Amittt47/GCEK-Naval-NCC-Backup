import { createClient } from '../supabase/server';
import { UNIT_INFO } from '../constants/mockData';
import { CadetInfo } from '../../src/types';

export async function getCadets(): Promise<CadetInfo[]> {
  try {
    const supabase = await createClient();
    if (!supabase) return UNIT_INFO.cadetInformation;

    const { data, error } = await supabase
      .from('cadets')
      .select('*')
      .eq('active_status', true)
      .order('rank_order', { ascending: true });

    if (error || !data || (data as any[]).length === 0) {
      return UNIT_INFO.cadetInformation;
    }

    return (data as any[]).map((c) => ({
      id: c.id,
      name: c.name,
      rank: c.rank,
      role: c.role || 'Cadet Appointment',
      yearBranch: c.course_year || 'Engineering Cadre',
      regimentalNumber: c.regimental_number || undefined,
      achievements: c.achievements || 'Participated with distinction in sub-unit training.',
      photoUrl: c.profile_photo || undefined,
    }));
  } catch (err) {
    console.warn('Supabase getCadets error, using verified mock data fallback:', err);
    return UNIT_INFO.cadetInformation;
  }
}

import { createClient } from '../supabase/server';
import { ACHIEVEMENTS_DATA } from '../constants/mockData';
import { Achievement } from '../../src/types';

export async function getAchievements(): Promise<Achievement[]> {
  try {
    const supabase = await createClient();
    if (!supabase) return ACHIEVEMENTS_DATA;

    const { data, error } = await supabase
      .from('achievements')
      .select('*')
      .order('year', { ascending: false });

    if (error || !data || (data as any[]).length === 0) {
      return ACHIEVEMENTS_DATA;
    }

    return (data as any[]).map((a) => ({
      id: a.id,
      cadetName: a.cadet_name,
      rank: a.rank,
      year: a.year,
      category: (a.category as Achievement['category']) || 'AINSC',
      campTitle: a.event_camp,
      location: a.location || 'Command HQ',
      achievementDescription: a.description,
      medal: (a.medal_award as Achievement['medal']) || undefined,
      certificateId: a.certificate_id || `CERT-${a.year}`,
      photoUrl: a.photo_url || undefined,
      certificateUrl: a.certificate_url || undefined,
    }));
  } catch (err) {
    console.warn('Supabase getAchievements error, using fallback:', err);
    return ACHIEVEMENTS_DATA;
  }
}

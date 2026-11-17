import { createClient } from '../supabase/server';
import { ALUMNI_PROFILES } from '../constants/mockData';
import { AlumniProfile } from '../../src/types';

export async function getAlumni(): Promise<AlumniProfile[]> {
  try {
    const supabase = await createClient();
    if (!supabase) return ALUMNI_PROFILES;

    const { data, error } = await supabase
      .from('alumni')
      .select('*')
      .order('batch', { ascending: false });

    if (error || !data || (data as any[]).length === 0) {
      return ALUMNI_PROFILES;
    }

    return (data as any[]).map((a) => ({
      id: a.id,
      name: a.name,
      batch: a.batch,
      degreeBranch: a.degree_branch || 'B.Tech',
      currentDesignation: a.current_designation,
      organization: a.organization || 'Armed Forces',
      serviceBranch: (a.service_branch as AlumniProfile['serviceBranch']) || 'Indian Navy',
      nccRankHeld: a.ncc_rank_held || 'Cadet',
      notableAchievement: a.notable_achievement || '',
      adviceForCadets: a.advice_for_cadets || '',
      availableForMentorship: a.mentorship_available ?? true,
    }));
  } catch (err) {
    console.warn('Supabase getAlumni error, using fallback:', err);
    return ALUMNI_PROFILES;
  }
}

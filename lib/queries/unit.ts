import { createClient } from '../supabase/server';
import { UNIT_INFO } from '../constants/mockData';
import { UnitInfo } from '../../src/types';

export async function getUnitInfo(): Promise<UnitInfo> {
  try {
    const supabase = await createClient();
    if (!supabase) return UNIT_INFO;

    const { data, error } = await supabase
      .from('unit_info')
      .select('*')
      .limit(1)
      .maybeSingle();

    if (error || !data) {
      return UNIT_INFO;
    }

    const d = data as any;
    return {
      name: d.unit_name || UNIT_INFO.name,
      college: d.college_name || UNIT_INFO.college,
      location: d.college_location || UNIT_INFO.location,
      affiliatedUnit: d.affiliation || UNIT_INFO.affiliatedUnit,
      groupHQ: d.group_hq || UNIT_INFO.groupHQ,
      directorate: d.directorate || UNIT_INFO.directorate,
      motto: d.motto || UNIT_INFO.motto,
      navalMotto: d.naval_motto || UNIT_INFO.navalMotto,
      establishedYear: d.established_year || UNIT_INFO.establishedYear,
      cadetStrength: d.cadet_strength || UNIT_INFO.cadetStrength,
      subUnitCode: d.sub_unit_code || UNIT_INFO.subUnitCode,
      contactEmail: d.contact_email || UNIT_INFO.contactEmail,
      contactPhone: d.contact_phone || UNIT_INFO.contactPhone,
      co: {
        name: d.co_name || UNIT_INFO.co.name,
        rank: d.co_rank || UNIT_INFO.co.rank,
        designation: d.co_designation || UNIT_INFO.co.designation,
        unit: d.co_unit || UNIT_INFO.co.unit,
        experience: d.co_experience || UNIT_INFO.co.experience,
        message: d.co_message || UNIT_INFO.co.message,
        photoUrl: d.co_photo_url || UNIT_INFO.co.photoUrl,
      },
      anoCto: {
        name: d.ano_name || UNIT_INFO.anoCto.name,
        designation: d.ano_designation || UNIT_INFO.anoCto.designation,
        department: d.ano_department || UNIT_INFO.anoCto.department,
        qualifications: d.ano_qualifications || UNIT_INFO.anoCto.qualifications,
        experience: d.ano_experience || UNIT_INFO.anoCto.experience,
        message: d.ano_message || UNIT_INFO.anoCto.message,
        photoUrl: d.ano_photo_url || UNIT_INFO.anoCto.photoUrl,
      },
      cadetInformation: UNIT_INFO.cadetInformation,
      cto: {
        name: d.ano_name || UNIT_INFO.cto.name,
        designation: d.ano_designation || UNIT_INFO.cto.designation,
        department: d.ano_department || UNIT_INFO.cto.department,
        qualifications: d.ano_qualifications || UNIT_INFO.cto.qualifications,
        experience: d.ano_experience || UNIT_INFO.cto.experience,
        message: d.ano_message || UNIT_INFO.cto.message,
        photoUrl: d.ano_photo_url || UNIT_INFO.cto.photoUrl,
      },
      seniorCadetCaptain: UNIT_INFO.seniorCadetCaptain,
    };
  } catch (err) {
    console.warn('Supabase getUnitInfo error, using verified mock data fallback:', err);
    return UNIT_INFO;
  }
}

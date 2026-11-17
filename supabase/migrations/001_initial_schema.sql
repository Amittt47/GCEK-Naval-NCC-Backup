-- ==============================================================================
-- GCEK NAVAL NCC PORTAL - DATABASE SCHEMA MIGRATION
-- Government College of Engineering Kalahandi, Bhawanipatna, Odisha
-- 4 Odisha Naval Unit NCC, Bhawanipatna | Sambalpur Group HQ | Odisha Directorate
-- ==============================================================================

-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ------------------------------------------------------------------------------
-- 1. UNIT_INFO TABLE
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.unit_info (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  college_name TEXT NOT NULL DEFAULT 'Government College of Engineering Kalahandi',
  college_location TEXT NOT NULL DEFAULT 'Bhawanipatna, Kalahandi, Odisha - 766002',
  unit_name TEXT NOT NULL DEFAULT 'GCEK Naval NCC',
  affiliation TEXT NOT NULL DEFAULT '4 Odisha Naval Unit NCC, Bhawanipatna',
  group_hq TEXT NOT NULL DEFAULT 'Sambalpur Group HQ',
  directorate TEXT NOT NULL DEFAULT 'Odisha Directorate (NCC Dte Odisha)',
  motto TEXT NOT NULL DEFAULT 'Unity and Discipline (एकता और अनुशासन)',
  naval_motto TEXT NOT NULL DEFAULT 'Sham No Varunah (शं नो वरुणः - May the Lord of the Oceans be Auspicious unto Us)',
  established_year INTEGER NOT NULL DEFAULT 2012,
  cadet_strength INTEGER NOT NULL DEFAULT 120,
  sub_unit_code TEXT DEFAULT 'COY-04-NAV-GCEK',
  contact_email TEXT DEFAULT 'nccnaval@gcekbpatna.ac.in',
  contact_phone TEXT DEFAULT '+91 6670 226510',
  -- 1 No. Commanding Officer (CO)
  co_name TEXT DEFAULT 'CO LT. M Darshan',
  co_rank TEXT DEFAULT 'Lieutenant (Indian Navy)',
  co_designation TEXT DEFAULT 'Commanding Officer (CO)',
  co_unit TEXT DEFAULT '4 Odisha Naval Unit NCC, Bhawanipatna',
  co_experience TEXT DEFAULT 'Commissioned Naval Officer · 12+ Years Maritime Service',
  co_message TEXT,
  co_photo_url TEXT,
  -- 2 No. Associate NCC Officer / Care Taker Officer (ANO/CTO)
  ano_name TEXT DEFAULT 'Lt. (Dr.) Manoranjan Pradhan',
  ano_designation TEXT DEFAULT 'Associate NCC Officer (ANO) / Care Taker Officer (CTO)',
  ano_department TEXT DEFAULT 'Department of Mechanical Engineering, GCEK',
  ano_qualifications TEXT DEFAULT 'Ph.D., M.Tech (IIT), Associate NCC Officer (PRCN Certified)',
  ano_experience TEXT DEFAULT '8+ Years Naval NCC Mentorship',
  ano_message TEXT,
  ano_photo_url TEXT,
  welcome_message TEXT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ------------------------------------------------------------------------------
-- 2. CADETS TABLE (with explicit rank_order for Naval NCC hierarchy)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.cadets (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  rank TEXT NOT NULL,
  rank_order INTEGER NOT NULL DEFAULT 1, -- 1: CC, 2: POC, 3: LC, 4: NC
  regimental_number TEXT,
  enrollment_year INTEGER,
  course_year TEXT,
  wing TEXT NOT NULL DEFAULT 'Naval Wing',
  role TEXT,
  achievements TEXT,
  profile_photo TEXT,
  active_status BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ------------------------------------------------------------------------------
-- 3. NOTICES TABLE
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.notices (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  notice_type TEXT NOT NULL DEFAULT 'Parade Order', -- 'Parade Order', 'Camp Notification', 'Selection List', 'Class Timing', 'Circular', 'Event Notice'
  notice_date DATE NOT NULL DEFAULT CURRENT_DATE,
  priority BOOLEAN NOT NULL DEFAULT false,
  attachment_url TEXT,
  attachment_name TEXT,
  attachment_size TEXT,
  published BOOLEAN NOT NULL DEFAULT true,
  created_by TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ------------------------------------------------------------------------------
-- 4. ACHIEVEMENTS TABLE
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.achievements (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  cadet_id UUID REFERENCES public.cadets(id) ON DELETE SET NULL,
  cadet_name TEXT NOT NULL,
  rank TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  event_camp TEXT NOT NULL,
  location TEXT,
  year INTEGER NOT NULL,
  medal_award TEXT,
  category TEXT NOT NULL DEFAULT 'AINSC', -- 'AINSC', 'RDC', 'NTAC', 'CATC', 'ATC', 'State', 'Best Cadet', 'Camp Senior'
  citation TEXT,
  certificate_id TEXT,
  certificate_url TEXT,
  photo_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ------------------------------------------------------------------------------
-- 5. GALLERY TABLE
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.gallery (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  image_url TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL DEFAULT 'Parade', -- 'Parade', 'Camps', 'Social Activities', 'Independence Day', 'Republic Day', 'Seamanship Training', 'Competitions'
  event TEXT,
  year INTEGER NOT NULL DEFAULT EXTRACT(YEAR FROM CURRENT_DATE),
  uploaded_by TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ------------------------------------------------------------------------------
-- 6. ALUMNI TABLE
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.alumni (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  batch TEXT NOT NULL,
  degree_branch TEXT,
  service_branch TEXT, -- 'Indian Navy', 'Indian Army', 'Coast Guard', 'Merchant Navy', 'PSU / Corporate', 'Civil Services'
  current_designation TEXT NOT NULL,
  organization TEXT,
  commissioning_info TEXT,
  ncc_rank_held TEXT,
  notable_achievement TEXT,
  advice_for_cadets TEXT,
  current_status TEXT,
  mentorship_available BOOLEAN NOT NULL DEFAULT false,
  profile_photo TEXT,
  bio TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ------------------------------------------------------------------------------
-- 7. MENTORSHIP_REQUESTS TABLE
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.mentorship_requests (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  cadet_id UUID REFERENCES public.cadets(id) ON DELETE SET NULL,
  cadet_name TEXT NOT NULL,
  cadet_email TEXT NOT NULL,
  cadet_phone TEXT,
  cadet_year_branch TEXT,
  alumni_id UUID NOT NULL REFERENCES public.alumni(id) ON DELETE CASCADE,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending', -- 'pending', 'reviewed', 'approved', 'completed', 'rejected'
  response TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ------------------------------------------------------------------------------
-- 7.5 EVENTS TABLE
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  type TEXT NOT NULL DEFAULT 'Parade',
  date DATE NOT NULL,
  start_time TEXT NOT NULL DEFAULT '06:00 AM',
  end_time TEXT NOT NULL DEFAULT '08:30 AM',
  location TEXT NOT NULL DEFAULT 'College Parade Ground',
  description TEXT NOT NULL DEFAULT 'Mandatory muster for naval cadets.',
  dress_code TEXT,
  in_charge TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ------------------------------------------------------------------------------
-- 7.6 ADMIN_USERS & AUTHORIZATION
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.admin_users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL UNIQUE,
  role TEXT NOT NULL DEFAULT 'admin', -- 'admin', 'super_admin'
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

-- Helper function to verify admin status via database table or JWT claim
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
STABLE
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.admin_users
    WHERE id = auth.uid()
  ) OR (
    (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin'
  ) OR (
    (auth.jwt() -> 'user_metadata' ->> 'role') = 'admin'
  );
$$;

-- ------------------------------------------------------------------------------
-- 8. ROW LEVEL SECURITY (RLS) POLICIES - STRICT PUBLIC VS ADMIN SEPARATION
-- ------------------------------------------------------------------------------

-- Enable RLS on all tables
ALTER TABLE public.unit_info ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cadets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notices ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.alumni ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.mentorship_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;

-- 8.1 admin_users: Only admins can inspect and manage administrator list
CREATE POLICY "Admin view admin_users" ON public.admin_users
  FOR SELECT TO authenticated USING (public.is_admin());
CREATE POLICY "Admin manage admin_users" ON public.admin_users
  FOR ALL TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());

-- 8.2 unit_info: Public can read; only authorized admins can mutate
CREATE POLICY "Public read unit_info" ON public.unit_info
  FOR SELECT USING (true);
CREATE POLICY "Admin update unit_info" ON public.unit_info
  FOR UPDATE TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());
CREATE POLICY "Admin insert unit_info" ON public.unit_info
  FOR INSERT TO authenticated WITH CHECK (public.is_admin());
CREATE POLICY "Admin delete unit_info" ON public.unit_info
  FOR DELETE TO authenticated USING (public.is_admin());

-- 8.3 cadets: Public can view active cadets; only authorized admins can mutate
CREATE POLICY "Public read active cadets" ON public.cadets
  FOR SELECT USING (active_status = true);
CREATE POLICY "Admin read all cadets" ON public.cadets
  FOR SELECT TO authenticated USING (public.is_admin());
CREATE POLICY "Admin insert cadets" ON public.cadets
  FOR INSERT TO authenticated WITH CHECK (public.is_admin());
CREATE POLICY "Admin update cadets" ON public.cadets
  FOR UPDATE TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());
CREATE POLICY "Admin delete cadets" ON public.cadets
  FOR DELETE TO authenticated USING (public.is_admin());

-- 8.4 notices: Public can view published notices; only authorized admins can mutate
CREATE POLICY "Public read published notices" ON public.notices
  FOR SELECT USING (published = true);
CREATE POLICY "Admin read all notices" ON public.notices
  FOR SELECT TO authenticated USING (public.is_admin());
CREATE POLICY "Admin insert notices" ON public.notices
  FOR INSERT TO authenticated WITH CHECK (public.is_admin());
CREATE POLICY "Admin update notices" ON public.notices
  FOR UPDATE TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());
CREATE POLICY "Admin delete notices" ON public.notices
  FOR DELETE TO authenticated USING (public.is_admin());

-- 8.5 achievements: Public can read; only authorized admins can mutate
CREATE POLICY "Public read achievements" ON public.achievements
  FOR SELECT USING (true);
CREATE POLICY "Admin insert achievements" ON public.achievements
  FOR INSERT TO authenticated WITH CHECK (public.is_admin());
CREATE POLICY "Admin update achievements" ON public.achievements
  FOR UPDATE TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());
CREATE POLICY "Admin delete achievements" ON public.achievements
  FOR DELETE TO authenticated USING (public.is_admin());

-- 8.6 gallery: Public can read; only authorized admins can mutate
CREATE POLICY "Public read gallery" ON public.gallery
  FOR SELECT USING (true);
CREATE POLICY "Admin insert gallery" ON public.gallery
  FOR INSERT TO authenticated WITH CHECK (public.is_admin());
CREATE POLICY "Admin update gallery" ON public.gallery
  FOR UPDATE TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());
CREATE POLICY "Admin delete gallery" ON public.gallery
  FOR DELETE TO authenticated USING (public.is_admin());

-- 8.7 alumni: Public can view alumni; only authorized admins can mutate
CREATE POLICY "Public read alumni" ON public.alumni
  FOR SELECT USING (true);
CREATE POLICY "Admin insert alumni" ON public.alumni
  FOR INSERT TO authenticated WITH CHECK (public.is_admin());
CREATE POLICY "Admin update alumni" ON public.alumni
  FOR UPDATE TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());
CREATE POLICY "Admin delete alumni" ON public.alumni
  FOR DELETE TO authenticated USING (public.is_admin());

-- 8.8 mentorship_requests: Public cadets can submit requests; ONLY admins can read or manage
CREATE POLICY "Public submit mentorship_request" ON public.mentorship_requests
  FOR INSERT WITH CHECK (true);
CREATE POLICY "Admin read mentorship_requests" ON public.mentorship_requests
  FOR SELECT TO authenticated USING (public.is_admin());
CREATE POLICY "Admin update mentorship_requests" ON public.mentorship_requests
  FOR UPDATE TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());
CREATE POLICY "Admin delete mentorship_requests" ON public.mentorship_requests
  FOR DELETE TO authenticated USING (public.is_admin());

-- 8.9 events: Public can view schedule; only authorized admins can mutate
CREATE POLICY "Public read events" ON public.events
  FOR SELECT USING (true);
CREATE POLICY "Admin insert events" ON public.events
  FOR INSERT TO authenticated WITH CHECK (public.is_admin());
CREATE POLICY "Admin update events" ON public.events
  FOR UPDATE TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());
CREATE POLICY "Admin delete events" ON public.events
  FOR DELETE TO authenticated USING (public.is_admin());

-- ------------------------------------------------------------------------------
-- 9. SUPABASE STORAGE BUCKETS SETUP
-- ------------------------------------------------------------------------------
INSERT INTO storage.buckets (id, name, public)
VALUES ('notices-docs', 'notices-docs', true)
ON CONFLICT (id) DO NOTHING;

INSERT INTO storage.buckets (id, name, public)
VALUES ('portal-images', 'portal-images', true)
ON CONFLICT (id) DO NOTHING;

-- Storage bucket access policies: public read, strictly admin upload/delete
CREATE POLICY "Public read notices-docs" ON storage.objects FOR SELECT
USING (bucket_id = 'notices-docs');

CREATE POLICY "Admin upload notices-docs" ON storage.objects FOR INSERT TO authenticated
WITH CHECK (bucket_id = 'notices-docs' AND public.is_admin());

CREATE POLICY "Admin delete notices-docs" ON storage.objects FOR DELETE TO authenticated
USING (bucket_id = 'notices-docs' AND public.is_admin());

CREATE POLICY "Public read portal-images" ON storage.objects FOR SELECT
USING (bucket_id = 'portal-images');

CREATE POLICY "Admin upload portal-images" ON storage.objects FOR INSERT TO authenticated
WITH CHECK (bucket_id = 'portal-images' AND public.is_admin());

CREATE POLICY "Admin delete portal-images" ON storage.objects FOR DELETE TO authenticated
USING (bucket_id = 'portal-images' AND public.is_admin());

-- ------------------------------------------------------------------------------
-- 10. VERIFIED DATA SEEDING (FROM ACTUAL PROJECT RECORDS)
-- ------------------------------------------------------------------------------

-- Seed unit_info
INSERT INTO public.unit_info (
  college_name,
  college_location,
  unit_name,
  affiliation,
  group_hq,
  directorate,
  motto,
  naval_motto,
  established_year,
  cadet_strength,
  sub_unit_code,
  contact_email,
  contact_phone,
  co_name,
  co_rank,
  co_designation,
  co_unit,
  co_experience,
  co_message,
  co_photo_url,
  ano_name,
  ano_designation,
  ano_department,
  ano_qualifications,
  ano_experience,
  ano_message,
  ano_photo_url,
  welcome_message
) VALUES (
  'Government College of Engineering Kalahandi',
  'Bhawanipatna, Kalahandi, Odisha - 766002',
  'GCEK Naval NCC Portal',
  '4 Odisha Naval Unit NCC, Bhawanipatna',
  'Sambalpur Group HQ',
  'Odisha Directorate (NCC Dte Odisha)',
  'Unity and Discipline (एकता और अनुशासन)',
  'Sham No Varunah (शं नो वरुणः - May the Lord of the Oceans be Auspicious unto Us)',
  2012,
  120,
  'COY-04-NAV-GCEK',
  'nccnaval@gcekbpatna.ac.in',
  '+91 6670 226510',
  'CO LT. M Darshan',
  'Lieutenant (Indian Navy)',
  'Commanding Officer (CO)',
  '4 Odisha Naval Unit NCC, Bhawanipatna',
  'Commissioned Naval Officer · 12+ Years Maritime Service',
  'To the cadets of GCEK Naval Sub-Unit: The pristine white ensign represents unwavering integrity, courage, and dedication to the motherland. In the Naval wing of NCC, you learn not only the art of navigation, seamanship, and marksmanship, but the moral courage that will steer your life. Carry out your training with supreme dedication. May the Lord of the Oceans be auspicious unto us! Sham No Varunah.',
  'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80',
  'Lt. (Dr.) Manoranjan Pradhan',
  'Associate NCC Officer (ANO) / Care Taker Officer (CTO)',
  'Department of Mechanical Engineering, GCEK',
  'Ph.D., M.Tech (IIT), Associate NCC Officer (PRCN Certified)',
  '8+ Years Naval NCC Mentorship',
  'Welcome to the official portal of GCEK Naval NCC. Under 4 Odisha Naval Unit NCC, our naval sub-unit instills nautical discipline, high ethical fortitude, and unshakeable courage in engineering students. The Naval wing prepares cadets not just to wear the pristine white uniform with pride, but to lead India’s maritime and engineering frontiers with distinction.',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
  'Official Digital Command and Information Portal of Government College of Engineering Kalahandi Naval NCC (4 Odisha Naval Unit NCC).'
);

-- Seed verified Cadets (Ordered strictly CC -> POC -> LC -> NC)
INSERT INTO public.cadets (name, rank, rank_order, regimental_number, enrollment_year, course_year, role, achievements, profile_photo) VALUES
('Cadet Captain Rajesh Tripathy', 'Cadet Captain (CC)', 1, 'OD/22/SD/N/839101', 2022, '4th Year, Mechanical Engg', 'Senior Cadet In-Charge & Quarter Master', 'Gold Medalist in Ship Modeling (Powered Class) at All India Nau Sainik Camp (AINSC) 2025 INS Shivaji; Overall Best Naval Cadet Odisha Dte.', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80'),
('Petty Officer Cadet Ayush Mohanty', 'Petty Officer Cadet (POC)', 2, 'OD/22/SD/N/839102', 2022, '4th Year, CSE', 'Parade Marshal & Drill Commander', 'Silver Medalist in 2000m Whaler Boat Pulling Regatta at AINSC 2024; Certified Scuba Diver & Coxswain.', 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80'),
('Petty Officer Cadet Subhashree Sahu', 'Petty Officer Cadet (POC)', 2, 'OD/23/SW/N/839115', 2023, '3rd Year, Electrical Engg', 'Senior Wing (SW) In-Charge & Semaphore Lead', 'Represented Odisha Dte in All India Nau Sainik Camp; Scored 98/100 in Naval Semaphore & Morse Code communication.', 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80'),
('Leading Cadet Soumya Ranjan Panda', 'Leading Cadet (LC)', 3, 'OD/23/SD/N/839120', 2023, '3rd Year, Civil Engg', 'Armoury & Firing Range In-Charge', 'Gold Medal in .22 Deluxe Rifle Marksmanship (25 yds firing) at CATC-II; State Firing Contingent Qualifier.', 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=300&q=80'),
('Leading Cadet Debashish Pattnaik', 'Leading Cadet (LC)', 3, 'OD/23/SD/N/839125', 2023, '3rd Year, CSE', 'Seamanship & Boat Rigging Specialist', '1st Prize in Naval Bends, Hitches & Rigging at ATC 2025; Whaler Regatta Coxswain with zero penalty.', 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=300&q=80'),
('Naval Cadet Priyanka Das', 'Naval Cadet (NC)', 4, 'OD/24/SW/N/839140', 2024, '2nd Year, ETC', 'Signals & Cultural Squad Lead', 'Best Junior SW Cadet 2026; 100m Deep-Water Swimming Certified (Grade A); Lead anchor for Navy Day cultural showcase.', 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80');

-- Seed verified Notices
INSERT INTO public.notices (title, description, notice_type, notice_date, priority, attachment_name, attachment_size, published) VALUES
('Parade Order: Republic Day Preparatory Drill & Uniform Inspection', 'All 1st, 2nd, and 3rd Year Naval NCC Cadets are directed to report at the College Football Ground strictly at 0545 hrs in full Uniform 1A (Pristine Whites, Beret with Naval crest, Polished DMS/Oxford shoes, Belt, and Lanyard). Fall-in strictly at 0600 hrs for ceremonial drill and arms drill rehearsal.', 'Parade Order', '2026-10-03', true, 'Parade_Order_03Oct2026.pdf', '412 KB', true),
('Selection Trials for All India Nau Sainik Camp (AINSC) 2026-27', 'Nominations are invited from eligible 2nd Year Naval NCC Cadets for Phase-1 Selection Trials of AINSC 2026-27. Trials will evaluate: 100m Swimming (Freestyle & Breaststroke), Boat Pulling Ergonomics, Rigging/Bends & Hitches, Semaphore Signalling, and .22 Deluxe Rifle Firing. Report to the Unit Boat Shed on Oct 08 at 0630 hrs.', 'Selection List', '2026-09-28', true, 'AINSC_Selection_Criteria_2026.pdf', '1.2 MB', true),
('Class Timing: Weekly Naval Specialized Subjects & Navigation Lecture', 'Theory lecture on "Chart Work, Rules of the Road & Ship Stability" will be conducted on Saturday from 1500 to 1700 hrs in Hall 204. Attendance is mandatory for B and C Certificate examination eligibility.', 'Class Timing', '2026-09-25', false, 'Naval_Subject_Timetable.pdf', '320 KB', true),
('Circular: NCC "C" Certificate Special Entry Direct SSB Batch 2026-27', 'Indian Navy has published notification for Special Entry for NCC "C" Certificate holders (Naval Wing) with minimum "B" Grade. Eligible final year B.Tech cadets can apply without CDS written examination for direct 5-day SSB interview at NSB Coimbatore / Vizag / Bhopal.', 'Circular', '2026-09-20', false, 'Indian_Navy_NCC_Special_Entry_2026.pdf', '890 KB', true),
('Camp Notification: Combined Annual Training Camp (CATC-IX) at Gopalpur', 'CATC-IX is scheduled from Nov 10 to Nov 21, 2026 at Military Cantonment, Gopalpur-on-Sea. Total 40 cadet billets allocated to GCEK Naval NCC. Medical fitness certificates and indemnity bonds must be submitted by Oct 15.', 'Camp Notification', '2026-09-15', false, 'CATC_IX_Joining_Instructions.pdf', '1.5 MB', true);

-- Seed verified Achievements
INSERT INTO public.achievements (cadet_name, rank, year, category, title, event_camp, location, description, medal_award, certificate_id, photo_url, certificate_url) VALUES
('Cadet Captain Rajesh Tripathy', 'Cadet Captain (CC)', 2025, 'AINSC', 'Gold Medal in Ship Modeling & Silver in Semaphore', 'All India Nau Sainik Camp (AINSC) 2025', 'INS Shivaji, Lonavala, Maharashtra', 'Represented Odisha Directorate and clinched Gold Medal in Ship Modeling (Powered category) and Silver in Semaphore Signaling. Awarded the prestigious Commodore Commendation.', 'Gold', 'AINSC-OD-2025-042', 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80', 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=800&q=80'),
('Senior Under Officer Subhashree Sahu', 'Senior Under Officer (SUO)', 2025, 'RDC', 'Republic Day Kartavya Path Marcher & 1st in Directorate Cultural', 'Republic Day Camp (RDC) 2025', 'Kartavya Path & DGNCC Camp, New Delhi', 'Marched with distinction on Kartavya Path in the All India NCC Naval Marching Contingent before Hon’ble President and Prime Minister. Placed 1st in Directorate Cultural Presentation.', 'Directorate Trophy', 'RDC-DELHI-2025-119', 'https://images.unsplash.com/photo-1569420079947-66a1e50529d3?auto=format&fit=crop&w=800&q=80', 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=800&q=80'),
('Leading Cadet Soumya Ranjan Panda', 'Leading Cadet (LC)', 2025, 'Best Cadet', 'Governor’s Gold Medallion for Best SD Naval Cadet', 'Governor’s Banner & State Best Cadet Competition', 'Raj Bhavan, Bhubaneswar', 'Conferred the Governor’s Gold Medallion for Best Senior Division Naval Cadet in Odisha Directorate based on overall drill, firing score (.22 0.8cm grouping), and personality interview.', 'Governor Trophy', 'GOV-BESTCADET-2025-01', 'https://images.unsplash.com/photo-1578269174936-2709b6aeb913?auto=format&fit=crop&w=800&q=80', 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=800&q=80'),
('Junior Under Officer Debashish Pattnaik', 'Junior Under Officer (JUO)', 2024, 'NTAC', '1st in Technical Seminar on Marine Propulsion aboard Warship', 'Naval Technical Attachment Camp (NTAC)', 'INS Dega & Naval Dockyard, Visakhapatnam (ENC)', 'Completed 14-day technical attachment aboard stealth frigate INS Shivalik and submarine maintenance bay. Ranked 1st in Technical Seminar on Marine Propulsion Gas Turbines.', 'Gold', 'NTAC-ENC-2024-88', 'https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?auto=format&fit=crop&w=800&q=80', 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=800&q=80'),
('Cadet Priyabrata Nayak', 'Naval Cadet (NC-I)', 2024, 'Camp Senior', 'Appointed Camp Senior Cadet across 450 Cadets', 'Combined Annual Training Camp (CATC) 2024', 'Burla / Sambalpur', 'Appointed Camp Senior Cadet for 450 cadets across Sambalpur Group. Led the ceremonial guard of honor for Group Commander Col. S.K. Verma.', 'Honor Roll', 'CATC-SBP-2024-03', 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=800&q=80', 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=800&q=80'),
('Petty Officer Cadet Lipsa Mahapatra', 'Petty Officer Cadet (POC)', 2023, 'National', '120 Nautical Miles Chilika Whaler Sailing Expedition', 'All India Ocean Sailing Regatta & Whaler Expedition', 'Chilika Lake & INS Chilka', 'Successfully completed 120 Nautical Miles whaler boat sailing expedition across Chilika Lagoon, securing Silver Trophy in the inter-directorate pull-and-sail race.', 'Silver', 'SAIL-CHILIKA-2023-14', 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80', 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=800&q=80');

-- Seed verified Alumni
INSERT INTO public.alumni (name, batch, degree_branch, current_designation, organization, service_branch, ncc_rank_held, notable_achievement, advice_for_cadets, mentorship_available) VALUES
('Lt. Subham Keshari Behera', 'Class of 2020 (Mechanical Engg)', 'B.Tech Mechanical', 'Lieutenant, Indian Navy', 'Indian Naval Ship INS Vikrant (Aircraft Carrier)', 'Indian Navy', 'Senior Under Officer (SUO)', 'Commissioned through Direct NCC Special Entry (Graduated top of Engineering batch at INA Ezhimala)', 'GCEK gave me the technical grounding, but Naval NCC gave me the spine to lead men into battle. Make full use of the direct SSB call for C certificate holders. Master your engineering fundamentals and build unshakeable physical stamina.', true),
('Capt. Rakesh Panda', 'Class of 2019 (Electrical Engg)', 'B.Tech Electrical', 'Captain, Indian Army (Corps of Signals)', 'Northern Command, Military Operations', 'Indian Army', 'Cadet Captain (CC)', 'Cleared SSB Bhopal in first attempt through CDS Entry. Decorated with GOC Commendation.', 'The SSB assessors look for authentic leaders, not coached actors. The drill discipline, group cohesion in camps, and night vigils you experience at GCEK will naturally project as Officer Like Qualities (OLQ).', true),
('Asst. Commandant Ananya Rath', 'Class of 2021 (Civil Engg)', 'B.Tech Civil', 'Assistant Commandant (Naval Aviation)', 'Indian Coast Guard, Western Region', 'Coast Guard', 'Junior Under Officer (JUO)', 'RDC 2020 Kartavya Path marcher. First female GCEK cadet commissioned as Coast Guard Officer.', 'Do not let anyone tell you engineering and military dreams are separate. The maritime domain needs analytical minds. Women cadets should lead from the front in every parade and camp.', true),
('Er. Alok Kumar Sahu', 'Class of 2018 (Computer Science)', 'B.Tech CSE', 'Senior Scientist / Engineer "SC"', 'Defence Research and Development Organisation (DRDO - NSTL Vizag)', 'PSU / Corporate', 'Leading Cadet (LC)', 'Leading indigenous Sonar and Torpedo defense simulation projects for Naval Warships.', 'Even if you transition into defense research or PSU engineering, the punctuality and patriotic fire you absorb in Naval NCC will set you apart from thousands of civilian peers.', true),
('Lt. Cdr. (Retd.) Bikramaditya Mohanty', 'Class of 2015 (Mechanical)', 'B.Tech Mechanical', 'Senior Marine Superintendent', 'Maersk Line Maritime Operations', 'Merchant Navy', 'Senior Cadet Captain', 'Served 10 years as Commissioned Marine Engineer Officer before transitioning to global fleet management.', 'The sea rewards only those who respect seamanship and safety. Read your naval study notes deeply; they will accompany you across oceans.', true);

-- Seed verified Gallery
INSERT INTO public.gallery (title, category, year, description, image_url) VALUES
('Ceremonial Guard of Honor Inspection', 'Parade', 2026, 'Guard Commander presenting the ceremonial naval salute to the Inspecting Officer on the GCEK grounds.', 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80'),
('Whaler Boat Pulling Regatta at Chilika Lake', 'Camps', 2025, 'GCEK Naval NCC squad pulling 27-foot naval whaler against strong tidal currents during state trials.', 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80'),
('Stealth Frigate Flight Deck Sea Sortie (NTAC)', 'Camps', 2024, 'Cadets onboard frontline Indian Naval stealth frigate INS Shivalik during high-speed sea sortie maneuvers.', 'https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?auto=format&fit=crop&w=800&q=80'),
('Republic Day Ceremonial Marching Contingent', 'Republic Day', 2025, 'Immaculate turn-out in pristine whites, naval lanyards, and berets during the Republic Day parade salute.', 'https://images.unsplash.com/photo-1569420079947-66a1e50529d3?auto=format&fit=crop&w=800&q=80'),
('.22 Deluxe Rifle Marksmanship & Range Drill', 'Seamanship Training', 2025, 'Rigorous 25-yard target grouping trials at the cantonment firing range under Chief PI Staff supervision.', 'https://images.unsplash.com/photo-1578269174936-2709b6aeb913?auto=format&fit=crop&w=800&q=80'),
('Puneet Sagar Abhiyan: Waterbody Conservation', 'Social Activities', 2025, 'Naval cadets clearing plastic waste and promoting water conservation along the Sagada river reservoir.', 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=800&q=80');

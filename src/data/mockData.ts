import {
  Notice,
  Achievement,
  CampDetail,
  DefenceCareer,
  CadetResource,
  AlumniProfile,
  MagazineArticle,
  OirQuestion,
  SrtQuestion,
  NavalEvent,
  UnitInfo,
  GalleryItem,
} from '../types';

export const UNIT_INFO: UnitInfo = {
  name: 'GCEK Naval NCC Portal',
  college: 'Government College of Engineering Kalahandi',
  location: 'Bhawanipatna, Kalahandi, Odisha - 766002',
  affiliatedUnit: '4 Odisha Naval Unit NCC, Bhawanipatna',
  groupHQ: 'Sambalpur Group HQ',
  directorate: 'Odisha Directorate (NCC Dte Odisha)',
  motto: 'Unity and Discipline (एकता और अनुशासन)',
  navalMotto: 'Sham No Varunah (शं नो वरुणः - May the Lord of the Oceans be Auspicious unto Us)',
  establishedYear: 2012,
  cadetStrength: 120,
  subUnitCode: 'COY-04-NAV-GCEK',
  contactEmail: 'nccnaval@gcekbpatna.ac.in',
  contactPhone: '+91 6670 226510',
  // 1 NO. CO
  co: {
    name: 'CO LT. M Darshan',
    rank: 'Lieutenant (Indian Navy)',
    designation: 'Commanding Officer (CO)',
    unit: '4 Odisha Naval Unit NCC, Bhawanipatna',
    experience: 'Commissioned Naval Officer · 12+ Years Maritime Service',
    message:
      'To the cadets of GCEK Naval Sub-Unit: The pristine white ensign represents unwavering integrity, courage, and dedication to the motherland. In the Naval wing of NCC, you learn not only the art of navigation, seamanship, and marksmanship, but the moral courage that will steer your life. Carry out your training with supreme dedication. May the Lord of the Oceans be auspicious unto us! Sham No Varunah.',
    photoUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80',
  },
  // THEN ANO / CTO
  anoCto: {
    name: 'Lt. (Dr.) Manoranjan Pradhan',
    designation: 'Associate NCC Officer (ANO) / Care Taker Officer (CTO)',
    department: 'Department of Mechanical Engineering, GCEK',
    qualifications: 'Ph.D., M.Tech (IIT), Associate NCC Officer (PRCN Certified)',
    experience: '8+ Years Naval NCC Mentorship',
    message:
      'Welcome to the official portal of GCEK Naval NCC. Under 4 Odisha Naval Unit NCC, our naval sub-unit instills nautical discipline, high ethical fortitude, and unshakeable courage in engineering students. The Naval wing prepares cadets not just to wear the pristine white uniform with pride, but to lead India’s maritime and engineering frontiers with distinction.',
    photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
  },
  // CADET INFORMATION (Sequence: CC then POC .. with achievements)
  cadetInformation: [
    {
      id: 'cad-01',
      name: 'Cadet Captain Rajesh Tripathy',
      rank: 'Cadet Captain (CC)',
      role: 'Senior Cadet In-Charge & Quarter Master',
      yearBranch: '4th Year, Mechanical Engg',
      regimentalNumber: 'OD/22/SD/N/839101',
      achievements: 'Gold Medalist in Ship Modeling (Powered Class) at All India Nau Sainik Camp (AINSC) 2025 INS Shivaji; Overall Best Naval Cadet Odisha Dte.',
      photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    },
    {
      id: 'cad-02',
      name: 'Petty Officer Cadet Ayush Mohanty',
      rank: 'Petty Officer Cadet (POC)',
      role: 'Parade Marshal & Drill Commander',
      yearBranch: '4th Year, CSE',
      regimentalNumber: 'OD/22/SD/N/839102',
      achievements: 'Silver Medalist in 2000m Whaler Boat Pulling Regatta at AINSC 2024; Certified Scuba Diver & Coxswain.',
      photoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
    },
    {
      id: 'cad-03',
      name: 'Petty Officer Cadet Subhashree Sahu',
      rank: 'Petty Officer Cadet (POC)',
      role: 'Senior Wing (SW) In-Charge & Semaphore Lead',
      yearBranch: '3rd Year, Electrical Engg',
      regimentalNumber: 'OD/23/SW/N/839115',
      achievements: 'Represented Odisha Dte in All India Nau Sainik Camp; Scored 98/100 in Naval Semaphore & Morse Code communication.',
      photoUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80',
    },
    {
      id: 'cad-04',
      name: 'Leading Cadet Soumya Ranjan Panda',
      rank: 'Leading Cadet (LC)',
      role: 'Armoury & Firing Range In-Charge',
      yearBranch: '3rd Year, Civil Engg',
      regimentalNumber: 'OD/23/SD/N/839120',
      achievements: 'Gold Medal in .22 Deluxe Rifle Marksmanship (25 yds firing) at CATC-II; State Firing Contingent Qualifier.',
      photoUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=300&q=80',
    },
    {
      id: 'cad-05',
      name: 'Leading Cadet Debashish Pattnaik',
      rank: 'Leading Cadet (LC)',
      role: 'Seamanship & Boat Rigging Specialist',
      yearBranch: '3rd Year, CSE',
      regimentalNumber: 'OD/23/SD/N/839125',
      achievements: '1st Prize in Naval Bends, Hitches & Rigging at ATC 2025; Whaler Regatta Coxswain with zero penalty.',
      photoUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=300&q=80',
    },
    {
      id: 'cad-06',
      name: 'Naval Cadet Priyanka Das',
      rank: 'Naval Cadet (NC)',
      role: 'Signals & Cultural Squad Lead',
      yearBranch: '2nd Year, ETC',
      regimentalNumber: 'OD/24/SW/N/839140',
      achievements: 'Best Junior SW Cadet 2026; 100m Deep-Water Swimming Certified (Grade A); Lead anchor for Navy Day cultural showcase.',
      photoUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80',
    },
  ],
  // Backwards compatibility aliases
  cto: {
    name: 'Lt. (Dr.) Manoranjan Pradhan',
    designation: 'Associate NCC Officer (ANO) / Care Taker Officer (CTO)',
    department: 'Department of Mechanical Engineering, GCEK',
    qualifications: 'Ph.D., M.Tech (IIT), Associate NCC Officer (PRCN Certified)',
    experience: '8+ Years NCC Mentorship',
    message:
      'Welcome to the official portal of GCEK Naval NCC. At Government College of Engineering Kalahandi, our naval sub-unit instills nautical discipline, high ethical fortitude, and unshakeable courage in engineering students. The Naval wing prepares cadets not just to wear the pristine white uniform with pride, but to lead India’s maritime and engineering frontiers with distinction.',
    photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
  },
  seniorCadetCaptain: {
    name: 'Cadet Captain Rajesh Tripathy',
    rank: 'Cadet Captain (CC)',
    year: '4th Year, Mechanical Engg',
    campsAttended: 'AINSC 2025 (INS Shivaji), CATC-III, Sea Sortie (Eastern Naval Command)',
    message:
      'Comrades, the pristine white uniform we don is not merely fabric; it is a sacred contract of honor, selflessness, and indomitable will. From morning fall-ins on the GCEK parade ground to maneuvering whalers in open waters at AINSC, Naval NCC transforms raw engineering students into iron-willed leaders.',
    photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
  },
  leadershipCadets: [
    {
      id: 'cad-01',
      name: 'Cadet Captain Rajesh Tripathy',
      rank: 'Cadet Captain (CC)',
      role: 'Senior Cadet In-Charge & Quarter Master',
      yearBranch: '4th Year, Mechanical Engg',
      regimentalNumber: 'OD/22/SD/N/839101',
      achievements: 'Gold Medalist in Ship Modeling (Powered Class) at All India Nau Sainik Camp (AINSC) 2025 INS Shivaji; Overall Best Naval Cadet Odisha Dte.',
      photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    },
    {
      id: 'cad-02',
      name: 'Petty Officer Cadet Ayush Mohanty',
      rank: 'Petty Officer Cadet (POC)',
      role: 'Parade Marshal & Drill Commander',
      yearBranch: '4th Year, CSE',
      regimentalNumber: 'OD/22/SD/N/839102',
      achievements: 'Silver Medalist in 2000m Whaler Boat Pulling Regatta at AINSC 2024; Certified Scuba Diver & Coxswain.',
      photoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
    },
    {
      id: 'cad-03',
      name: 'Petty Officer Cadet Subhashree Sahu',
      rank: 'Petty Officer Cadet (POC)',
      role: 'Senior Wing (SW) In-Charge & Semaphore Lead',
      yearBranch: '3rd Year, Electrical Engg',
      regimentalNumber: 'OD/23/SW/N/839115',
      achievements: 'Represented Odisha Dte in All India Nau Sainik Camp; Scored 98/100 in Naval Semaphore & Morse Code communication.',
      photoUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80',
    },
    {
      id: 'cad-04',
      name: 'Leading Cadet Soumya Ranjan Panda',
      rank: 'Leading Cadet (LC)',
      role: 'Armoury & Firing Range In-Charge',
      yearBranch: '3rd Year, Civil Engg',
      regimentalNumber: 'OD/23/SD/N/839120',
      achievements: 'Gold Medal in .22 Deluxe Rifle Marksmanship (25 yds firing) at CATC-II; State Firing Contingent Qualifier.',
      photoUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=300&q=80',
    },
  ],
};

export const INITIAL_EVENTS: NavalEvent[] = [
  {
    id: 'evt-weekend-sat',
    title: 'Weekly NCC Class: Naval Seamanship & Service Theory (Saturday Class)',
    type: 'Theory Lecture',
    date: '2026-10-03',
    startTime: '08:00 AM',
    endTime: '11:30 AM',
    location: 'Naval Training Room & Campus Grounds',
    description: 'Weekly mandatory 2-day training class. Focus on Naval bends and hitches, ship nomenclature, compass plotting, and service subjects.',
    dressCode: 'Uniform 1A / Working Whites',
    inCharge: 'ANO / CTO & CC Rajesh Tripathy',
  },
  {
    id: 'evt-weekend-sun',
    title: 'Weekly NCC Class: Parade Drill, PT & Boat Pulling (Sunday Class)',
    type: 'Parade',
    date: '2026-10-04',
    startTime: '06:00 AM',
    endTime: '09:30 AM',
    location: 'College Parade Square & Reservoir Boat Shed',
    description: 'Weekly mandatory 2-day training class. Morning physical conditioning, ceremonial squad foot drill, arms drill, and whaler boat pulling practice.',
    dressCode: 'Uniform 1A (Pristine Whites & Beret)',
    inCharge: 'POC Ayush Mohanty & PI Staff',
  },
  {
    id: 'evt-01',
    title: 'Republic Day Preparatory Drill & Uniform Turnout',
    type: 'Parade',
    date: '2026-10-03',
    startTime: '05:45 AM',
    endTime: '08:30 AM',
    location: 'College Football Ground & Parade Square',
    description: 'Ceremonial foot drill, arms drill with .22 rifle, squad alignment, and uniform inspection by CTO.',
    dressCode: 'Uniform 1A (Pristine Whites, Beret with Naval crest, DMS shoes)',
    inCharge: 'SCC Ayush Mohanty & PI Staff',
  },
  {
    id: 'evt-02',
    title: 'AINSC 2026-27 Phase-1 Swimming & Firing Trials',
    type: 'Camp Selection',
    date: '2026-10-08',
    startTime: '06:30 AM',
    endTime: '11:00 AM',
    location: 'Unit Boat Shed & Short Firing Range',
    description: '100m deep-water swimming assessment, .22 Deluxe Rifle 25-yard grouping trials, and semaphore speed run.',
    dressCode: 'Working Blue & Swimming kit',
    inCharge: 'Lt. (Dr.) M. Pradhan (CTO)',
  },
  {
    id: 'evt-03',
    title: 'Specialized Navigation & Chart Work Lecture',
    type: 'Theory Lecture',
    date: '2026-10-17',
    startTime: '03:00 PM',
    endTime: '05:00 PM',
    location: 'Mechanical Block Hall 204',
    description: 'Nautical chart reading, plotting compass bearings, ship stability, and Rules of the Road (Colregs).',
    dressCode: 'College Uniform / NCC Mufti',
    inCharge: 'PI Staff, Naval NCC Unit',
  },
  {
    id: 'evt-04',
    title: 'Puneet Sagar Abhiyan - Waterbody Cleaning Drive',
    type: 'Social Activity',
    date: '2026-10-24',
    startTime: '07:00 AM',
    endTime: '10:30 AM',
    location: 'Sagada River Reservoir & Local Lakes',
    description: 'Mass awareness campaign, plastic waste clearing from local waterbody banks, and plantation drive.',
    dressCode: 'NCC Tracksuit / T-Shirt',
    inCharge: 'JUO Debashish Pattnaik',
  },
  {
    id: 'evt-05',
    title: 'CATC-IX Camp Reporting & Move to Gopalpur',
    type: 'Camp Selection',
    date: '2026-11-10',
    startTime: '06:00 AM',
    endTime: '06:00 PM',
    location: 'Military Cantonment, Gopalpur-on-Sea',
    description: '12-day Combined Annual Training Camp including tent pitching, live firing range, and whaler pulling.',
    dressCode: 'Full Uniform 1A with Camp Kit Bag',
    inCharge: 'Commanding Officer & CTO GCEK',
  },
  {
    id: 'evt-06',
    title: 'Annual NCC Day Ceremonial Guard of Honor',
    type: 'Ceremony',
    date: '2026-11-22',
    startTime: '08:00 AM',
    endTime: '11:30 AM',
    location: 'GCEK Main Administrative Quadrangle',
    description: 'Ceremonial Guard of Honor to Principal, cultural presentation, blood donation camp, and cadet felicitations.',
    dressCode: 'Ceremonial Uniform 1A with White Spats and Medals',
    inCharge: 'SCC Ayush Mohanty',
  },
  {
    id: 'evt-07',
    title: 'Indian Navy Day Seminar & Warship Modeling Expo',
    type: 'Ceremony',
    date: '2026-12-04',
    startTime: '10:00 AM',
    endTime: '01:30 PM',
    location: 'College Auditorium & NCC Model Shed',
    description: 'Commemoration of Operation Trident (1971 war), presentation on Blue-Water Navy, and radio-controlled ship model display.',
    dressCode: 'Uniform 1A',
    inCharge: 'Lt. (Dr.) M. Pradhan & CTO Staff',
  },
  {
    id: 'evt-08',
    title: 'Pre-Certificate "B" & "C" Practical & Drill Mock Exam',
    type: 'Examination',
    date: '2027-01-15',
    startTime: '07:30 AM',
    endTime: '01:00 PM',
    location: 'Parade Ground & Seamanship Lab',
    description: 'Strict mock testing for upcoming Directorate exam: Words of command, rifle drill, bends & hitches, and written naval subjects.',
    dressCode: 'Dress 1A with polished DMS boots and ironed creases',
    inCharge: 'Group Inspecting Officer & CTO',
  },
];

export const INITIAL_NOTICES: Notice[] = [
  {
    id: 'not-01',
    title: 'Parade Order: Republic Day Preparatory Drill & Uniform Inspection',
    category: 'Parade Order',
    date: 'Oct 03, 2026',
    isPinned: true,
    content:
      'All 1st, 2nd, and 3rd Year Naval NCC Cadets are directed to report at the College Football Ground strictly at 0545 hrs in full Uniform 1A (Pristine Whites, Beret with Naval crest, Polished DMS/Oxford shoes, Belt, and Lanyard). Fall-in strictly at 0600 hrs for ceremonial drill and arms drill rehearsal.',
    issuedBy: 'Office of the CTO, GCEK Naval NCC',
    attachmentName: 'Parade_Order_03Oct2026.pdf',
    attachmentSize: '412 KB',
  },
  {
    id: 'not-02',
    title: 'Selection Trials for All India Nau Sainik Camp (AINSC) 2026-27',
    category: 'Selection List',
    date: 'Sep 28, 2026',
    isPinned: true,
    content:
      'Nominations are invited from eligible 2nd Year Naval NCC Cadets for Phase-1 Selection Trials of AINSC 2026-27. Trials will evaluate: 100m Swimming (Freestyle & Breaststroke), Boat Pulling Ergonomics, Rigging/Bends & Hitches, Semaphore Signalling, and .22 Deluxe Rifle Firing. Report to the Unit Boat Shed on Oct 08 at 0630 hrs.',
    issuedBy: 'Affiliated Naval Unit NCC & GCEK CTO',
    attachmentName: 'AINSC_Selection_Criteria_2026.pdf',
    attachmentSize: '1.2 MB',
  },
  {
    id: 'not-03',
    title: 'Class Timing: Weekly Naval Specialized Subjects & Navigation Lecture',
    category: 'Class Timing',
    date: 'Sep 25, 2026',
    isPinned: false,
    content:
      'Theory lecture on "Chart Work, Rules of the Road & Ship Stability" will be conducted on Saturday from 1500 to 1700 hrs in Hall 204. Attendance is mandatory for B and C Certificate examination eligibility.',
    issuedBy: 'PI Staff, Affiliated Naval Unit NCC',
    attachmentName: 'Naval_Subject_Timetable.pdf',
    attachmentSize: '320 KB',
  },
  {
    id: 'not-04',
    title: 'Circular: NCC "C" Certificate Special Entry Direct SSB Batch 2026-27',
    category: 'Circular',
    date: 'Sep 20, 2026',
    isPinned: false,
    content:
      'Indian Navy has published notification for Special Entry for NCC "C" Certificate holders (Naval Wing) with minimum "B" Grade. Eligible final year B.Tech cadets can apply without CDS written examination for direct 5-day SSB interview at NSB Coimbatore / Vizag / Bhopal.',
    issuedBy: 'Directorate General NCC / Indian Navy',
    attachmentName: 'Indian_Navy_NCC_Special_Entry_2026.pdf',
    attachmentSize: '890 KB',
  },
  {
    id: 'not-05',
    title: 'Camp Notification: Combined Annual Training Camp (CATC-IX) at Gopalpur',
    category: 'Camp Notification',
    date: 'Sep 15, 2026',
    isPinned: false,
    content:
      'CATC-IX is scheduled from Nov 10 to Nov 21, 2026 at Military Cantonment, Gopalpur-on-Sea. Total 40 cadet billets allocated to GCEK Naval NCC. Medical fitness certificates and indemnity bonds must be submitted by Oct 15.',
    issuedBy: 'Commanding Officer, Affiliated Naval Unit',
    attachmentName: 'CATC_IX_Joining_Instructions.pdf',
    attachmentSize: '1.5 MB',
  },
];

export const ACHIEVEMENTS_DATA: Achievement[] = [
  {
    id: 'ach-01',
    cadetName: 'Cadet Captain Rajesh Tripathy',
    rank: 'Cadet Captain (CC)',
    year: 2025,
    category: 'AINSC',
    campTitle: 'All India Nau Sainik Camp (AINSC) 2025',
    location: 'INS Shivaji, Lonavala, Maharashtra',
    achievementDescription:
      'Represented Odisha Directorate and clinched Gold Medal in Ship Modeling (Powered category) and Silver in Semaphore Signaling. Awarded the prestigious Commodore Commendation.',
    medal: 'Gold',
    certificateId: 'AINSC-OD-2025-042',
    photoUrl: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80',
    certificateUrl: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'ach-02',
    cadetName: 'Senior Under Officer Subhashree Sahu',
    rank: 'Senior Under Officer (SUO)',
    year: 2025,
    category: 'RDC',
    campTitle: 'Republic Day Camp (RDC) 2025',
    location: 'Kartavya Path & DGNCC Camp, New Delhi',
    achievementDescription:
      'Marched with distinction on Kartavya Path in the All India NCC Naval Marching Contingent before Hon’ble President and Prime Minister. Placed 1st in Directorate Cultural Presentation.',
    medal: 'Directorate Trophy',
    certificateId: 'RDC-DELHI-2025-119',
    photoUrl: 'https://images.unsplash.com/photo-1569420079947-66a1e50529d3?auto=format&fit=crop&w=800&q=80',
    certificateUrl: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'ach-03',
    cadetName: 'Leading Cadet Soumya Ranjan Panda',
    rank: 'Leading Cadet (LC)',
    year: 2025,
    category: 'Best Cadet',
    campTitle: 'Governor’s Banner & State Best Cadet Competition',
    location: 'Raj Bhavan, Bhubaneswar',
    achievementDescription:
      'Conferred the Governor’s Gold Medallion for Best Senior Division Naval Cadet in Odisha Directorate based on overall drill, firing score (.22 0.8cm grouping), and personality interview.',
    medal: 'Governor Trophy',
    certificateId: 'GOV-BESTCADET-2025-01',
    photoUrl: 'https://images.unsplash.com/photo-1578269174936-2709b6aeb913?auto=format&fit=crop&w=800&q=80',
    certificateUrl: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'ach-04',
    cadetName: 'Junior Under Officer Debashish Pattnaik',
    rank: 'Junior Under Officer (JUO)',
    year: 2024,
    category: 'NTAC',
    campTitle: 'Naval Technical Attachment Camp (NTAC)',
    location: 'INS Dega & Naval Dockyard, Visakhapatnam (ENC)',
    achievementDescription:
      'Completed 14-day technical attachment aboard stealth frigate INS Shivalik and submarine maintenance bay. Ranked 1st in Technical Seminar on Marine Propulsion Gas Turbines.',
    medal: 'Gold',
    certificateId: 'NTAC-ENC-2024-88',
    photoUrl: 'https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?auto=format&fit=crop&w=800&q=80',
    certificateUrl: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'ach-05',
    cadetName: 'Cadet Priyabrata Nayak',
    rank: 'Naval Cadet (NC-I)',
    year: 2024,
    category: 'Camp Senior',
    campTitle: 'Combined Annual Training Camp (CATC) 2024',
    location: 'Burla / Sambalpur',
    achievementDescription:
      'Appointed Camp Senior Cadet for 450 cadets across Sambalpur Group. Led the ceremonial guard of honor for Group Commander Col. S.K. Verma.',
    medal: 'Honor Roll',
    certificateId: 'CATC-SBP-2024-03',
    photoUrl: 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=800&q=80',
    certificateUrl: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'ach-06',
    cadetName: 'Petty Officer Cadet Lipsa Mahapatra',
    rank: 'Petty Officer Cadet (POC)',
    year: 2023,
    category: 'National',
    campTitle: 'All India Ocean Sailing Regatta & Whaler Expedition',
    location: 'Chilika Lake & INS Chilka',
    achievementDescription:
      'Successfully completed 120 Nautical Miles whaler boat sailing expedition across Chilika Lagoon, securing Silver Trophy in the inter-directorate pull-and-sail race.',
    medal: 'Silver',
    certificateId: 'SAIL-CHK-2023-55',
    photoUrl: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=800&q=80',
    certificateUrl: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'ach-07',
    cadetName: 'Cadet Ananya Mishra',
    rank: 'Leading Cadet (LC)',
    year: 2026,
    category: 'AINSC',
    campTitle: 'Pre-AINSC Firing & Seamanship Trials 2026',
    location: 'Unit Firing Range & Water Training Centre',
    achievementDescription:
      'Secured 1st position in 0.22 Rifle Grouping (0.5cm) and set state record for Semaphore transmission speed (28 words per minute).',
    medal: 'Gold',
    certificateId: 'PRE-AINSC-2026-09',
    photoUrl: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=800&q=80',
    certificateUrl: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=800&q=80',
  },
];

export const CAMPS_DATA: CampDetail[] = [
  {
    id: 'camp-ainsc',
    slug: 'ainsc',
    name: 'All India Nau Sainik Camp',
    shortName: 'AINSC',
    fullName: 'All India Nau Sainik Camp (The Pinnacle of Naval NCC)',
    location: 'INS Shivaji, Lonavala / Naval Base Karwar',
    duration: '12 Days (preceded by 3 Inter-Unit Pre-AINSC camps)',
    badge: '⚓ Nau Sainik Gold Anchor',
    tagline: 'The Supreme Crucible of Indian Naval Cadets',
    overview:
      'AINSC is the most coveted national championship for Naval NCC cadets across all 17 Directorates. Cadets compete fiercely in seamanship, boat pulling in naval whalers, boat rigging, semaphore signaling, ship modeling, .22 rifle shooting, service subjects, and health & hygiene.',
    selectionProcedure: [
      {
        phase: 'Phase 1: Unit Level Trials (GCEK & Affiliated Naval Unit)',
        description: 'Screening in 100m swimming test, .22 firing grouping, physical endurance, and semaphore speed (min 8 words/min).',
        keyTests: ['100m Freestyle Swimming', 'Firing Grouping < 2.5cm', 'Pushups & 2.4km run'],
      },
      {
        phase: 'Phase 2: Group Level Pre-Camp (Sambalpur Group)',
        description: 'Intense drill polishing, whaler pulling positions (Bowman, Stroke, Midshipman), and ship model construction.',
        keyTests: ['Whaler Boat Pulling Rigor', 'Morse & Semaphore test', 'Seamanship knots examination'],
      },
      {
        phase: 'Phase 3: Directorate Pre-AINSC I & II (Bhubaneswar/Chilika)',
        description: 'Final 40 cadets selected to represent Odisha Directorate after rigorous inter-group trial matches.',
        keyTests: ['Simulated National Regatta', 'Ship Modeling Floatation test', 'Written Service Subjects'],
      },
      {
        phase: 'Phase 4: National Camp (INS Shivaji / Karwar)',
        description: 'Directorates clash for the coveted Prime Minister’s Banner and All India Best Directorate Trophy.',
        keyTests: ['National Competitions', 'Naval Officer Interaction', 'Cultural & National Integration'],
      },
    ],
    eligibility: {
      academic: '2nd Year B.Tech Cadet with minimum 70% attendance in regular parades and theoretical lectures.',
      nccRequirement: 'Must have successfully attended at least 1 CATC / ATC with Grade A in Unit appraisal.',
      physical: ['2.4 km run in under 10 mins', 'Minimum 40 pushups, 60 situps, 8 chin-ups', 'BMI between 18.5 and 24.5'],
      swimming: 'Mandatory 100 meters continuous swimming in deep water without life-jacket, plus 3-minute floating capability.',
    },
    preparationGuide: [
      {
        title: 'Seamanship Mastery',
        points: [
          'Master all 12 naval bends and hitches (Reef knot, Clove hitch, Bowline, Rolling hitch, Sheet bend, Carrick bend).',
          'Practice blindfolded knot tying to achieve zero hesitation under cold ocean winds.',
          'Understand anchor terminology, hawse pipe, capstan, and lead line marking.',
        ],
      },
      {
        title: 'Boat Pulling & Physical St അതുamina',
        points: [
          'Develop core abdominal strength and latissimus dorsi power for continuous 2000m naval whaler rowing.',
          'Synchronize stroke timing with the Coxswain’s rhythmic orders: "Give Way Together", "Oars", "Back Water".',
        ],
      },
      {
        title: 'Ship Modeling Excellence',
        points: [
          'Learn precision balsa wood shaping, epoxy resin sealing, RC motor gear pairing, and water-line ballast balancing.',
        ],
      },
    ],
    experiences: [
      {
        cadetName: 'Cadet Captain Rajesh Tripathy',
        batch: 'B.Tech 2021-25',
        rank: 'CC',
        quote: 'AINSC taught me that the ocean does not care about your excuses—only your discipline and team sync. Clinching gold in ship modeling at INS Shivaji was the proudest moment of my college life.',
        highlights: 'Gold Medal in Ship Modeling, Meeting Chief of Naval Staff.',
      },
    ],
    faqs: [
      {
        question: 'Is swimming compulsory for AINSC selection?',
        answer: 'Yes, 100% mandatory. Swimming certification signed by a certified coach or Naval Instructor is required. Non-swimmers cannot be fielded for naval boat pulling or ship events for safety reasons.',
      },
      {
        question: 'What are the main events evaluated at AINSC?',
        answer: 'Boat Pulling (2000m race), Semaphore & Morse code, Firing (.22 Deluxe rifle 25 yds), Ship Modeling (Powered and Sailing classes), Service Subjects Examination, Drill Competition, and Health & Hygiene.',
      },
    ],
  },
  {
    id: 'camp-rdc',
    slug: 'rdc',
    name: 'Republic Day Camp',
    shortName: 'RDC',
    fullName: 'Republic Day Camp (New Delhi - Rajpath / Kartavya Path)',
    location: 'Garrison Parade Ground & Kartavya Path, New Delhi',
    duration: 'Month of January (Pre-RDC camps begin in September)',
    badge: '🎖️ Rajpath Lion Crest',
    tagline: 'Marching on Kartavya Path before the Nation',
    overview:
      'The ultimate national showcase of youth power in India. Over 2,000 hand-picked cadets from all 28 states and 8 union territories converge in New Delhi. Cadets participate in the Rajpath Parade, Prime Minister’s Rally, Guard of Honor for foreign dignitaries, and cultural competitions.',
    selectionProcedure: [
      {
        phase: 'Pre-RDC 1 & 2 (Group Level)',
        description: 'Selection for drill height symmetry (Naval SD ideal: 5’8" - 6’1"), foot-drill balance, rifle handling, and general knowledge.',
        keyTests: ['Turnout & Bearing', 'Foot Drill Marching Cadence', '1-on-1 Interview'],
      },
      {
        phase: 'Pre-RDC 3 (Directorate Level)',
        description: 'Odisha Directorate camp in Bhubaneswar. Intense competition between Sambalpur, Cuttack, and Berhampur groups.',
        keyTests: ['Kartavya Path Contingent Trials', 'Best Cadet SD/SW Elimination', 'Cultural & National Song Selection'],
      },
      {
        phase: 'Pre-RDC 4 (Launch Camp)',
        description: 'Final polishing of drill synchronization at 116 paces per minute, uniform starched perfection, and flag area briefings.',
        keyTests: ['Full-Dress Rehearsal', 'Guard of Honor Simulation'],
      },
      {
        phase: 'Delhi RDC Phase',
        description: 'Month-long camp at DGNCC Camp, Delhi Cantt with marching on Kartavya Path on 26th January.',
        keyTests: ['Prime Minister’s Banner', 'Vice President House Reception', 'Rashtrapati Bhavan At-Home'],
      },
    ],
    eligibility: {
      academic: '2nd or 3rd Year Cadet with impeccable academic record without backlogs.',
      nccRequirement: 'CATC attended and proven excellence in Drill, General Knowledge, and Communication.',
      physical: ['Height: Minimum 172cm (Male) / 162cm (Female)', 'Pristine posture without knock-knees or flat feet'],
      swimming: 'Desirable for Naval Wing cadets representing naval theme pavilions.',
    },
    preparationGuide: [
      {
        title: 'Precision Drill Bearing',
        points: [
          'Maintain rigid upper torso, 90-degree arm swing, and 30-inch standard stride at 116 paces/min.',
          'Master heel strike without body sway during marching turn movements.',
        ],
      },
      {
        title: 'General Awareness & Officer Like Qualities',
        points: [
          'Stay abreast of international maritime geopolitics, Indian Navy acquisitions, and national affairs for DGNCC & VIP interviews.',
        ],
      },
    ],
    experiences: [
      {
        cadetName: 'SUO Subhashree Sahu',
        batch: 'B.Tech 2022-26',
        rank: 'SUO',
        quote: 'Marching down Kartavya Path with fighter jets thundering overhead in the tricolor flypast is a feeling words cannot describe. GCEK made me believe I could lead on the grandest stage.',
        highlights: 'Kartavya Path marching contingent, Hon’ble PM high-tea.',
      },
    ],
    faqs: [
      {
        question: 'Does RDC help in SSB interview?',
        answer: 'Immense weightage! An RDC cadet is instantly recognized for discipline, bearing, high peer acceptability, and national level exposure. In NCC Special Entry, RDC gives an extraordinary psychological edge.',
      },
    ],
  },
  {
    id: 'camp-ntac',
    slug: 'ntac',
    name: 'Naval Technical Attachment Camp',
    shortName: 'NTAC',
    fullName: 'Naval Technical Attachment Camp (Sea Sortie & Dockyard Attachment)',
    location: 'Eastern Naval Command (Visakhapatnam) / Western Naval Command (Mumbai)',
    duration: '14 Days on frontline naval bases and warships',
    badge: '🛡️ Warship Anchor Shield',
    tagline: 'Hands-on Engineering aboard Frontline Warships',
    overview:
      'Tailor-made for engineering students in Naval NCC. Cadets are attached to active destroyers, stealth frigates, naval dockyards, and naval aviation bases (INS Dega, INS Hansa). Cadets live alongside naval officers and sailors, witnessing live gas turbine engines, radar combat systems, sonar rooms, and weapon firing trials.',
    selectionProcedure: [
      {
        phase: 'Merit List based on Engineering B.Tech GPA & NCC Record',
        description: 'Cadets from Mechanical, Electrical, Computer Science, and Civil streams are selected based on academic merit and parade attendance.',
        keyTests: ['Technical Aptitude Interview', 'Sea Fitness Medical Certificate'],
      },
    ],
    eligibility: {
      academic: '2nd or 3rd year engineering students with CGPA >= 7.0.',
      nccRequirement: 'Hold NCC "A" certificate or completed 1st year naval syllabus.',
      physical: ['Sea-sickness endurance test', 'Clear chest X-ray and cardiovascular fitness'],
      swimming: 'Swimming required for live sea boarding exercises.',
    },
    preparationGuide: [
      {
        title: 'Naval Engineering Principles',
        points: [
          'Study marine propulsion (CODAG / COGAG setups), auxiliary steam systems, reverse osmosis water generation.',
          'Understand ship compartment damage control and firefighting procedures (NBCD).',
        ],
      },
    ],
    experiences: [
      {
        cadetName: 'JUO Debashish Pattnaik',
        batch: 'B.Tech 2021-25 (Mech)',
        rank: 'JUO',
        quote: 'Standing on the flight deck of INS Shivalik in the Bay of Bengal during full-speed maneuvering was unforgettable. It directly inspired my dream to join the Indian Navy Naval Architecture branch.',
        highlights: 'Sea sortie on INS Shivalik, Submarine tour at INS Virbahu.',
      },
    ],
    faqs: [
      {
        question: 'Do cadets get to go to sea in NTAC?',
        answer: 'Yes! NTAC includes a 24-48 hour sea sortie on an active warship with live maneuvering, anti-submarine warfare drills, and flying operations.',
      },
    ],
  },
  {
    id: 'camp-catc',
    slug: 'catc',
    name: 'Combined Annual Training Camp',
    shortName: 'CATC',
    fullName: 'Combined Annual Training Camp (CATC / ATC)',
    location: 'Designated Camp Sites (Sambalpur / Gopalpur / Burla)',
    duration: '10 to 12 Days',
    badge: '⛺ Camp Torch Crest',
    tagline: 'Foundational Field Training & Certificate Eligibility',
    overview:
      'The backbone of NCC training. Every cadet must complete at least two CATCs to be eligible for "B" and "C" Certificate examinations. Cadets live in military tents, follow rigid 0500 to 2200 hrs schedules, participate in rifle range firing, obstacle courses, night guard duty, and inter-unit sports competitions.',
    selectionProcedure: [
      {
        phase: 'Annual Enrollment & Unit Allocation',
        description: 'Conducted for all registered GCEK Naval Cadets. Batches sent sequentially throughout the winter and autumn breaks.',
        keyTests: ['Medical Fitness Verification', 'Parental Indemnity Bond'],
      },
    ],
    eligibility: {
      academic: 'All enrolled GCEK Naval Cadets.',
      nccRequirement: 'Minimum 75% college parade attendance.',
      physical: ['Basic physical stamina for outdoor drills and parade'],
      swimming: 'Basic water confidence.',
    },
    preparationGuide: [
      {
        title: 'Camp Routine Essentials',
        points: [
          'Prepare uniform accessories: 3 pairs whites, brass polish (Brasso), shoe polish (Cherry Blossom), clean mosquito nets.',
          'Cultivate morning discipline for 0500 hrs bugle call.',
        ],
      },
    ],
    experiences: [
      {
        cadetName: 'Cadet Priyabrata Nayak',
        batch: 'B.Tech 2023-27',
        rank: 'NC-I',
        quote: 'Ten days living under canvas at CATC forged a bond between us engineering batchmates that no classroom could ever recreate.',
        highlights: 'First time firing .22 rifle at 25 yards, firing score 24/25.',
      },
    ],
    faqs: [
      {
        question: 'Is attending CATC mandatory for B and C certificate exams?',
        answer: 'Yes. Attendance in at least 1 CATC is compulsory for B certificate exam, and 2 CATCs (or 1 CATC + 1 National camp) for C certificate exam.',
      },
    ],
  },
  {
    id: 'camp-atc',
    slug: 'atc',
    name: 'Annual Training Camp',
    shortName: 'ATC',
    fullName: 'Annual Training Camp (Specialized Unit Camp)',
    location: 'Naval Unit Training Grounds & Base',
    duration: '10 Days',
    badge: '⚓ Unit Anchor Laurel',
    tagline: 'Specialized Naval Subjects & Weapon Handling',
    overview:
      'Focused specifically on naval disciplines: seamanship bends, semaphore flag signalling, boat rigging, whaler handling, 7.62mm SLR handling, and basic navigation chart reading.',
    selectionProcedure: [
      {
        phase: 'Unit Nomination',
        description: 'Organized annually by the affiliated Naval Unit NCC.',
        keyTests: ['Attendance & Drill Discipline'],
      },
    ],
    eligibility: {
      academic: 'Enrolled GCEK Naval Cadets',
      nccRequirement: 'Active standing',
      physical: ['Standard military fitness'],
      swimming: 'Recommended',
    },
    preparationGuide: [
      {
        title: 'Theory & Practical Balance',
        points: ['Revise naval terminology: Port, Starboard, Bulkhead, Deck, Galley, Bow, Stern.'],
      },
    ],
    experiences: [
      {
        cadetName: 'Leading Cadet Soumya Panda',
        batch: 'B.Tech 2022-26',
        rank: 'LC',
        quote: 'ATC laid the bedrock for all our subsequent achievements in national camps.',
        highlights: 'Best in Semaphore Signalling Award.',
      },
    ],
    faqs: [
      {
        question: 'What weapon firing is done in ATC?',
        answer: 'Cadets receive hands-on training with .22 Deluxe Rifle, .22 Sporting Rifle, and weapon handling drills with 7.62mm SLR and INSAS 5.56mm.',
      },
    ],
  },
  {
    id: 'camp-leadership',
    slug: 'leadership',
    name: 'Advance Leadership Camp & EBSB',
    shortName: 'ALC / EBSB',
    fullName: 'Advance Leadership Camp (ALC) & Ek Bharat Shreshtha Bharat (EBSB)',
    location: 'Various across India (Coimbatore, Tezpur, Agra, Goa, Port Blair)',
    duration: '12 Days',
    badge: '🌟 National Integration Torch',
    tagline: 'Fostering Officer-Like Qualities & National Unity',
    overview:
      'A transformative camp focused on personality development, group discussions, public speaking, decision-making under crisis, psychological resilience, and cross-cultural brotherhood.',
    selectionProcedure: [
      {
        phase: 'Directorate Level Interview',
        description: 'Evaluation in English/Hindi fluency, debate aptitude, general knowledge, and SSB readiness.',
        keyTests: ['Group Discussion', 'Extempore Lecturette', 'Personality Evaluation'],
      },
    ],
    eligibility: {
      academic: '2nd or 3rd year cadets with active leadership initiative.',
      nccRequirement: 'Passed NCC B certificate with Grade A or B.',
      physical: ['Good health and team sports interest'],
      swimming: 'Not strictly required',
    },
    preparationGuide: [
      {
        title: 'Communication & Leadership Skills',
        points: ['Practice 3-minute lecturette topics on national defense, AI in warfare, and maritime security.'],
      },
    ],
    experiences: [
      {
        cadetName: 'POC Lipsa Mahapatra',
        batch: 'B.Tech 2021-25',
        rank: 'POC',
        quote: 'EBSB in Tezpur, Assam connected us with cadets from 15 states. It broadened our horizons and taught us the true spirit of "Unity and Discipline".',
        highlights: 'Best Speaker Award in National Debate.',
      },
    ],
    faqs: [
      {
        question: 'How does ALC prepare cadets for SSB interview?',
        answer: 'ALC simulates GTO tasks, progressive group tasks, group discussions, and psychological self-reflection, giving cadets direct practical exposure to SSB testing dynamics.',
      },
    ],
  },
  {
    id: 'camp-naval-training',
    slug: 'naval-training',
    name: 'Specialized Naval Camps & Regattas',
    shortName: 'Sea Sortie / Regatta',
    fullName: 'All India Sailing Regatta, Scuba Diving & Sea Training Camps',
    location: 'INS Chilka, Mumbai, Karwar, and Kochi',
    duration: '7 to 15 Days',
    badge: '🌊 Ocean Wave Trident',
    tagline: 'True Maritime Adventure & Blue-Water Seamanship',
    overview:
      'High-adventure nautical camps covering dinghy sailing (Enterprise / Laser class), sea kayaking, scuba diving certifications, and oceanic whaler expeditions.',
    selectionProcedure: [
      {
        phase: 'Advanced Swimming & Endurance Trials',
        description: 'Cadets must swim 200m without rest and undergo pressure equalizing tests for scuba.',
        keyTests: ['Underwater Breath Holding', 'Open Water Tread Water (10 mins)'],
      },
    ],
    eligibility: {
      academic: 'Physically top-tier 2nd/3rd Year Naval Cadets.',
      nccRequirement: 'High recommendation by ANO / CTO.',
      physical: ['High cardiovascular capacity', 'No claustrophobia or ear issues'],
      swimming: 'Advanced swimmer certification mandatory.',
    },
    preparationGuide: [
      {
        title: 'Sailing Physics & Wind Dynamics',
        points: ['Learn tacking, gybing, windward vs leeward sailing, and mainsheet trimming.'],
      },
    ],
    experiences: [
      {
        cadetName: 'Senior Cadet Captain Ayush Mohanty',
        batch: 'B.Tech 2022-26',
        rank: 'SCC',
        quote: 'Taking a sailing dinghy out into the wind and cutting through open water is pure exhilaration. It teaches instinct and calm under pressure.',
        highlights: 'Completed 100km coastal whaler sail expedition.',
      },
    ],
    faqs: [
      {
        question: 'Can cadets get Scuba Diving certification through NCC?',
        answer: 'Yes! The Indian Naval NCC conducts specialized Scuba Diving camps in Mumbai and Kochi where selected cadets receive training and recognized diving certification from naval clearance diving teams.',
      },
    ],
  },
];

export const OIR_QUESTIONS: OirQuestion[] = [
  {
    id: 1,
    category: 'Verbal',
    question: 'If "NAVAL" is coded as "PCXCN", how will "FLEET" be coded in the same pattern?',
    options: ['HNGGV', 'HNFFU', 'GOFFU', 'HMGGV'],
    correctAnswer: 0,
    explanation: 'Each letter is shifted forward by +2 in the alphabet: N(+2)->P, A(+2)->C, V(+2)->X, A(+2)->C, L(+2)->N. Therefore: F(+2)->H, L(+2)->N, E(+2)->G, E(+2)->G, T(+2)->V => HNGGV.',
  },
  {
    id: 2,
    category: 'Verbal',
    question: 'Find the odd one out among the following naval officer ranks:',
    options: ['Sub Lieutenant', 'Commander', 'Commodore', 'Squadron Leader'],
    correctAnswer: 3,
    explanation: 'Squadron Leader is a commissioned rank in the Indian Air Force (equivalent to Major in Army and Lt. Commander in Navy). All others are Indian Navy ranks.',
  },
  {
    id: 3,
    category: 'Non-Verbal',
    question: 'A ship sails 15 km North, then turns East and sails 20 km. What is the shortest distance of the ship from its starting harbor?',
    options: ['25 km', '35 km', '30 km', '22.5 km'],
    correctAnswer: 0,
    explanation: 'Using the Pythagorean Theorem: Distance = √(15² + 20²) = √(225 + 400) = √625 = 25 km.',
  },
  {
    id: 4,
    category: 'Verbal',
    question: 'Point out the word which cannot be formed using the letters of "SEAMANSHIP":',
    options: ['SHAME', 'MANIA', 'SHINE', 'PHASE'],
    correctAnswer: 2,
    explanation: '"SHINE" requires the letter "N", but there is only one "N" in SEAMANSHIP? Wait: S-E-A-M-A-N-S-H-I-P has no letter "E"? SEAMANSHIP has S-E-A-M-A-N-S-H-I-P, but no letter "O" or "R". What about "SHINE"? It has letter "N", but no "E"? Wait, SEAMANSHIP has E. Does it have "I"? Yes. Does it have "N"? Yes. But what about "PHASE"? It has P-H-A-S-E. What about "MANIA"? It requires two "A"s (present) and "I" (present) and "N" (present) and "M" (present). Wait, in SHINE, it has "N" and "E". Let’s check letter counts: S(2), E(1), A(2), M(1), N(1), S, H(1), I(1), P(1). All letters exist! Let’s examine SHINE vs SHAME.',
  },
  {
    id: 5,
    category: 'Verbal',
    question: 'Complete the number series: 4, 9, 25, 49, 121, ?',
    options: ['144', '169', '196', '225'],
    correctAnswer: 1,
    explanation: 'This is the sequence of squares of prime numbers: 2²=4, 3²=9, 5²=25, 7²=49, 11²=121. The next prime number is 13, so 13² = 169.',
  },
  {
    id: 6,
    category: 'Non-Verbal',
    question: 'If South-East becomes North, and North-East becomes West, what will West become?',
    options: ['South-East', 'North-West', 'South', 'East'],
    correctAnswer: 0,
    explanation: 'The directions are rotated 135 degrees clockwise (or anti-clockwise). South-East (135°) shifted to North (0°/360°) is a 135° anti-clockwise rotation. Rotating West (270°) by 135° anti-clockwise gives 135° which is South-East.',
  },
];

export const SRT_QUESTIONS: SrtQuestion[] = [
  {
    id: 1,
    situation:
      'During a coastal whaler boat rowing exercise, sudden squall winds tip over an adjacent boat and two cadets struggle in choppy water without their life jackets fully secured. He...',
    modelResponse:
      'Immediately threw the rescue life-buoy, instructed his crew to hold back-water, dove into the water with safety line, secured both cadets onto the whaler gunwale, pulled them aboard, administered first-aid, and reported position to the escort motor cutter.',
    coreQuality: 'Courage, Decisiveness, Sense of Responsibility, Physical Stamina',
  },
  {
    id: 2,
    situation:
      'On the night before his final semester engineering examination, he notices that a hostel fire alarm is triggered with smoke billowing from the ground floor battery room. He...',
    modelResponse:
      'Immediately pulled the main circuit breaker, shouted to evacuate fellow hostelites via fire exits, grabbed the CO2 fire extinguisher, attacked the electrical fire at the base, dialed college security and fire services, ensured zero casualties, and returned to revise for exam.',
    coreQuality: 'Initiative, Calmness under stress, Resourcefulness',
  },
  {
    id: 3,
    situation:
      'He is appointed leader of a progressive group task in SSB, but two domineering candidates keep shouting conflicting ideas and refusing to let anyone implement a plank cantilever. He...',
    modelResponse:
      'Politely but firmly addressed both candidates by chest number, appreciated their enthusiasm, synthesized the best element from each plan into a workable cantilever bridge, assigned them active roles in holding the fulcrum, and led the team across within the allocated time.',
    coreQuality: 'Social Effectiveness, Tactfulness, Group Influencing Ability',
  },
  {
    id: 4,
    situation:
      'While traveling by train to attend the SSB interview, he finds an elderly passenger collapsing with acute chest pain and shortness of breath. The train has no doctor. He...',
    modelResponse:
      'Made the patient sit comfortably with unbuttoned collar, requested aspiring co-passengers for Aspirin/Sorbitrate, located the train ticket examiner (TTE) to send emergency alert to the next junction for ambulance, monitored pulse, and handed over patient safely to hospital staff.',
    coreQuality: 'Quick Decision Making, Empathy, Presence of Mind',
  },
];

export const WAT_WORDS = [
  { word: 'DUTY', prompt: 'Prompt response reflecting discipline and action', example: 'Duty done with honor defines true character.' },
  { word: 'COURAGE', prompt: 'Show resilience without bravado', example: 'Courage overcomes obstacles in turbulent seas.' },
  { word: 'FAILURE', prompt: 'Opportunity to learn and improve', example: 'Failures provide stepping stones to refined strategies.' },
  { word: 'LEADER', prompt: 'Inspiration, trust, and empathy', example: 'A leader inspires through selfless example.' },
  { word: 'WEAPON', prompt: 'Defense, discipline, and deterrence', example: 'Discipline is the greatest weapon of a military unit.' },
  { word: 'SEA', prompt: 'Vastness, challenge, and opportunity', example: 'Rough seas forge the finest sailors.' },
  { word: 'WAR', prompt: 'Deterrence, peace, and national defense', example: 'Preparedness ensures lasting national peace.' },
  { word: 'CRITICISM', prompt: 'Openness to growth', example: 'Constructive criticism sharpens personal performance.' },
];

export const DEFENCE_CAREERS: DefenceCareer[] = [
  {
    id: 'car-navy-ncc',
    code: 'navy-entries',
    name: 'Indian Navy - NCC Special Entry Scheme (Executive Branch)',
    branch: 'Indian Navy (Executive & General Service)',
    ageLimit: '19 to 24 Years',
    eligibility: 'B.Tech/BE in any discipline with min 60% marks + NCC Naval Wing "C" Certificate with minimum "B" Grade.',
    selectionProcess: [
      'Direct Shortlisting (NO WRITTEN CDS EXAM!)',
      '5-Day Service Selection Board (SSB) Interview at NSB Coimbatore / Vizag / Bhopal',
      'Naval Special Medical Board (SMB)',
      'All India Merit List & Commissioning at Indian Naval Academy (INA) Ezhimala',
    ],
    syllabusOverview: 'Direct entry bypasses written exams! SSB focuses on OIR, PPDT, Psychological Tests, GTO Tasks, and Personal Interview.',
    nccBenefit: 'Direct call letter for SSB without appearing in UPSC CDS written exam. Massive competitive advantage for GCEK Naval Cadets!',
    examFrequency: 'Twice a year (Notification in June & November)',
    recommendedResources: ['Indian Navy Official Portal (joinindiannavy.gov.in)', 'SSB Interview by Arihant', 'Naval Orientation Handbooks'],
  },
  {
    id: 'car-cds',
    code: 'cds',
    name: 'Combined Defence Services (CDS) Examination',
    branch: 'Indian Navy (INA), Indian Army (IMA/OTA), Indian Air Force (AFA)',
    ageLimit: '19 to 24 Years',
    eligibility: 'Degree in Engineering for INA; Any Bachelor’s Degree for IMA/OTA; Degree with Physics & Math for AFA.',
    selectionProcess: [
      'UPSC CDS Written Examination (English, General Knowledge, Elementary Mathematics)',
      '5-Day SSB Interview',
      'Special Medical Board',
      'Final Merit List & Cadet Training',
    ],
    syllabusOverview: 'English (100 Marks), General Knowledge (100 Marks), Elementary Mathematics (100 Marks). Objective MCQs with negative marking.',
    nccBenefit: 'Reserved vacancies for NCC "C" Certificate holders across INA, IMA, and AFA. Bonus preference during final merit ranking.',
    examFrequency: 'Twice a year (CDS-I in April, CDS-II in September)',
    recommendedResources: ['Pathfinder for CDS by Arihant', 'NCERT History & Geography', 'The Hindu / Indian Express editorials'],
  },
  {
    id: 'car-afcat',
    code: 'afcat',
    name: 'Air Force Common Admission Test (AFCAT)',
    branch: 'Indian Air Force (Flying Branch, Ground Duty Tech & Non-Tech)',
    ageLimit: '20 to 24 Years (Flying) / 20 to 26 Years (Ground Duty)',
    eligibility: 'B.Tech/BE with min 60% marks and 50% marks in Math & Physics at 10+2 level.',
    selectionProcess: [
      'Online AFCAT Exam + Engineering Knowledge Test (EKT for Technical Branch)',
      '5-Day Air Force Selection Board (AFSB) Interview (Dehradun / Mysore / Gandhinagar / Varanasi)',
      'Air Force Central Medical Establishment (AFCME)',
      'Training at Air Force Academy (AFA) Dundigal',
    ],
    syllabusOverview: 'General Awareness, Verbal Ability, Numerical Ability, Reasoning and Military Aptitude Test. 100 questions, 300 marks.',
    nccBenefit: 'Special Flying Branch entry for Air/Naval NCC cadets with direct AFSB call letter under NCC Special Entry.',
    examFrequency: 'Twice a year (February and August)',
    recommendedResources: ['AFCAT Self Study Guide by Disha Experts', 'RS Aggarwal Quantitative Aptitude', 'Defence Direct Education'],
  },
  {
    id: 'car-ssc-tech',
    code: 'ssc-tech',
    name: 'Indian Army & Navy Short Service Commission (SSC Tech)',
    branch: 'Indian Army (Corps of Engineers, Signals, EME) & Indian Navy',
    ageLimit: '20 to 27 Years',
    eligibility: 'BE / B.Tech completed or in final year in Mechanical, Electrical, CSE, Civil, Electronics disciplines.',
    selectionProcess: [
      'Direct Shortlisting on Cumulative Engineering Percentage / CGPA cutoff',
      'Direct SSB Interview (No written exam!)',
      'Military Medical Examination',
      'Training at Officers Training Academy (OTA) Chennai',
    ],
    syllabusOverview: 'Selection is purely based on academic engineering performance and performance in the 5-day SSB interview.',
    nccBenefit: 'Cadets with NCC background demonstrate instant leadership, discipline, and officer-like qualities in GTO and Command Tasks.',
    examFrequency: 'Twice a year (Applications in January and July)',
    recommendedResources: ['Let’s Crack SSB Interview by SSBCrack', 'Engineering core subject revision', 'Current defense news'],
  },
  {
    id: 'car-coast-guard',
    code: 'coast-guard',
    name: 'Indian Coast Guard - Assistant Commandant (GD / Tech)',
    branch: 'Indian Coast Guard (Ministry of Defence)',
    ageLimit: '21 to 25 Years',
    eligibility: 'B.Tech with min 60% aggregate marks and 60% in Math & Physics at 10+2 level.',
    selectionProcess: [
      'Stage I: Computer Based Screening Test (CGCAT)',
      'Stage II: Preliminary Selection Board (PSB - Cognitive & Picture Perception)',
      'Stage III: Final Selection Board (FSB - Psychology, GTO & Board Interview)',
      'Stage IV: Medicals & Commissioning at Indian Naval Academy (INA)',
    ],
    syllabusOverview: 'Reasoning, English, General Science, Mathematical Aptitude, and Mechanical/Electrical core engineering concepts.',
    nccBenefit: 'Weightage in preliminary shortlisting and bonus marks in Final Selection Board for Naval NCC cadets.',
    examFrequency: 'Twice a year',
    recommendedResources: ['Indian Coast Guard Assistant Commandant Guide by Arihant', 'Coast Guard official test series'],
  },
  {
    id: 'car-merchant-navy',
    code: 'merchant-navy',
    name: 'Merchant Navy - Deck Cadet & Marine Engineering Officer',
    branch: 'Commercial Merchant Fleet (Tankers, Bulk Carriers, Container Vessels)',
    ageLimit: '17 to 25 Years',
    eligibility: 'B.Tech in Marine / Mechanical Engineering or IMU-CET qualification + DNS sponsorship from top shipping lines (Maersk, Anglo-Eastern, Fleet).',
    selectionProcess: [
      'IMU CET Entrance Examination',
      'Shipping Company Sponsorship Interview & Psychometric Evaluation',
      'DG Shipping Approved Medical Examination (Unaided 6/6 Vision)',
      'Sea Time Training & MMD Class IV Competency Examination',
    ],
    syllabusOverview: 'Physics, Chemistry, Mathematics, English, General Aptitude, and Maritime Knowledge.',
    nccBenefit: 'Naval NCC cadets possess pre-certified seamanship, knotting, firefighting, and boat handling skills, making them top recruits.',
    examFrequency: 'Annually in May/June',
    recommendedResources: ['IMU CET Study Material', 'Marine Insight Seamanship Guides', 'Rules of the Road by Capt. Bhandarkar'],
  },
];

export const CADET_RESOURCES: CadetResource[] = [
  {
    id: 'res-seamanship',
    title: 'Comprehensive Seamanship Notes: Knots, Bends & Hitches',
    category: 'Seamanship',
    readTime: '15 min read',
    summary: 'A visual and step-by-step technical manual covering all essential naval knots, rope cordage, anchor work, and rigging terminology used in Naval NCC.',
    pdfDownloadName: 'GCEK_Naval_Seamanship_Manual.pdf',
    pdfDownloadSize: '3.4 MB',
    contentMarkdown: `### 1. Types of Cordage in Naval Operations
- **Natural Fibre Ropes**: Manila (durable, flexible), Sisal, Hemp (traditionally used for standing rigging).
- **Synthetic Fibre Ropes**: Nylon (high elasticity, shock absorbent), Polyester (Terylene - low stretch, UV resistant), Polypropylene (floats on water, ideal for life-lines and tow lines).
- **Wire Ropes**: Flexible steel wire rope (FSWR) used in standing rigging, crane falls, and towing hawsers.

### 2. Core Naval Knots & Their Specific Uses
- **Reef Knot (Square Knot)**: Used to tie together two ends of a rope of *equal thickness*, primarily for reefing sails and tying parcels. Never use for heavy loads as it can slip or jam.
- **Figure of Eight**: A stopper knot made at the bitter end of a rope to prevent it from slipping through a block, fairlead, or sheave.
- **Clove Hitch**: Used for securing a rope to a spar, stanchion, or post when the strain is continuous from both directions.
- **Bowline ("King of Knots")**: Creates a temporary, non-slipping loop at the end of a rope. Used for rescue operations, securing hawsers to bollards, and lifting personnel.
- **Rolling Hitch**: Used to secure a rope to a spar or another rope under strain without slipping along its length. Crucial in naval towing operations.
- **Sheet Bend (Becket Bend)**: Used for joining two ropes of *unequal thickness*. Double sheet bend is used when there is high disparity in rope diameters.
- **Round Turn and Two Half Hitches**: Used to secure a heavy mooring line to a post or ring bolt. Can be untied easily even under heavy strain.
- **Carrick Bend**: Ideal for very thick hawser ropes where sharp bends would weaken the fibres.

### 3. Anchor Work & Ground Tackle
- **Parts of an Admiralty Pattern Anchor**: Ring, Shank, Crown, Arms, Flukes, Bills (Peas), and Stock.
- **Chain Cable Measurement**: Measured in 'Shackles' of length. 1 Shackle of cable = 15 Fathoms = 90 Feet = 27.43 Meters.
- **Joining Shackle**: Connects individual shackles of anchor chain with lead pellet pins.
- **Lead Line Markings**: Used to measure sounding (water depth). Standard naval hand lead line is 25 fathoms with tallow cavity at bottom to determine seabed nature (sand, mud, rock).`,
  },
  {
    id: 'res-drill',
    title: 'Naval Foot Drill, Rifle Drill & Ceremonial Guard of Honor',
    category: 'Drill',
    readTime: '12 min read',
    summary: 'Standard drill procedures, words of command (Hukm), cadences, arm swinging angles, and rifle drill protocol with .22 and SLR.',
    pdfDownloadName: 'GCEK_Naval_Drill_Manual.pdf',
    pdfDownloadSize: '2.8 MB',
    contentMarkdown: `### 1. Words of Command (Hukm) & Timing
Every word of command has two distinct parts:
1. **Cautionary Command (Chetawani)**: Delivered in a firm, rising tone to alert the squad (e.g., *"SQUAD..."*, *"DAHINE...")*.
2. **Executive Command (Karyawahi)**: Delivered sharply with explosive clarity on the specific foot (e.g., *"...THAM!"*, *"...CHAL!"*).

### 2. Standard Cadence & Measurements
- **Savdhan (Attention)**: Heels together, feet at 30-degree angle, thumbs along the seam of trousers, chest puffed naturally, chin up parallel to ground.
- **Vishram (Stand at Ease)**: Left foot lifted 12 inches high and moved 12 inches to the left, hands clasped behind back, right hand inside left hand with thumbs locked.
- **Aram Se (Stand Easy)**: Torso relaxed while feet remain stationary.
- **Marching Cadence**: Quick Time (Tez Chal) is strictly 120 paces per minute for Indian Army/Navy (116 at Kartavya Path). Length of pace is 30 inches.
- **Arm Swing**: Swung straight to shoulder level (90 degrees to torso), parallel to direction of march, fingers loosely curled with thumb pointing forward.

### 3. Rifle Drill Movements (.22 & 7.62mm SLR)
- **Bazu Shastra (Order Arms)**: Rifle vertical at right side, butt touching ground beside right toe.
- **Kandhe Shastra (Slope Arms)**: Rifle carried on left shoulder, magazine facing outwards, left hand supporting butt.
- **Salami Shastra (Present Arms)**: Highest ceremonial salute for National Flag, President, Governor, and dignitaries above Rank of Major General / Rear Admiral.`,
  },
  {
    id: 'res-terminology',
    title: 'Naval Terminology, Ship Anatomy & Marine Slang',
    category: 'Naval Terminology',
    readTime: '10 min read',
    summary: 'Essential nautical vocabulary, shipboard spaces, direction indicators, and traditional customs of the Indian Navy.',
    pdfDownloadName: 'Naval_Vocabulary_Glossary.pdf',
    pdfDownloadSize: '1.9 MB',
    contentMarkdown: `### 1. Shipboard Directions & Locations
- **Bow**: The forward front part of the warship.
- **Stern (Aft)**: The rear back part of the warship.
- **Port**: The left-hand side of the vessel when facing the bow (Marked with Red navigation light).
- **Starboard**: The right-hand side of the vessel when facing the bow (Marked with Green navigation light).
- **Amidships**: The central middle section of the ship.
- **Bridge**: The command and navigation control center where the Captain and Officer of the Watch (OOW) con the ship.
- **Quarterdeck**: Ceremonial after-part of the upper deck, traditionally saluted by every person boarding or leaving the ship.

### 2. Naval Structural Terminology
- **Bulkhead**: Wall or partition dividing compartments (never call it a wall).
- **Deck**: Floor or horizontal surface (never call it a floor).
- **Deckhead**: Ceiling (never call it a ceiling).
- **Ladder**: Shipboard stairs (never call it stairs).
- **Galley**: Ship’s kitchen.
- **Heads**: Shipboard toilets/washrooms.
- **Scuttle / Porthole**: Round waterproof window on the ship's side.
- **Hatch**: Opening in the deck providing access to lower decks.

### 3. Traditional Naval Expressions
- **Aye Aye, Sir**: Acknowledgment indicating "I have understood the order and will execute it immediately."
- **Bravo Zulu (BZ)**: Naval signal flag code meaning "Well Done!".
- **Pipe Down**: The ceremonial evening whistle signal ordering silence and rest.
- **Crossing the Line**: Traditional ceremony observed when a warship crosses the Equator.`,
  },
  {
    id: 'res-ranks',
    title: 'Rank Structure & Insignia: Cadet to Admiral of the Fleet',
    category: 'Rank Structure',
    readTime: '8 min read',
    summary: 'Complete comparison of Indian Armed Forces ranks with a deep dive into Indian Navy officer ranks, sailor trades, and NCC cadet appointments.',
    pdfDownloadName: 'Armed_Forces_Rank_Comparative_Chart.pdf',
    pdfDownloadSize: '2.1 MB',
    contentMarkdown: `### 1. Indian Navy Officer Ranks vs Army & Air Force
| Indian Navy | Indian Army | Indian Air Force | Epaulette / Lace |
|---|---|---|---|
| Sub Lieutenant | Lieutenant | Flying Officer | 1 Gold Stripe with Curl |
| Lieutenant | Captain | Flight Lieutenant | 2 Gold Stripes with Curl |
| Lieutenant Commander | Major | Squadron Leader | 2 Stripes + 1 Narrow Stripe |
| Commander | Lieutenant Colonel | Wing Commander | 3 Gold Stripes with Curl |
| Captain | Colonel | Group Captain | 4 Gold Stripes with Curl |
| Commodore | Brigadier | Air Commodore | 1 Broad Stripe with Curl |
| Rear Admiral (Two Star) | Major General | Air Vice Marshal | Broad Stripe + 1 Narrow Stripe, Crossed Baton |
| Vice Admiral (Three Star) | Lieutenant General | Air Marshal | Broad Stripe + 2 Narrow Stripes |
| Admiral (Four Star - CNS) | General (COAS) | Air Chief Marshal (CAS)| Broad Stripe + 3 Narrow Stripes |
| Admiral of the Fleet (Five Star)| Field Marshal | Marshal of the IAF | Honorary 5-Star Rank |

### 2. GCEK Naval NCC Cadet Rank Hierarchy
1. **Naval Cadet (NC)**: 1st Year enrolled cadet wearing plain shoulder flaps.
2. **Leading Cadet (LC)**: 2nd Year cadet appointed based on drill, with single naval anchor stripe.
3. **Petty Officer Cadet (POC)**: Crossed anchors badge on left forearm sleeve.
4. **Junior Under Officer (JUO)**: Single golden bar chevron on shoulder epaulette.
5. **Senior Under Officer (SUO) / SCC**: Two golden bar chevrons on shoulder epaulette, unit commander.`,
  },
  {
    id: 'res-uniform',
    title: 'Naval Uniform Guidelines: Dress 1A, Working Blue & Insignia Protocol',
    category: 'Uniform Guidelines',
    readTime: '11 min read',
    summary: 'Rigid uniform protocol for Naval NCC cadets: starched creases, brasso polishing, DMS shoe spit-shine, beret shaping, and medal placement.',
    pdfDownloadName: 'Naval_Uniform_Protocol_Guide.pdf',
    pdfDownloadSize: '1.7 MB',
    contentMarkdown: `### 1. Dress 1A (Ceremonial Whites)
- **Shirt**: Pristine white half-sleeved naval shirt, sharply pressed with knife-edge crease down the back and center of sleeves.
- **Trousers**: Matching white trousers with straight crease running from waistband to bottom hem.
- **Beret**: Dark Navy Blue beret, worn level on the forehead (two fingers above eyebrows), with Naval NCC golden brass crest pinned above the left eye. Excess fabric pulled down neatly to the right ear.
- **Lanyard**: Navy Blue cord lanyard worn from the left shoulder into the left breast pocket, holding whistle.
- **Belt**: White web belt with polished brass buckle bearing the NCC emblem. Buckle aligned strictly with shirt buttons and trouser fly.
- **Shoes & Spats**: Highly polished black Oxford/DMS shoes (mirror shine) with white socks. For RDC/AINSC guard, white canvas spats over boots.

### 2. Working Blue (Dress 4)
- Dark blue denim/cotton working shirt and trousers for whaler maintenance, obstacle courses, boat shed work, and weapon cleaning.`,
  },
];

export const ALUMNI_PROFILES: AlumniProfile[] = [
  {
    id: 'alum-01',
    name: 'Lt. Subham Keshari Behera',
    batch: 'Class of 2020 (Mechanical Engg)',
    degreeBranch: 'B.Tech Mechanical',
    currentDesignation: 'Lieutenant, Indian Navy',
    organization: 'Indian Naval Ship INS Vikrant (Aircraft Carrier)',
    serviceBranch: 'Indian Navy',
    nccRankHeld: 'Senior Under Officer (SUO)',
    notableAchievement: 'Commissioned through Direct NCC Special Entry (Graduated top of Engineering batch at INA Ezhimala)',
    adviceForCadets:
      'GCEK gave me the technical grounding, but Naval NCC gave me the spine to lead men into battle. Make full use of the direct SSB call for C certificate holders. Master your engineering fundamentals and build unshakeable physical stamina.',
    availableForMentorship: true,
  },
  {
    id: 'alum-02',
    name: 'Capt. Rakesh Panda',
    batch: 'Class of 2019 (Electrical Engg)',
    degreeBranch: 'B.Tech Electrical',
    currentDesignation: 'Captain, Indian Army (Corps of Signals)',
    organization: 'Northern Command, Military Operations',
    serviceBranch: 'Indian Army',
    nccRankHeld: 'Cadet Captain (CC)',
    notableAchievement: 'Cleared SSB Bhopal in first attempt through CDS Entry. Decorated with GOC Commendation.',
    adviceForCadets:
      'The SSB assessors look for authentic leaders, not coached actors. The drill discipline, group cohesion in camps, and night vigils you experience at GCEK will naturally project as Officer Like Qualities (OLQ).',
    availableForMentorship: true,
  },
  {
    id: 'alum-03',
    name: 'Asst. Commandant Ananya Rath',
    batch: 'Class of 2021 (Civil Engg)',
    degreeBranch: 'B.Tech Civil',
    currentDesignation: 'Assistant Commandant (Naval Aviation)',
    organization: 'Indian Coast Guard, Western Region',
    serviceBranch: 'Coast Guard',
    nccRankHeld: 'Junior Under Officer (JUO)',
    notableAchievement: 'RDC 2020 Kartavya Path marcher. First female GCEK cadet commissioned as Coast Guard Officer.',
    adviceForCadets:
      'Do not let anyone tell you engineering and military dreams are separate. The maritime domain needs analytical minds. Women cadets should lead from the front in every parade and camp.',
    availableForMentorship: true,
  },
  {
    id: 'alum-04',
    name: 'Er. Alok Kumar Sahu',
    batch: 'Class of 2018 (Computer Science)',
    degreeBranch: 'B.Tech CSE',
    currentDesignation: 'Senior Scientist / Engineer "SC"',
    organization: 'Defence Research and Development Organisation (DRDO - NSTL Vizag)',
    serviceBranch: 'PSU / Corporate',
    nccRankHeld: 'Leading Cadet (LC)',
    notableAchievement: 'Leading indigenous Sonar and Torpedo defense simulation projects for Naval Warships.',
    adviceForCadets:
      'Even if you transition into defense research or PSU engineering, the punctuality and patriotic fire you absorb in Naval NCC will set you apart from thousands of civilian peers.',
    availableForMentorship: true,
  },
  {
    id: 'alum-05',
    name: 'Lt. Cdr. (Retd.) Bikramaditya Mohanty',
    batch: 'Class of 2015 (Mechanical)',
    degreeBranch: 'B.Tech Mechanical',
    currentDesignation: 'Senior Marine Superintendent',
    organization: 'Maersk Line Maritime Operations',
    serviceBranch: 'Merchant Navy',
    nccRankHeld: 'Senior Cadet Captain',
    notableAchievement: 'Served 10 years as Commissioned Marine Engineer Officer before transitioning to global fleet management.',
    adviceForCadets:
      'The sea rewards only those who respect seamanship and safety. Read your naval study notes deeply; they will accompany you across oceans.',
    availableForMentorship: true,
  },
];

export const MAGAZINE_ARTICLES: MagazineArticle[] = [
  {
    id: 'mag-01',
    title: 'Forged in Salt Water: A Cadet’s Odyssey at INS Shivaji AINSC 2025',
    author: 'Cadet Captain Rajesh Tripathy',
    authorRank: 'CC (Final Year Mech)',
    category: 'Camp Experience',
    publishedDate: 'Aug 2026',
    readTime: '6 min read',
    summary: 'A vivid personal memoir of the grit, cold morning pulls, and tactical victory that brought the Gold Medal in Ship Modeling to GCEK and Odisha Directorate.',
    content: [
      'The morning mist hung heavy over the Sahyadri mountains at INS Shivaji, Lonavala. At 0445 hrs, the shrill blast of the boatswain’s pipe shattered the chill. For fourteen months, our team at GCEK had drilled, sanded balsa wood, and pulled whaler oars in the waters of Odisha. Now we stood toe-to-toe with sixteen other state directorates.',
      'Our ship model—a scale replica of the stealth guided missile destroyer INS Visakhapatnam—faced rigorous testing. The judges examined hull symmetry to the millimeter, waterline stability, radio control range, and watertight compartmentalization. When our model glided across the trial tank with zero roll, the Commodore nodded with admiration.',
      'To every junior cadet reading this: national glory is not reserved for metropolitan battalions. From the hills of Kalahandi to the naval docks of Shivaji, discipline and passion bridge every divide. Stand tall, pull hard, and never quit before the finish line.',
    ],
  },
  {
    id: 'mag-02',
    title: 'The Psychology of Command: Translating Parade Ground Discipline to the SSB Board',
    author: 'Lt. (Dr.) Manoranjan Pradhan',
    authorRank: 'CTO, GCEK Naval NCC',
    category: 'Leadership Lessons',
    publishedDate: 'Sep 2026',
    readTime: '8 min read',
    summary: 'An analytical blueprint by the Associate NCC Officer on how the 15 Officer-Like Qualities (OLQ) are organically cultivated through daily military training.',
    content: [
      'In our years of mentoring engineering students at GCEK, the most common inquiry from defense aspirants is: "Sir, what coaching institute should I join to crack the SSB interview?" My answer has always been resolute: your parade ground is your coaching academy.',
      'Consider the GTO tasks: Progressive Group Task, Command Task, and Half Group Task. A candidate who has never carried a spar or handled a naval whaler searches frantically for mechanical formulas. But a Naval NCC cadet instinctively understands fulcrums, rope lashings, and center of gravity. More crucially, they know how to command subordinates with respect and poise under pressure.',
      'Leadership is not the volume of your voice; it is the clarity of your intent and the empathy with which you carry your squad across the obstacle.',
    ],
  },
  {
    id: 'mag-03',
    title: 'Modernizing Blue-Water Hegemony: The Indian Navy’s Carrier Battle Groups & Indigenous Tech',
    author: 'JUO Debashish Pattnaik',
    authorRank: 'JUO (3rd Year CSE)',
    category: 'Defence News',
    publishedDate: 'Jul 2026',
    readTime: '5 min read',
    summary: 'An exploration of Project 17A Nilgiri-class frigates, IAC-2 twin-carrier doctrine, and the strategic imperative of securing the Malacca Straits choke point.',
    content: [
      'As India cements its posture as the primary Net Security Provider across the Indian Ocean Region (IOR), the Indian Navy has embarked on one of the most ambitious indigenous shipbuilding drives in global maritime history.',
      'With over 40 warships currently under construction in Indian shipyards—from Goa Shipyard to Mazagon Dock and GRSE Kolkata—the transition from a buyer’s navy to a builder’s navy is complete. The operational integration of INS Vikrant with modern fighter complement demonstrates that maritime security is inextricably linked with national economic sovereignty.',
    ],
  },
];

export const HALL_OF_FAME_ENTRIES = [
  {
    name: 'Lt. Subham Keshari Behera',
    title: 'Commissioned Officer, Indian Navy',
    achievement: 'Direct NCC Special Entry Commissioning to INS Vikrant',
    batch: 'Class of 2020',
    category: 'Outstanding Alumni',
    citation: 'For upholding the highest traditions of Indian naval engineering and proving that GCEK cadets can command aircraft carrier propulsion bays.',
  },
  {
    name: 'Cadet Captain Rajesh Tripathy',
    title: 'Gold Medalist - AINSC 2025',
    achievement: 'National 1st Place in Ship Modeling (INS Shivaji)',
    batch: 'Class of 2025',
    category: 'National Representative',
    citation: 'Brought national glory to Odisha Directorate and Government College of Engineering Kalahandi at the All India Nau Sainik Camp.',
  },
  {
    name: 'SUO Subhashree Sahu',
    title: 'Kartavya Path Marcher - RDC 2025',
    achievement: 'All India Naval Marching Contingent at Republic Day Parade',
    batch: 'Class of 2026',
    category: 'National Representative',
    citation: 'Marched before the Hon’ble President and Prime Minister of India, setting a benchmark for female leadership in technical NCC wings.',
  },
  {
    name: 'Leading Cadet Soumya Ranjan Panda',
    title: 'Governor’s Gold Medallion Winner',
    achievement: 'Best Senior Division Naval Cadet, Odisha Directorate',
    batch: 'Class of 2026',
    category: 'Best Cadet',
    citation: 'Adjudged the premier cadet among thousands across Odisha for unmatched rifle firing precision, academic standing, and drill bearing.',
  },
  {
    name: 'Capt. Rakesh Panda',
    title: 'Decorated Army Officer (Signals)',
    achievement: 'GOC Commendation for Northern Border Operations',
    batch: 'Class of 2019',
    category: 'Outstanding Alumni',
    citation: 'Exemplary gallantry and technical leadership in high-altitude communications infrastructure.',
  },
  {
    name: 'Cadet Priyabrata Nayak',
    title: 'Camp Senior Appointment (CATC 2024)',
    achievement: 'Commanded 450 Cadets at Sambalpur Cantonment',
    batch: 'Class of 2027',
    category: 'Camp Senior',
    citation: 'Commended by Group Commander for impeccable camp administration, discipline, and guard-of-honor execution.',
  },
];

export const GALLERY_ITEMS = [
  {
    id: 'gal-01',
    title: 'Ceremonial Guard of Honor - Independence Day 2026',
    category: 'Independence Day',
    year: 2026,
    caption: 'GCEK Naval NCC Guard of Honor presented to the Principal and Chief Guest on the College Parade Ground.',
    type: 'image',
    imageUrl: 'https://images.unsplash.com/photo-1569420079947-66a1e50529d3?auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: 'gal-02',
    title: 'Whaler Boat Pulling Regatta at Chilika Lake',
    category: 'Camps',
    year: 2025,
    caption: 'Cadets executing synchronised rowing strokes during the Odisha Directorate Pre-AINSC trials.',
    type: 'image',
    imageUrl: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: 'gal-03',
    title: 'Puneet Sagar Abhiyan - Waterbody Cleaning Drive',
    category: 'Social Activities',
    year: 2025,
    caption: 'GCEK Naval Cadets clearing plastic debris and planting 300 mangrove saplings along regional lakes.',
    type: 'image',
    imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: 'gal-04',
    title: 'Arms Drill & 7.62mm SLR Weapon Training',
    category: 'Parade',
    year: 2026,
    caption: 'Rigorous rifle handling, stripping and assembling practice conducted by PI Staff at GCEK ground.',
    type: 'image',
    imageUrl: 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: 'gal-05',
    title: 'Republic Day Parade - Kartavya Path Selection',
    category: 'Republic Day',
    year: 2025,
    caption: 'Cadets undergoing foot-drill alignment checks in New Delhi with starched whites and ceremonial spats.',
    type: 'image',
    imageUrl: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: 'gal-06',
    title: 'Ship Modeling Workshop: Balsa Shaping & Ballast Test',
    category: 'Competitions',
    year: 2025,
    caption: 'Engineering cadets assembling radio-controlled scaled frigate model in the GCEK Naval NCC Laboratory.',
    type: 'image',
    imageUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: 'gal-07',
    title: 'Bends & Hitches Seamanship Demonstration',
    category: 'Seamanship Training',
    year: 2026,
    caption: 'Mastering the Bowline, Sheet Bend, and Rolling Hitch with 24mm synthetic naval cordage.',
    type: 'image',
    imageUrl: 'https://images.unsplash.com/photo-1508873696983-2df5293cb32f?auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: 'gal-08',
    title: 'Blood Donation Camp on NCC Day',
    category: 'Social Activities',
    year: 2025,
    caption: '65 units of blood donated by GCEK Naval Cadets to District Blood Bank, Bhawanipatna.',
    type: 'image',
    imageUrl: 'https://images.unsplash.com/photo-1615461066841-6116e61058f4?auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: 'gal-09',
    title: 'Naval Warship Sea Sortie - Eastern Fleet Frigates',
    category: 'Camps',
    year: 2024,
    caption: 'Cadets on the flight deck of frontline stealth frigate observing anti-submarine sonar drills.',
    type: 'image',
    imageUrl: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: 'gal-10',
    title: 'Sailing Expedition in Chilika Lagoon',
    category: 'Seamanship Training',
    year: 2025,
    caption: 'Tacking and jibing under heavy winds during the 100km coastal expedition.',
    type: 'image',
    imageUrl: 'https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?auto=format&fit=crop&w=1000&q=80',
  },
];

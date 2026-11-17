export type HubTab =
  | 'home'
  | 'about'
  | 'achievements'
  | 'camps'
  | 'ssb-hub'
  | 'careers'
  | 'resources'
  | 'notices'
  | 'calendar'
  | 'alumni'
  | 'gallery'
  | 'hall-of-fame'
  | 'magazine'
  | 'admin';

export interface CadetInfo {
  id: string;
  name: string;
  rank: string; // e.g. 'Cadet Captain (CC)', 'Petty Officer Cadet (POC)', 'Leading Cadet (LC)', 'Naval Cadet (NC)'
  role: string;
  yearBranch: string;
  regimentalNumber?: string;
  achievements: string; // Cadet achievements field
  photoUrl?: string;
}

export type CadetLeadership = CadetInfo;

export interface UnitInfo {
  name: string;
  college: string;
  location: string;
  affiliatedUnit: string;
  groupHQ: string;
  directorate: string;
  motto: string;
  navalMotto: string;
  establishedYear: number;
  cadetStrength: number;
  subUnitCode?: string;
  contactEmail?: string;
  contactPhone?: string;
  // 1 NO. CO
  co: {
    name: string;
    rank: string;
    designation: string;
    unit: string;
    experience?: string;
    message: string;
    photoUrl?: string;
  };
  // THEN ANO / CTO
  anoCto: {
    name: string;
    designation: string;
    department: string;
    qualifications: string;
    experience: string;
    message: string;
    photoUrl?: string;
  };
  // CADET INFORMATION (Sequence: CC then POC .. with achievements)
  cadetInformation: CadetInfo[];

  // Backward compatibility fields
  cto: {
    name: string;
    designation: string;
    department: string;
    qualifications: string;
    experience: string;
    message: string;
    photoUrl?: string;
  };
  seniorCadetCaptain: {
    name: string;
    rank: string;
    year: string;
    campsAttended: string;
    message: string;
    photoUrl?: string;
  };
  leadershipCadets?: CadetInfo[];
}

export interface NavalEvent {
  id: string;
  title: string;
  type: 'Parade' | 'Camp Selection' | 'Theory Lecture' | 'Social Activity' | 'Examination' | 'Ceremony';
  date: string; // YYYY-MM-DD
  startTime: string;
  endTime: string;
  location: string;
  description: string;
  dressCode?: string;
  inCharge?: string;
}

export interface Notice {
  id: string;
  title: string;
  category: 'Parade Order' | 'Camp Notification' | 'Selection List' | 'Class Timing' | 'Circular' | 'Event Notice';
  date: string;
  isPinned: boolean;
  content: string;
  issuedBy: string;
  attachmentName?: string;
  attachmentSize?: string;
}

export interface Achievement {
  id: string;
  cadetName: string;
  rank: string;
  year: number;
  date?: string;
  category: 'AINSC' | 'RDC' | 'NTAC' | 'CATC' | 'ATC' | 'National' | 'State' | 'Best Cadet' | 'Camp Senior';
  campTitle: string;
  location: string;
  achievementDescription: string;
  medal?: 'Gold' | 'Silver' | 'Bronze' | 'Governor Trophy' | 'Directorate Trophy' | 'Honor Roll';
  certificateId: string;
  photoUrl?: string;
  certificateUrl?: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  year: number;
  caption: string;
  type: 'image' | 'video';
  imageUrl?: string;
}

export interface CampDetail {
  id: string;
  slug: 'ainsc' | 'rdc' | 'ntac' | 'catc' | 'atc' | 'leadership' | 'naval-training';
  name: string;
  shortName: string;
  fullName: string;
  location: string;
  duration: string;
  badge: string;
  tagline: string;
  overview: string;
  selectionProcedure: {
    phase: string;
    description: string;
    keyTests: string[];
  }[];
  eligibility: {
    academic: string;
    nccRequirement: string;
    physical: string[];
    swimming: string;
  };
  preparationGuide: {
    title: string;
    points: string[];
  }[];
  experiences: {
    cadetName: string;
    batch: string;
    rank: string;
    quote: string;
    highlights: string;
  }[];
  faqs: {
    question: string;
    answer: string;
  }[];
}

export interface DefenceCareer {
  id: string;
  code: 'nda' | 'cds' | 'afcat' | 'ssc-tech' | 'navy-entries' | 'coast-guard' | 'merchant-navy';
  name: string;
  branch: string;
  ageLimit: string;
  eligibility: string;
  selectionProcess: string[];
  syllabusOverview: string;
  nccBenefit: string;
  examFrequency: string;
  recommendedResources: string[];
}

export interface CadetResource {
  id: string;
  title: string;
  category: 'Seamanship' | 'Drill' | 'Naval Terminology' | 'Rank Structure' | 'Uniform Guidelines' | 'Handbook' | 'Leadership';
  readTime: string;
  summary: string;
  contentMarkdown: string;
  pdfDownloadName: string;
  pdfDownloadSize: string;
}

export interface AlumniProfile {
  id: string;
  name: string;
  batch: string;
  degreeBranch: string;
  currentDesignation: string;
  organization: string;
  serviceBranch?: 'Indian Navy' | 'Indian Army' | 'Indian Air Force' | 'Coast Guard' | 'Merchant Navy' | 'PSU / Corporate' | 'Civil Services';
  nccRankHeld: string;
  notableAchievement: string;
  adviceForCadets: string;
  availableForMentorship: boolean;
}

export interface MagazineArticle {
  id: string;
  title: string;
  author: string;
  authorRank: string;
  category: 'Cadet Article' | 'Defence News' | 'Camp Experience' | 'Leadership Lessons' | 'Motivational Story';
  publishedDate: string;
  readTime: string;
  summary: string;
  content: string[];
}

export interface OirQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  category: 'Verbal' | 'Non-Verbal';
}

export interface SrtQuestion {
  id: number;
  situation: string;
  modelResponse: string;
  coreQuality: string;
}

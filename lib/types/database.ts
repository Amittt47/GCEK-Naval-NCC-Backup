export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      unit_info: {
        Row: {
          id: string;
          college_name: string;
          college_location: string;
          unit_name: string;
          affiliation: string;
          group_hq: string;
          directorate: string;
          motto: string;
          naval_motto: string;
          established_year: number;
          cadet_strength: number;
          sub_unit_code: string | null;
          contact_email: string | null;
          contact_phone: string | null;
          co_name: string | null;
          co_rank: string | null;
          co_designation: string | null;
          co_unit: string | null;
          co_experience: string | null;
          co_message: string | null;
          co_photo_url: string | null;
          ano_name: string | null;
          ano_designation: string | null;
          ano_department: string | null;
          ano_qualifications: string | null;
          ano_experience: string | null;
          ano_message: string | null;
          ano_photo_url: string | null;
          welcome_message: string | null;
          updated_at: string;
        };
        Insert: Partial<Database['public']['Tables']['unit_info']['Row']>;
        Update: Partial<Database['public']['Tables']['unit_info']['Row']>;
      };
      cadets: {
        Row: {
          id: string;
          name: string;
          rank: string;
          rank_order: number;
          regimental_number: string | null;
          enrollment_year: number | null;
          course_year: string | null;
          wing: string;
          role: string | null;
          achievements: string | null;
          profile_photo: string | null;
          active_status: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: Partial<Database['public']['Tables']['cadets']['Row']> & { name: string; rank: string };
        Update: Partial<Database['public']['Tables']['cadets']['Row']>;
      };
      notices: {
        Row: {
          id: string;
          title: string;
          description: string;
          notice_type: string;
          notice_date: string;
          priority: boolean;
          attachment_url: string | null;
          attachment_name: string | null;
          attachment_size: string | null;
          published: boolean;
          created_by: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: Partial<Database['public']['Tables']['notices']['Row']> & { title: string; description: string };
        Update: Partial<Database['public']['Tables']['notices']['Row']>;
      };
      achievements: {
        Row: {
          id: string;
          cadet_id: string | null;
          cadet_name: string;
          rank: string;
          title: string;
          description: string;
          event_camp: string;
          location: string | null;
          year: number;
          medal_award: string | null;
          category: string;
          citation: string | null;
          certificate_id: string | null;
          certificate_url: string | null;
          photo_url: string | null;
          created_at: string;
        };
        Insert: Partial<Database['public']['Tables']['achievements']['Row']> & {
          cadet_name: string;
          title: string;
          event_camp: string;
          year: number;
        };
        Update: Partial<Database['public']['Tables']['achievements']['Row']>;
      };
      gallery: {
        Row: {
          id: string;
          image_url: string;
          title: string;
          description: string | null;
          category: string;
          event: string | null;
          year: number;
          uploaded_by: string | null;
          created_at: string;
        };
        Insert: Partial<Database['public']['Tables']['gallery']['Row']> & { image_url: string; title: string };
        Update: Partial<Database['public']['Tables']['gallery']['Row']>;
      };
      alumni: {
        Row: {
          id: string;
          name: string;
          batch: string;
          degree_branch: string | null;
          service_branch: string | null;
          current_designation: string;
          organization: string | null;
          commissioning_info: string | null;
          ncc_rank_held: string | null;
          notable_achievement: string | null;
          advice_for_cadets: string | null;
          current_status: string | null;
          mentorship_available: boolean;
          profile_photo: string | null;
          bio: string | null;
          created_at: string;
        };
        Insert: Partial<Database['public']['Tables']['alumni']['Row']> & { name: string; batch: string; current_designation: string };
        Update: Partial<Database['public']['Tables']['alumni']['Row']>;
      };
      mentorship_requests: {
        Row: {
          id: string;
          cadet_id: string | null;
          cadet_name: string;
          cadet_email: string;
          cadet_phone: string | null;
          cadet_year_branch: string | null;
          alumni_id: string;
          subject: string;
          message: string;
          status: 'pending' | 'reviewed' | 'approved' | 'completed' | 'rejected';
          response: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: Partial<Database['public']['Tables']['mentorship_requests']['Row']> & {
          cadet_name: string;
          cadet_email: string;
          alumni_id: string;
          subject: string;
          message: string;
        };
        Update: Partial<Database['public']['Tables']['mentorship_requests']['Row']>;
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}

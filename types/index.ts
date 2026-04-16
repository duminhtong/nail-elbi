export type ImageCategory = 'nail_menu' | 'brow_lamination' | 'lash_lift' | 'student_work' | 'classroom';
export type YoutubeCategory = 'free_lesson' | 'student_interview';
export type CourseInfoSection = 'pricing' | 'rules' | 'benefits';

export interface ImageData {
  id: string;
  name: string;
  category: ImageCategory;
  storage_path: string;
  public_url: string;
  batch?: string | null;
  sort_order: number;
  created_at: string;
}

export interface YoutubeVideo {
  id: string;
  title: string;
  description?: string | null;
  youtube_url: string;
  youtube_id: string;
  category: YoutubeCategory;
  thumbnail_url?: string | null;
  sort_order: number;
  created_at: string;
}

export interface CourseInfo {
  id: string;
  section: CourseInfoSection;
  content: any; // specific JSON structure depending on section
  updated_at: string;
}

export interface PricingCourse {
  name: string;
  duration: string;
  price: string;
  note: string;
}

export interface PricingContent {
  title: string;
  courses: PricingCourse[];
  notes: string[];
}

export interface RulesContent {
  title: string;
  items: string[];
}

export interface BenefitsContent {
  title: string;
  rights: string[];
  obligations: string[];
}

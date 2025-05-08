export type ProjectCategory =
  | "AI"
  | "Front-end"
  | "Flutter"
  | "Mechatronics Engineering";

export interface SupabaseProject {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  category: ProjectCategory;
  github_link?: string;
  thumbnail_url: string;
  detailed_content: string;
  display_order?: number;
  featured: boolean;
  live_demo_url?: string;
  created_at: string;
  updated_at: string;
  slug: string;
  start_date?: string;
  end_date?: string;
}

export interface TechnologyWithLogo {
  name: string;
  logo_url: string;
}

export interface CreateProjectPayload {
  title: string;
  description: string;
  technologies: string[];
  category: ProjectCategory;
  github_link?: string;
  thumbnail_url: string;
  detailed_content: string;
  display_order?: number;
  featured: boolean;
  live_demo_url?: string;
  slug: string;
  start_date?: string;
  end_date?: string;
}

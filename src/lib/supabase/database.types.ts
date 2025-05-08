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
      projects: {
        Row: {
          id: string;
          title: string;
          slug: string;
          short_description: string;
          long_description: string;
          featured_image: string;
          github_url: string | null;
          live_url: string | null;
          category: string;
          technologies: string[];
          gallery_images: string[];
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          slug: string;
          short_description: string;
          long_description: string;
          featured_image: string;
          github_url?: string | null;
          live_url?: string | null;
          category: string;
          technologies: string[];
          gallery_images?: string[];
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          slug?: string;
          short_description?: string;
          long_description?: string;
          featured_image?: string;
          github_url?: string | null;
          live_url?: string | null;
          category?: string;
          technologies?: string[];
          gallery_images?: string[];
          created_at?: string;
          updated_at?: string;
        };
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
  };
}

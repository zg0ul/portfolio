export type ProjectType = {
  id: string;
  title: string;
  slug: string;
  short_description: string;
  featured_image: string;
  category: string;
  technologies: string[];
  github_url?: string;
  live_url?: string;
};

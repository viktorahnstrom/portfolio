export interface Project {
  id: string;
  created_at: string;
  title: string;
  slug: string;
  description: string;
  long_description: string | null;
  tags: string[];
  image_url: string | null;
  images: string[];
  github_url: string | null;
  live_url: string | null;
  order: number;
  featured: boolean;
  status: 'wip' | 'done' | string;
}
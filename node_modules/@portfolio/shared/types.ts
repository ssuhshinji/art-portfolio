export interface NavItem {
  label: string;
  path: string;
  children?: NavItem[];
}

export interface ProjectData {
  id: string;
  title: string;
  image?: string;
  imageAlt?: string;
  imagePresentation?: 'banner' | 'demo';
  contentWarning?: string;
  status?: string;
  statusNote?: string;
  gradient?: string;
  size: 'hero' | 'medium' | 'small';
  aspectRatio?: string;
  objectFit?: 'cover' | 'contain';
  maxWidth?: string;
  category: string;
  showOnHome?: boolean;
  overlayLabel?: string;
  path: string;
  summary?: string;
  tags?: string[];
  githubUrl?: string;
  liveUrl?: string;
  highlights?: string[];
  features?: string[];
  architecture?: string;
  stats?: { label: string; value: string }[];
  codeSnippet?: { language: string; filename?: string; code: string };
  period?: string;
  role?: string;
  openSource?: {
    summary: string;
    practices: string[];
    links: { label: string; url: string }[];
  };
}

export interface SiteConfig {
  name: string;
  tagline: string;
  navItems: NavItem[];
  projects: ProjectData[];
  socialLinks?: {
    instagram?: string;
    twitter?: string;
    bluesky?: string;
    email?: string;
    github?: string;
    linkedin?: string;
  };
}

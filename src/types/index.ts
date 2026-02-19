export interface NavLink {
  label: string;
  href: string;
}

export interface HeroContent {
  name: string;
  firstName: string;
  lastName: string;
  title: string;
  details: string[];
  image: string;
}

export interface AboutContent {
  heading: string;
  paragraphs: string[];
  resumeText: string;
  resumeUrl: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  link?: string;
  github?: string;
}

export interface ProjectsContent {
  heading: string;
  projects: Project[];
}

export interface ContactContent {
  sectionLabel: string;
  heading: string;
  subtitle: string;
  nameLabel: string;
  namePlaceholder: string;
  emailLabel: string;
  emailPlaceholder: string;
  messageLabel: string;
  messagePlaceholder: string;
  buttonText: string;
}

export interface FooterContent {
  heading: string;
  email: string;
  copyright: string;
}
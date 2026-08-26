import { NavLink, HeroContent, AboutContent, ProjectsContent, ContactContent, FooterContent } from "@/types";

export const navLinks: NavLink[] = [
  { label: "home", href: "" },
  { label: "about", href: "#about" },
  { label: "projects", href: "#projects" },
];

export const heroContent: HeroContent = {
  name: "VIKTOR\nAHNSTRÖM",
  firstName: "VIKTOR",
  lastName: "AHNSTRÖM",
  title: "Software Engineer",
  details: [
    "Based in Gothenburg",
    "Open to opportunities",
  ],
  image: "/profilepicture.svg",
};

export const aboutContent: AboutContent = {
  heading: "About",
  paragraphs: [
    "I'm a computer engineer based in Gothenburg who enjoys building software that's both technically solid and genuinely pleasant to use. I care about the craft — clean architecture, thoughtful details, and code that holds up over time.",
    "I'm open to opportunities across software development, whether that's frontend, backend, mobile, or full-stack. I've worked across a range of languages and stacks, and I'm always eager to pick up something new if the problem is interesting. What matters most to me is working on something meaningful with people I can learn from.",
    "When I'm not coding, you'll usually find me out with friends or somewhere outdoors hiking.",
  ],
  resumeText: "Download my resume",
  resumeUrl: "/resume.pdf",
};

export const projectsContent: ProjectsContent = {
  heading: "Projects",
  projects: [
    {
      id: "1",
      title: "XADE",
      description: "Thesis work focused on developing and implementing a cross-platform framework for deepfake detection using vision-language models.",
      tags: ["Python", "TypeScript", "Machine Learning"],
      link: "https://example.com",
      github: "https://github.com",
    },
    {
      id: "2",
      title: "Friends of Claudia app",
      description: "Lead developer on a React Native mobile app during my internship at Friends of Claudia, built with Expo Go.",
      tags: ["React Native", "Expo Go"],
      link: "https://example.com",
      github: "https://github.com",
    },
    {
      id: "3",
      title: "Portfolio Website",
      description: "My personal portfolio built with Next.js and Tailwind CSS, featuring animated sections and a Supabase-powered project showcase.",
      tags: ["Next.js", "Tailwind CSS", "TypeScript"],
      link: "https://example.com",
    },
    {
      id: "4",
      title: "Battleship Game",
      description: "An online multiplayer battleship game built for my Android Development course, featuring real-time gameplay with Firebase.",
      tags: ["Kotlin", "Firebase"],
      github: "https://github.com",
    },
    {
      id: "5",
      title: "SongSwipe",
      description: "A music discovery app built with the Spotify API for my iOS course, using a swipe-based interface to find new songs.",
      tags: ["Swift", "Spotify API", "iOS"],
      link: "https://example.com",
      github: "https://github.com",
    },
    {
      id: "6",
      title: "Weather App",
      description: "A clean weather app displaying real-time forecasts and conditions, built as a course project.",
      tags: ["Python", "Django", "AWS"],
      link: "https://example.com",
      github: "https://github.com",
    },
  ],
};

export const contactContent: ContactContent = {
  sectionLabel: "contact",
  heading: "Get in touch",
  subtitle: "Have a question, a proposal, or just want to say hello? Go ahead.",
  nameLabel: "Your Name",
  namePlaceholder: "Enter your name",
  emailLabel: "Email Address",
  emailPlaceholder: "Enter your email address",
  messageLabel: "Your Message",
  messagePlaceholder: "Write your message here...",
  buttonText: "SHOOT",
};

export const footerContent: FooterContent = {
  heading: "SAY HELLO",
  email: "viktor.ahnstrom@gmail.com",
  copyright: "© Viktor Ahnström 2025–2026",
};
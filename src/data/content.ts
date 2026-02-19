import { NavLink, HeroContent, AboutContent, ProjectsContent, ContactContent, FooterContent } from "@/types";

export const navLinks: NavLink[] = [
  { label: "about", href: "#about" },
  { label: "projects", href: "#projects" },
];

export const heroContent: HeroContent = {
  name: "VIKTOR\nAHNSTRÖM",
  firstName: "VIKTOR",
  lastName: "AHNSTRÖM",
  title: "Software Engineer",
  details: [
    "Gothenburg",
    "Available for opportunities",
  ],
  image: "/profilepicture.svg",
};

export const aboutContent: AboutContent = {
  heading: "About",
  paragraphs: [
    "I'm a computer engineer who loves building beautiful, functional digital experiences. My approach combines technical expertise with creative thinking to solve complex challenges.",
    "I specialize in modern JavaScript frameworks, responsive design, and user experience optimization.",
    "When I'm not coding and working, you can find me out with my friends enjoying a drink or in the outdoors hiking.",
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
      description: "Thesis work focused on developing and implementing a new cross-platformframework for deepfake detection using vision-language models.",
      tags: ["Python", "TypeScript", "Machine Learning"],
      link: "https://example.com",
      github: "https://github.com",
    },
    {
      id: "2",
      title: "Friends of Claudia app",
      description: "During my internship at Friends of Claudia, I acted as main developer for their mobile app, which was built with React Native along with Expo Go",
      tags: ["React", "Expo GO"],
      link: "https://example.com",
      github: "https://github.com",
    },
    {
      id: "3",
      title: "Portfolio Website",
      description: "This portfolio website built with Next.js and Tailwind CSS, showcasing my projects and skills with a clean, modern design.",
      tags: ["Next.js", "Tailwind CSS", "TypeScript"],
      link: "https://example.com",
    },
    {
      id: "4",
      title: "Battleship Game",
      description: "Battleship game created in my course Android Development, featuring online gameplay with firebase.",
      tags: ["Kotlin", "Firebase",],
      github: "https://github.com",
    },
    {
      id: "5",
      title: "SongSwipe",
      description: "Songswipe is a music discovery app built with Spotify API in my iOS course it used ´dating app´ feature to swipe on songs you like and dislike.",
      tags: ["Python", "Django", "AWS"],
      link: "https://example.com",
      github: "https://github.com",
    },
    {
      id: "6",
      title: "Weather App",
      description: "Songswipe is a music discovery app built with Spotify API in my iOS course it used ´dating app´ feature to swipe on songs you like and dislike.",
      tags: ["Python", "Django", "AWS"],
      link: "https://example.com",
      github: "https://github.com",
    },

  ],
};

export const contactContent: ContactContent = {
  sectionLabel: "contact",
  heading: "Send me a message!",
  subtitle: "Got a question or proposal, or just want to say hello? Go ahead.",
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
  copyright: "© Viktor Ahnström 2025",
};
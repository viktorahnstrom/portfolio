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
    "Gothenburg",
    "Available for opportunities",
  ],
  image: "/profilepicture.svg",
};

export const aboutContent: AboutContent = {
  heading: "About",
  paragraphs: [
    "I'm a computer engineer based in Gothenburg who enjoys building software that's both technically solid and genuinely pleasant to use. I care about the craft: clean architecture, thoughtful details, and code that holds up over time.",
    "I'm open to opportunities across software development, whether frontend, backend, mobile, or full-stack. I've worked across a range of languages and stacks, and I'm always happy to pick up something new if the problem is interesting. What matters most to me is working on something meaningful with people I can learn from.",
    "When I'm not coding, you'll usually find me out with friends or somewhere in the outdoors hiking.",
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
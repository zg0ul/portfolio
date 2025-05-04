import { StaticImageData } from "next/image";

export type ProjectCategory =
  | "Engineering"
  | "Flutter"
  | "Front-End"
  | "Back-End"
  | "Full-Stack";

export interface Technology {
  name: string;
  icon: string;
}

export interface Project {
  id: string;
  title: string;
  slug: string;
  description: string;
  longDescription: string;
  thumbnail: string;
  categories: ProjectCategory[];
  technologies: Technology[];
  githubUrl?: string;
  liveUrl?: string;
  images: {
    src: string;
    width: number;
    height: number;
    blurDataURL?: string;
    alt: string;
  }[];
  featured: boolean;
}

export const projects: Project[] = [
  {
    id: "1",
    title: "SimTrAI",
    slug: "simtrai",
    description:
      "AI-driven medical training simulation platform for healthcare professionals.",
    longDescription:
      "# SimTrAI\n\nSimTrAI is an AI-driven medical training simulation platform designed for healthcare professionals. The platform enables realistic medical training scenarios using virtual patients and advanced AI techniques.\n\n## Features\n\n- Virtual patient simulations with realistic responses\n- AI-powered diagnostic training\n- Real-time feedback and assessment\n- Customizable training scenarios\n\n## Technologies Used\n\n- React.js for frontend development\n- TensorFlow.js for client-side AI processing\n- Node.js backend with Express\n- MongoDB for data storage",
    thumbnail: "/assets/images/projects/simtrai.jpg",
    categories: ["Engineering", "Full-Stack"],
    technologies: [
      { name: "React", icon: "SiReact" },
      { name: "TensorFlow", icon: "SiTensorflow" },
      { name: "Node.js", icon: "SiNodedotjs" },
      { name: "MongoDB", icon: "SiMongodb" },
    ],
    githubUrl: "https://github.com/username/simtrai",
    images: [
      {
        src: "/assets/images/projects/simtrai.jpg",
        width: 800,
        height: 600,
        alt: "SimTrAI Platform Interface",
      },
    ],
    featured: true,
  },
  {
    id: "2",
    title: "SARAB",
    slug: "sarab",
    description:
      "AI-powered smart glasses to help read for the visually impaired.",
    longDescription:
      "# SARAB\n\nSARAB is a revolutionary project that combines computer vision and text-to-speech technology to create smart glasses that help visually impaired people read text in their environment.\n\n## The Problem\n\nMillions of people worldwide suffer from visual impairments that make reading difficult or impossible, limiting their independence and access to information.\n\n## Our Solution\n\nSARAB smart glasses use a small camera to capture text in the environment, process it using AI, and read it aloud to the user through discreet earphones.\n\n## Technologies Used\n\n- Computer Vision with OpenCV\n- OCR (Optical Character Recognition)\n- Embedded Systems Programming\n- Text-to-Speech technology\n- 3D Printing for prototype development",
    thumbnail: "/assets/images/projects/sarab.jpg",
    categories: ["Engineering"],
    technologies: [
      { name: "Python", icon: "SiPython" },
      { name: "OpenCV", icon: "SiOpencv" },
      { name: "TensorFlow", icon: "SiTensorflow" },
      { name: "Raspberry Pi", icon: "SiRaspberrypi" },
    ],
    githubUrl: "https://github.com/username/sarab",
    images: [
      {
        src: "/assets/images/projects/sarab.jpg",
        width: 800,
        height: 600,
        alt: "SARAB Smart Glasses",
      },
    ],
    featured: true,
  },
  {
    id: "3",
    title: "TaskMaster",
    slug: "taskmaster",
    description:
      "A modern task management application with real-time collaboration features.",
    longDescription:
      "# TaskMaster\n\nTaskMaster is a comprehensive task management solution that helps teams organize their work more efficiently. With real-time updates and collaboration features, it's designed for modern teams who need to stay synchronized.\n\n## Features\n\n- Real-time task updates and collaboration\n- Customizable project boards and views\n- Time tracking and productivity analytics\n- Automated reminders and notifications\n- Cross-platform availability (web, mobile)\n\n## Technologies Used\n\n- Flutter for cross-platform development\n- Firebase for backend and authentication\n- Cloud Firestore for real-time database\n- Firebase Cloud Functions",
    thumbnail: "/assets/images/projects/taskmaster.jpg",
    categories: ["Flutter", "Full-Stack"],
    technologies: [
      { name: "Flutter", icon: "SiFlutter" },
      { name: "Dart", icon: "SiDart" },
      { name: "Firebase", icon: "SiFirebase" },
      { name: "Material Design", icon: "SiMaterialdesign" },
    ],
    githubUrl: "https://github.com/username/taskmaster",
    liveUrl: "https://taskmaster-app.com",
    images: [
      {
        src: "/assets/images/projects/taskmaster.jpg",
        width: 800,
        height: 600,
        alt: "TaskMaster App Interface",
      },
    ],
    featured: false,
  },
  {
    id: "4",
    title: "Portfolio Website",
    slug: "portfolio-website",
    description:
      "Personal portfolio website built with Next.js and TailwindCSS.",
    longDescription:
      "# Portfolio Website\n\nA modern, responsive portfolio website built to showcase my projects and skills. The site features smooth animations, dark mode support, and optimized performance.\n\n## Features\n\n- Responsive design that works on all devices\n- Dark/Light mode support\n- Interactive project showcase\n- Contact form integration\n- SEO optimized\n\n## Technologies Used\n\n- Next.js for server-side rendering and optimized performance\n- TailwindCSS for styling\n- Framer Motion for animations\n- TypeScript for type safety\n- Vercel for deployment",
    thumbnail: "/assets/images/projects/portfolio.jpg",
    categories: ["Front-End"],
    technologies: [
      { name: "Next.js", icon: "SiNextdotjs" },
      { name: "React", icon: "SiReact" },
      { name: "TailwindCSS", icon: "SiTailwindcss" },
      { name: "TypeScript", icon: "SiTypescript" },
    ],
    githubUrl: "https://github.com/username/portfolio",
    liveUrl: "https://myportfolio.dev",
    images: [
      {
        src: "/assets/images/projects/portfolio.jpg",
        width: 800,
        height: 600,
        alt: "Portfolio Website Screenshot",
      },
    ],
    featured: false,
  },
];

export function getAllProjects(): Project[] {
  return projects;
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

export function getProjectsByCategory(category: ProjectCategory): Project[] {
  return projects.filter((project) => project.categories.includes(category));
}

export function getFeaturedProjects(): Project[] {
  return projects.filter((project) => project.featured);
}

export const categories: ProjectCategory[] = [
  "Engineering",
  "Flutter",
  "Front-End",
  "Back-End",
  "Full-Stack",
];

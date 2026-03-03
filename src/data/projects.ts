export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  tech: string[];
  image: string;
  category: "apps" | "ai" | "web";
  github?: string;
  live?: string;
  extra?: string;
}

export const projects: Project[] = [
  {
    id: "aviaassist",
    title: "AviaAssist",
    subtitle: "Pilot Assistance Tool",
    description:
      "A Swift-based iOS app developed with Turkish Airlines pilots and a UI/UX designer to improve operational efficiency. Features include rest time calculation, cold temperature correction, briefing scripts, and cargo IMP codes. Rolled out to 12 pilots with consistent usage tracked via Firebase Analytics.",
    tech: ["Swift", "Firebase", "Figma", "iOS"],
    image: "/images/projects/aviaassist_thumbnail.png",
    category: "apps",
    github: "https://github.com/aydaruya/AviaAssist",
    extra:
      "https://docs.google.com/presentation/d/1hm6m8ilYLwCuvlFCgRplh7UrmUc5W0yL5VoxtQLJvN4/edit?usp=sharing",
  },
  {
    id: "gym-booking",
    title: "Gym Booking App",
    subtitle: "Solving Gym Overcrowding",
    description:
      "Built at UWC ISAK Japan to address gym overcrowding during COVID-19 restrictions. Developed with the PE department, featuring smart scheduling, real-time availability tracking, COVID contact tracing integration, and an admin control panel. Designed to match the school's existing internal system.",
    tech: ["Flask", "Python", "SQL", "JavaScript"],
    image: "/images/projects/smallgym_thumbnail.png",
    category: "apps",
  },
  {
    id: "neurotype",
    title: "Neurotype",
    subtitle: "iOS & Android App",
    description: "A neurodivergent-focused application.",
    tech: ["React Native", "TypeScript", "Supabase"],
    image: "/images/projects/aviaassist_thumbnail.png",
    category: "apps",
  },
  {
    id: "volo",
    title: "Volo",
    subtitle: "iOS & Android App",
    description: "A pilot-focused application.",
    tech: ["React Native", "TypeScript", "Supabase"],
    image: "/images/projects/aviaassist_thumbnail.png",
    category: "apps",
  },
  {
    id: "launchspace",
    title: "LaunchSpace",
    subtitle: "Web & AI Applications Company",
    description:
      "A professional company website for a web and mobile app development company. Features a responsive dark-themed UI, newsletter system with double opt-in via Brevo, dynamic app showcase, and Lighthouse 90+ performance. GDPR-ready with validated inputs and CSP headers.",
    tech: ["React", "TypeScript", "Node.js", "Vercel"],
    image: "/images/projects/aviaassist_thumbnail.png",
    category: "web",
    github: "https://github.com/UzayPoyrza/LaunchSpace",
    live: "https://launchspace.org",
  },
  {
    id: "neurotype-web",
    title: "Neurotype Website",
    subtitle: "",
    description: "Website for Neurotype, a neurodivergent-focused application.",
    tech: ["React", "TypeScript", "Vercel"],
    image: "/images/projects/aviaassist_thumbnail.png",
    category: "web",
    live: "https://neurotypeapp.com",
  },
  {
    id: "volo-web",
    title: "Volo Website",
    subtitle: "",
    description: "Website for Volo, a pilot-focused application.",
    tech: ["React", "TypeScript", "Vercel"],
    image: "/images/projects/aviaassist_thumbnail.png",
    category: "web",
    live: "https://volopilot.app",
  },
  {
    id: "myro",
    title: "Myro",
    subtitle: "Web & CLI App",
    description: "Website for Myro, a coaching platform.",
    tech: ["React", "TypeScript", "Vercel"],
    image: "/images/projects/aviaassist_thumbnail.png",
    category: "web",
    live: "https://myro.coach",
  },
  {
    id: "checkers-ai",
    title: "Checkers AI",
    subtitle: "Alpha-Beta vs. Reinforcement Learning",
    description:
      "A terminal-based checkers engine with multiple game modes: human vs human, human vs AI, and AI vs AI. Implements alpha-beta pruning with configurable depth and a Q-Learning RL agent trained via self-play. After 10,000 episodes, the RL agent outperformed alpha-beta in most matches.",
    tech: ["Python", "Q-Learning", "Alpha-Beta Pruning"],
    image: "/images/projects/checkers.png",
    category: "ai",
    github: "https://github.com/UzayPoyrza/checker-RL",
  },
];

export const projectCategories = [
  { key: "apps", label: "apps" },
  { key: "web", label: "web" },
  { key: "ai", label: "ai / ml" },
] as const;

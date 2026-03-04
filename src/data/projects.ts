export type ProjectStatus = "live" | "dev" | "discontinued";

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  tech: string[];
  image: string;
  category: "apps" | "ai" | "web";
  status: ProjectStatus;
  github?: string;
  live?: string;
  extra?: string;
  demo?: string;
}

export const projects: Project[] = [
  {
    id: "neurotype",
    title: "Neurotype",
    subtitle: "Science-Based Meditation App",
    description: "Noticed no meditation app is actually science-based, even though research shows certain techniques can be borderline therapeutic. That idea alone was enough to start building a full production-grade app from scratch. Took a while but it's coming together. Launching soon.",
    tech: ["React Native", "TypeScript", "Supabase"],
    image: "/images/projects/aviaassist_thumbnail.png",
    category: "apps",
    status: "dev",
    github: "https://github.com/UzayPoyrza/Neurotype",
  },
  {
    id: "volo",
    title: "Volo",
    subtitle: "AviaAssist reborn  - more features, more useful, more pilots involved, built with and integrated AI",
    description: "AviaAssist was loved by pilots but never hit production  - so we went bigger. Volo is the full rebuild with AI baked in, more features, and more pilots involved. We also set up OpenClaw on WhatsApp to directly involve one of the pilots with development. Insane experience, launching soon.",
    tech: ["React Native", "TypeScript", "Supabase"],
    image: "/images/projects/aviaassist_thumbnail.png",
    category: "apps",
    status: "dev",
  },
  {
    id: "aviaassist",
    title: "AviaAssist",
    subtitle: "Pilot Assistance Tool",
    description:
      "A Swift-based iOS app developed with Turkish Airlines pilots and a UI/UX designer to improve operational efficiency. Features include rest time calculation, cold temperature correction, briefing scripts, and cargo IMP codes. Rolled out to 12 pilots with consistent usage tracked via Firebase Analytics.",
    tech: ["Swift", "Firebase", "Figma", "iOS"],
    image: "/images/projects/aviaassist_thumbnail.png",
    category: "apps",
    status: "discontinued",
    github: "https://github.com/aydaruya/AviaAssist",
    extra:
      "https://docs.google.com/presentation/d/1hm6m8ilYLwCuvlFCgRplh7UrmUc5W0yL5VoxtQLJvN4/edit?usp=sharing",
    demo: "https://www.youtube.com/embed/WBDuho0EyIU",
  },
  {
    id: "gym-booking",
    title: "Gym Booking App",
    subtitle: "Solving Gym Overcrowding",
    description:
      "My first real project  - built at UWC ISAK Japan during COVID to solve gym overcrowding. Full-stack booking system with scheduling, live availability, and an admin panel. Rough around the edges, but it worked and people used it. Here for historic value.",
    tech: ["Flask", "Python", "SQL", "JavaScript"],
    image: "/images/projects/smallgym_thumbnail.png",
    category: "apps",
    status: "live",
    demo: "https://www.youtube.com/embed/b22Ctlpv0ac",
  },
  {
    id: "launchspace",
    title: "LaunchSpace",
    subtitle: "Web & AI Applications Company",
    description: "Company website with a pretty clean UI. Claude could probably one-shot this now, but at the time it took a while building with early Cursor.",
    tech: ["React", "TypeScript", "Node.js", "Vercel"],
    image: "/images/projects/aviaassist_thumbnail.png",
    category: "web",
    status: "live",
    github: "https://github.com/UzayPoyrza/LaunchSpace",
    live: "https://launchspace.org",
  },
  {
    id: "neurotype-web",
    title: "Neurotype Website",
    subtitle: "Landing Page",
    description: "",
    tech: ["React", "TypeScript", "Vercel"],
    image: "/images/projects/aviaassist_thumbnail.png",
    category: "web",
    status: "live",
    github: "https://github.com/UzayPoyrza/Neurotype-Website",
    live: "https://neurotypeapp.com",
  },
  {
    id: "volo-web",
    title: "Volo Website",
    subtitle: "Landing Page",
    description: "",
    tech: ["React", "TypeScript", "Vercel"],
    image: "/images/projects/aviaassist_thumbnail.png",
    category: "web",
    status: "live",
    github: "https://github.com/UzayPoyrza/volo-website",
    live: "https://volopilot.app",
  },
  {
    id: "myro",
    title: "Myro",
    subtitle: "Competitive Programming Coach",
    description: "Primarily CLI-based. Passion project with a PhD friend from Princeton and UC Riverside. Goal is to make you red in Codeforces - a problem that takes 40 mins to solve, Myro guides you through the key observations in 15 without giving it away.",
    tech: ["Rust", "LLMs", "CLI"],
    image: "/images/projects/aviaassist_thumbnail.png",
    category: "web",
    status: "dev",
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
    status: "live",
    github: "https://github.com/UzayPoyrza/checker-RL",
  },
];

export const projectCategories = [
  { key: "apps", label: "apps" },
  { key: "web", label: "web" },
  { key: "ai", label: "ai / ml" },
] as const;

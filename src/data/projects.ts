export type ProjectStatus = "live" | "dev" | "discontinued";

export interface Collaborator {
  name: string;
  role: string;
  url?: string;
}

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  tech: string[];
  image: string;
  category: "apps" | "ai" | "web" | "cli";
  status: ProjectStatus;
  github?: string;
  live?: string;
  appStore?: string;
  extra?: string;
  demo?: string;
  collaborators?: Collaborator[];
  highlights?: string[];
  frontend?: string;
  backend?: string;
}

export const projects: Project[] = [
  {
    id: "neurotype",
    title: "Neurotype",
    subtitle: "Science-based meditation & CBT app",
    description: "Started after watching a Harvard psychiatrist explain how different brain types need completely different meditation styles. Someone with ADHD trying a guided body scan is basically set up to fail - they'd benefit way more from sound-based techniques. No app addressed this, so I built one. Neurotype scrapes the latest research on sleep, ADHD, anxiety and more, then personalizes the session style to what actually works for each user.",
    tech: ["React Native", "TypeScript", "Supabase", "so many more"],
    image: "/images/projects/aviaassist_thumbnail.png",
    category: "apps",
    status: "dev",
    github: "https://github.com/UzayPoyrza/Neurotype",
    highlights: [
      "Scrapes and indexes latest meditation research papers automatically",
      "Personalization engine that adapts session style to individual brain type",
      "CBT-based journaling with progress tracking and technique effectiveness scoring",
      "Offline-first architecture - sessions work without connectivity",
    ],
    frontend: "React Native with TypeScript, custom animation system for breathing guides and session transitions. Designed every screen from scratch in Figma first. The session player handles multiple meditation modalities - sound-based, breathwork, body scans, visualizations - each with its own interactive UI.",
    backend: "Supabase for auth, database, and real-time sync. Custom research scraper that pulls from PubMed and indexes findings by condition (ADHD, anxiety, sleep, focus). Personalization algorithm tracks which techniques work for each user and adjusts recommendations over time.",
    collaborators: [
      { name: "Uzay Poyraz", role: "Everything" },
    ],
  },
  {
    id: "volo",
    title: "Volo",
    subtitle: "Toolkit for Airline Pilots",
    description: "When I was 12 I got to sit in a cockpit and noticed how many calculations pilots did by hand - that stuck with me. Years later, when I learned mobile dev, the first thing I did was reach out to pilots and build an app that automates a bunch of processes - AviaAssist. The app was used by 12 pilots but never hit production. I always wanted to come back to it, and I did. Volo is the full rebuild - more features, AI integrated, and saving 15 minutes per flight. I set up a self-hosted OpenClaw instance on WhatsApp to collaborate with pilots directly on development and get an app that matches exactly what's needed.",
    tech: ["React Native", "TypeScript", "Supabase"],
    image: "/images/projects/aviaassist_thumbnail.png",
    category: "apps",
    status: "dev",
    highlights: [
      "AI-powered flight operations - rest calculations, weather briefs, cargo codes",
      "Self-hosted OpenClaw instance for direct pilot collaboration during development",
      "Saves ~15 minutes per flight for operational calculations",
      "Full rebuild of AviaAssist with production-grade architecture",
    ],
    frontend: "React Native with TypeScript. Designed with direct pilot input at every step - every screen optimized for cockpit usability. OpenClaw on WhatsApp let pilots request features and flag issues in real time during development.",
    backend: "Supabase for auth and data layer. AI integration for intelligent flight briefings and operational calculations. Real-time sync so flight data stays current across devices.",
    collaborators: [
      { name: "Uzay Poyraz", role: "Lead Developer" },
      { name: "Aydaru", role: "Pilot Advisor & Testing" },
    ],
  },
  {
    id: "incraft",
    title: "Incraft",
    subtitle: "AI Guided Meditation Generator & Studio",
    description: "For Neurotype I built an AI pipeline that turns research papers into meditation sessions. Using the fundamentals I created Incraft: go from a prompt to a fully produced meditation or CBT session in seconds. For casual use, typing 'I'm anxious about my meeting tomorrow' gets you a custom session tailored exactly to that. Therapists can go deeper - choosing from ~50 evidence-based protocols like CBT, PMR, urge surfing, and more, each with its own structure, safety constraints, and pacing rules. Every session is pause-aware and matches sounds to each session - a prompt like 'having a panic attack' gets a breathwork session with ocean waves and pauses timed to the breathing rhythm. Built a custom studio so therapists, creators, and instructors can further access and craft exact experiences their clients need.",
    tech: ["Next.js", "Stripe", "AWS Lambda", "ElevenLabs", "Supabase", "PostHog", "Python"],
    image: "/images/projects/aviaassist_thumbnail.png",
    category: "web",
    status: "live",
    live: "https://incraft.io",
    highlights: [
      "Full prompt-to-audio pipeline - script generation, TTS, ambient soundscape layering",
      "Custom studio for therapists and instructors to create and distribute meditations",
      "Freemium model with Stripe billing and usage-based limits",
      "Self-healing post-processing that retries failed audio jobs automatically",
    ],
    frontend: "Next.js with a studio interface where creators configure voice, duration, protocol, and ambient sounds. Real-time preview of generated scripts before committing to audio generation. Responsive playback experience with waveform visualization.",
    backend: "RESTful API on AWS Lambda. AI generates personalized meditation scripts, ElevenLabs handles TTS, custom post-processing pipeline layers ambient soundscapes. Supabase for user data and session storage. PostHog for analytics. Stripe for billing with webhook-driven subscription management.",
    collaborators: [
      { name: "Uzay Poyraz", role: "Full-Stack Developer" },
    ],
  },
  {
    id: "myro",
    title: "Myro",
    subtitle: "Competitive Programming Coach",
    description: "Passion project with a PhD friend from Princeton and UC Riverside. Myro turns your terminal into a competitive programming gym - it pulls problems from Codeforces, predicts which ones match your skill level using a logistic matrix factorization model, and coaches you through with Socratic hints, not answers. Think Anki meets Codeforces, inside a terminal.",
    tech: ["Rust", "LLMs", "CLI"],
    image: "/images/projects/aviaassist_thumbnail.png",
    category: "cli",
    status: "dev",
    live: "https://myro.coach",
    highlights: [
      "Guides you through key observations without spoiling the solution",
      "Reduces 40-minute problem solve time down to 15 minutes",
      "Built in Rust for performance - handles parsing and analysis locally",
      "Adaptive hint system that reads your progress and adjusts difficulty",
    ],
    frontend: "CLI-first experience built in Rust. Clean terminal UI with syntax-highlighted problem statements, step-by-step hint reveals, and progress tracking. Web landing page at myro.coach.",
    backend: "Rust core handles problem parsing, solution analysis, and hint generation. LLM integration for understanding problem structure and generating pedagogically sound hints that guide without giving away the answer.",
    collaborators: [
      { name: "Uzay Poyraz", role: "Co-Creator & Developer" },
      { name: "PhD Collaborator (Princeton)", role: "Algorithm Design" },
      { name: "PhD Collaborator (UC Riverside)", role: "Algorithm Design" },
    ],
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
    highlights: [
      "Rest time calculator, cold temperature correction, briefing scripts",
      "Cargo IMP code lookup used daily by 12 Turkish Airlines pilots",
      "Usage tracked via Firebase Analytics - consistent daily engagement",
      "Designed with a professional UI/UX designer for cockpit usability",
    ],
    frontend: "Swift-based native iOS app. Designed in Figma with a UI/UX designer, optimized for quick access during flight operations. Clean tab-based navigation for different pilot tools.",
    backend: "Firebase for analytics, crash reporting, and remote config. Local-first data model so core features work offline during flights.",
    collaborators: [
      { name: "Uzay Poyraz", role: "Lead Developer" },
      { name: "Aydaru", role: "Pilot Advisor & Domain Expert" },
      { name: "UI/UX Designer", role: "Interface Design" },
    ],
  },
  {
    id: "weather-time-widget",
    title: "WeatherTimeWidget",
    subtitle: "Weather, Date & Time iOS Widget",
    description: "Noticed no iOS widget combined weather, date, and time in one place - so I built one and went from zero to submitted for Apple review in a single day. Hit #22 on Weather in the App Store.",
    tech: ["Swift", "WidgetKit", "iOS"],
    image: "/images/projects/wtw_promo.png",
    category: "apps",
    status: "live",
    highlights: [
      "Only iOS widget combining weather, date, and time in one view",
      "Multiple widget sizes with dark/light theme support",
      "Hourly forecast with fully customizable units",
    ],
    frontend: "Swift with WidgetKit. Multiple widget size configurations, each with a carefully designed layout. Supports both system dark/light modes with custom theme variations.",
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
    highlights: [
      "Real-time gym availability and slot booking",
      "Admin panel for managing schedules and capacity",
      "Built during COVID to solve real overcrowding problem at UWC ISAK Japan",
    ],
    frontend: "Server-rendered HTML with JavaScript for interactive booking. Simple but functional UI that students actually used daily.",
    backend: "Flask with SQLite. RESTful API handling bookings, scheduling, and availability calculations. Admin panel for gym staff to manage time slots and capacity limits.",
  },
  {
    id: "launchspace",
    title: "LaunchSpace",
    subtitle: "Web & AI Applications Company",
    description: "My company's website, built with professional Framer-level design standards.",
    tech: ["React", "TypeScript", "Node.js", "Vercel"],
    image: "/images/projects/aviaassist_thumbnail.png",
    category: "web",
    status: "live",
    github: "https://github.com/UzayPoyrza/LaunchSpace",
    live: "https://launchspace.org",
    highlights: [
      "Company website for LaunchSpace - web & AI applications company",
      "Clean, minimal design built with early Cursor",
    ],
    frontend: "React with TypeScript. Component-based architecture deployed on Vercel. Responsive design with smooth scroll animations.",
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
    id: "checkers-ai",
    title: "Checkers AI",
    subtitle: "Alpha-Beta vs. Reinforcement Learning",
    description:
      "Built this from scratch after my reinforcement learning class. See if you can beat my AI (alpha-beta pruning, depth 4, running Python in your browser via Pyodide)",
    tech: ["Python", "Q-Learning", "Alpha-Beta Pruning"],
    image: "/images/projects/checkers.png",
    category: "ai",
    status: "live",
    github: "https://github.com/UzayPoyrza/checker-RL",
    highlights: [
      "Alpha-beta pruning AI at depth 4 running Python in the browser via Pyodide",
      "Q-Learning reinforcement learning agent trained from scratch",
      "Playable directly on the portfolio - no server needed",
    ],
    frontend: "Interactive board rendered in the browser. Pyodide compiles and runs the Python AI engine client-side - no backend required. Move validation, capture chains, and king promotions all handled in real-time.",
    backend: "Pure Python AI engine. Alpha-beta pruning with custom evaluation heuristics. Q-Learning agent trained over thousands of self-play games. The entire engine runs in WebAssembly via Pyodide.",
  },
];

export const projectCategories = [
  { key: "apps", label: "apps" },
  { key: "web", label: "web" },
  { key: "ai", label: "ai / ml" },
  { key: "cli", label: "cli" },
] as const;

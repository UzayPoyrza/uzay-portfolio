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
  evidence?: { src: string; caption: string };
}

export const projects: Project[] = [
  {
    id: "neurotype",
    title: "Neurotype",
    subtitle: "Science-based meditation & CBT app",
    description: "I started Neurotype after hearing Harvard-trained psychiatrist Dr. K talk about how different minds respond to different meditation styles. Someone with ADHD may benefit more from sound or movement sessions than a long body scan - but most meditation apps still treat everyone the same. So I built one that doesn't. Neurotype uses AI to turn research across ADHD, anxiety, sleep, and more into full guided meditation and CBT sessions, then adapts recommendations based on what each user responds to best.",
    tech: ["React Native (Expo)", "Supabase (PostgreSQL)", "FFmpeg", "StoreKit 2", "ElevenLabs", "Cloudflare R2", "GPT Pro Research"],
    image: "/images/projects/aviaassist_thumbnail.png",
    category: "apps",
    status: "live",
    appStore: "https://apps.apple.com/tr/app/neurotype-meditate-smarter/id6760377714",
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
    description: "When I was 12, I had the chance to sit in a cockpit and noticed how many calculations pilots still did by hand. It became one of the first real problems I wanted to solve with software. I built Volo in collaboration with active airline pilots to directly identify and address pain points in the cockpit. For part of the process, I deployed a self-hosted OpenClaw agent on WhatsApp to make the connection between their domain experience and my development seamless. Together, we brought 30 minutes of preflight prep down to under a minute. 200+ pilots started using it from day one, many skipping free trials to go straight to paid.",
    tech: ["React Native", "TypeScript", "Supabase"],
    image: "/images/projects/aviaassist_thumbnail.png",
    category: "apps",
    status: "live",
    appStore: "https://apps.apple.com/tr/app/volo-airline-pilot-companion/id6759592092",
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
    description: "I built Incraft after realizing parts of the pipeline behind Neurotype could be optimized to deliver studio-quality, voiced sessions in under a minute. With Incraft, you describe what you're going through and it generates a complete guided meditation or CBT session tailored to that moment, automatically selecting the protocols and structure that fit best. For therapists, creators, and instructors, that same prompt-based generation can be steered much more explicitly - sessions can be shaped with ~50 evidence-based protocols like CBT, PMR, and urge surfing, each with its own pacing rules, safety constraints, and structure. The studio adds even finer control for crafting sessions for specific patients, clients, or audiences.",
    tech: ["Next.js", "Stripe", "AWS Lambda", "ElevenLabs", "Supabase", "PostHog", "Python", "OpenRouter"],
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
    description: "Open-source project with a PhD friend from Princeton and UC Riverside. Myro turns your terminal into a competitive programming gym - it pulls problems from Codeforces, predicts which ones match your skill level using a logistic matrix factorization model, and coaches you through with Socratic hints, not answers. Think Anki meets Codeforces, inside a terminal.",
    tech: ["Rust", "Ratatui", "Web Scraping", "LLMs", "Supabase"],
    image: "/images/projects/aviaassist_thumbnail.png",
    category: "cli",
    status: "live",
    live: "https://myro.coach",
    github: "https://github.com/UzayPoyrza/myro",
    highlights: [
      "Skill-adaptive problem recommendations",
      "AI Socratic coaching",
      "Integrated vim editor",
      "Codeforces submission & verdict tracking",
      "Per-tag skill ratings",
      "Spaced repetition",
    ],
    frontend: "CLI-first experience built in Rust with Ratatui, heavily influenced by Claude Code's CLI design. Integrated vim editor for writing and submitting solutions without leaving the terminal. Web landing page at myro.coach.",
    backend: "• Logistic matrix factorization model for solve-probability prediction\n• Cold-start user embedding fitted on-the-fly from Codeforces history, no retraining needed\n• Codeforces API client with rate limiting and exponential backoff retry\n• HTML scraping for problem statement extraction\n• Spaced repetition + prerequisite-aware problem sequencing\n• LLM coaching engine with observation-based state tracking and intervention detection (stall/velocity/rewrite)\n• Supabase integration for optional cloud sync (GitHub OAuth PKCE)\n• OpenAI-compatible LLM provider (supports OpenRouter, Ollama, local models)\n• XDG-compliant local storage, flat JSON files",
    collaborators: [
      { name: "Uzay Poyraz", role: "Co-Creator & Developer" },
      { name: "Kaya", role: "Princeton PhD", url: "https://kalpturer.github.io/" },
      { name: "Yunus", role: "UC Riverside PhD", url: "https://cahilfil.xyz/home/index.xml" },
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
    tech: ["Swift", "WidgetKit"],
    image: "/images/projects/wtw_promo.png",
    category: "apps",
    status: "live",
    appStore: "https://apps.apple.com/us/app/weather-time-widget/id6761026960",
    highlights: [
      "Only iOS widget combining weather, date, and time in one view",
      "Multiple widget sizes with dark/light theme support",
      "Hourly forecast with fully customizable units",
    ],
    backend: "• Multi-API architecture with automatic failover (MGM, NWS, Open-Meteo)\n• App Group shared data layer between the main app and widget extension\n• Smart caching — minimizes API calls with TTL-based refresh and silent background updates\n• Pure Apple stack — SwiftUI, WidgetKit, AppIntents, CoreLocation (no third-party dependencies)",
    evidence: { src: "/images/projects/wtw_chart.jpeg", caption: "#22 in Weather on the App Store" },
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
    tech: ["React", "TypeScript", "Node.js", "Vercel", "Framer Motion"],
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

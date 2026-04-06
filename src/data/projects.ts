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
      "200+ sessions across 11 conditions (ADHD, anxiety, sleep, panic, burnout, depression, etc.) with safety classes per session (standard, gated, panic-support, trauma-sensitive)",
      "Adaptive recommendations using weighted engagement signals - tracks which of 8 technique modalities (breathing, somatic, sound, visualization, mindfulness, movement, mantra, compassion) work best for each user",
      "Neuroadaptation milestones that frame progress in actual neuroscience terms with cited studies, not just streaks",
      "Module effectiveness tracking, wellbeing tracking, and technique effectiveness flower visualization showing your personal response to each modality over time",
      "Multiple sound options per session with intelligent sound selection that matches the protocol",
      "Live subtitles, during-session 'how do you feel' bar, and post-session ratings that feed back into the recommendation engine",
      "Skip button that jumps past the instruction straight to practice for returning users",
      "1 session a day architecture with a 'done for today' state and optional daily notifications - the scientifically accurate approach to meditation practice rather than binge-listening",
      "Share sessions and like sessions to build a personal library",
      "Sessions built on scientific literature with session shapes and protocols optimized for UX and scientific accuracy",
      "Multiple voice options per session",
      "Offline-first architecture with aggressive caching",
    ],
    frontend: "React Native (Expo) with TypeScript. Animated onboarding that explains condition-specific meditation. Today tab with algorithmically-recommended sessions. Full-screen immersive player with background sounds (ocean, crickets, fire), optional transcript, and post-session 0-10 wellbeing rating. Interactive progress calendar, wellbeing trend charts (week/month/year), technique effectiveness flower, and neuroadaptation milestone timeline. Explore tab with 200+ sessions filterable by module, modality, or search.",
    backend: "Supabase for auth (Google/Apple OAuth), database (PostgreSQL with RLS), and real-time sync.\n\n• AI session generation pipeline: GPT Pro extracts techniques from research papers, maps them into 37 session formats across 20 internal protocol families, generates protocol-specific rules from difficulty, safety constraints, and evidence tiers, then compiles into custom XML with multi-level pause semantics and skip markers\n• Downstream audio stack converts XML session specs into TTS outputs via ElevenLabs, matches approved sounds through a protocol-aware multi-stage LLM pipeline\n• Terminal-based mix/master chains built with sound engineers using FFmpeg and FabFilter for scalable production-grade audio output\n• Analytics-driven personalization using weighted engagement signals to adapt recommendations\n• Cloudflare R2 for audio storage and delivery\n• StoreKit 2 for subscriptions (free with limited modules, 21-day trial, $2.99/mo or $24.99/yr)",
    collaborators: [
      { name: "Uzay Poyraz", role: "Everything" },
    ],
  },
  {
    id: "volo",
    title: "Volo",
    subtitle: "Toolkit for Airline Pilots",
    description: "When I was 12, I had the chance to sit in a cockpit and noticed how many calculations pilots still did by hand. It became one of the first real problems I wanted to solve with software. I built Volo in collaboration with active airline pilots to directly identify and address pain points in the cockpit. For part of the process, I deployed a self-hosted OpenClaw agent on WhatsApp to make the connection between their domain experience and my development seamless. Together, we brought 30 minutes of preflight prep down to under a minute. 170+ pilots started using it from day one, many skipping free trials to go straight to paid.",
    tech: ["React Native", "TypeScript", "Supabase"],
    image: "/images/projects/aviaassist_thumbnail.png",
    category: "apps",
    status: "live",
    appStore: "https://apps.apple.com/tr/app/volo-airline-pilot-companion/id6759592092",
    highlights: [
      "Crew rest time, cold temperature altitude corrections, and CTOT slot calculators",
      "Fetches TAFs and checks them against operational minima to verify destination suitability",
      "Pulls runway and SID assignments from airport systems",
      "Reference lookups for cargo codes, aircraft SIM registrations, and altitude conversion tables",
      "NAT route analysis - validates North Atlantic track waypoints",
      "Offline-first for inflight tools",
      "Exportable PDF reports for crew sharing and flight record documentation",
    ],
    frontend: "Glass cockpit UI. Built to be performant on every module. Features designed with direct pilot input at every step - every screen optimized for cockpit usability. Iterated with OpenClaw on WhatsApp instead of back and forth prototyping.",
    backend: "• Supabase handles auth and the data layer, with real-time sync keeping everything current across devices\n• Aggressive caching strategy built and stress-tested to guarantee zero failures when pilots lose connectivity mid-flight\n• In-app subscription flow with StoreKit\n• Custom admin dashboard that surfaces bug reports, feature requests, and usage analytics - app crashes trigger automatic escalation",
    collaborators: [
      { name: "Uzay Poyraz", role: "Lead Developer" },
      { name: "I.P", role: "Pilot Advisor & Testing" },
      { name: "S.G", role: "Pilot Advisor & Testing" },
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
      "Pause-aware audio pipeline that inserts natural silence based on protocol timing, not just text breaks",
      "Scientific protocol-driven generation - ~50 evidence-based protocols (CBT, PMR, urge surfing) each with their own pacing rules, safety constraints, and structure",
      "Sessions shaped per protocol - a body scan breathes differently than a cognitive defusion exercise, and the pipeline respects that",
      "Every session is mixed and mastered - ambient layers, voice, and silence are balanced into a studio-quality output",
      "Intelligent sound selection that picks ambient soundscapes to match each session's tone and protocol",
      "Best-in-class TTS voices found by benchmarking 10+ providers to get the warmth, pacing, and naturalness right",
    ],
    frontend: "Next.js for performance. The generation flow borrows ChatGPT's simplicity, the studio feels like Google Docs meets ElevenLabs. The script editor is built around original features that don't exist elsewhere: inline pause insertions, protocol block controls, and timing adjustments, all packaged in an ElevenLabs-style layout for maximum intuitiveness with zero learning curve.",
    backend: "Python/FastAPI on AWS Lambda (Docker via Mangum), Supabase, OpenRouter (Gemini 2.5 Flash).\n\n• 10-step script generation pipeline: validate, classify intent, select shape/sound, fill fields, write script, fix pauses, extend if too short, sanitize, and save. Steps that can run concurrently do via asyncio.gather\n• Born from optimizing Neurotype's pipeline. Pushed everything possible to precomputed JSON artifacts loaded at startup, making the pipeline deterministic where it can be and reducing LLM usage down to just 4 calls\n• Generate/render split: scripts are saved to Supabase after generation so users can edit them in the studio before sending to TTS\n• Separate TTS Lambda invoked via boto3 with a multi-provider setup (Inworld + ElevenLabs) behind a unified interface\n• Custom XML language created by the script generation pipeline is parsed by the TTS Lambda with pydub and ffmpeg for quick mixing and silences\n• Stripe for billing with webhook-driven subscription management. PostHog for analytics",
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
    frontend: "Started by using Claude's computer-use to clone a site I liked, then rebuilt it with a space-inspired theme and Framer Motion. Smooth scroll-driven animations, parallax effects, and transitions throughout. Migrated to Node.js for performance. Deployed on Vercel.",
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
      "Q-tables serialized with pickle so the trained policy loads instantly, no retraining",
      "Hand-tuned evaluation heuristics for the alpha-beta agent",
    ],
    backend: "RL agent trained across 10,000+ self-play games using reward shaping and epsilon decay. Benchmarked over 5,000 matches to verify policy convergence and tactical improvement over time.",
  },
];

export const projectCategories = [
  { key: "apps", label: "apps" },
  { key: "web", label: "web" },
  { key: "ai", label: "ai / ml" },
  { key: "cli", label: "cli" },
] as const;

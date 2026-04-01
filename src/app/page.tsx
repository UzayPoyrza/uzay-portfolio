"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import CustomCursor from "@/components/layout/CustomCursor";
import LoadingScreen from "@/components/layout/LoadingScreen";
import { useTheme } from "@/components/layout/ThemeProvider";
import { useActiveSection } from "@/hooks/useActiveSection";
import { personal } from "@/data/personal";
import { projects, type ProjectStatus } from "@/data/projects";
import { skillCategories } from "@/data/skills";
import { timeline } from "@/data/experience";
import MeditationDemo from "@/components/demos/MeditationDemo";
import CheckersDemo from "@/components/demos/CheckersDemo";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease: "easeOut" as const },
});

const navLinks = [
  { label: "ABOUT", href: "#about" },
  { label: "PROJECTS", href: "#projects" },
  { label: "EXPERIENCE", href: "#experience" },
];

const sectionIds = ["about", "projects", "experience"];

const typeLabels: Record<string, string> = {
  apps: "Mobile App",
  web: "Website",
  ai: "AI / ML",
};

const statusConfig: Record<ProjectStatus, { dot: string; label: string }> = {
  live: { dot: "bg-green-500", label: "Live" },
  dev: { dot: "bg-yellow-500", label: "In Dev" },
  discontinued: { dot: "bg-red-500", label: "Archived" },
};

const projectScreenshots: Record<string, string[]> = {
  aviaassist: ["/images/projects/avia_ss1.png", "/images/projects/avia_ss2.png", "/images/projects/aviaassist_thumbnail.png"],
  "gym-booking": ["/images/projects/smallgym_thumbnail.png"],
  "checkers-ai": ["/images/projects/checkers.png"],
};

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number];

/* Group related app + website projects together */
const websitePairs: Record<string, string> = {
  neurotype: "neurotype-web",
  volo: "volo-web",
};
const pairedWebsiteIds = new Set(Object.values(websitePairs));

interface ProjectGroup {
  primary: (typeof projects)[number];
  website?: (typeof projects)[number];
}

const projectGroups: ProjectGroup[] = projects
  .filter((p) => !pairedWebsiteIds.has(p.id))
  .map((p) => ({
    primary: p,
    website: websitePairs[p.id]
      ? projects.find((w) => w.id === websitePairs[p.id])
      : undefined,
  }));

/* ── Phone Mockup (realistic iPhone with side buttons) ── */
function PhoneMockup({ screenshots, title, showDots = true }: { screenshots: string[]; title: string; showDots?: boolean }) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (screenshots.length <= 1) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % screenshots.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [screenshots.length]);

  return (
    <div className="relative w-[180px] shrink-0 md:w-[210px]">
      {/* Side buttons */}
      <div className="absolute -left-[3px] top-[55px] h-[22px] w-[3px] rounded-l bg-border/50" />
      <div className="absolute -left-[3px] top-[85px] h-[34px] w-[3px] rounded-l bg-border/50" />
      <div className="absolute -left-[3px] top-[127px] h-[34px] w-[3px] rounded-l bg-border/50" />
      <div className="absolute -right-[3px] top-[105px] h-[48px] w-[3px] rounded-r bg-border/50" />

      {/* Frame */}
      <div className="relative overflow-hidden rounded-[32px] border-[3px] border-border/30 bg-[#1a1a1a] p-1.5 shadow-2xl shadow-black/40">
        {/* Dynamic Island */}
        <div className="absolute left-1/2 top-2.5 z-20 h-[16px] w-[60px] -translate-x-1/2 rounded-full bg-[#1a1a1a]" />

        {/* Screen */}
        <div className="relative aspect-[9/19.5] overflow-hidden rounded-[24px] bg-bg-elevated">
          {screenshots.length > 0 ? (
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.8, ease }}
                className="absolute inset-0"
              >
                <Image
                  src={screenshots[current]}
                  alt={`${title} screen ${current + 1}`}
                  fill
                  className="object-cover"
                  sizes="210px"
                />
              </motion.div>
            </AnimatePresence>
          ) : (
            <div className="flex h-full flex-col items-center justify-center gap-2 bg-gradient-to-b from-accent/5 to-bg-elevated">
              <span className="font-serif text-5xl text-text/[0.08]">{title.charAt(0)}</span>
              <span className="font-mono text-[8px] text-text-muted/30">coming soon</span>
            </div>
          )}
        </div>

        {/* Home Indicator */}
        <div className="absolute bottom-1 left-1/2 h-[3px] w-16 -translate-x-1/2 rounded-full bg-white/20" />
      </div>

      {/* Dots */}
      {showDots && screenshots.length > 1 && (
        <div className="mt-3 flex justify-center gap-1.5">
          {screenshots.map((_, i) => (
            <div
              key={i}
              className={`h-1 rounded-full transition-all duration-500 ${
                i === current ? "w-3 bg-accent" : "w-1 bg-text-muted/30"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

/* ── Phone Showcase (3 phones fanned out with hover interactions) ── */
function PhoneShowcase({ screenshots, title }: { screenshots: string[]; title: string }) {
  const [hovered, setHovered] = useState<number | null>(null);

  const phones = [
    {
      screenshots: screenshots[1] ? [screenshots[1]] : screenshots[0] ? [screenshots[0]] : [],
      x: -75,
      rotate: -8,
      baseScale: 0.85,
      z: 1,
      delay: 0.15,
    },
    {
      screenshots: screenshots,
      x: 0,
      rotate: 0,
      baseScale: 1,
      z: 10,
      delay: 0,
    },
    {
      screenshots: screenshots[2] ? [screenshots[2]] : screenshots[0] ? [screenshots[0]] : [],
      x: 75,
      rotate: 8,
      baseScale: 0.85,
      z: 1,
      delay: 0.2,
    },
  ];

  return (
    <div
      className="relative flex h-[360px] items-center justify-center phone-showcase md:h-[420px]"
      style={{ perspective: "1500px" }}
      onMouseLeave={() => setHovered(null)}
    >
      {phones.map((phone, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{ zIndex: hovered === i ? 20 : phone.z }}
          initial={{ opacity: 0, y: 60, x: 0, rotate: 0 }}
          animate={{
            opacity: hovered !== null && hovered !== i ? 0.6 : 1,
            y: 0,
            x: phone.x,
            rotate: hovered === i ? 0 : phone.rotate,
            scale: hovered === i ? 1.1 : phone.baseScale,
          }}
          transition={{
            duration: 0.5,
            ease,
            opacity: { duration: 0.3 },
            y: { delay: phone.delay, duration: 0.7 },
            x: { delay: phone.delay, duration: 0.7 },
          }}
          onMouseEnter={() => setHovered(i)}
        >
          <PhoneMockup screenshots={phone.screenshots} title={title} showDots={false} />
        </motion.div>
      ))}
    </div>
  );
}

/* ── Web Mockup (monitor-style) ── */
function WebMockup({ screenshot, title, url }: { screenshot: string | null; title: string; url?: string }) {
  return (
    <div className="w-full">
      {/* Screen */}
      <div className="overflow-hidden rounded-lg border-2 border-border/40 bg-[#1a1a1a] shadow-2xl shadow-black/30">
        {/* Tab bar */}
        <div className="flex items-center gap-2 border-b border-white/5 px-3 py-1.5">
          <div className="flex gap-1.5">
            <div className="h-2 w-2 rounded-full bg-red-500/50" />
            <div className="h-2 w-2 rounded-full bg-yellow-500/50" />
            <div className="h-2 w-2 rounded-full bg-green-500/50" />
          </div>
          {url && (
            <div className="ml-3 flex-1 rounded bg-white/5 px-3 py-0.5">
              <span className="font-mono text-[9px] text-text-muted/30">{url}</span>
            </div>
          )}
        </div>

        {/* Viewport */}
        <div className="relative aspect-[16/9] bg-bg-elevated">
          {screenshot ? (
            <Image src={screenshot} alt={title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
          ) : (
            <div className="flex h-full flex-col items-center justify-center gap-2 bg-gradient-to-br from-accent/5 to-bg-elevated">
              <span className="font-serif text-6xl text-text/[0.06]">{title.charAt(0)}</span>
              <span className="font-mono text-[9px] text-text-muted/30">coming soon</span>
            </div>
          )}
        </div>
      </div>

      {/* Stand */}
      <div className="mx-auto h-4 w-16 rounded-b-lg border-x-2 border-b-2 border-border/30 bg-[#1a1a1a]" />
      <div className="mx-auto h-1 w-24 rounded-b border-x border-b border-border/20 bg-border/10" />
    </div>
  );
}

/* ── Web Showcase (auto-cycling browser with arrows & dots) ── */
function WebShowcase({ screenshot, title, url }: { screenshot: string | null; title: string; url?: string }) {
  const [current, setCurrent] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [direction, setDirection] = useState(1);

  const pages = [
    { label: "Home", path: "" },
    { label: "About", path: "/about" },
    { label: "Features", path: "/features" },
  ];

  // Auto-cycle
  useEffect(() => {
    if (hovered) return;
    const timer = setInterval(() => {
      setDirection(1);
      setCurrent((prev) => (prev + 1) % pages.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [hovered, pages.length]);

  const go = (dir: number) => {
    setDirection(dir);
    setCurrent((prev) => (prev + dir + pages.length) % pages.length);
  };

  const pageUrl = url ? `${url}${pages[current].path}` : undefined;
  const angle = (title.charCodeAt(0) * 47 + current * 90) % 360;

  const slideVariants = {
    enter: (d: number) => ({ x: d > 0 ? "100%" : "-100%", opacity: 0 }),
    center: { x: "0%", opacity: 1 },
    exit: (d: number) => ({ x: d > 0 ? "-100%" : "100%", opacity: 0 }),
  };

  return (
    <div className="w-full">
      <div
        className="overflow-hidden rounded-xl border border-border/40 bg-[#1a1a1a] shadow-2xl shadow-black/30"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Chrome bar */}
        <div className="flex items-center border-b border-white/5 px-3 py-1.5">
          <div className="flex gap-1.5">
            <div className="h-2 w-2 rounded-full bg-red-500/50" />
            <div className="h-2 w-2 rounded-full bg-yellow-500/50" />
            <div className="h-2 w-2 rounded-full bg-green-500/50" />
          </div>
          {pageUrl && (
            <div className="ml-3 flex-1 rounded bg-white/5 px-3 py-0.5">
              <span className="font-mono text-[9px] text-text-muted/30">{pageUrl}</span>
            </div>
          )}
        </div>

        {/* Page content with arrows */}
        <div className="relative aspect-[4/3] overflow-hidden bg-bg-elevated md:aspect-[16/10]">
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={current}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.5, ease }}
              className="absolute inset-0"
            >
              {screenshot && current === 0 ? (
                <Image
                  src={screenshot}
                  alt={`${title} ${pages[current].label}`}
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              ) : (
                <div
                  className="flex h-full flex-col items-center justify-center gap-2"
                  style={{ background: `linear-gradient(${angle}deg, var(--bg-elevated), var(--border))` }}
                >
                  <span className="font-serif text-6xl text-text/[0.06]">{title.charAt(0)}</span>
                  <span className="font-mono text-[9px] text-text-muted/30">{pages[current].label}</span>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Arrows — always visible */}
          <button
            onClick={() => go(-1)}
            className="absolute left-3 top-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-full bg-bg/60 text-text-muted backdrop-blur-sm transition-all hover:bg-accent hover:text-bg"
            aria-label="Previous page"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
          </button>
          <button
            onClick={() => go(1)}
            className="absolute right-3 top-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-full bg-bg/60 text-text-muted backdrop-blur-sm transition-all hover:bg-accent hover:text-bg"
            aria-label="Next page"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
          </button>

          {/* Page label */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-bg/60 px-3 py-1 backdrop-blur-sm">
            <span className="font-mono text-[10px] text-text-muted">{pages[current].label}</span>
          </div>
        </div>
      </div>

      {/* Dots + stand */}
      <div className="mt-3 flex justify-center gap-1.5">
        {pages.map((_, i) => (
          <button
            key={i}
            onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i); }}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === current ? "w-5 bg-accent" : "w-1.5 bg-text-muted/30 hover:bg-text-muted/50"
            }`}
            aria-label={`Go to ${pages[i].label}`}
          />
        ))}
      </div>
    </div>
  );
}

/* ── Project Showcase (full-width row) ── */
function ProjectShowcase({ project, website, index }: { project: (typeof projects)[number]; website?: (typeof projects)[number]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [view, setView] = useState<"app" | "web">("app");
  const isEven = index % 2 === 0;
  const isMobile = project.category === "apps";
  const type = typeLabels[project.category] || project.category;
  const status = statusConfig[project.status];
  const screenshots = projectScreenshots[project.id] || [];
  const showingWeb = view === "web" && website;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: 0.1, ease }}
      className="group overflow-hidden rounded-2xl border border-border/30 bg-bg-elevated/10 p-6 transition-colors duration-300 hover:border-accent/15 hover:bg-bg-elevated/20 md:p-8"
    >
      <div
        className={`flex flex-col gap-8 lg:flex-row lg:items-center ${
          !isEven ? "lg:flex-row-reverse" : ""
        }`}
      >
        {/* Text side */}
        <div className="w-full shrink-0 space-y-3 lg:w-[280px]">
          <div className="flex items-center gap-3">
            <span className="font-mono text-[10px] font-medium uppercase tracking-[0.15em] text-accent">
              {showingWeb ? "Website" : type}
            </span>
            <span className="flex items-center gap-1.5">
              <span className={`h-1.5 w-1.5 rounded-full ${status.dot}`} />
              <span className="text-[10px] text-text-muted">{status.label}</span>
            </span>
          </div>

          <h3 className="font-serif text-2xl tracking-tight text-text transition-colors group-hover:text-accent md:text-3xl">
            {project.title}
          </h3>

          {project.subtitle && (
            <p className="text-sm text-text-muted">{project.subtitle}</p>
          )}

          {project.description && (
            <p className="text-sm leading-relaxed text-text-muted/70">
              {project.description}
            </p>
          )}

          <div className="flex flex-wrap gap-1.5 pt-1">
            {project.tech.map((t) => (
              <span key={t} className="rounded border border-text/10 px-1.5 py-0.5 font-mono text-[10px] text-text-muted/60">
                {t}
              </span>
            ))}
          </div>

          {(project.github || project.live || website?.live || project.id === "checkers-ai") && (
            <div className="flex gap-4 pt-2">
              {project.github && (
                <a href={project.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-xs text-text-muted transition-colors hover:text-accent">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
                  GitHub
                </a>
              )}
              {project.live && (
                <a href={project.live} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-xs text-text-muted transition-colors hover:text-accent">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
                  App Store
                </a>
              )}
              {website?.live && (
                <a href={website.live} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-xs text-text-muted transition-colors hover:text-accent">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3.5 1.5h7v7M10 2L2 10"/></svg>
                  {website.live.replace("https://", "")}
                </a>
              )}
              {project.id === "checkers-ai" && (
                <a href="#checkers-demo" onClick={(e) => { e.preventDefault(); document.getElementById("checkers-demo")?.scrollIntoView({ behavior: "smooth" }); }} className="flex items-center gap-1.5 text-xs text-text-muted transition-colors hover:text-accent">
                  Try Demo
                </a>
              )}
            </div>
          )}
        </div>

        {/* Device mockup side */}
        <motion.div
          initial={{ opacity: 0, x: isEven ? 60 : -60 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.25, ease }}
          className="flex flex-1 flex-col items-center gap-4"
        >
          {/* Device toggle */}
          {website && isMobile && (
            <div className="inline-flex rounded-lg border border-border/40 p-0.5">
              <button
                onClick={() => setView("app")}
                className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-[11px] font-medium transition-all duration-200 ${
                  view === "app"
                    ? "bg-accent text-bg"
                    : "text-text-muted hover:text-text"
                }`}
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
                  <line x1="12" y1="18" x2="12.01" y2="18" />
                </svg>
                App
              </button>
              <button
                onClick={() => setView("web")}
                className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-[11px] font-medium transition-all duration-200 ${
                  view === "web"
                    ? "bg-accent text-bg"
                    : "text-text-muted hover:text-text"
                }`}
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                  <line x1="8" y1="21" x2="16" y2="21" />
                  <line x1="12" y1="17" x2="12" y2="21" />
                </svg>
                Website
              </button>
            </div>
          )}

          {/* Mockup with transition */}
          <AnimatePresence mode="wait">
            {showingWeb ? (
              <motion.div
                key="web"
                initial={{ opacity: 0, scale: 0.9, rotateY: -15 }}
                animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                exit={{ opacity: 0, scale: 0.9, rotateY: 15 }}
                transition={{ duration: 0.5, ease }}
                className="w-full"
              >
                <WebShowcase
                  screenshot={null}
                  title={website!.title}
                  url={website!.live?.replace("https://", "")}
                />
              </motion.div>
            ) : isMobile ? (
              <motion.div
                key="phones"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, ease }}
                className="w-full"
              >
                <PhoneShowcase screenshots={screenshots} title={project.title} />
              </motion.div>
            ) : (
              <motion.div key="web-only" className="w-full">
                <WebShowcase
                  screenshot={screenshots[0] || null}
                  title={project.title}
                  url={project.live?.replace("https://", "")}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default function Home() {
  const { theme, toggle } = useTheme();
  const activeSection = useActiveSection(sectionIds);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <LoadingScreen />
      <CustomCursor />

      {/* Responsive overrides — inline styles don't support media queries */}
      <style>{`
        @media (max-width: 767px) {
          .sidebar-header { left: auto !important; position: static !important; }
          .content-main { margin-left: 0 !important; }
        }
        @media (min-width: 1024px) and (max-width: 1129px) {
          .phone-showcase { transform: scale(0.78); transform-origin: center; }
        }
      `}</style>

      {/* ---- MOBILE TOP NAV (morphs to pill on scroll) ---- */}
      <motion.nav
        className="fixed left-0 right-0 z-50 flex items-center justify-center md:hidden"
        animate={{
          top: scrolled ? 12 : 0,
          paddingLeft: scrolled ? 0 : 24,
          paddingRight: scrolled ? 0 : 24,
        }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      >
        <motion.div
          className={`flex items-center justify-center backdrop-blur-md ${
            scrolled ? "w-auto" : "w-screen"
          }`}
          animate={{
            paddingTop: scrolled ? 8 : 12,
            paddingBottom: scrolled ? 8 : 12,
            paddingLeft: scrolled ? 24 : 24,
            paddingRight: scrolled ? 24 : 24,
            borderRadius: scrolled ? 999 : 0,
            backgroundColor: scrolled ? "var(--bg-elevated)" : "var(--bg)",
            boxShadow: scrolled
              ? "0 4px 24px rgba(0,0,0,0.3), 0 0 0 1px var(--border)"
              : "0 1px 0 0 var(--border)",
          }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        >
          <ul className="flex gap-6">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.slice(1);
              return (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className={`text-[10px] font-medium tracking-widest transition-colors ${
                      isActive ? "text-accent" : "text-text-muted"
                    }`}
                  >
                    {link.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </motion.div>
      </motion.nav>

      {/* ---- LEFT SIDEBAR (fixed on desktop) ---- */}
      <header
        className="sidebar-header px-6 pt-16 md:fixed md:top-0 md:flex md:h-screen md:w-[340px] md:flex-col md:justify-between md:py-20 md:pt-20 lg:w-[400px]"
        style={{ left: 'max(1.5rem, calc((100vw - 1280px) / 2 + 1.5rem))' }}
      >
        <div>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
              className="font-serif text-5xl tracking-tight lg:text-6xl"
            >
              Uzay Poyraz
            </motion.h1>
            <motion.p
              {...fadeUp(2.5)}
              className="mt-3 text-lg text-text-muted"
            >
              i build things, break things, and occasionally ship them.
            </motion.p>

            {/* Nav links with lines */}
            <motion.nav
              {...fadeUp(2.7)}
              className="mt-12 hidden md:block"
            >
              <ul className="flex flex-col gap-4">
                {navLinks.map((link) => {
                  const isActive = activeSection === link.href.slice(1);
                  return (
                    <li key={link.href}>
                      <a
                        href={link.href}
                        className={`group flex items-center gap-4 text-xs font-medium tracking-widest transition-colors ${
                          isActive ? "text-accent" : "text-text-muted hover:text-text"
                        }`}
                      >
                        <span
                          className={`transition-all duration-300 ${
                            isActive ? "h-px w-16 bg-accent" : "h-px w-8 bg-text-muted group-hover:w-16 group-hover:bg-text"
                          }`}
                        />
                        {link.label}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </motion.nav>
          </div>

          {/* Social icons + theme toggle */}
          <motion.div
            {...fadeUp(2.9)}
            className="mt-8 flex items-center gap-5 pb-6 md:mt-0 md:pb-0"
          >
            <a href={personal.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="text-text-muted transition-colors hover:text-text">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
            </a>
            <a href={personal.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-text-muted transition-colors hover:text-text">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
            </a>
            <a href={`mailto:${personal.email}`} aria-label="Email" className="text-text-muted transition-colors hover:text-text">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
            </a>

            <span className="h-4 w-px bg-border" />

            <button
              onClick={toggle}
              aria-label="Toggle theme"
              className="text-text-muted transition-colors hover:text-text"
            >
              {theme === "dark" ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
              )}
            </button>
          </motion.div>
      </header>

      {/* ---- RIGHT CONTENT (only this scrolls) ---- */}
      <main
        className="content-main px-6 pb-12 md:pb-20 md:pl-12 md:pr-6 lg:pl-20 lg:pr-12"
        style={{ marginLeft: 'max(calc(340px - 2rem), calc((100vw - 1280px) / 2 + 1.5rem + 400px - 4rem))' }}
      >
        <div className="max-w-4xl md:pt-20">

          {/* About */}
          <section id="about" className="mb-24">
            <motion.p
              {...fadeUp(2.5)}
              className="leading-relaxed text-text-muted"
            >
              CS grad from <span className="text-text">Skidmore College</span>.
              I started coding in high school in Japan and never really stopped. Since then, I&apos;ve built tools for Turkish Airlines pilots,
              e-commerce platforms at Optimum7, and an AI that beats me at checkers.
            </motion.p>
            <motion.p
              {...fadeUp(2.6)}
              className="mt-4 leading-relaxed text-text-muted"
            >
              I thought that was cool and all, but then{" "}
              vibe coding happened
              and I&apos;ve never been more hooked to coding ever. Got{" "}
              <span className="text-accent">Claude Max</span> with my roommate and now
              we&apos;ve got four{" "}
              <span className="text-text">Claude Code CLI</span> terminals each running at all times,{" "}
              <span className="text-text">MCPs</span> hooked up,
              custom <span className="text-text">skills</span> loaded. The dopamine hit of
              shipping in minutes what used to take weeks is genuinely unreasonable.
              I&apos;m currently building two apps under my company{" "}
              <span className="text-text">LaunchSpace</span> and they&apos;re about to
              publish very very soon - not touching grass until they do.
              After that, I&apos;d love to bring this energy to a team
              where shipping quality product fast actually matters.
            </motion.p>
          </section>

          {/* Projects */}
          <section id="projects" className="mb-24">
            <motion.h2 {...fadeUp(2.7)} className="mb-2 font-serif text-3xl text-accent">
              stuff i&apos;ve built
            </motion.h2>
            <motion.p {...fadeUp(2.8)} className="mb-8 text-sm text-text-muted">
              some shipped, some still cooking, some vibecoded, some not
            </motion.p>

            <div className="space-y-8">
              {projectGroups.map((group, i) => (
                <ProjectShowcase key={group.primary.id} project={group.primary} website={group.website} index={i} />
              ))}
            </div>

            <motion.div {...fadeUp(3.0)} className="mt-10 text-center">
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 text-sm text-accent transition-colors hover:text-accent-hover"
              >
                View all projects
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3.5 1.5h7v7M10 2L2 10"/></svg>
              </Link>
            </motion.div>
          </section>

          {/* Demos */}
          <section id="demos" className="mb-24">
            <motion.h2 {...fadeUp(2.9)} className="mb-2 font-serif text-3xl text-accent">
              try it yourself
            </motion.h2>
            <motion.p {...fadeUp(3.0)} className="mb-8 text-sm text-text-muted">
              go ahead, poke around
            </motion.p>
            <motion.div {...fadeUp(3.0)} className="space-y-6">
              <MeditationDemo />
              <div id="checkers-demo"><CheckersDemo /></div>
            </motion.div>
          </section>

          {/* Experience */}
          <section id="experience" className="mb-24">
            <motion.h2 {...fadeUp(3.1)} className="mb-8 font-serif text-3xl">
              jobs / internships
            </motion.h2>
            <div className="space-y-8">
              {timeline.filter((e) => e.type === "work").map((entry, i) => (
                <motion.div
                  key={i}
                  {...fadeUp(3.2 + i * 0.1)}
                  className="group grid gap-2 md:grid-cols-[140px_1fr]"
                >
                  <p className="text-xs leading-6 tracking-wider text-text-muted uppercase">{entry.period}</p>
                  <div>
                    <h3 className="font-serif text-lg">
                      {entry.title} &middot; <span className="text-text-muted">{entry.organization}</span>
                    </h3>
                    <p className="mt-1 text-sm text-text-muted">{entry.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Education */}
          <section className="mb-24">
            <motion.h2 {...fadeUp(3.3)} className="mb-8 font-serif text-3xl">
              education
            </motion.h2>
            <div className="space-y-8">
              {timeline.filter((e) => e.type === "education").map((entry, i) => (
                <motion.div
                  key={i}
                  {...fadeUp(3.4 + i * 0.1)}
                  className="group grid gap-2 md:grid-cols-[140px_1fr]"
                >
                  <p className="text-xs leading-6 tracking-wider text-text-muted uppercase">{entry.period}</p>
                  <div>
                    <h3 className="font-serif text-lg">
                      {entry.title} &middot; <span className="text-text-muted">{entry.organization}</span>
                    </h3>
                    <p className="mt-1 text-sm text-text-muted">{entry.description}</p>
                    {entry.highlight && (
                      <span className="mt-2 inline-block rounded-full bg-accent/15 px-3 py-1 text-xs font-medium text-accent">
                        {entry.highlight}
                      </span>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Resume link */}
          <motion.div {...fadeUp(3.6)}>
            <a
              href={personal.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-accent transition-colors hover:text-accent-hover"
            >
              View Full Resume
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3.5 1.5h7v7M10 2L2 10"/></svg>
            </a>
          </motion.div>

          {/* Footer */}
          <div className="mt-20 text-xs text-text-muted">
            built by uzay with mass amounts of caffeine. and yes, i made <span className="text-accent">claude</span> do the <span className="text-accent">claude</span> loading screen. &middot; &copy; {new Date().getFullYear()}
          </div>

        </div>
      </main>
    </>
  );
}

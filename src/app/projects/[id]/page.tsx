"use client";

import { useParams } from "next/navigation";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { projects, type ProjectStatus } from "@/data/projects";
import { useTheme } from "@/components/layout/ThemeProvider";

const statusConfig: Record<ProjectStatus, { dot: string; label: string }> = {
  live: { dot: "bg-green-500", label: "Live" },
  dev: { dot: "bg-yellow-500", label: "In Dev" },
  discontinued: { dot: "bg-red-500", label: "Archived" },
};

const typeLabels: Record<string, string> = {
  apps: "Mobile App",
  web: "Website",
  ai: "AI / ML",
  cli: "CLI Tool",
};

const projectScreenshots: Record<string, string[]> = {
  neurotype: ["/images/projects/neurotype_today.png", "/images/projects/neurotype_progress.png", "/images/projects/neurotype_session.png"],
  volo: ["/images/projects/volo_home.png", "/images/projects/volo_ops.png", "/images/projects/volo_nat.png"],
  "weather-time-widget": ["/images/projects/wtw_promo.png", "/images/projects/wtw_widgets.jpg", "/images/projects/wtw_settings.jpg"],
  launchspace: ["/images/projects/launchspace_home.png", "/images/projects/launchspace_projects.png", "/images/projects/launchspace_contact.png"],
  incraft: ["/images/projects/incraft_home.png", "/images/projects/incraft_create.png", "/images/projects/incraft_studio.png"],
  aviaassist: ["/images/projects/avia_ss1.png", "/images/projects/avia_ss2.png", "/images/projects/aviaassist_thumbnail.png"],
  "gym-booking": ["/images/projects/smallgym_thumbnail.png"],
  "checkers-ai": ["/images/projects/checkers.png"],
};

const websitePairs: Record<string, string> = {
  neurotype: "neurotype-web",
  volo: "volo-web",
};

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number];

/* ── Section Label ── */
function SectionLabel({ children }: { children: string }) {
  return (
    <div className="mb-5">
      <h2 className="mb-1.5 font-mono text-[10px] font-medium uppercase tracking-[0.2em] text-accent">{children}</h2>
      <div className="h-px w-8 bg-accent/30" />
    </div>
  );
}

/* ── Animated Section ── */
function Section({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ── Phone Mockup ── */
function PhoneMockup({ screenshot, title }: { screenshot: string | null; title: string }) {
  const angle = (title.charCodeAt(0) * 47) % 360;
  return (
    <div className="relative w-full">
      <div className="absolute -left-[2px] top-[14%] h-[5%] w-[2px] rounded-l bg-border/40" />
      <div className="absolute -left-[2px] top-[21%] h-[7.5%] w-[2px] rounded-l bg-border/40" />
      <div className="absolute -left-[2px] top-[31%] h-[7.5%] w-[2px] rounded-l bg-border/40" />
      <div className="absolute -right-[2px] top-[25%] h-[11%] w-[2px] rounded-r bg-border/40" />
      <div className="rounded-[min(14%,2rem)] border-2 border-border/30 bg-[#1a1a1a] p-[2.5%] shadow-2xl shadow-black/40">
        {screenshot ? (
          <img src={screenshot} alt={title} className="block w-full rounded-[min(11%,1.5rem)]" draggable={false} />
        ) : (
          <div
            className="flex aspect-[9/19.5] items-center justify-center rounded-[min(11%,1.5rem)] bg-bg-elevated"
            style={{ background: `linear-gradient(${angle}deg, var(--bg-elevated), var(--border))` }}
          >
            <span className="font-serif text-5xl text-text/[0.08]">{title.charAt(0)}</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default function ProjectPage() {
  const params = useParams();
  const { theme, toggle } = useTheme();
  const project = projects.find((p) => p.id === params.id);
  const [activeScreenshot, setActiveScreenshot] = useState(0);

  if (!project) return notFound();

  const status = statusConfig[project.status];
  const type = typeLabels[project.category] || project.category;
  const screenshots = projectScreenshots[project.id] || [];
  const isMobile = project.category === "apps";

  // Find paired website
  const pairedWebId = websitePairs[project.id];
  const pairedWeb = pairedWebId ? projects.find((p) => p.id === pairedWebId) : undefined;

  // Project navigation
  const allProjects = projects.filter((p) => !["neurotype-web", "volo-web"].includes(p.id));
  const currentIdx = allProjects.findIndex((p) => p.id === project.id);
  const prevProject = currentIdx > 0 ? allProjects[currentIdx - 1] : null;
  const nextProject = currentIdx < allProjects.length - 1 ? allProjects[currentIdx + 1] : null;

  return (
    <div className="min-h-screen">
      {/* Floating nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 md:px-10">
        <Link
          href="/#projects"
          className="group flex items-center gap-2 rounded-full border border-border/30 bg-bg/70 px-4 py-2 text-xs text-text-muted backdrop-blur-xl transition-all hover:border-accent/30 hover:text-text"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:-translate-x-0.5">
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
          All Projects
        </Link>
        <button
          onClick={toggle}
          className="rounded-full border border-border/30 bg-bg/70 p-2.5 text-text-muted backdrop-blur-xl transition-all hover:border-accent/30 hover:text-text"
          aria-label="Toggle theme"
        >
          {theme === "dark" ? (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="5" />
              <line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" />
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
              <line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" />
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
            </svg>
          ) : (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
            </svg>
          )}
        </button>
      </nav>

      <main className="mx-auto max-w-5xl px-6 md:px-10">
        {/* ── Hero: Title + Screenshots side by side ── */}
        <div className={`grid gap-8 pt-24 pb-12 md:pt-28 md:pb-16 ${
          screenshots.length > 0
            ? isMobile
              ? "min-[1440px]:grid-cols-[1fr_auto]"
              : "min-[1440px]:grid-cols-[1fr_380px]"
            : ""
        } items-center`}>
          {/* Screenshots side - placed first in DOM for web projects so it's on the left */}
          {screenshots.length > 0 && !isMobile && (
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease }}
              className="min-[1440px]:order-first order-last"
            >
              <div className="space-y-3 min-[1440px]:transition-transform min-[1440px]:duration-500 min-[1440px]:ease-out min-[1440px]:hover:scale-[1.03]">
                <div className="overflow-hidden rounded-xl border-2 border-border/30 bg-[#1a1a1a] shadow-2xl shadow-black/30">
                  <div className="flex items-center border-b border-white/5 px-3 py-1.5">
                    <div className="flex gap-1.5">
                      <div className="h-2 w-2 rounded-full bg-red-500/50" />
                      <div className="h-2 w-2 rounded-full bg-yellow-500/50" />
                      <div className="h-2 w-2 rounded-full bg-green-500/50" />
                    </div>
                  </div>
                  <div className="relative aspect-[16/9] bg-bg-elevated">
                    <Image
                      src={screenshots[activeScreenshot]}
                      alt={`${project.title} screenshot`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 600px"
                    />
                  </div>
                </div>
                {screenshots.length > 1 && (
                  <div className="flex gap-2 justify-center">
                    {screenshots.map((src, i) => (
                      <button
                        key={i}
                        onClick={() => setActiveScreenshot(i)}
                        className={`relative overflow-hidden rounded-md border-2 transition-all duration-300 ${
                          activeScreenshot === i ? "border-accent/60" : "border-border/20 opacity-50 hover:opacity-80"
                        }`}
                        style={{ width: 56 }}
                      >
                        <div className="relative aspect-[16/9]">
                          <Image src={src} alt="" fill className="object-cover" sizes="56px" />
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* Text side */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease }}
              className="mb-4 flex items-center gap-4"
            >
              <span className="font-mono text-[10px] font-medium uppercase tracking-[0.2em] text-accent">{type}</span>
              <span className="h-px flex-1 max-w-[60px] bg-border/40" />
              <span className="flex items-center gap-1.5">
                <span className={`h-1.5 w-1.5 rounded-full ${status.dot}`} />
                <span className="text-[10px] text-text-muted">{status.label}</span>
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease }}
              className="font-serif text-4xl leading-[1.1] tracking-tight text-text md:text-5xl lg:text-6xl"
            >
              {project.title}
            </motion.h1>

            {project.subtitle && (
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2, ease }}
                className="mt-3 max-w-md text-base text-text-muted md:text-lg"
              >
                {project.subtitle}
              </motion.p>
            )}

            {/* All links */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.35, ease }}
              className="mt-6 flex flex-wrap items-center gap-2.5"
            >
              {project.live && (
                <a href={project.live} target="_blank" rel="noopener noreferrer"
                  className="group flex items-center gap-2 rounded-full bg-accent px-4 py-2 text-sm font-medium text-white transition-all hover:shadow-lg hover:shadow-accent/20">
                  Visit Site
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                    <line x1="7" y1="17" x2="17" y2="7" /><polyline points="7 7 17 7 17 17" />
                  </svg>
                </a>
              )}
              {project.appStore && (
                <a href={project.appStore} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-full border border-border/40 px-4 py-2 text-sm text-text-muted transition-all hover:border-text/20 hover:text-text">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg>
                  App Store
                </a>
              )}
              {pairedWeb?.live && (
                <a href={pairedWeb.live} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-full border border-border/40 px-4 py-2 text-sm text-text-muted transition-all hover:border-text/20 hover:text-text">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
                  </svg>
                  Website
                </a>
              )}
              {project.github && (
                <a href={project.github} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-full border border-border/40 px-4 py-2 text-sm text-text-muted transition-all hover:border-text/20 hover:text-text">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
                  Source
                </a>
              )}
              {project.extra && (
                <a href={project.extra} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-full border border-border/40 px-4 py-2 text-sm text-text-muted transition-all hover:border-text/20 hover:text-text">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/>
                  </svg>
                  Docs
                </a>
              )}
            </motion.div>
          </div>

          {/* Phone screenshots (mobile apps only) */}
          {screenshots.length > 0 && isMobile && (
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease }}
            >
              <div className="flex justify-center gap-3 md:gap-4">
                {screenshots.slice(0, 3).map((src, i) => (
                  <div
                    key={i}
                    className="w-[100px] md:w-[130px] shrink-0"
                    style={{
                      transform: i === 0 ? "rotate(-6deg) translateY(8px)" : i === 2 ? "rotate(6deg) translateY(8px)" : "none",
                      zIndex: i === 1 ? 10 : 1,
                    }}
                  >
                    <PhoneMockup screenshot={src} title={project.title} />
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </div>

        {/* Accent divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 0.4, ease }}
          className="h-px origin-left bg-gradient-to-r from-accent/40 via-border/30 to-transparent"
        />

        {/* ── Content grid ── */}
        <div className="grid gap-10 py-12 md:grid-cols-[1fr_260px] md:py-16">
          {/* Main content */}
          <div className="space-y-12">
            {/* About */}
            {project.description && (
              <Section>
                <SectionLabel>About</SectionLabel>
                <p className="text-base leading-relaxed text-text-muted md:text-lg md:leading-relaxed">
                  {project.description}
                </p>
              </Section>
            )}

            {/* Highlights */}
            {project.highlights && project.highlights.length > 0 && (
              <Section delay={0.05}>
                <SectionLabel>Key Features</SectionLabel>
                <ul className="space-y-3">
                  {project.highlights.map((h, i) => (
                    <li key={i} className="flex gap-3 text-sm text-text-muted">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent/50" />
                      {h}
                    </li>
                  ))}
                </ul>
              </Section>
            )}

            {/* Frontend */}
            {project.frontend && (
              <Section delay={0.1}>
                <SectionLabel>Frontend & UI</SectionLabel>
                <p className="text-sm leading-relaxed text-text-muted">
                  {project.frontend}
                </p>
              </Section>
            )}

            {/* Backend */}
            {project.backend && (
              <Section delay={0.15}>
                <SectionLabel>Backend & Infrastructure</SectionLabel>
                <p className="text-sm leading-relaxed text-text-muted">
                  {project.backend}
                </p>
              </Section>
            )}

            {/* Demo */}
            {project.demo && (
              <Section delay={0.2}>
                <SectionLabel>Demo</SectionLabel>
                <div className="aspect-video w-full overflow-hidden rounded-xl border border-border/30 shadow-xl shadow-black/20">
                  <iframe
                    src={project.demo}
                    title={`${project.title} demo`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="h-full w-full"
                  />
                </div>
              </Section>
            )}
          </div>

          {/* ── Sidebar ── */}
          <Section delay={0.1} className="md:sticky md:top-20 md:self-start space-y-8">
            {/* Tech Stack */}
            <div>
              <SectionLabel>Stack</SectionLabel>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((t) => (
                  <span key={t} className="rounded-md border border-text/8 px-2.5 py-1 font-mono text-[11px] text-text-muted/70">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Collaborators */}
            {project.collaborators && project.collaborators.length > 0 && (
              <div>
                <SectionLabel>Team</SectionLabel>
                <div className="space-y-3">
                  {project.collaborators.map((c, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-bg-elevated border border-border/30 text-[10px] font-medium text-text-muted">
                        {c.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                      </div>
                      <div className="min-w-0">
                        {c.url ? (
                          <a href={c.url} target="_blank" rel="noopener noreferrer" className="text-sm text-text hover:text-accent transition-colors underline decoration-text-muted/20 underline-offset-2 hover:decoration-accent/50">
                            {c.name}
                          </a>
                        ) : (
                          <p className="text-sm text-text">{c.name}</p>
                        )}
                        <p className="text-[11px] text-text-muted/60">{c.role}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Details */}
            <div>
              <SectionLabel>Details</SectionLabel>
              <dl className="space-y-3 text-sm">
                <div>
                  <dt className="text-[10px] uppercase tracking-wider text-text-muted/50">Type</dt>
                  <dd className="text-text-muted">{type}</dd>
                </div>
                <div>
                  <dt className="text-[10px] uppercase tracking-wider text-text-muted/50">Status</dt>
                  <dd className="flex items-center gap-1.5 text-text-muted">
                    <span className={`h-1.5 w-1.5 rounded-full ${status.dot}`} />
                    {status.label}
                  </dd>
                </div>
              </dl>
            </div>
          </Section>
        </div>

        {/* ── Project navigation ── */}
        <footer className="border-t border-border/20 py-10 md:py-14">
          <div className="grid gap-4 md:grid-cols-2">
            {prevProject ? (
              <Link
                href={`/projects/${prevProject.id}`}
                className="group flex flex-col rounded-xl border border-border/20 p-5 transition-all hover:border-accent/20 hover:bg-bg-elevated/30"
              >
                <span className="mb-1.5 text-[10px] font-medium uppercase tracking-widest text-text-muted">Previous</span>
                <span className="font-serif text-lg text-text transition-colors group-hover:text-accent">{prevProject.title}</span>
              </Link>
            ) : <div />}
            {nextProject && (
              <Link
                href={`/projects/${nextProject.id}`}
                className="group flex flex-col items-end rounded-xl border border-border/20 p-5 text-right transition-all hover:border-accent/20 hover:bg-bg-elevated/30"
              >
                <span className="mb-1.5 text-[10px] font-medium uppercase tracking-widest text-text-muted">Next</span>
                <span className="font-serif text-lg text-text transition-colors group-hover:text-accent">{nextProject.title}</span>
              </Link>
            )}
          </div>
        </footer>
      </main>
    </div>
  );
}

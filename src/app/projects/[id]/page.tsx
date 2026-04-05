"use client";

import { useParams } from "next/navigation";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import dynamic from "next/dynamic";
import { projects, type ProjectStatus } from "@/data/projects";

const TerminalPlayer = dynamic(() => import("@/components/demos/TerminalPlayer"), { ssr: false });

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
  neurotype: ["/images/projects/neurotype_detail_1.png", "/images/projects/neurotype_detail_2.png", "/images/projects/neurotype_detail_3.png", "/images/projects/neurotype_detail_4.png", "/images/projects/neurotype_detail_5.png", "/images/projects/neurotype_detail_6.png", "/images/projects/neurotype_detail_7.png", "/images/projects/neurotype_detail_8.png"],
  volo: ["/images/projects/volo_home.png", "/images/projects/volo_ops.png", "/images/projects/volo_nat.png", "/images/projects/volo_acquisition.png"],
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

/* ── Collapsible About ── */
function AboutCollapsible({ description }: { description: string }) {
  const [expanded, setExpanded] = useState(false);
  const words = description.split(" ");
  const preview = words.slice(0, 12).join(" ");
  const needsTruncation = words.length > 12;

  return (
    <Section>
      <SectionLabel>About</SectionLabel>
      <p className="text-base leading-relaxed text-text-muted md:text-lg md:leading-relaxed">
        {needsTruncation && !expanded ? (
          <>
            {preview}...{" "}
            <button
              onClick={() => setExpanded(true)}
              className="text-text-muted/50 transition-colors hover:text-accent"
            >
              read more
            </button>
          </>
        ) : (
          <>
            {description}
            {needsTruncation && (
              <>
                {" "}
                <button
                  onClick={() => setExpanded(false)}
                  className="text-text-muted/50 transition-colors hover:text-accent"
                >
                  read less
                </button>
              </>
            )}
          </>
        )}
      </p>
    </Section>
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

/* ── Media Gallery ── */
function MediaGallery({ images }: { images: { src: string; caption: string }[] }) {
  const [current, setCurrent] = useState(0);
  const [lightbox, setLightbox] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  const go = (dir: number) => {
    setCurrent((prev) => (prev + dir + images.length) % images.length);
  };

  return (
    <>
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease }}
      className="mx-auto max-w-2xl pb-12"
    >
      <SectionLabel>Media</SectionLabel>
      {/* Main image */}
      <div
        className="relative cursor-pointer overflow-hidden rounded-xl border border-border/30 bg-[#0d0d0d] shadow-xl shadow-black/20 max-h-[400px] flex items-center justify-center"
        onClick={() => setLightbox(true)}
      >
        <img
          src={images[current].src}
          alt={images[current].caption}
          className="max-w-full max-h-[400px] object-contain"
          draggable={false}
        />

        {images.length > 1 && (
          <>
            <button
              onClick={(e) => { e.stopPropagation(); go(-1); }}
              className="absolute left-3 top-1/2 z-10 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-full bg-accent text-black shadow-lg transition-all hover:brightness-110"
              aria-label="Previous"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); go(1); }}
              className="absolute right-3 top-1/2 z-10 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-full bg-accent text-black shadow-lg transition-all hover:brightness-110"
              aria-label="Next"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
            </button>
          </>
        )}
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="mt-3 flex justify-center gap-2">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`overflow-hidden rounded-md border-2 transition-all ${
                i === current ? "border-accent" : "border-border/30 opacity-50 hover:opacity-80"
              }`}
              aria-label={`View ${img.caption}`}
            >
              <img
                src={img.src}
                alt={img.caption}
                className="h-14 w-20 object-cover"
                draggable={false}
              />
            </button>
          ))}
        </div>
      )}

      <p className="mt-2 text-center text-[11px] text-text-muted/60">{images[current].caption}</p>
    </motion.div>

    {/* Lightbox */}
    {lightbox && (
      <div
        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm"
        onClick={() => setLightbox(false)}
      >
        <button
          onClick={() => setLightbox(false)}
          className="absolute top-6 right-6 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
          aria-label="Close"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>

        {images.length > 1 && (
          <>
            <button
              onClick={(e) => { e.stopPropagation(); go(-1); }}
              className="absolute left-6 top-1/2 z-10 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full bg-accent text-black shadow-lg transition-all hover:brightness-110"
              aria-label="Previous"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); go(1); }}
              className="absolute right-6 top-1/2 z-10 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full bg-accent text-black shadow-lg transition-all hover:brightness-110"
              aria-label="Next"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
            </button>
          </>
        )}

        <img
          src={images[current].src}
          alt={images[current].caption}
          className="max-h-[90vh] max-w-[90vw] object-contain"
          onClick={(e) => e.stopPropagation()}
          draggable={false}
        />
        <p className="absolute bottom-6 left-1/2 -translate-x-1/2 text-sm text-white/60">{images[current].caption}</p>
      </div>
    )}
    </>
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
        {(project.live || pairedWeb?.live) && (
          <a
            href={project.live || pairedWeb!.live}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2 rounded-full bg-accent px-4 py-2 text-xs font-medium text-white transition-all hover:shadow-lg hover:shadow-accent/20"
          >
            Visit Site
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
              <line x1="7" y1="17" x2="17" y2="7" /><polyline points="7 7 17 7 17 17" />
            </svg>
          </a>
        )}
      </nav>

      <main className="mx-auto max-w-5xl px-6 md:px-10">
        {/* ── Hero: Title + Screenshots side by side ── */}
        <div className="grid gap-4 pt-16 pb-0 md:pt-20 md:pb-0 items-center">
          {/* Text side */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease }}
            >
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <h1 className="font-serif text-4xl leading-[1.1] tracking-tight text-text md:text-5xl lg:text-6xl">
                  {project.title}
                </h1>
                {project.subtitle && (
                  <>
                    <span className="text-text-muted">·</span>
                    <p className="text-base text-text-muted md:text-lg">
                      {project.subtitle}
                    </p>
                  </>
                )}
                {project.appStore && (
                  <>
                    <span className="text-text-muted">·</span>
                    <a href={project.appStore} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-base text-text-muted transition-colors hover:text-text md:text-lg">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg>
                      App Store
                    </a>
                  </>
                )}
              </div>
            </motion.div>

          </div>

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
              <AboutCollapsible description={project.description} />
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
                <p className="whitespace-pre-line text-sm leading-relaxed text-text-muted">
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
            {/* Type */}
            <div>
              <SectionLabel>Type</SectionLabel>
              <p className="text-sm text-text-muted">{type}</p>
            </div>

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

            {/* Source Code */}
            {project.github && (
              <div>
                <SectionLabel>Source Code</SectionLabel>
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2 text-sm text-text-muted transition-colors hover:text-text"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
                  View on GitHub
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                    <line x1="7" y1="17" x2="17" y2="7" /><polyline points="7 7 17 7 17 17" />
                  </svg>
                </a>
              </div>
            )}
          </Section>
        </div>

        {/* ── Media ── */}
        {(screenshots.length > 0 || project.evidence) && (
          <MediaGallery
            images={[
              ...screenshots.map((src, i) => ({ src, caption: `${project.title} screenshot ${i + 1}` })),
              ...(project.evidence ? [{ src: project.evidence.src, caption: project.evidence.caption }] : []),
            ]}
          />
        )}

        {/* ── Terminal Recording ── */}
        {project.id === "myro" && (
          <Section className="mx-auto max-w-2xl pb-12">
            <SectionLabel>Media</SectionLabel>
            <div className="overflow-hidden rounded-xl border border-border/30 bg-[#0d0d0d] shadow-xl shadow-black/20">
              <div className="flex items-center gap-2 border-b border-white/[0.06] px-4 py-2.5">
                <div className="flex gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
                </div>
                <span className="font-mono text-[10px] text-text-muted/40">myro - ~/competitive</span>
              </div>
              <div className="terminal-player-wrapper">
                <TerminalPlayer src="/recordings/myro.cast" />
              </div>
            </div>
          </Section>
        )}

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

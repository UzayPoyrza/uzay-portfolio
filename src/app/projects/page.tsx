"use client";

import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { projects, type Project, type ProjectStatus } from "@/data/projects";
import { useTheme } from "@/components/layout/ThemeProvider";
import CustomCursor from "@/components/layout/CustomCursor";

/* ── Constants ── */

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number];

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

const screenshotMap: Record<string, string[]> = {
  aviaassist: [
    "/images/projects/avia_ss1.png",
    "/images/projects/avia_ss2.png",
    "/images/projects/aviaassist_thumbnail.png",
  ],
  "gym-booking": ["/images/projects/smallgym_thumbnail.png"],
  "checkers-ai": ["/images/projects/checkers.png"],
};

const collaboratorMap: Record<string, { name: string; role: string }[]> = {
  neurotype: [{ name: "Uzay Poyraz", role: "Founder" }],
  volo: [
    { name: "Uzay Poyraz", role: "Dev" },
    { name: "THY Pilots", role: "Partners" },
  ],
  aviaassist: [
    { name: "Uzay Poyraz", role: "Dev" },
    { name: "THY Pilots", role: "Partners" },
  ],
  myro: [
    { name: "Uzay Poyraz", role: "Dev" },
    { name: "Research Partners", role: "Co-creators" },
  ],
  "checkers-ai": [{ name: "Uzay Poyraz", role: "Dev" }],
  launchspace: [{ name: "Uzay Poyraz", role: "Founder" }],
};

const filterTabs = [
  { key: "all", label: "All" },
  { key: "apps", label: "Apps" },
  { key: "web", label: "Web" },
  { key: "ai", label: "AI / ML" },
];

/* ── Image Carousel ── */

function ImageCarousel({
  projectId,
  title,
}: {
  projectId: string;
  title: string;
}) {
  const images = screenshotMap[projectId] || [];
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);
  const [hovered, setHovered] = useState(false);

  const hasMultiple = images.length > 1;

  const go = useCallback(
    (dir: number) => {
      setDirection(dir);
      setCurrent((prev) => (prev + dir + images.length) % images.length);
    },
    [images.length],
  );

  const variants = {
    enter: (d: number) => ({ x: d > 0 ? "100%" : "-100%", opacity: 0.4 }),
    center: { x: "0%", opacity: 1 },
    exit: (d: number) => ({ x: d > 0 ? "-100%" : "100%", opacity: 0.4 }),
  };

  // Deterministic gradient angle per project
  const angle =
    (projectId.charCodeAt(0) * 47 + projectId.length * 13) % 360;

  return (
    <div
      className="relative aspect-[16/10] overflow-hidden rounded-lg bg-bg-elevated"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {images.length > 0 ? (
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={current}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.5, ease }}
            className="absolute inset-0"
          >
            <Image
              src={images[current]}
              alt={`${title} screenshot ${current + 1}`}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </motion.div>
        </AnimatePresence>
      ) : (
        <div
          className="absolute inset-0 flex flex-col items-center justify-center gap-3"
          style={{
            background: `linear-gradient(${angle}deg, var(--bg-elevated), var(--border))`,
          }}
        >
          <span className="select-none font-serif text-8xl text-text/[0.06]">
            {title.charAt(0)}
          </span>
          <span className="font-mono text-[10px] tracking-wider text-text-muted/40">
            screenshots coming soon
          </span>
        </div>
      )}

      {/* Arrows — appear on hover */}
      {hasMultiple && (
        <>
          <motion.button
            animate={{ opacity: hovered ? 1 : 0 }}
            transition={{ duration: 0.15 }}
            onClick={(e) => {
              e.stopPropagation();
              go(-1);
            }}
            className="absolute left-3 top-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-full bg-bg/70 text-text backdrop-blur-sm transition-colors hover:bg-accent hover:text-bg"
            aria-label="Previous image"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </motion.button>
          <motion.button
            animate={{ opacity: hovered ? 1 : 0 }}
            transition={{ duration: 0.15 }}
            onClick={(e) => {
              e.stopPropagation();
              go(1);
            }}
            className="absolute right-3 top-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-full bg-bg/70 text-text backdrop-blur-sm transition-colors hover:bg-accent hover:text-bg"
            aria-label="Next image"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </motion.button>
        </>
      )}

      {/* Dots */}
      {hasMultiple && (
        <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={(e) => {
                e.stopPropagation();
                setDirection(i > current ? 1 : -1);
                setCurrent(i);
              }}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === current
                  ? "w-4 bg-accent"
                  : "w-1.5 bg-white/30 hover:bg-white/50"
              }`}
              aria-label={`Go to image ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

/* ── Project Card ── */

function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const collabs = collaboratorMap[project.id] || [];
  const status = statusConfig[project.status];
  const type = typeLabels[project.category] || project.category;

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.08, ease }}
      className="group relative overflow-hidden rounded-xl border border-border/40 bg-bg-elevated/20 p-5 transition-all duration-300 hover:border-accent/20 hover:bg-bg-elevated/50"
    >
      {/* Type + Status */}
      <div className="mb-3 flex items-center justify-between">
        <span className="font-mono text-[10px] font-medium uppercase tracking-[0.15em] text-accent">
          {type}
        </span>
        <span className="flex items-center gap-1.5">
          <span className={`h-1.5 w-1.5 rounded-full ${status.dot}`} />
          <span className="text-[10px] text-text-muted">{status.label}</span>
        </span>
      </div>

      {/* Image Carousel */}
      <ImageCarousel projectId={project.id} title={project.title} />

      {/* Title + Subtitle */}
      <h3 className="mt-4 font-serif text-xl tracking-tight text-text transition-colors group-hover:text-accent">
        {project.title}
      </h3>
      {project.subtitle && (
        <p className="mt-0.5 text-sm text-text-muted">{project.subtitle}</p>
      )}

      {/* Description */}
      {project.description && (
        <p className="mt-3 text-sm leading-relaxed text-text-muted/80">
          {project.description}
        </p>
      )}

      {/* Tech tags */}
      <div className="mt-3 flex flex-wrap gap-1.5">
        {project.tech.map((t) => (
          <span
            key={t}
            className="rounded border border-text/10 px-1.5 py-0.5 font-mono text-[10px] text-text-muted/70"
          >
            {t}
          </span>
        ))}
      </div>

      {/* Collaborators */}
      {collabs.length > 0 && (
        <div className="mt-4 flex items-center gap-2.5">
          <div className="flex -space-x-1.5">
            {collabs.map((c, i) => (
              <div
                key={i}
                className="flex h-6 w-6 items-center justify-center rounded-full border border-border bg-bg-elevated text-[8px] font-semibold text-text-muted"
                title={`${c.name} — ${c.role}`}
              >
                {c.name
                  .split(" ")
                  .map((w) => w[0])
                  .join("")
                  .slice(0, 2)
                  .toUpperCase()}
              </div>
            ))}
          </div>
          <span className="text-[11px] text-text-muted/60">
            {collabs.map((c) => c.name).join(", ")}
          </span>
        </div>
      )}

      {/* Links */}
      {(project.github || project.live || project.demo || project.extra) && (
        <div className="mt-4 flex flex-wrap items-center gap-4 border-t border-border/30 pt-4">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs text-text-muted transition-colors hover:text-accent"
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
              GitHub
            </a>
          )}
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs text-text-muted transition-colors hover:text-accent"
            >
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="2" y1="12" x2="22" y2="12" />
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
              </svg>
              Website
            </a>
          )}
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs text-text-muted transition-colors hover:text-accent"
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                <polygon points="5 3 19 12 5 21 5 3" />
              </svg>
              Demo
            </a>
          )}
          {project.extra && (
            <a
              href={project.extra}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs text-text-muted transition-colors hover:text-accent"
            >
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path d="M3.5 1.5h7v7M10 2L2 10" />
              </svg>
              More
            </a>
          )}
        </div>
      )}
    </motion.article>
  );
}

/* ── Page ── */

export default function ProjectsPage() {
  const { theme, toggle } = useTheme();
  const [filter, setFilter] = useState("all");
  const [hasInteracted, setHasInteracted] = useState(false);

  const filtered =
    filter === "all"
      ? projects
      : projects.filter((p) => p.category === filter);

  return (
    <>
      <CustomCursor />

      <div className="min-h-screen">
        {/* ── Sticky top bar ── */}
        <header className="sticky top-0 z-40 border-b border-border/30 bg-bg/80 backdrop-blur-xl">
          <div className="mx-auto flex max-w-[1200px] items-center justify-between px-6 py-4">
            <Link
              href="/"
              className="flex items-center gap-2 text-sm text-text-muted transition-colors hover:text-text"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
              <span className="hidden sm:inline">Home</span>
            </Link>

            <button
              onClick={toggle}
              aria-label="Toggle theme"
              className="text-text-muted transition-colors hover:text-text"
            >
              {theme === "dark" ? (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="5" />
                  <line x1="12" y1="1" x2="12" y2="3" />
                  <line x1="12" y1="21" x2="12" y2="23" />
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                  <line x1="1" y1="12" x2="3" y2="12" />
                  <line x1="21" y1="12" x2="23" y2="12" />
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                </svg>
              ) : (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </svg>
              )}
            </button>
          </div>
        </header>

        {/* ── Hero ── */}
        <div className="mx-auto max-w-[1200px] px-6 pt-16 pb-4">
          <div className="flex items-end justify-between gap-4">
            <div>
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease }}
                className="font-serif text-5xl tracking-tight lg:text-6xl"
              >
                stuff i&apos;ve built
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
                className="mt-3 text-text-muted"
              >
                some shipped, some still cooking, some vibecoded, some not
              </motion.p>
            </div>
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="hidden font-mono text-sm text-text-muted/40 sm:block"
            >
              {projects.length} projects
            </motion.span>
          </div>
        </div>

        {/* ── Filter tabs ── */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25, ease: "easeOut" }}
          className="mx-auto max-w-[1200px] px-6 pb-10"
        >
          <div className="flex gap-2 pt-6">
            {filterTabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => {
                  setFilter(tab.key);
                  setHasInteracted(true);
                }}
                className={`rounded-full border px-4 py-1.5 font-mono text-[11px] tracking-wide transition-all duration-200 ${
                  filter === tab.key
                    ? "border-accent bg-accent/10 text-accent"
                    : "border-border/50 text-text-muted hover:border-text/30 hover:text-text"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* ── Project Grid ── */}
        <div className="mx-auto max-w-[1200px] px-6 pb-20">
          <AnimatePresence mode="wait">
            <motion.div
              key={filter}
              initial={hasInteracted ? { opacity: 0, y: 8 } : false}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8"
            >
              {filtered.map((project, i) => (
                <ProjectCard key={project.id} project={project} index={i} />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ── Footer ── */}
        <div className="mx-auto max-w-[1200px] px-6 pb-12">
          <div className="border-t border-border/30 pt-8 text-center text-xs text-text-muted">
            built by uzay with mass amounts of caffeine &middot; &copy;{" "}
            {new Date().getFullYear()}
          </div>
        </div>
      </div>
    </>
  );
}

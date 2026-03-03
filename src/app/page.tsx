"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Navbar from "@/components/layout/Navbar";
import CustomCursor from "@/components/layout/CustomCursor";
import { personal } from "@/data/personal";
import { projects } from "@/data/projects";
import { skillCategories } from "@/data/skills";
import { timeline } from "@/data/experience";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease: "easeOut" as const },
});

function BentoCard({
  children,
  className = "",
  delay = 0,
  id,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  id?: string;
}) {
  return (
    <motion.div
      id={id}
      {...fadeUp(delay)}
      className={`group relative overflow-hidden rounded-2xl border border-border bg-bg-elevated/50 p-6 transition-colors duration-300 hover:border-accent/40 ${className}`}
    >
      {children}
    </motion.div>
  );
}

/* Masonry heights for visual variety — alternates tall/short across 3 cols */
const masonryHeights = ["aspect-[4/5]", "aspect-[4/3]", "aspect-[3/4]", "aspect-square"];

export default function Home() {
  return (
    <>
      <CustomCursor />
      <Navbar />
      <main className="mx-auto max-w-7xl px-4 py-8 md:px-6 md:py-12">
        <div className="grid auto-rows-auto gap-3 md:grid-cols-12 md:gap-4">

          {/* ---- Hero + Photo ---- */}
          <BentoCard className="flex flex-col justify-end md:col-span-7 md:min-h-[320px]" delay={0}>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="mb-2 text-sm tracking-widest text-accent uppercase"
            >
              Portfolio
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
              className="font-serif text-[clamp(2.5rem,6vw,5rem)] leading-[0.95] tracking-tight"
            >
              Uzay<br />Poyraz
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="mt-4 text-text-muted"
            >
              {personal.title}
            </motion.p>
          </BentoCard>

          <BentoCard className="p-0 md:col-span-5 md:min-h-[320px]" delay={0.1}>
            <div className="relative h-full min-h-[280px] w-full">
              <Image
                src={personal.profileImage}
                alt="Uzay Poyraz"
                fill
                className="rounded-2xl object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 40vw"
                priority
              />
            </div>
          </BentoCard>

          {/* ---- About + Connect ---- */}
          <BentoCard className="md:col-span-8" delay={0.15} id="about">
            <h2 className="mb-3 text-sm tracking-widest text-accent uppercase">About</h2>
            <p className="leading-relaxed text-text-muted">
              {personal.bio[0]} {personal.bio[2]}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {personal.languages.map((lang) => (
                <span
                  key={lang}
                  className="rounded-full border border-border px-3 py-1 text-xs text-text-muted transition-colors hover:border-accent hover:text-accent"
                >
                  {lang}
                </span>
              ))}
            </div>
          </BentoCard>

          <BentoCard className="flex flex-col justify-between md:col-span-4" delay={0.2}>
            <h2 className="mb-4 text-sm tracking-widest text-accent uppercase">Connect</h2>
            <div className="flex flex-col gap-3">
              <a href={`mailto:${personal.email}`} className="text-sm text-text-muted transition-colors hover:text-accent">
                {personal.email} &rarr;
              </a>
              <a href={personal.linkedin} target="_blank" rel="noopener noreferrer" className="text-sm text-text-muted transition-colors hover:text-accent">
                LinkedIn &rarr;
              </a>
              <a href={personal.github} target="_blank" rel="noopener noreferrer" className="text-sm text-text-muted transition-colors hover:text-accent">
                GitHub &rarr;
              </a>
              <a href={personal.resume} target="_blank" rel="noopener noreferrer" className="text-sm text-text-muted transition-colors hover:text-accent">
                Resume &rarr;
              </a>
            </div>
          </BentoCard>

          {/* ---- Projects — masonry 3-col grid ---- */}
          <div id="projects" className="md:col-span-12">
            <motion.h2
              {...fadeUp(0.3)}
              className="mb-6 text-center font-serif text-3xl md:text-4xl"
            >
              Projects
            </motion.h2>
          </div>

          <div className="md:col-span-12">
            <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
              {projects.map((project, i) => (
                <motion.div
                  key={project.id}
                  {...fadeUp(0.3 + i * 0.1)}
                  className="group mb-4 break-inside-avoid"
                >
                  <a
                    href={project.github || project.live || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <div className={`relative w-full overflow-hidden rounded-2xl bg-bg-elevated ${masonryHeights[i % masonryHeights.length]}`}>
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    </div>
                    <div className="mt-3 flex items-center justify-between px-1">
                      <h3 className="font-serif text-lg">{project.title}</h3>
                      <div className="flex gap-1.5">
                        {project.tech.slice(0, 3).map((t) => (
                          <span
                            key={t}
                            className="flex h-6 w-6 items-center justify-center rounded-full border border-border text-[9px] font-medium text-text-muted"
                            title={t}
                          >
                            {t[0]}
                          </span>
                        ))}
                      </div>
                    </div>
                  </a>
                </motion.div>
              ))}
            </div>
          </div>

          {/* ---- Skills ---- */}
          <BentoCard className="md:col-span-12" delay={0.45}>
            <h2 className="mb-4 text-sm tracking-widest text-accent uppercase">Skills</h2>
            <div className="grid gap-6 md:grid-cols-3">
              {skillCategories.map((cat) => (
                <div key={cat.title}>
                  <h3 className="mb-2 text-xs font-medium tracking-wider text-text-muted uppercase">{cat.title}</h3>
                  <div className="flex flex-wrap gap-1.5">
                    {cat.skills.map((skill) => (
                      <span
                        key={skill}
                        className="rounded-full border border-border px-3 py-1.5 text-xs text-text-muted transition-all duration-200 hover:border-accent hover:text-text hover:-translate-y-px"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </BentoCard>

          {/* ---- Experience & Education ---- */}
          <BentoCard id="experience" className="md:col-span-7" delay={0.5}>
            <h2 className="mb-4 text-sm tracking-widest text-accent uppercase">Experience</h2>
            <div className="space-y-5">
              {timeline.filter((e) => e.type === "work").map((entry, i) => (
                <div key={i} className="border-l-2 border-border pl-4 transition-colors hover:border-accent">
                  <p className="text-xs text-text-muted">{entry.period}</p>
                  <h3 className="font-serif text-lg">{entry.title}</h3>
                  <p className="text-sm text-accent">{entry.organization}</p>
                  <p className="mt-1 text-sm text-text-muted">{entry.description}</p>
                </div>
              ))}
            </div>
          </BentoCard>

          <BentoCard className="md:col-span-5" delay={0.55}>
            <h2 className="mb-4 text-sm tracking-widest text-accent uppercase">Education</h2>
            <div className="space-y-5">
              {timeline.filter((e) => e.type === "education").map((entry, i) => (
                <div key={i} className="border-l-2 border-border pl-4 transition-colors hover:border-accent">
                  <p className="text-xs text-text-muted">{entry.period}</p>
                  <h3 className="font-serif text-lg">{entry.title}</h3>
                  <p className="text-sm text-accent">{entry.organization}</p>
                  <p className="mt-1 text-sm text-text-muted">{entry.description}</p>
                  {entry.highlight && (
                    <span className="mt-1.5 inline-block rounded-full border border-accent/30 px-2 py-0.5 text-[10px] text-accent">
                      {entry.highlight}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </BentoCard>

          {/* ---- Demo teaser + CTA ---- */}
          <BentoCard className="md:col-span-8" delay={0.6}>
            <h2 className="mb-2 text-sm tracking-widest text-accent uppercase">Interactive Demos</h2>
            <p className="text-text-muted">Experiments with audio synthesis and AI — coming soon.</p>
            <div className="mt-4 h-16 w-full overflow-hidden rounded-xl border border-border">
              <svg viewBox="0 0 800 64" className="h-full w-full" preserveAspectRatio="none">
                <path d="M0,32 Q50,10 100,32 T200,32 T300,32 T400,32 T500,32 T600,32 T700,32 T800,32" stroke="var(--border)" strokeWidth="1" fill="none" />
                <path d="M0,32 Q50,10 100,32 T200,32 T300,32 T400,32 T500,32 T600,32 T700,32 T800,32" stroke="var(--accent)" strokeWidth="1" fill="none" opacity="0.3" strokeDasharray="4 4" />
              </svg>
            </div>
          </BentoCard>

          <BentoCard className="flex flex-col items-center justify-center text-center md:col-span-4" delay={0.65}>
            <p className="font-serif text-xl">Let&apos;s build something.</p>
            <a
              href={`mailto:${personal.email}`}
              className="mt-4 rounded-full border border-accent px-5 py-2 text-sm text-accent transition-colors hover:bg-accent hover:text-bg"
            >
              Get in touch
            </a>
          </BentoCard>

        </div>

        {/* Footer */}
        <div className="mt-8 flex items-center justify-between border-t border-border pt-6 text-xs text-text-muted">
          <span>&copy; {new Date().getFullYear()} Uzay Poyraz</span>
          <span>Built with Next.js</span>
        </div>
      </main>
    </>
  );
}

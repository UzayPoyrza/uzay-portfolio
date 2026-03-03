"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import CustomCursor from "@/components/layout/CustomCursor";
import LoadingScreen from "@/components/layout/LoadingScreen";
import { useTheme } from "@/components/layout/ThemeProvider";
import { useActiveSection } from "@/hooks/useActiveSection";
import { personal } from "@/data/personal";
import { projects } from "@/data/projects";
import { skillCategories } from "@/data/skills";
import { timeline } from "@/data/experience";

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

const masonryHeights = ["aspect-[4/5]", "aspect-[4/3]", "aspect-[3/4]", "aspect-square"];

const sectionIds = ["about", "projects", "experience"];

export default function Home() {
  const { theme, toggle } = useTheme();
  const activeSection = useActiveSection(sectionIds);

  return (
    <>
      <LoadingScreen />
      <CustomCursor />

      <div className="mx-auto max-w-screen-xl px-6 md:flex md:h-screen md:gap-4 md:overflow-hidden md:px-12 lg:px-24">

        {/* ---- LEFT SIDEBAR (fixed in place) ---- */}
        <header className="shrink-0 pt-12 md:flex md:w-1/2 md:max-w-md md:flex-col md:justify-between md:py-20 lg:w-2/5">
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
                          isActive ? "text-text" : "text-text-muted hover:text-text"
                        }`}
                      >
                        <span
                          className={`h-px transition-all duration-300 ${
                            isActive ? "w-16 bg-text" : "w-8 bg-text-muted group-hover:w-16 group-hover:bg-text"
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
            className="mt-8 flex items-center gap-5 md:mt-0"
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
        <main className="pb-12 md:w-1/2 md:overflow-y-auto md:pt-20 md:pb-20 lg:w-3/5">

          {/* About */}
          <section id="about" className="mb-24">
            <motion.p
              {...fadeUp(2.5)}
              className="leading-relaxed text-text-muted"
            >
              cs grad from skidmore college. started coding in japan at uwc isak,
              never really stopped. i&apos;ve built tools for turkish airlines pilots,
              e-commerce platforms at optimum7, and an ai that beats me at checkers.
              currently obsessed with shipping things that actually work.
            </motion.p>
          </section>

          {/* Projects */}
          <section id="projects" className="mb-24">
            <motion.h2 {...fadeUp(2.7)} className="mb-2 font-serif text-3xl">
              stuff i&apos;ve built
            </motion.h2>
            <motion.p {...fadeUp(2.8)} className="mb-8 text-sm text-text-muted">
              some shipped, some still cooking
            </motion.p>
            <div className="columns-1 gap-4 sm:columns-2">
              {projects.map((project, i) => (
                <motion.div
                  key={project.id}
                  {...fadeUp(2.8 + i * 0.1)}
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
                        sizes="(max-width: 768px) 100vw, 50vw"
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
          </section>

          {/* Skills */}
          <section className="mb-24">
            <div className="grid gap-6 md:grid-cols-2">
              <motion.div {...fadeUp(3.0)}>
                <h3 className="mb-2 text-sm tracking-widest text-accent uppercase">Most Important Skills</h3>
                <p className="mb-4 text-sm text-text-muted">the stuff that actually matters</p>
                <div className="flex flex-wrap gap-1.5">
                  {skillCategories[0].skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full border border-accent/50 px-3 py-1.5 text-xs text-accent transition-all duration-200 hover:bg-accent hover:text-bg hover:-translate-y-px"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
              <motion.div {...fadeUp(3.1)}>
                <h3 className="mb-4 text-sm tracking-widest text-text-muted uppercase">i also know these i guess</h3>
                <div className="space-y-4">
                  {skillCategories.slice(1).map((cat) => (
                    <div key={cat.title}>
                      <h4 className="mb-1.5 text-xs font-medium tracking-wider text-text-muted uppercase">{cat.title}</h4>
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
              </motion.div>
            </div>
          </section>

          {/* Experience */}
          <section id="experience" className="mb-24">
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
                      <span className="mt-1.5 inline-block rounded-full border border-accent/30 px-2 py-0.5 text-[10px] text-accent">
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
              className="inline-flex items-center gap-2 text-sm text-text-muted transition-colors hover:text-accent"
            >
              View Full Resume
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3.5 1.5h7v7M10 2L2 10"/></svg>
            </a>
          </motion.div>

          {/* Footer */}
          <div className="mt-20 text-xs text-text-muted">
            built by uzay with mass amounts of caffeine &middot; &copy; {new Date().getFullYear()}
          </div>

        </main>
      </div>
    </>
  );
}

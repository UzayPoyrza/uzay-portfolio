"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import CustomCursor from "@/components/layout/CustomCursor";
import LoadingScreen from "@/components/layout/LoadingScreen";
import { useTheme } from "@/components/layout/ThemeProvider";
import { useActiveSection } from "@/hooks/useActiveSection";
import { personal } from "@/data/personal";
import { projects, projectCategories } from "@/data/projects";
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

const sectionIds = ["about", "projects", "experience"];

export default function Home() {
  const { theme, toggle } = useTheme();
  const activeSection = useActiveSection(sectionIds);

  return (
    <>
      <LoadingScreen />
      <CustomCursor />

      {/* ---- LEFT SIDEBAR (fixed on desktop) ---- */}
      <header
        className="px-6 pt-12 md:fixed md:top-0 md:flex md:h-screen md:w-[340px] md:flex-col md:justify-between md:py-20 lg:w-[400px]"
        style={{ left: 'max(3rem, calc((100vw - 1280px) / 2 + 6rem))' }}
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
      <main
        className="px-6 pb-12 md:h-screen md:overflow-y-auto md:px-0 md:pb-20 md:pl-12 lg:pl-20"
        style={{ marginLeft: 'max(calc(340px + 6rem), calc((100vw - 1280px) / 2 + 6rem + 400px + 5rem))' }}
      >
        <div className="max-w-2xl md:pt-20">

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
              publish very very soon — not touching grass until they do.
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
            <div className="grid grid-cols-3 gap-4">
              {projectCategories.map((cat) => (
                <motion.div key={cat.key} {...fadeUp(2.8)}>
                  <h3 className="mb-4 border-b border-text/20 pb-2 font-serif text-lg tracking-wide text-text">{cat.label}</h3>
                  <div className="space-y-3">
                    {projects.filter((p) => p.category === cat.key).map((project) => (
                      <a
                        key={project.id}
                        href={project.github || project.live || "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group block rounded-md p-3 transition-all duration-200 hover:bg-bg-elevated"
                      >
                        <span className="font-serif text-base text-text transition-colors group-hover:text-accent">{project.title}</span>
                        {project.subtitle && <p className="mt-0.5 text-[11px] text-text-muted">{project.subtitle}</p>}
                        <div className="mt-1.5 flex flex-wrap gap-1">
                          {project.tech.slice(0, 2).map((t) => (
                            <span key={t} className="rounded-full border border-border px-1.5 py-px text-[9px] text-text-muted transition-colors group-hover:border-accent/30">{t}</span>
                          ))}
                        </div>
                      </a>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>

          {/* Skills */}
          <div id="experience" className="mt-16">
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
                <h3 className="mb-4 text-sm text-text-muted">i also know these i guess :)</h3>
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
          </div>
          </section>

          {/* Experience */}
          <section className="mb-24">
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

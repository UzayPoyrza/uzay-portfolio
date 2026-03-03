"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Navbar from "@/components/layout/Navbar";
import CustomCursor from "@/components/layout/CustomCursor";
import LoadingScreen from "@/components/layout/LoadingScreen";
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

const masonryHeights = ["aspect-[4/5]", "aspect-[4/3]", "aspect-[3/4]", "aspect-square"];

export default function Home() {
  return (
    <>
      <LoadingScreen />
      <CustomCursor />
      <Navbar />
      <main className="mx-auto max-w-7xl px-4 py-8 md:px-6 md:py-12">
        <div className="grid auto-rows-auto gap-3 md:grid-cols-12 md:gap-4">

          {/* ---- Hero ---- */}
          <BentoCard className="flex flex-col justify-end md:col-span-7 md:min-h-[320px]" delay={2.3}>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.4, duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
              className="font-serif text-[clamp(2.5rem,6vw,5rem)] leading-[0.95] tracking-tight"
            >
              Uzay<br />Poyraz
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.8, duration: 0.6 }}
              className="mt-4 text-text-muted"
            >
              i build things, break things, and occasionally ship them.
            </motion.p>
          </BentoCard>

          <BentoCard className="p-0 md:col-span-5 md:min-h-[320px]" delay={2.4}>
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

          {/* ---- About (witty) + Connect ---- */}
          <BentoCard className="md:col-span-8" delay={2.5} id="about">
            <h2 className="mb-3 text-sm tracking-widest text-accent uppercase">About</h2>
            <p className="leading-relaxed text-text-muted">
              cs grad from skidmore college. started coding in japan at uwc isak,
              never really stopped. i&apos;ve built tools for turkish airlines pilots,
              e-commerce platforms at optimum7, and an ai that beats me at checkers.
              currently obsessed with shipping things that actually work.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {["english", "turkish", "japanese"].map((lang) => (
                <span
                  key={lang}
                  className="rounded-full border border-border px-3 py-1 text-xs text-text-muted transition-colors hover:border-accent hover:text-accent"
                >
                  {lang}
                </span>
              ))}
              <span className="rounded-full border border-border px-3 py-1 text-xs text-text-muted transition-colors hover:border-accent hover:text-accent">
                soccer
              </span>
              <span className="rounded-full border border-border px-3 py-1 text-xs text-text-muted transition-colors hover:border-accent hover:text-accent">
                music production
              </span>
            </div>
          </BentoCard>

          <BentoCard className="flex flex-col justify-between md:col-span-4" delay={2.6}>
            <h2 className="mb-4 text-sm tracking-widest text-accent uppercase">Connect</h2>
            <div className="flex flex-col gap-3">
              <a href={`mailto:${personal.email}`} className="text-sm text-text-muted transition-colors hover:text-accent">
                Mail &rarr;
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

          {/* ---- Projects ---- */}
          <div id="projects" className="md:col-span-12">
            <motion.h2
              {...fadeUp(2.7)}
              className="mb-2 text-center font-serif text-3xl md:text-4xl"
            >
              stuff i&apos;ve built
            </motion.h2>
            <motion.p
              {...fadeUp(2.8)}
              className="mb-6 text-center text-sm text-text-muted"
            >
              some shipped, some still cooking
            </motion.p>
          </div>

          <div className="md:col-span-12">
            <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
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
          <BentoCard className="md:col-span-5" delay={3.2}>
            <h2 className="mb-2 text-sm tracking-widest text-accent uppercase">Most Important Skills</h2>
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
          </BentoCard>

          <BentoCard className="md:col-span-7" delay={3.25}>
            <h2 className="mb-2 text-sm tracking-widest text-text-muted uppercase">I also know these i guess</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-3">
              {skillCategories.slice(1).map((cat) => (
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
          <BentoCard id="experience" className="md:col-span-7" delay={3.3}>
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

          <BentoCard className="md:col-span-5" delay={3.4}>
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


        </div>

        {/* Footer */}
        <div className="mt-8 flex items-center justify-between border-t border-border pt-6 text-xs text-text-muted">
          <span>built by uzay with mass amounts of caffeine</span>
          <span>&copy; {new Date().getFullYear()}</span>
        </div>
      </main>
    </>
  );
}

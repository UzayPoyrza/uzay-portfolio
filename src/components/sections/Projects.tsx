"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { projects } from "@/data/projects";
import AnimatedText from "@/components/ui/AnimatedText";
import { cn } from "@/lib/utils";

function ProjectCard({
  project,
  index,
}: {
  project: (typeof projects)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const isEven = index % 2 === 0;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "group grid gap-8 md:grid-cols-12 md:gap-12",
        !isEven && "md:direction-rtl"
      )}
    >
      {/* Image */}
      <div
        className={cn(
          "relative overflow-hidden md:col-span-5",
          isEven ? "md:col-start-1" : "md:col-start-8"
        )}
      >
        <div className="relative aspect-video w-full overflow-hidden bg-bg-elevated">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 45vw"
          />
        </div>
      </div>

      {/* Content */}
      <div
        className={cn(
          "flex flex-col justify-center md:col-span-7",
          isEven ? "md:col-start-6" : "md:col-start-1 md:row-start-1"
        )}
        style={{ direction: "ltr" }}
      >
        <p className="text-sm tracking-widest text-accent uppercase">
          {project.subtitle}
        </p>
        <h3 className="mt-2 font-serif text-3xl md:text-4xl">
          {project.title}
        </h3>
        <p className="mt-4 leading-relaxed text-text-muted">
          {project.description}
        </p>

        {/* Tech tags */}
        <div className="mt-6 flex flex-wrap gap-2">
          {project.tech.map((t) => (
            <span
              key={t}
              className="border border-border px-3 py-1 text-xs text-text-muted transition-colors hover:border-accent/50 hover:text-text"
            >
              {t}
            </span>
          ))}
        </div>

        {/* Links */}
        <div className="mt-6 flex gap-4">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-text-muted transition-colors hover:text-accent"
            >
              GitHub &rarr;
            </a>
          )}
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-text-muted transition-colors hover:text-accent"
            >
              Live Site &rarr;
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="px-6 py-24 md:py-32">
      <div className="mx-auto max-w-7xl">
        <AnimatedText
          text="Projects"
          as="h2"
          className="font-serif text-5xl md:text-7xl"
        />

        <div className="mt-20 space-y-24 md:space-y-32">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

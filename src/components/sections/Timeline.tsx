"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { timeline } from "@/data/experience";
import AnimatedText from "@/components/ui/AnimatedText";

export default function Timeline() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="experience" ref={ref} className="px-6 py-24 md:py-32">
      <div className="mx-auto max-w-7xl">
        <AnimatedText
          text="Experience & Education"
          as="h2"
          className="font-serif text-5xl md:text-7xl"
        />

        <div className="relative mt-16 ml-4 border-l border-border pl-8 md:ml-8 md:pl-12">
          {timeline.map((entry, i) => (
            <motion.div
              key={`${entry.organization}-${i}`}
              initial={{ opacity: 0, x: -30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{
                duration: 0.6,
                delay: 0.2 + i * 0.15,
                ease: "easeOut",
              }}
              className="relative mb-12 last:mb-0"
            >
              {/* Dot */}
              <div className="absolute -left-[calc(2rem+5px)] top-2 h-2.5 w-2.5 border border-accent bg-bg md:-left-[calc(3rem+5px)]" />

              <span className="text-xs tracking-widest text-text-muted uppercase">
                {entry.period}
                {entry.type === "work" && (
                  <span className="ml-3 text-accent">Work</span>
                )}
                {entry.type === "education" && (
                  <span className="ml-3 text-accent">Education</span>
                )}
              </span>
              <h3 className="mt-1 font-serif text-xl md:text-2xl">
                {entry.title}
              </h3>
              <p className="mt-0.5 text-sm text-accent">
                {entry.organization}
              </p>
              <p className="mt-2 text-text-muted">{entry.description}</p>
              {entry.highlight && (
                <span className="mt-2 inline-block border border-accent/30 px-3 py-1 text-xs text-accent">
                  {entry.highlight}
                </span>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

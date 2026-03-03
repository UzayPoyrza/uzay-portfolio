"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { skillCategories } from "@/data/skills";
import AnimatedText from "@/components/ui/AnimatedText";

export default function Skills() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="skills" ref={ref} className="px-6 py-24 md:py-32">
      <div className="mx-auto max-w-7xl">
        <AnimatedText
          text="Skills"
          as="h2"
          className="font-serif text-5xl md:text-7xl"
        />

        <div className="mt-16 grid gap-12 md:grid-cols-3">
          {skillCategories.map((category, catIdx) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.6,
                delay: 0.2 + catIdx * 0.15,
                ease: "easeOut",
              }}
            >
              <h3 className="mb-6 text-sm tracking-widest text-accent uppercase">
                {category.title}
              </h3>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, skillIdx) => (
                  <motion.span
                    key={skill}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{
                      duration: 0.4,
                      delay: 0.4 + catIdx * 0.1 + skillIdx * 0.03,
                    }}
                    className="border border-border px-4 py-2 text-sm text-text-muted transition-all duration-300 hover:border-accent hover:text-text hover:-translate-y-0.5"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { personal } from "@/data/personal";
import AnimatedText from "@/components/ui/AnimatedText";

export default function Contact() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="contact" ref={ref} className="px-6 py-24 md:py-32">
      <div className="mx-auto max-w-7xl">
        <AnimatedText
          text="Let's connect"
          as="h2"
          className="font-serif text-5xl md:text-7xl"
        />
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-6 max-w-lg text-lg text-text-muted"
        >
          Have an exciting project or opportunity? I&apos;d love to hear from you.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-12 flex flex-wrap gap-4"
        >
          <a
            href={`mailto:${personal.email}`}
            className="border border-accent px-6 py-3 text-sm text-accent transition-colors hover:bg-accent hover:text-bg"
          >
            {personal.email}
          </a>
          <a
            href={personal.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="border border-border px-6 py-3 text-sm text-text-muted transition-colors hover:border-accent hover:text-accent"
          >
            LinkedIn
          </a>
          <a
            href={personal.github}
            target="_blank"
            rel="noopener noreferrer"
            className="border border-border px-6 py-3 text-sm text-text-muted transition-colors hover:border-accent hover:text-accent"
          >
            GitHub
          </a>
          <a
            href={personal.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="border border-border px-6 py-3 text-sm text-text-muted transition-colors hover:border-accent hover:text-accent"
          >
            Resume
          </a>
        </motion.div>
      </div>
    </section>
  );
}

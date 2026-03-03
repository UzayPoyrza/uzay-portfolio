"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { personal } from "@/data/personal";
import AnimatedText from "@/components/ui/AnimatedText";

export default function About() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" ref={ref} className="px-6 py-24 md:py-32">
      <div className="mx-auto max-w-7xl">
        <AnimatedText
          text="About"
          as="h2"
          className="font-serif text-5xl md:text-7xl"
        />

        <div className="mt-16 grid gap-12 md:grid-cols-12 md:gap-8">
          {/* Text */}
          <div className="md:col-span-7">
            {personal.bio.map((paragraph, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.7,
                  delay: 0.3 + i * 0.15,
                  ease: "easeOut",
                }}
                className="mb-6 text-lg leading-relaxed text-text-muted"
              >
                {paragraph}
              </motion.p>
            ))}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.8, ease: "easeOut" }}
              className="mt-8 flex flex-wrap gap-3"
            >
              {personal.languages.map((lang) => (
                <span
                  key={lang}
                  className="border border-border px-4 py-1.5 text-sm text-text-muted transition-colors hover:border-accent hover:text-accent"
                >
                  {lang}
                </span>
              ))}
            </motion.div>
          </div>

          {/* Photo */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="relative md:col-span-5 md:-mt-8"
          >
            <div className="relative aspect-[3/4] w-full overflow-hidden">
              <Image
                src={personal.profileImage}
                alt="Uzay Poyraz"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 40vw"
                priority
              />
            </div>
            {/* Accent border offset */}
            <div className="absolute -bottom-3 -right-3 -z-10 h-full w-full border border-accent/30" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";
import { personal } from "@/data/personal";

const letterVariants = {
  hidden: { y: 80, opacity: 0 },
  visible: (i: number) => ({
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.8,
      delay: 0.3 + i * 0.05,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  }),
};

export default function Hero() {
  const firstName = "Uzay";
  const lastName = "Poyraz";

  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center px-6">
      {/* Warm gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0c0c0c] via-[#110e0c] to-[#0c0c0c]" />

      <div className="relative z-10 text-center">
        {/* Name */}
        <h1 className="font-serif text-[clamp(3rem,12vw,10rem)] font-normal leading-[0.9] tracking-tight">
          <span className="block overflow-hidden">
            {firstName.split("").map((char, i) => (
              <motion.span
                key={`f-${i}`}
                custom={i}
                variants={letterVariants}
                initial="hidden"
                animate="visible"
                className="inline-block"
              >
                {char}
              </motion.span>
            ))}
          </span>
          <span className="block overflow-hidden">
            {lastName.split("").map((char, i) => (
              <motion.span
                key={`l-${i}`}
                custom={i + firstName.length}
                variants={letterVariants}
                initial="hidden"
                animate="visible"
                className="inline-block"
              >
                {char}
              </motion.span>
            ))}
          </span>
        </h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0, ease: "easeOut" }}
          className="mt-6 text-lg text-text-muted md:text-xl"
        >
          {personal.title}
        </motion.p>

        {/* Social links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2, ease: "easeOut" }}
          className="mt-8 flex items-center justify-center gap-6"
        >
          <a
            href={personal.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-text-muted transition-colors hover:text-accent"
          >
            GitHub
          </a>
          <span className="text-border">|</span>
          <a
            href={personal.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-text-muted transition-colors hover:text-accent"
          >
            LinkedIn
          </a>
          <span className="text-border">|</span>
          <a
            href={`mailto:${personal.email}`}
            className="text-sm text-text-muted transition-colors hover:text-accent"
          >
            Email
          </a>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-xs tracking-widest text-text-muted uppercase">
            Scroll
          </span>
          <div className="h-8 w-px bg-gradient-to-b from-text-muted to-transparent" />
        </motion.div>
      </motion.div>
    </section>
  );
}

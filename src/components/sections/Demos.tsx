"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import AnimatedText from "@/components/ui/AnimatedText";
import AudioPlayer from "@/components/demos/AudioPlayer";

export default function Demos() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="demos" ref={ref} className="px-6 py-24 md:py-32">
      <div className="mx-auto max-w-7xl">
        <AnimatedText
          text="Interactive Demos"
          as="h2"
          className="font-serif text-5xl md:text-7xl"
        />
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-4 max-w-xl text-text-muted"
        >
          Experiments and prototypes you can interact with directly.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-12 grid gap-6 md:grid-cols-2"
        >
          <AudioPlayer
            title="AI Meditation Audio"
            description="Generative ambient soundscape for focus and relaxation. Audio files coming soon."
          />
          <AudioPlayer
            title="Sound Exploration"
            description="Experimental audio synthesis demo. In development."
          />
        </motion.div>
      </div>
    </section>
  );
}

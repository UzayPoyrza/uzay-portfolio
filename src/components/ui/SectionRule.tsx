"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function SectionRule() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div ref={ref} className="mx-auto my-20 max-w-7xl px-6 md:my-32">
      <motion.div
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="h-px origin-left bg-border"
      />
    </div>
  );
}

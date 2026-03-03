"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";

interface AnimatedTextProps {
  text: string;
  className?: string;
  delay?: number;
  as?: "h1" | "h2" | "h3" | "p" | "span";
}

export default function AnimatedText({
  text,
  className,
  delay = 0,
  as: Tag = "h2",
}: AnimatedTextProps) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <Tag
      ref={ref as React.RefObject<HTMLHeadingElement>}
      className={cn("overflow-hidden", className)}
    >
      <motion.span
        className="inline-block"
        initial={{ y: "100%", opacity: 0 }}
        animate={inView ? { y: 0, opacity: 1 } : { y: "100%", opacity: 0 }}
        transition={{
          duration: 0.8,
          delay,
          ease: [0.16, 1, 0.3, 1],
        }}
      >
        {text}
      </motion.span>
    </Tag>
  );
}

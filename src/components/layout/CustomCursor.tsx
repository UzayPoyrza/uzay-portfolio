"use client";

import { useMousePosition } from "@/hooks/useMousePosition";
import { motion } from "framer-motion";

export default function CustomCursor() {
  const { x, y } = useMousePosition();

  return (
    <motion.div
      className="pointer-events-none fixed inset-0 z-[9998] hidden lg:block"
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
    >
      <div
        className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          left: x,
          top: y,
          width: 320,
          height: 320,
          background:
            "radial-gradient(circle, rgba(79,156,255,0.055) 0%, rgba(79,156,255,0.018) 42%, transparent 72%)",
          transition: "left 0.15s ease-out, top 0.15s ease-out",
        }}
      />
    </motion.div>
  );
}

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
          width: 400,
          height: 400,
          background:
            "radial-gradient(circle, rgba(196,93,62,0.06) 0%, rgba(196,93,62,0.02) 40%, transparent 70%)",
          transition: "left 0.15s ease-out, top 0.15s ease-out",
        }}
      />
    </motion.div>
  );
}

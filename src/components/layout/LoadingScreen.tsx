"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useCallback } from "react";

const spinnerVerbs = [
  "Whatchamacalliting",
  "Tempering",
  "Simmering",
  "Pondering",
  "Ruminating",
  "Vibing",
  "Concocting",
  "Brewing",
  "Noodling",
  "Tinkering",
  "Cooking",
  "Percolating",
  "Shenaniganing",
  "Crystallizing",
  "Wrangling",
  "Zigzagging",
];

const doneVerbs = ["Crunched", "Baked", "Brewed", "Cooked", "Done"];

const spinFrames = ["|", "/", "-", "\\"];

export default function LoadingScreen() {
  // Show by default - but immediately hide if this is a client-side navigation (back from subpage)
  const [visible, setVisible] = useState(() => {
    // SSR: default to true, we'll check on client in useEffect
    if (typeof window === "undefined") return true;
    // If the page was reached via client-side navigation (back_forward or soft nav),
    // the performance entry type will be different from "navigate"/"reload"
    const navEntry = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming | undefined;
    const navType = navEntry?.type;
    // Show spinner on fresh loads ("navigate") and reloads ("reload"), skip on back/forward
    return navType === "navigate" || navType === "reload";
  });
  const [phase, setPhase] = useState<"loading" | "done">("loading");
  const [verb, setVerb] = useState("");
  const [doneVerb, setDoneVerb] = useState("");
  const [frame, setFrame] = useState(0);

  const pickRandom = useCallback(<T,>(arr: T[]) => arr[Math.floor(Math.random() * arr.length)], []);

  useEffect(() => {
    if (!visible) return;
    setVerb(pickRandom(spinnerVerbs));
    setDoneVerb(pickRandom(doneVerbs));
  }, [pickRandom, visible]);

  useEffect(() => {
    if (!visible) return;
    // Rotate spinner
    const spinInterval = setInterval(() => {
      setFrame((f) => (f + 1) % spinFrames.length);
    }, 80);

    // Cycle through verbs
    const verbInterval = setInterval(() => {
      setVerb(pickRandom(spinnerVerbs));
    }, 1200);

    // Switch to done
    const doneTimer = setTimeout(() => {
      setPhase("done");
      clearInterval(spinInterval);
      clearInterval(verbInterval);
    }, 2000);

    // Fade out
    const hideTimer = setTimeout(() => setVisible(false), 2600);

    return () => {
      clearInterval(spinInterval);
      clearInterval(verbInterval);
      clearTimeout(doneTimer);
      clearTimeout(hideTimer);
    };
  }, [pickRandom, visible]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="fixed inset-0 z-[10000] flex items-center justify-center bg-[#0c0c0c]"
        >
          {phase === "loading" ? (
            <p className="font-mono text-sm">
              <span className="text-[#c45d3e]">{spinFrames[frame]}</span>
              <span className="text-[#e8e2d9]"> {verb}...</span>
            </p>
          ) : (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.15 }}
              className="font-mono text-sm"
            >
              <span className="text-[#a39e95]">* {doneVerb}</span>
            </motion.p>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

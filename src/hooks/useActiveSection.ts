"use client";

import { useState, useEffect, useCallback } from "react";

export function useActiveSection(sectionIds: string[]) {
  const [active, setActive] = useState(sectionIds[0] || "");

  const findActive = useCallback(() => {
    // Find the scrollable container (main element) or fall back to window
    const scrollContainer = document.querySelector("main");
    const midY = scrollContainer
      ? scrollContainer.getBoundingClientRect().top + scrollContainer.clientHeight / 2
      : window.innerHeight / 2;

    for (let i = sectionIds.length - 1; i >= 0; i--) {
      const el = document.getElementById(sectionIds[i]);
      if (el && el.getBoundingClientRect().top <= midY) {
        setActive(sectionIds[i]);
        return;
      }
    }
    setActive(sectionIds[0]);
  }, [sectionIds]);

  useEffect(() => {
    findActive();

    // Listen on both main (scrollable container) and window (mobile fallback)
    const main = document.querySelector("main");
    if (main) {
      main.addEventListener("scroll", findActive, { passive: true });
    }
    window.addEventListener("scroll", findActive, { passive: true });

    return () => {
      if (main) main.removeEventListener("scroll", findActive);
      window.removeEventListener("scroll", findActive);
    };
  }, [findActive]);

  return active;
}

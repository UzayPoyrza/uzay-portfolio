"use client";

import { useState, useEffect, useCallback } from "react";

export function useActiveSection(sectionIds: string[]) {
  const [active, setActive] = useState(sectionIds[0] || "");

  const findActive = useCallback(() => {
    const main = document.querySelector("main");
    // Desktop: main is the scroll container with overflow-y:auto
    // Mobile: main is static, window scrolls — use window.innerHeight
    const isMobile = !main || main.scrollTop === 0 && main.scrollHeight <= main.clientHeight + 1;

    if (isMobile) {
      // Mobile: check which section header is closest to top of viewport
      const triggerY = window.innerHeight * 0.35;
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i]);
        if (el && el.getBoundingClientRect().top <= triggerY) {
          setActive(sectionIds[i]);
          return;
        }
      }
      setActive(sectionIds[0]);
    } else {
      // Desktop: use main's scroll position
      const midY = main.getBoundingClientRect().top + main.clientHeight * 0.3;
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i]);
        if (el && el.getBoundingClientRect().top <= midY) {
          setActive(sectionIds[i]);
          return;
        }
      }
      setActive(sectionIds[0]);
    }
  }, [sectionIds]);

  useEffect(() => {
    findActive();

    const main = document.querySelector("main");
    if (main) {
      main.addEventListener("scroll", findActive, { passive: true });
    }
    window.addEventListener("scroll", findActive, { passive: true });
    window.addEventListener("resize", findActive, { passive: true });

    return () => {
      if (main) main.removeEventListener("scroll", findActive);
      window.removeEventListener("scroll", findActive);
      window.removeEventListener("resize", findActive);
    };
  }, [findActive]);

  return active;
}

"use client";

import { useState, useEffect, useCallback } from "react";

export function useActiveSection(sectionIds: string[]) {
  const [active, setActive] = useState(sectionIds[0] || "");

  const findActive = useCallback(() => {
    const triggerY = window.innerHeight * 0.35;
    for (let i = sectionIds.length - 1; i >= 0; i--) {
      const el = document.getElementById(sectionIds[i]);
      if (el && el.getBoundingClientRect().top <= triggerY) {
        setActive(sectionIds[i]);
        return;
      }
    }
    setActive(sectionIds[0]);
  }, [sectionIds]);

  useEffect(() => {
    findActive();

    window.addEventListener("scroll", findActive, { passive: true });
    window.addEventListener("resize", findActive, { passive: true });

    return () => {
      window.removeEventListener("scroll", findActive);
      window.removeEventListener("resize", findActive);
    };
  }, [findActive]);

  return active;
}

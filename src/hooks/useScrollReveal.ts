"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Reveals [data-reveal] children when the container scrolls into view.
 * Uses fromTo + toggleActions so content is never left stuck hidden.
 */
export function useScrollReveal() {
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const items = gsap.utils.toArray<HTMLElement>("[data-reveal]");
      if (!items.length) return;

      gsap.fromTo(
        items,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: {
            trigger: scope.current,
            start: "top 80%",
            // re-fire correctly even if measured early
            toggleActions: "play none none none",
            once: true,
          },
        }
      );
    },
    { scope }
  );

  return scope;
}
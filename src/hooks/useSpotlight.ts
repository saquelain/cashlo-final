"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * - Heading: standard fade-up.
 * - Grid: one mousemove listener writes --mx/--my (px, relative to each card)
 *   onto whichever [data-card] the cursor is over -> CSS paints the glow + border.
 * - Entrance: cards wipe in via clip-path + slight rise, staggered, on scroll.
 */
export function useSpotlight() {
  const scope = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const reduce = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      // Heading
      gsap.fromTo(
        "[data-reveal]",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: { trigger: "[data-reveal]", start: "top 85%", once: true },
        }
      );

      const grid = gridRef.current;
      if (!grid) return;
      const cards = gsap.utils.toArray<HTMLElement>("[data-card]", grid);

      // Entrance: clip-path wipe (top -> down) + rise
      if (reduce) {
        gsap.set(cards, { clearProps: "all" });
      } else {
        gsap.fromTo(
          cards,
          { clipPath: "inset(0 0 100% 0)", y: 40, opacity: 0 },
          {
            clipPath: "inset(0 0 0% 0)",
            y: 0,
            opacity: 1,
            duration: 0.7,
            ease: "power3.out",
            stagger: { each: 0.08, grid: "auto", from: "start" },
            scrollTrigger: { trigger: grid, start: "top 78%", once: true },
          }
        );
      }

      // Spotlight: skip on touch / no fine pointer
      if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

      let raf = 0;
      let lastE: PointerEvent | null = null;

      const paint = () => {
        raf = 0;
        if (!lastE) return;
        const card = (lastE.target as HTMLElement)?.closest<HTMLElement>(
          "[data-card]"
        );
        if (!card) return;
        const r = card.getBoundingClientRect();
        card.style.setProperty("--mx", lastE.clientX - r.left + "px");
        card.style.setProperty("--my", lastE.clientY - r.top + "px");
      };

      const onMove = (e: PointerEvent) => {
        lastE = e;
        if (!raf) raf = requestAnimationFrame(paint);
      };

      grid.addEventListener("pointermove", onMove);
      return () => {
        grid.removeEventListener("pointermove", onMove);
        if (raf) cancelAnimationFrame(raf);
      };
    },
    { scope }
  );

  return { scope, gridRef };
}
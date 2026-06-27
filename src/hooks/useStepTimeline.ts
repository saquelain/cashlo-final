"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Drawing-line process timeline.
 * - [data-fill]  : the brand line that draws top->bottom (scaleY, scrubbed)
 * - [data-pulse] : a glowing dot riding the tip of the draw
 * - [data-row]   : each step; gets .is-active as the line reaches it
 * - [data-content]: image/text blocks that fade up when their row activates
 */
export function useStepTimeline() {
  const scope = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const reduce = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      // Heading reveal
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

      const track = trackRef.current;
      const fill = track?.querySelector<HTMLElement>("[data-fill]");
      const pulse = track?.querySelector<HTMLElement>("[data-pulse]");
      const rows = gsap.utils.toArray<HTMLElement>("[data-row]");

      if (reduce) {
        if (fill) gsap.set(fill, { scaleY: 1 });
        if (pulse) gsap.set(pulse, { autoAlpha: 0 });
        rows.forEach((r) => {
          r.classList.add("is-active");
          gsap.set(r.querySelectorAll("[data-content]"), { clearProps: "all" });
        });
        return;
      }

      // 1) Draw the line + travel the pulse — one scrubbed timeline
      // Draw the line, travel the pulse, and activate nodes from the pulse's
    // real position — all on ONE scrubbed timeline so they can't desync.
    if (track && fill) {
    gsap.set(fill, { transformOrigin: "top center", scaleY: 0 });

    const dots = rows.map((row) => row.querySelector<HTMLElement>(".tl-dot"));

    const activateByPulse = () => {
        if (!pulse) return;
        const trackTop = track.getBoundingClientRect().top;
        const pulseY = pulse.getBoundingClientRect().top - trackTop; // px down the track

        rows.forEach((row, i) => {
        const dot = dots[i];
        if (!dot) return;
        const dotY =
            dot.getBoundingClientRect().top +
            dot.offsetHeight / 2 -
            track.getBoundingClientRect().top;
        // active once the pulse tip has reached/passed the node center
        row.classList.toggle("is-active", pulseY >= dotY - 4);
        });
    };

    const tl = gsap.timeline({
        scrollTrigger: {
        trigger: track,
        start: "top 75%",
        end: "bottom 70%",
        scrub: true,
        invalidateOnRefresh: true,
        onUpdate: activateByPulse,
        onRefresh: activateByPulse,
        },
    });
    tl.to(fill, { scaleY: 1, ease: "none" }, 0);
    if (pulse) {
        tl.fromTo(
        pulse,
        { y: 0, autoAlpha: 1 },
        { y: () => track.offsetHeight, ease: "none" },
        0
        );
    }
    }

    // Content fade-up stays per-row (independent of activation timing)
    rows.forEach((row) => {
    const content = row.querySelectorAll<HTMLElement>("[data-content]");
    gsap.fromTo(
        content,
        { y: 36, opacity: 0 },
        {
        y: 0,
        opacity: 1,
        duration: 0.7,
        ease: "power3.out",
        stagger: 0.12,
        scrollTrigger: { trigger: row, start: "top 68%", once: true },
        }
    );
    });
    },
    { scope }
  );

  return { scope, trackRef };
}
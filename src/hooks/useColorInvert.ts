"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Scroll-driven color inversion. Drives a single CSS var (--edge) that moves
 * the chevron's baseline up the stage. Above the edge = blue fill + white text;
 * below = the base blue-on-white. As --edge shrinks, blue retracts upward and
 * the text flips white -> blue from the top down.
 */
export function useColorInvert() {
  const scope = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const stage = stageRef.current;
      if (!stage) return;

      const proxy = { edge: 120 }; // start: blue covers the whole stage
      const apply = () => stage.style.setProperty("--edge", proxy.edge + "%");
      apply();

      // respect reduced-motion: skip the sweep, settle on the white end-state
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        proxy.edge = -25;
        apply();
        return;
      }

      gsap.to(proxy, {
        edge: -25, // end: blue fully retracted above the stage
        ease: "none",
        onUpdate: apply,
        scrollTrigger: {
          trigger: stage,
          start: "top 85%",
          end: "bottom 25%",
          scrub: true,
          invalidateOnRefresh: true,
        },
      });
    },
    { scope }
  );

  return { scope, stageRef };
}
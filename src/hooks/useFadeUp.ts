"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";

/**
 * Animates direct children with [data-fade] up into place, staggered.
 * Attach the returned ref to a container.
 */
export function useFadeUp() {
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.from("[data-fade]", {
        y: 40,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        stagger: 0.12,
        delay: 0.2,
      });
    },
    { scope }
  );

  return scope;
}
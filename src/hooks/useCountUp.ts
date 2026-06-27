"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Counts every [data-count] element from 0 to its data-count value
 * when the container scrolls into view.
 * Optional: data-suffix (e.g. "+", "M+") and data-prefix.
 */
export function useCountUp() {
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const els = gsap.utils.toArray<HTMLElement>("[data-count]");

      els.forEach((el) => {
        const target = Number(el.dataset.count);
        const prefix = el.dataset.prefix ?? "";
        const suffix = el.dataset.suffix ?? "";
        const obj = { val: 0 };

        gsap.to(obj, {
          val: target,
          duration: 2,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 85%" },
          onUpdate: () => {
            el.textContent =
              prefix + Math.round(obj.val).toLocaleString("en-IN") + suffix;
          },
        });
      });
    },
    { scope }
  );

  return scope;
}
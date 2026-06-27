"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";

export default function Marquee({
  items,
  direction = "left",
  speed = 30,
}: {
  items: string[];
  direction?: "left" | "right";
  speed?: number; // seconds per loop — higher = slower
}) {
  const track = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = track.current;
      if (!el) return;

      // The track contains items twice; animate by exactly half its width
      // so the loop is seamless.
      const half = el.scrollWidth / 2;
      const fromX = direction === "left" ? 0 : -half;
      const toX = direction === "left" ? -half : 0;

      gsap.fromTo(
        el,
        { x: fromX },
        {
          x: toX,
          duration: speed,
          ease: "none",
          repeat: -1,
        }
      );
    },
    { scope: track, dependencies: [direction, speed] }
  );

  return (
    <div className="overflow-hidden">
      <div ref={track} className="flex w-max gap-3">
        {/* render items twice for the seamless loop */}
        {[...items, ...items].map((item, i) => (
          <span
            key={i}
            className="whitespace-nowrap rounded-full border border-black/10 bg-white px-5 py-2.5 text-sm font-medium text-ink/70 shadow-sm"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
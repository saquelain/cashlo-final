"use client";

import { ReactLenis } from "lenis/react";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const lenisRef = useRef<any>(null);

    useEffect(() => {
        // Drive Lenis from GSAP's ticker so scroll + animations share one clock
        function update(time: number) {
        lenisRef.current?.lenis?.raf(time * 1000);
        }
        gsap.ticker.add(update);
        gsap.ticker.lagSmoothing(0);

        // Keep ScrollTrigger in sync with Lenis scrolling
        const lenis = lenisRef.current?.lenis;
        lenis?.on("scroll", ScrollTrigger.update);

        // Recalculate trigger positions once everything (incl. video) has loaded,
        // so sections below the hero get correct start points.
        const refresh = () => ScrollTrigger.refresh();
        window.addEventListener("load", refresh);
        // also refresh shortly after mount in case 'load' already fired
        const t = setTimeout(refresh, 500);

        return () => {
        gsap.ticker.remove(update);
        lenis?.off("scroll", ScrollTrigger.update);
        window.removeEventListener("load", refresh);
        clearTimeout(t);
        };
    }, []);

  return (
    <ReactLenis
      root
      ref={lenisRef}
      options={{ autoRaf: false, lerp: 0.1, smoothWheel: true }}
    >
      {children}
    </ReactLenis>
  );
}
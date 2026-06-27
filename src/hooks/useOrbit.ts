"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function useOrbit() {
  const scope = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const outerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
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

      // Mobile tag-cloud reveal (always wired; harmless if hidden)
      const cloud = gsap.utils.toArray<HTMLElement>("[data-cloud-item]");
      if (cloud.length) {
        gsap.fromTo(
          cloud,
          { y: 20, opacity: 0, scale: 0.9 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.5,
            ease: "power3.out",
            stagger: { each: 0.025, from: "center" },
            scrollTrigger: { trigger: "[data-cloud]", start: "top 85%", once: true },
          }
        );
      }

      // Orbit: desktop only, via gsap.matchMedia (auto cleanup on resize/unmount)
      const mm = gsap.matchMedia();
      mm.add("(min-width: 768px)", () => {
        const stage = stageRef.current;
        const inner = innerRef.current;
        const outer = outerRef.current;
        if (!stage || !inner || !outer) return;

        const innerPills = gsap.utils.toArray<HTMLElement>("[data-pill]", inner);
        const outerPills = gsap.utils.toArray<HTMLElement>("[data-pill]", outer);
        const all = [...innerPills, ...outerPills];

        // center each pill on its slot point + initial upright rotation (-angle)
        const prep = (pills: HTMLElement[]) =>
          pills.forEach((p, i) => {
            const a = (i * 360) / pills.length;
            gsap.set(p, { xPercent: -50, yPercent: -50, rotation: -a });
          });
        prep(innerPills);
        prep(outerPills);

        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (reduce) {
          gsap.set(stage, { "--spread": 1 });
          gsap.set(all, { opacity: 1, scale: 1 });
          return;
        }

        const D_IN = 55; // sec / revolution (inner)
        const D_OUT = 80; // sec / revolution (outer)
        const spinning: gsap.core.Tween[] = [];

        const startSpin = () => {
          spinning.push(
            gsap.to(inner, { rotation: "+=360", duration: D_IN, ease: "none", repeat: -1 }),
            gsap.to(outer, { rotation: "-=360", duration: D_OUT, ease: "none", repeat: -1 })
          );
          // pills counter-spin so text stays upright
          innerPills.forEach((p) =>
            spinning.push(
              gsap.to(p, { rotation: "-=360", duration: D_IN, ease: "none", repeat: -1 })
            )
          );
          outerPills.forEach((p) =>
            spinning.push(
              gsap.to(p, { rotation: "+=360", duration: D_OUT, ease: "none", repeat: -1 })
            )
          );
        };

        // Entrance: fly out from center, pop in, then start spinning
        gsap.set(stage, { "--spread": 0 });
        gsap.set(all, { opacity: 0, scale: 0 });

        const intro = gsap.timeline({
          scrollTrigger: { trigger: stage, start: "top 70%", once: true },
        });
        intro
          .to(stage, { "--spread": 1, duration: 1.1, ease: "expo.out" }, 0)
          .to(
            all,
            {
              opacity: 1,
              scale: 1,
              duration: 0.6,
              ease: "back.out(1.6)",
              stagger: { each: 0.03, from: "center" },
            },
            0.15
          )
          .add(startSpin, ">-0.1");

        // Hover: pause everything + highlight the pill
        const controller = new AbortController();
        const { signal } = controller;
        all.forEach((p) => {
          p.addEventListener(
            "pointerenter",
            () => {
              spinning.forEach((t) => t.pause());
              p.classList.add("is-hot");
            },
            { signal }
          );
          p.addEventListener(
            "pointerleave",
            () => {
              spinning.forEach((t) => t.resume());
              p.classList.remove("is-hot");
            },
            { signal }
          );
        });

        return () => controller.abort(); // GSAP tweens auto-revert via matchMedia
      });
    },
    { scope }
  );

  return { scope, stageRef, innerRef, outerRef };
}
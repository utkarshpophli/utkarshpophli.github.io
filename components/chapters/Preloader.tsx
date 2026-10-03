"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { markReady } from "@/lib/ready";
import { prefersReducedMotion } from "@/lib/motion";

const greetings = ["Hello", "नमस्ते", "नमस्कार", "Bonjour", "Hola", "こんにちは"];

// A short greeting, then a curved curtain lifts to reveal the hero.
// Rendered on the server but hidden unless JS and motion are available
// (see .preloader rules in globals.css), so nothing flashes.
export default function Preloader() {
  const root = useRef<HTMLDivElement>(null);
  const word = useRef<HTMLSpanElement>(null);
  const curve = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    if (prefersReducedMotion()) {
      el.style.display = "none";
      markReady();
      return;
    }

    const tl = gsap.timeline({
      onComplete: () => {
        el.style.display = "none";
        markReady();
      },
    });
    greetings.forEach((g, i) => {
      tl.call(() => {
        if (word.current) word.current.textContent = g;
      }, [], i * 0.2);
    });
    tl.to(el, { yPercent: -100, duration: 0.9, ease: "power3.inOut" }, greetings.length * 0.2 + 0.1);
    tl.to(curve.current, { height: 0, duration: 0.9, ease: "power3.inOut" }, "<");

    const skip = () => tl.timeScale(6);
    el.addEventListener("click", skip);
    window.addEventListener("keydown", skip);
    return () => {
      el.removeEventListener("click", skip);
      window.removeEventListener("keydown", skip);
      tl.kill();
    };
  }, []);

  return (
    <div
      ref={root}
      aria-hidden="true"
      className="preloader fixed inset-0 z-(--z-preloader) grid place-items-center bg-bg"
    >
      <div className="flex items-center gap-3 text-4xl font-medium tracking-tight md:text-6xl">
        <span className="size-2.5 rounded-full bg-accent md:size-3" />
        <span ref={word} lang="en" className="min-w-[3ch]">
          {greetings[0]}
        </span>
      </div>
      <div
        ref={curve}
        className="absolute inset-x-0 top-full h-[12vh] bg-bg"
        style={{ borderRadius: "0 0 50% 50% / 0 0 100% 100%" }}
      />
    </div>
  );
}

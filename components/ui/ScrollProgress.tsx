"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/motion";

// Thin bar under the nav showing how far through the storyboard you are.
export default function ScrollProgress() {
  const bar = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion() || !bar.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        bar.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: "none",
          scrollTrigger: { start: 0, end: "max", scrub: true },
        },
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-x-0 top-16 z-(--z-nav) h-px">
      <div ref={bar} className="h-full origin-left scale-x-0 bg-accent" />
    </div>
  );
}

"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/motion";

type Props = { to: number; prefix?: string; suffix?: string; className?: string };

// Counts up when scrolled into view. The final value is always in the DOM
// for screen readers and for visitors who prefer reduced motion.
export default function CountUp({ to, prefix = "", suffix = "", className = "" }: Props) {
  const el = useRef<HTMLSpanElement>(null);
  const final = `${prefix}${to}${suffix}`;

  useEffect(() => {
    const node = el.current;
    if (!node || prefersReducedMotion()) return;
    const state = { v: 0 };
    node.textContent = `${prefix}0${suffix}`;
    const ctx = gsap.context(() => {
      gsap.to(state, {
        v: to,
        duration: 1.6,
        ease: "power2.out",
        scrollTrigger: { trigger: node, start: "top 90%", once: true },
        onUpdate: () => {
          node.textContent = `${prefix}${Math.round(state.v)}${suffix}`;
        },
      });
    });
    return () => ctx.revert();
  }, [to, prefix, suffix]);

  return (
    <span className={className}>
      <span ref={el} aria-hidden="true">
        {final}
      </span>
      <span className="sr-only">{final}</span>
    </span>
  );
}

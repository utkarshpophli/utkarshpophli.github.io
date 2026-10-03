"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { setLenis } from "@/lib/lenis";
import { prefersReducedMotion } from "@/lib/motion";

// Lenis drives the scroll position, GSAP's ticker drives Lenis, and
// ScrollTrigger reads from both so pins and scrubs stay in sync.
export default function SmoothScroll() {
  useEffect(() => {
    if (prefersReducedMotion()) return;

    const lenis = new Lenis({ lerp: 0.09, smoothWheel: true });
    setLenis(lenis);
    lenis.on("scroll", ScrollTrigger.update);

    const tick = (t: number) => lenis.raf(t * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    // Hold the page still until the preloader curtain lifts.
    if (document.documentElement.dataset.ready !== "1") lenis.stop();
    const go = () => lenis.start();
    window.addEventListener("portfolio:ready", go, { once: true });

    return () => {
      window.removeEventListener("portfolio:ready", go);
      gsap.ticker.remove(tick);
      lenis.destroy();
      setLenis(null);
    };
  }, []);

  return null;
}

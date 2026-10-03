"use client";

import { useEffect, useRef } from "react";
import { isMobile, prefersReducedMotion } from "@/lib/motion";
import { isReady, READY_EVENT } from "@/lib/ready";
import { sceneState } from "@/lib/sceneState";
import type { Ctx } from "./draw";
import { darkPalette, lightPalette } from "./palette";
import { scenes } from "./scenes";

// One fixed canvas behind the page, drawing Manim-style math scenes. The
// scroll position picks which scene shows and cross-fades between them.
// It is decorative (aria-hidden) and skipped for reduced-motion visitors.
export default function Stage() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const cv = ref.current;
    if (!cv || prefersReducedMotion()) return;
    const g = cv.getContext("2d");
    if (!g) return;

    const small = isMobile();
    const mouse = { x: 0.5, y: 0.5 };
    let w = 0;
    let h = 0;
    let readyAt = -1;
    let raf = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      w = window.innerWidth;
      h = window.innerHeight;
      cv.width = Math.round(w * dpr);
      cv.height = Math.round(h * dpr);
      g.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const markReady = () => {
      readyAt = performance.now() / 1000;
    };
    if (isReady()) markReady();
    else window.addEventListener(READY_EVENT, markReady, { once: true });

    const onMove = (e: PointerEvent) => {
      mouse.x = e.clientX / w;
      mouse.y = e.clientY / h;
    };

    const frame = (now: number) => {
      const t = now / 1000;
      g.clearRect(0, 0, w, h);

      const light = document.documentElement.dataset.theme === "light";
      const ctx: Ctx = {
        g,
        w,
        h,
        t,
        t0: readyAt < 0 ? 0 : t - readyAt,
        pal: light ? lightPalette : darkPalette,
        own: sceneState.own,
        active: sceneState.active,
        small,
        mouse,
      };

      const { a, b, mix } = sceneState;
      scenes.forEach((s, i) => {
        const al = (i === a ? 1 - mix : 0) + (i === b ? mix : 0);
        if (al < 0.01) return;
        g.save();
        g.globalAlpha = al * s.alpha;
        s.draw(ctx);
        g.restore();
      });

      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);

    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener(READY_EVENT, markReady);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-(--z-canvas) h-full w-full"
    />
  );
}

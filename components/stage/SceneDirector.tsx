"use client";

import { useEffect } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { sceneState } from "@/lib/sceneState";
import { prefersReducedMotion } from "@/lib/motion";
import { smooth } from "./draw";

type Beat = { id: string; scene: number };

// One beat per chapter, in page order. `scene` indexes stage/scenes.
const beats: Beat[] = [
  { id: "hero", scene: 0 },
  { id: "experience", scene: 1 },
  { id: "papertrail", scene: 2 },
  { id: "glow", scene: 7 },
  { id: "mlscratch", scene: 8 },
  { id: "work", scene: 3 },
  { id: "journey", scene: 4 },
  { id: "skills", scene: 5 },
  { id: "credentials", scene: 9 },
  { id: "contact", scene: 6 },
];

type Seg = { start: number; end: number };

// Scene state is a pure function of scroll position: each chapter owns a
// segment (its top entering the viewport until it sits near the top), across
// which the previous scene cross-fades into this one. Computing it this way,
// instead of chaining tweens, keeps it correct on reload mid-page and when
// scrolling backwards.
function apply(y: number, segs: Seg[], max: number) {
  let k = -1;
  for (let i = 0; i < segs.length; i++) if (y >= segs[i].start) k = i;

  if (k < 0) {
    sceneState.a = sceneState.b = beats[0].scene;
    sceneState.mix = 0;
  } else {
    const t = Math.min(1, Math.max(0, (y - segs[k].start) / Math.max(1, segs[k].end - segs[k].start)));
    sceneState.a = beats[k].scene;
    sceneState.b = beats[k + 1].scene;
    sceneState.mix = smooth(t);
  }

  // Progress through each chapter, used by scenes that react to scrolling.
  for (let i = 0; i < beats.length; i++) {
    const lo = i === 0 ? 0 : segs[i - 1].end;
    const hi = i === beats.length - 1 ? max : segs[i].start;
    sceneState.own[i] = Math.min(1, Math.max(0, (y - lo) / Math.max(1, hi - lo)));
  }
}

export default function SceneDirector() {
  useEffect(() => {
    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      // Animation-less triggers, used only so GSAP computes start/end
      // positions with every pin and its spacing already accounted for.
      const segs = beats.slice(1).map((b) =>
        ScrollTrigger.create({ trigger: `#${b.id}`, start: "top bottom", end: "top 25%" }),
      );
      const bounds = (): Seg[] => segs.map((s) => ({ start: s.start, end: s.end }));

      let cache = bounds();
      ScrollTrigger.create({
        start: 0,
        end: "max",
        onUpdate: (self) => apply(self.scroll(), cache, ScrollTrigger.maxScroll(window)),
        onRefresh: (self) => {
          cache = bounds();
          apply(self.scroll(), cache, ScrollTrigger.maxScroll(window));
        },
      });
    });

    // Chapters swap layouts after hydration and images load late, which moves
    // every pin. Re-measure a few times, and whenever the page height changes.
    const refresh = () => ScrollTrigger.refresh();
    const raf = requestAnimationFrame(() => requestAnimationFrame(refresh));
    const settle = [150, 500, 1200, 2800].map((ms) => window.setTimeout(refresh, ms));
    window.addEventListener("load", refresh);

    let lastHeight = document.documentElement.scrollHeight;
    let timer = 0;
    const ro = new ResizeObserver(() => {
      window.clearTimeout(timer);
      timer = window.setTimeout(() => {
        if (Math.abs(document.documentElement.scrollHeight - lastHeight) > 2) refresh();
        lastHeight = document.documentElement.scrollHeight;
      }, 200);
    });
    ro.observe(document.body);

    return () => {
      cancelAnimationFrame(raf);
      settle.forEach((id) => window.clearTimeout(id));
      window.clearTimeout(timer);
      window.removeEventListener("load", refresh);
      ro.disconnect();
      ctx.revert();
    };
  }, []);

  return null;
}

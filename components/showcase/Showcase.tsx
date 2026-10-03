"use client";

import { useEffect } from "react";
import { ScrollTrigger } from "@/lib/gsap";
import { useDesktopMotion } from "@/lib/useDesktopMotion";
import type { Showcase as ShowcaseData } from "@/content/showcases";
import ShowcaseList from "./ShowcaseList";
import ShowcasePinned from "./ShowcasePinned";

// order: refresh priority, higher = measured first (page order, top to bottom).
export default function Showcase({ data, order }: { data: ShowcaseData; order: number }) {
  const pinned = useDesktopMotion();

  // The two layouts have very different heights, so re-measure on switch.
  useEffect(() => {
    const raf = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => cancelAnimationFrame(raf);
  }, [pinned]);

  return (
    <section id={data.id} className="relative z-(--z-content)">
      {pinned ? <ShowcasePinned data={data} order={order} /> : <ShowcaseList data={data} />}
    </section>
  );
}

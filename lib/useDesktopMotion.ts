"use client";

import { useEffect, useState } from "react";

// True on desktop widths when the visitor allows motion. Starts false so the
// server and first client render both use the simple stacked layout.
export function useDesktopMotion() {
  const [on, setOn] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px) and (prefers-reduced-motion: no-preference)");
    const sync = () => setOn(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);
  return on;
}

"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { getLenis } from "@/lib/lenis";
import { sceneState } from "@/lib/sceneState";
import { skillGroups } from "@/content/skills";
import Words from "@/components/ui/Words";

const SCROLL_PER_GROUP = 0.7; // viewport heights of scroll per category

// Desktop: the console pins, a rail on the left lists the six categories and
// scrolling walks through them while the particle scene lights up the same
// category. Mobile and reduced motion: all six groups simply stack.
export default function Skills() {
  const root = useRef<HTMLElement>(null);
  const pin = useRef<ScrollTrigger | null>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const el = root.current;
    if (!el) return;

    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.from(el.querySelectorAll("h2 [data-word]"), {
        yPercent: 110,
        duration: 0.9,
        stagger: 0.07,
        ease: "power3.out",
        scrollTrigger: { trigger: el.querySelector("h2"), start: "top 85%", once: true },
      });
    });

    mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
      const n = skillGroups.length;
      const pick = (i: number) => {
        setActive(i);
        sceneState.active = i;
      };
      let last = -1;
      const st = ScrollTrigger.create({
        trigger: el.querySelector("[data-pin]"),
        start: "top top",
        end: () => `+=${window.innerHeight * SCROLL_PER_GROUP * n}`,
        pin: true,
        refreshPriority: 1,
        invalidateOnRefresh: true,
        onEnter: () => pick(0),
        onEnterBack: () => pick(n - 1),
        onLeave: () => (sceneState.active = -1),
        onLeaveBack: () => (sceneState.active = -1),
        onUpdate: (self) => {
          const i = Math.min(n - 1, Math.floor(self.progress * n));
          if (i !== last) {
            last = i;
            pick(i);
          }
        },
      });
      pin.current = st;
      return () => {
        pin.current = null;
        sceneState.active = -1;
      };
    });

    return () => {
      sceneState.active = -1;
      mm.revert();
    };
  }, []);

  // Rail click: scroll to that category's slice of the pinned range.
  const jump = (i: number) => {
    const st = pin.current;
    if (!st) return setActive(i);
    const target = st.start + ((i + 0.5) / skillGroups.length) * (st.end - st.start);
    const lenis = getLenis();
    if (lenis) lenis.scrollTo(target, { duration: 1.2 });
    else window.scrollTo({ top: target, behavior: "smooth" });
  };

  return (
    <section id="skills" ref={root} className="relative z-(--z-content)">
      <div
        data-pin
        className="mx-auto max-w-[1400px] px-4 py-24 md:flex md:h-[100dvh] md:flex-col md:justify-center md:px-8 md:py-0 md:pt-20"
      >
        <h2 className="max-w-[18ch] text-[clamp(2.2rem,4.6vw,4.2rem)] font-medium leading-[1] tracking-tighter">
          <Words text="What I build with" />
        </h2>

        <div className="mt-10 grid gap-10 md:mt-14 md:grid-cols-12 md:gap-14">
          <ul className="skills-rail hidden md:col-span-4 md:flex md:flex-col md:gap-1" aria-label="Skill categories">
            {skillGroups.map((g, i) => (
              <li key={g.id}>
                <button
                  type="button"
                  onClick={() => jump(i)}
                  aria-current={active === i}
                  style={{ "--hue": g.hue } as React.CSSProperties}
                  className={`w-full py-2.5 text-left text-2xl font-medium tracking-tight transition-[color,transform] duration-300 ${
                    active === i ? "skill-rail-on translate-x-2" : "text-muted hover:text-fg"
                  }`}
                >
                  {g.label}
                </button>
              </li>
            ))}
          </ul>

          <div className="relative flex flex-col gap-14 md:col-span-8 md:block md:min-h-[46dvh]">
            {skillGroups.map((g, i) => (
              <div
                key={g.id}
                className="skills-panel"
                data-active={active === i}
                style={{ "--hue": g.hue } as React.CSSProperties}
              >
                <h3 className="text-2xl font-medium tracking-tight md:sr-only">{g.label}</h3>
                <p className="mt-2 max-w-[48ch] text-base text-muted md:mt-0 md:text-lg">{g.blurb}</p>
                <ul className="mt-6 flex flex-wrap gap-2.5">
                  {g.skills.map((s) => (
                    <li
                      key={s.name}
                      className="skill-chip flex items-center gap-2.5 rounded-full border px-4 py-2 text-sm backdrop-blur-sm"
                    >
                      <span>{s.name}</span>
                      {s.used && <span className="skill-used pl-2.5 font-mono text-xs">{s.used}</span>}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

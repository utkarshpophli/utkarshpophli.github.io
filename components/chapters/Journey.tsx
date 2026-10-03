"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { journey } from "@/content/journey";
import Words from "@/components/ui/Words";

// Left: a sticky list of earlier stops. Right: photos drifting at different
// speeds. The stop in view is highlighted, so the two columns read together.
export default function Journey() {
  const root = useRef<HTMLElement>(null);

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

      // Photos: each drifts at its own speed for depth.
      gsap.utils.toArray<HTMLElement>("[data-drift]").forEach((img) => {
        const speed = Number(img.dataset.drift);
        gsap.fromTo(
          img,
          { yPercent: speed * 12 },
          {
            yPercent: speed * -12,
            ease: "none",
            scrollTrigger: { trigger: img, start: "top bottom", end: "bottom top", scrub: true },
          },
        );
      });
    });

    mm.add("(min-width: 768px)", () => {
      // Highlight the stop whose photos are centred.
      journey.forEach((s) => {
        const group = el.querySelector(`[data-group="${s.id}"]`);
        const item = el.querySelector(`[data-item="${s.id}"]`);
        if (!group || !item) return;
        gsap.timeline({
          scrollTrigger: {
            trigger: group,
            start: "top 55%",
            end: "bottom 55%",
            onToggle: (self) => item.setAttribute("data-active", String(self.isActive)),
          },
        });
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <section id="journey" ref={root} className="relative z-(--z-content) px-4 py-28 md:px-8 md:py-40">
      <div className="mx-auto max-w-[1400px]">
        <h2 className="max-w-[18ch] text-[clamp(2.4rem,5.5vw,5rem)] font-medium leading-[1] tracking-tighter">
          <Words text="Where it started" />
        </h2>

        <div className="mt-14 grid gap-12 md:mt-24 md:grid-cols-12 md:gap-16">
          <ol className="flex flex-col gap-10 md:sticky md:top-32 md:col-span-5 md:self-start">
            {journey.map((s) => (
              <li
                key={s.id}
                data-item={s.id}
                data-active={s.id === journey[0].id ? "true" : "false"}
                className="group transition-opacity duration-500 md:data-[active=false]:opacity-35"
              >
                <p className="font-mono text-xs text-muted">{s.period}</p>
                <h3 className="mt-2 text-2xl font-medium tracking-tight md:text-3xl">{s.org}</h3>
                <p className="mt-1 text-fg">{s.role}</p>
                <p className="mt-3 max-w-[44ch] text-sm leading-relaxed text-muted">{s.body}</p>
              </li>
            ))}
          </ol>

          <div className="flex flex-col gap-20 md:col-span-7 md:gap-[28vh] md:pt-10">
            {journey.map((s) => (
              <div key={s.id} data-group={s.id} className="relative grid grid-cols-12 items-start gap-4">
                {s.imgs.map((im, i) => (
                  <div
                    key={im.src}
                    className={`overflow-hidden border border-line bg-bg2 ${
                      i === 0
                        ? "col-span-12 md:col-span-9"
                        : "col-span-8 col-start-5 -mt-10 md:col-span-6 md:col-start-7 md:-mt-24"
                    }`}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      data-drift={i === 0 ? 1 : 2.2}
                      src={im.src}
                      alt={im.alt}
                      width={im.w}
                      height={im.h}
                      loading="lazy"
                      className="aspect-[4/3] w-full scale-[1.18] object-cover"
                    />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import { Fragment, useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { experience, type Role } from "@/content/experience";
import CountUp from "@/components/ui/CountUp";
import MetricViz from "@/components/ui/MetricViz";
import Words from "@/components/ui/Words";

// Numbers inside a sentence get picked out so the eye lands on the results.
function Rich({ text }: { text: string }) {
  return (
    <>
      {text.split(/(\d+%)/).map((part, i) =>
        /\d+%/.test(part) ? (
          <b key={i} className="font-semibold text-fg">
            {part}
          </b>
        ) : (
          <Fragment key={i}>{part}</Fragment>
        ),
      )}
    </>
  );
}

function RoleCard({ r }: { r: Role }) {
  const [hero, ...rest] = r.metrics;
  const odd = r.bullets.length % 2 === 1;

  // The card glow follows the pointer.
  const track = (e: React.PointerEvent<HTMLElement>) => {
    const box = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - box.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - box.top}px`);
  };

  return (
    <article
      data-panel
      onPointerMove={track}
      style={{ "--hue": r.hue } as React.CSSProperties}
      className="role-card mx-auto flex w-full max-w-[1280px] flex-col gap-4 p-4 md:min-h-[min(700px,82dvh)] md:p-6"
    >
      <header className="flex flex-wrap items-center justify-between gap-4 px-2 py-1">
        <div className="flex items-center gap-4">
          <span className="role-mark grid size-14 place-items-center rounded-full font-mono text-sm font-semibold">
            {r.initials}
          </span>
          <div>
            <h3 className="text-2xl font-medium tracking-tight md:text-3xl">{r.company}</h3>
            <p className="text-muted">{r.role}</p>
          </div>
        </div>
        <p className="rounded-full border border-line px-4 py-2 font-mono text-xs text-muted">
          {r.place}, {r.period}
        </p>
      </header>

      <div className="grid flex-1 gap-4 md:grid-cols-12">
        <div className="grid gap-4 md:col-span-5 md:grid-rows-[1.35fr_1fr]">
          <div className="role-tile flex flex-col justify-between gap-6 p-6">
            <div>
              <CountUp
                to={hero.to}
                prefix={hero.prefix}
                suffix={hero.suffix}
                className="role-num block text-7xl font-medium leading-none tracking-tighter md:text-8xl"
              />
              <p className="mt-3 max-w-[22ch] text-muted">{hero.label}</p>
            </div>
            <MetricViz m={hero} id={`${r.id}-0`} />
          </div>

          <div className="grid grid-cols-2 gap-4">
            {rest.map((m, i) => (
              <div key={m.label} className="role-tile flex flex-col justify-between gap-4 p-5">
                <div>
                  <CountUp
                    to={m.to}
                    prefix={m.prefix}
                    suffix={m.suffix}
                    className="role-num block text-4xl font-medium leading-none tracking-tighter md:text-5xl"
                  />
                  <p className="mt-2 text-sm leading-snug text-muted">{m.label}</p>
                </div>
                <MetricViz m={m} id={`${r.id}-${i + 1}`} />
              </div>
            ))}
          </div>
        </div>

        <ul
          className={`grid gap-4 md:col-span-7 md:grid-cols-2 ${
            odd ? "md:grid-rows-[auto_1fr]" : "md:auto-rows-fr"
          }`}
        >
          {r.bullets.map((b, i) => (
            <li
              key={b}
              className={`role-tile p-6 leading-relaxed ${
                odd && i === 0 ? "text-lg text-fg md:col-span-2" : "text-base text-muted"
              }`}
            >
              <Rich text={b} />
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}

export default function Experience() {
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

      // Charts draw themselves when their card scrolls into view.
      el.querySelectorAll<SVGElement>("[data-draw]").forEach((node) => {
        gsap.fromTo(
          node,
          { attr: { "stroke-dasharray": "0 100" } },
          {
            attr: { "stroke-dasharray": node.getAttribute("data-final") ?? "100 100" },
            duration: 1.3,
            ease: "power2.out",
            scrollTrigger: { trigger: node, start: "top 90%", once: true },
          },
        );
      });
    });

    // Sticky stack: each card recedes as the next one arrives (desktop only).
    mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
      const cards = gsap.utils.toArray<HTMLElement>(el.querySelectorAll("[data-stack]"));
      cards.forEach((card, i) => {
        if (i === cards.length - 1) return;
        gsap.to(card.querySelector("[data-panel]"), {
          scale: 0.93,
          ease: "none",
          scrollTrigger: {
            trigger: cards[i + 1],
            start: "top bottom",
            end: "top top",
            scrub: true,
          },
        });
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <section id="experience" ref={root} className="relative z-(--z-content)">
      <div className="mx-auto max-w-[1400px] px-4 pb-10 pt-28 md:px-8 md:pb-16 md:pt-40">
        <h2 className="max-w-[16ch] text-[clamp(2.4rem,6vw,5.5rem)] font-medium leading-[0.98] tracking-tighter">
          <Words text="Agents and RAG, shipped to production" />
        </h2>
      </div>

      {experience.map((r) => (
        <div
          key={r.id}
          data-stack
          className="px-4 py-6 md:sticky md:top-0 md:flex md:min-h-[100dvh] md:items-center md:px-8 md:py-0"
        >
          <RoleCard r={r} />
        </div>
      ))}
    </section>
  );
}

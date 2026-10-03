"use client";

import { useEffect, useRef } from "react";
import { ArrowUpRight } from "@phosphor-icons/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useDesktopMotion } from "@/lib/useDesktopMotion";
import { projects, type Project } from "@/content/projects";
import Words from "@/components/ui/Words";

function Card({ p, wide }: { p: Project; wide: boolean }) {
  return (
    <a
      href={p.href}
      target="_blank"
      rel="noopener noreferrer"
      data-card
      className={`group flex flex-col border border-line bg-bg2 transition-colors hover:border-fg ${
        wide ? "w-[min(78vw,520px)] shrink-0" : "w-full"
      }`}
    >
      <div className="relative h-[34dvh] min-h-56 overflow-hidden bg-bg md:h-[36dvh]">
        {p.img ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={p.img.src}
            alt={p.img.alt}
            width={p.img.w}
            height={p.img.h}
            loading="lazy"
            className={`h-full w-full transition-transform duration-700 group-hover:scale-105 ${
              p.id === "mlscratch" ? "object-contain p-12" : "object-cover"
            }`}
          />
        ) : (
          <div className="grid h-full place-items-center">
            <span className="text-[clamp(3rem,7vw,5.5rem)] font-medium leading-none tracking-tighter text-accent">
              {p.big}
            </span>
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-4 p-6">
        <div className="flex items-start justify-between gap-4">
          <h3 className="text-2xl font-medium tracking-tight">{p.title}</h3>
          <ArrowUpRight
            size={22}
            className="mt-1 shrink-0 text-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
          />
        </div>
        <p className="text-sm leading-relaxed text-muted">{p.blurb}</p>
        <ul className="mt-auto flex flex-wrap gap-2 pt-2">
          {p.tags.map((t) => (
            <li key={t} className="rounded-full border border-line px-3 py-1 font-mono text-xs text-muted">
              {t}
            </li>
          ))}
        </ul>
      </div>
    </a>
  );
}

export default function Work() {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const pinned = useDesktopMotion();

  useEffect(() => {
    const el = root.current;
    const tr = track.current;
    if (!el || !tr) return;

    const ctx = gsap.context(() => {
      gsap.from(el.querySelectorAll("h2 [data-word]"), {
        yPercent: 110,
        duration: 0.9,
        stagger: 0.07,
        ease: "power3.out",
        scrollTrigger: { trigger: el.querySelector("h2"), start: "top 85%", once: true },
      });
    }, el);

    if (!pinned) return () => ctx.revert();

    // Horizontal pan: the section pins and vertical scroll slides the track.
    const pan = gsap.context(() => {
      const distance = () => Math.max(0, tr.scrollWidth - window.innerWidth);
      const move = gsap.to(tr, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: el.querySelector("[data-pin]"),
          start: "top top",
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 1,
          refreshPriority: 2,
          invalidateOnRefresh: true,
        },
      });
      // Each card swings in from a slight Y rotation as it enters from the right.
      gsap.utils.toArray<HTMLElement>("[data-card]").forEach((card) => {
        gsap.fromTo(
          card,
          { rotateY: -22, opacity: 0.4, transformPerspective: 1200 },
          {
            rotateY: 0,
            opacity: 1,
            ease: "none",
            scrollTrigger: {
              trigger: card,
              containerAnimation: move,
              start: "left 98%",
              end: "left 62%",
              scrub: true,
            },
          },
        );
      });
    }, el);

    const raf = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => {
      cancelAnimationFrame(raf);
      pan.revert();
      ctx.revert();
    };
  }, [pinned]);

  return (
    <section id="work" ref={root} className="relative z-(--z-content)">
      <div
        data-pin
        className={pinned ? "flex h-[100dvh] items-center overflow-clip pt-16" : "px-4 py-24 md:px-8"}
      >
        <div
          ref={track}
          className={
            pinned
              ? "flex items-stretch gap-6 px-8 will-change-transform"
              : "mx-auto grid max-w-[1400px] gap-6 md:grid-cols-2"
          }
        >
          <div
            className={`flex flex-col justify-center ${
              pinned ? "w-[min(80vw,460px)] shrink-0 pr-8" : "md:col-span-2 pb-6"
            }`}
          >
            <h2 className="text-[clamp(2.4rem,5vw,4.6rem)] font-medium leading-[1] tracking-tighter">
              <Words text="Models, agents and builds from scratch" />
            </h2>
            <p className="mt-5 max-w-[34ch] text-base leading-relaxed text-muted">
              More builds, each with its code on GitHub.
            </p>
          </div>
          {projects.map((p) => (
            <Card key={p.id} p={p} wide={pinned} />
          ))}
        </div>
      </div>
    </section>
  );
}

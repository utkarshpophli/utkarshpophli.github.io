"use client";

import { useEffect, useRef } from "react";
import { ArrowRight } from "@phosphor-icons/react";
import { gsap } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/motion";
import { whenReady } from "@/lib/ready";
import { scrollToId } from "@/lib/lenis";
import { profile } from "@/content/profile";
import ButtonLink from "@/components/ui/ButtonLink";
import Words from "@/components/ui/Words";

export default function Hero() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const reduce = prefersReducedMotion();

    const ctx = gsap.context(() => {
      const q = gsap.utils.selector(el);

      // Scroll exit: the name drifts sideways, the portrait lags behind.
      if (!reduce) {
        gsap.to(q("[data-name]"), {
          xPercent: -14,
          ease: "none",
          scrollTrigger: { trigger: el, start: "top top", end: "bottom top", scrub: true },
        });
        gsap.to(q("[data-photo-img]"), {
          yPercent: -6,
          ease: "none",
          scrollTrigger: { trigger: el, start: "top top", end: "bottom top", scrub: true },
        });
      }
    }, el);

    // Entrance plays once the preloader curtain has lifted.
    const stop = whenReady(() => {
      if (reduce) return;
      const nav = document.querySelector("[data-nav]");
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.fromTo(
        el.querySelector("[data-photo]"),
        { clipPath: "inset(100% 0% 0% 0%)" },
        { clipPath: "inset(0% 0% 0% 0%)", duration: 1.2 },
        0,
      )
        .fromTo(el.querySelector("[data-photo-img]"), { scale: 1.32 }, { scale: 1.14, duration: 1.6 }, 0)
        .fromTo(
          el.querySelectorAll("h1 [data-word]"),
          { yPercent: 110, opacity: 1 },
          { yPercent: 0, opacity: 1, duration: 1, stagger: 0.1 },
          0.2,
        )
        .fromTo(
          el.querySelectorAll("[data-in]"),
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.8, stagger: 0.1 },
          0.5,
        );
      if (nav) tl.fromTo(nav, { opacity: 0 }, { opacity: 1, duration: 0.8 }, 0.6);
    });

    return () => {
      stop();
      ctx.revert();
    };
  }, []);

  return (
    <section
      id="hero"
      ref={root}
      className="relative flex min-h-[100dvh] flex-col overflow-clip pt-20"
    >
      <div className="mx-auto grid w-full max-w-[1400px] flex-1 gap-8 px-4 md:grid-cols-12 md:gap-10 md:px-8">
        <div className="order-2 flex flex-col justify-end gap-6 pb-4 md:order-1 md:col-span-5 md:justify-center md:pb-10">
          <p
            data-in
            className="w-fit rounded-full border border-line px-4 py-2 font-mono text-xs text-muted"
          >
            {profile.status}
          </p>
          <p data-in className="max-w-[34ch] text-xl leading-snug text-fg md:text-2xl">
            {profile.tagline}
          </p>
          <div data-in className="flex flex-wrap gap-3">
            <ButtonLink href={`mailto:${profile.email}`}>Email me</ButtonLink>
            <ButtonLink
              href="#work"
              variant="ghost"
              onClick={(e) => {
                e.preventDefault();
                scrollToId("work");
              }}
            >
              See work <ArrowRight size={16} />
            </ButtonLink>
          </div>
        </div>

        <div className="order-1 grid place-items-center md:order-2 md:col-span-7">
          <div
            data-photo
            className="relative aspect-square w-[min(72vw,44dvh)] overflow-hidden rounded-full bg-bg2 ring-1 ring-line ring-offset-[10px] ring-offset-bg md:w-[min(58dvh,34vw)]"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              data-photo-img
              src="/img/profile.webp"
              alt="Utkarsh Pophli smiling in an orange kurta on a boat on the Ganges at Varanasi"
              width={2000}
              height={1273}
              fetchPriority="high"
              className="absolute inset-0 h-full w-full scale-[1.14] object-cover"
              style={{ objectPosition: "46% 50%" }}
            />
          </div>
        </div>
      </div>

      <h1
        data-hero
        data-name
        className="mt-6 whitespace-nowrap px-4 text-[clamp(3.4rem,12.4vw,15rem)] font-medium leading-[0.86] tracking-tighter md:px-8"
      >
        <Words text={profile.name} />
      </h1>
    </section>
  );
}

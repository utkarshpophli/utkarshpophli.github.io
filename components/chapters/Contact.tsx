"use client";

import { useEffect, useRef } from "react";
import { ArrowUp, DownloadSimple, GithubLogo, LinkedinLogo } from "@phosphor-icons/react";
import { gsap } from "@/lib/gsap";
import { scrollToId } from "@/lib/lenis";
import { profile } from "@/content/profile";
import ButtonLink from "@/components/ui/ButtonLink";
import Words from "@/components/ui/Words";

export default function Contact() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;

    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.from(el.querySelectorAll("h2 [data-word]"), {
        yPercent: 110,
        duration: 1,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: { trigger: el.querySelector("h2"), start: "top 85%", once: true },
      });
      // Photos unveil from the bottom and drift slightly as you scroll.
      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((box) => {
        gsap.fromTo(
          box,
          { clipPath: "inset(100% 0% 0% 0%)" },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            duration: 1.3,
            ease: "power3.out",
            scrollTrigger: { trigger: box, start: "top 85%", once: true },
          },
        );
        gsap.fromTo(
          box.querySelector("img"),
          { yPercent: -8 },
          {
            yPercent: 8,
            ease: "none",
            scrollTrigger: { trigger: box, start: "top bottom", end: "bottom top", scrub: true },
          },
        );
      });
    });
    return () => mm.revert();
  }, []);

  return (
    <section id="contact" ref={root} className="relative z-(--z-content) px-4 pt-28 md:px-8 md:pt-40">
      <div className="mx-auto grid max-w-[1400px] gap-14 md:grid-cols-12 md:gap-16">
        <div className="md:col-span-7">
          <h2 className="text-[clamp(2.8rem,8vw,8rem)] font-medium leading-[0.95] tracking-tighter">
            <Words text="Open to AI engineering roles" />
          </h2>
          <p className="mt-8 max-w-[56ch] text-base leading-relaxed text-muted md:text-lg">
            {profile.about}
          </p>

          <div className="mt-10 flex flex-wrap gap-3">
            <ButtonLink href={`mailto:${profile.email}`}>Email me</ButtonLink>
            <ButtonLink href={profile.links.linkedin} external variant="ghost">
              <LinkedinLogo size={18} /> LinkedIn
            </ButtonLink>
            <ButtonLink href={profile.links.github} external variant="ghost">
              <GithubLogo size={18} /> GitHub
            </ButtonLink>
            <ButtonLink href={profile.links.resume} download variant="ghost">
              <DownloadSimple size={18} /> Resume
            </ButtonLink>
          </div>
          <p className="mt-6 font-mono text-sm text-muted">{profile.email}</p>
        </div>

        <div className="relative grid grid-cols-12 items-start gap-4 md:col-span-5">
          <div data-reveal className="col-span-7 overflow-hidden bg-bg2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/img/formal.webp"
              alt="Utkarsh Pophli in a dark suit in a flower-lit archway"
              width={629}
              height={893}
              loading="lazy"
              className="aspect-[3/4] w-full scale-[1.18] object-cover"
            />
          </div>
          <div data-reveal className="col-span-5 mt-16 overflow-hidden bg-bg2 md:mt-28">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/img/casual.webp"
              alt="Utkarsh Pophli in a printed shirt standing in a park"
              width={720}
              height={720}
              loading="lazy"
              className="aspect-[3/4] w-full scale-[1.18] object-cover"
            />
          </div>
        </div>
      </div>

      <footer className="mx-auto mt-24 flex max-w-[1400px] items-center justify-between border-t border-line py-8 text-sm text-muted">
        <p>© 2026 {profile.name}</p>
        <button
          type="button"
          onClick={() => scrollToId("hero")}
          className="flex items-center gap-2 transition-colors hover:text-fg"
        >
          Back to top <ArrowUp size={16} />
        </button>
      </footer>
    </section>
  );
}

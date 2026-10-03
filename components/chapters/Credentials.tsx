"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { certs } from "@/content/certs";
import Words from "@/components/ui/Words";

// Certificates flip in on their Y axis as they scroll into view.
export default function Credentials() {
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
      gsap.from(el.querySelectorAll("[data-cert]"), {
        rotateY: -70,
        opacity: 0,
        transformPerspective: 1000,
        transformOrigin: "left center",
        duration: 1.1,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: { trigger: el.querySelector("[data-certs]"), start: "top 80%", once: true },
      });
    });
    return () => mm.revert();
  }, []);

  const [featured, ...rest] = certs;

  return (
    <section id="credentials" ref={root} className="relative z-(--z-content) px-4 py-28 md:px-8 md:py-40">
      <div className="mx-auto max-w-[1400px]">
        <h2 className="max-w-[16ch] text-[clamp(2.2rem,4.6vw,4.2rem)] font-medium leading-[1] tracking-tighter">
          <Words text="Certifications" />
        </h2>

        <div data-certs className="mt-12 grid gap-4 md:mt-16 md:grid-cols-12">
          <div
            data-cert
            className="flex min-h-72 flex-col justify-between border border-accent bg-bg2 p-8 md:col-span-6 md:p-12"
          >
            <p className="font-mono text-sm text-accent">{featured.issuer}</p>
            <h3 className="text-4xl font-medium leading-[1.05] tracking-tighter md:text-6xl">
              {featured.title}
            </h3>
          </div>

          <div className="grid gap-4 md:col-span-6">
            {rest.map((c) => (
              <div key={c.id} data-cert className="flex flex-col justify-center border border-line bg-bg2 p-6 md:p-8">
                <h3 className="text-xl font-medium tracking-tight md:text-2xl">{c.title}</h3>
                <p className="mt-1 text-sm text-muted">{c.issuer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

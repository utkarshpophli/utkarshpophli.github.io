"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import type { Showcase } from "@/content/showcases";
import { Intro, Meta } from "./ShowcaseParts";

// Desktop: the section pins and scroll drives the project through its views.
// The device tilts up and zooms in first, then each scroll step swaps the view
// and the last step plays the film.
export default function ShowcasePinned({ data, order }: { data: Showcase; order: number }) {
  const root = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const caps = [...data.frames, data.videoCaption];

  useEffect(() => {
    const el = root.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const frames = gsap.utils.toArray<HTMLElement>("[data-frame]");
      const texts = gsap.utils.toArray<HTMLElement>("[data-cap]");
      const step = 0.9;
      const intro = 1;
      // The last frame (the video) finishes fading in at this time.
      const videoAt = intro + step * (frames.length - 2) + 0.7;
      const total = videoAt + 0.6;

      gsap.set(frames.slice(1), { opacity: 0 });
      gsap.set(texts.slice(1), { opacity: 0, y: 18 });

      // Play the film once scroll reaches the last step. Driven by scroll
      // progress, not the eased timeline time, so it starts the moment you get there.
      const syncVideo = (progress: number) => {
        const v = video.current;
        if (!v) return;
        if (progress * tl.duration() >= videoAt - 0.05) {
          if (v.paused) v.play().catch(() => {});
        } else if (!v.paused) v.pause();
      };
      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: el,
          start: "top top",
          end: () => `+=${window.innerHeight * 5}`,
          pin: true,
          scrub: 0.6,
          refreshPriority: order, // pins must measure in page order, top first
          invalidateOnRefresh: true,
          onUpdate: (self) => syncVideo(self.isActive ? self.progress : 0),
          onLeave: () => video.current?.pause(),
          onLeaveBack: () => video.current?.pause(),
        },
      });

      tl.fromTo(
        "[data-device]",
        { scale: 0.55, rotateX: 24, y: 90, opacity: 0.35 },
        { scale: 1, rotateX: 0, y: 0, opacity: 1, duration: intro },
        0,
      );

      for (let i = 1; i < frames.length; i++) {
        const at = intro + step * (i - 1) + 0.3;
        tl.to(frames[i], { opacity: 1, duration: 0.4 }, at);
        tl.to(texts[i - 1], { opacity: 0, y: -18, duration: 0.3 }, at);
        tl.to(texts[i], { opacity: 1, y: 0, duration: 0.4 }, at + 0.1);
      }
      tl.to({}, { duration: 0.5 }, total - 0.5);
    }, el);

    return () => ctx.revert();
  }, [order]);

  return (
    <div ref={root} className="relative h-[100dvh] overflow-clip">
      <div className="mx-auto grid h-full max-w-[1400px] grid-cols-12 items-center gap-10 px-8 pt-16">
        <div className="col-span-4 flex flex-col gap-8">
          <div>
            <Intro data={data} />
          </div>
          <div className="relative min-h-36">
            {caps.map((c) => (
              <div key={c.title} data-cap className="absolute inset-0">
                <h3 className="text-xl font-medium tracking-tight">{c.title}</h3>
                <p className="mt-2 max-w-[40ch] text-sm leading-relaxed text-muted">{c.body}</p>
              </div>
            ))}
          </div>
          <Meta data={data} compact />
        </div>

        <div className="col-span-8" style={{ perspective: "1400px" }}>
          <div
            data-device
            style={{ aspectRatio: data.aspect }}
            className="relative w-full overflow-hidden border border-line bg-bg2 shadow-[0_40px_120px_-40px_rgb(0_0_0/0.6)]"
          >
            {data.frames.map((f, i) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={f.src}
                data-frame
                src={f.src}
                alt={f.alt}
                width={data.frameSize.w}
                height={data.frameSize.h}
                loading={i === 0 ? "eager" : "lazy"}
                className="absolute inset-0 h-full w-full object-cover"
              />
            ))}
            <video
              ref={video}
              data-frame
              muted
              loop
              playsInline
              preload="none"
              poster={data.video.poster}
              aria-label={data.video.label}
              className="absolute inset-0 h-full w-full object-cover"
            >
              <source src={data.video.src} type="video/mp4" />
            </video>
          </div>
        </div>
      </div>
    </div>
  );
}

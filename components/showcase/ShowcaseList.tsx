import type { Showcase } from "@/content/showcases";
import { Intro, Meta } from "./ShowcaseParts";

// Mobile, no-JS and reduced-motion layout: the same story, no pinning.
export default function ShowcaseList({ data }: { data: Showcase }) {
  return (
    <div className="mx-auto max-w-[1400px] px-4 py-24 md:px-8">
      <Intro data={data} />

      <video
        controls
        muted
        playsInline
        preload="none"
        poster={data.video.poster}
        aria-label={data.video.label}
        style={{ aspectRatio: "16 / 9" }}
        className="mt-10 w-full border border-line bg-bg2 object-cover"
      >
        <source src={data.video.src} type="video/mp4" />
      </video>

      <div className="mt-12 grid gap-10 md:grid-cols-2">
        {data.frames.map((f) => (
          <figure key={f.src}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={f.src}
              alt={f.alt}
              width={data.frameSize.w}
              height={data.frameSize.h}
              loading="lazy"
              style={{ aspectRatio: data.aspect }}
              className="w-full border border-line object-cover"
            />
            <figcaption className="mt-4">
              <h3 className="text-lg font-medium tracking-tight">{f.title}</h3>
              <p className="mt-1 max-w-[52ch] text-sm leading-relaxed text-muted">{f.body}</p>
            </figcaption>
          </figure>
        ))}
      </div>

      <div className="mt-12">
        <Meta data={data} />
      </div>
    </div>
  );
}

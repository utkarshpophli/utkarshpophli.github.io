import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import type { Showcase } from "@/content/showcases";
import ButtonLink from "@/components/ui/ButtonLink";
import Words from "@/components/ui/Words";

export function Intro({ data }: { data: Showcase }) {
  return (
    <>
      <h2 className="text-[clamp(2.2rem,4.6vw,4.2rem)] font-medium leading-[1] tracking-tighter">
        <Words text={data.headline} />
      </h2>
      <p className="mt-5 max-w-[46ch] text-base leading-relaxed text-muted">{data.summary}</p>
    </>
  );
}

// compact: the pinned desktop view keeps only what fits calmly beside the demo.
export function Meta({ data, compact = false }: { data: Showcase; compact?: boolean }) {
  const stack = compact ? data.stack.slice(0, 4) : data.stack;
  return (
    <div className="flex flex-col gap-5">
      <ul className="flex flex-wrap gap-2" aria-label="Built with">
        {stack.map((s) => (
          <li key={s} className="rounded-full border border-line px-3 py-1.5 font-mono text-xs text-muted">
            {s}
          </li>
        ))}
      </ul>
      {!compact && data.note && (
        <p className="max-w-[46ch] text-sm leading-relaxed text-muted">{data.note}</p>
      )}
      <div className="flex flex-wrap gap-3">
        {data.links.map((l) => (
          <ButtonLink key={l.href} href={l.href} external variant="ghost">
            {l.label} <ArrowUpRight size={16} />
          </ButtonLink>
        ))}
      </div>
    </div>
  );
}

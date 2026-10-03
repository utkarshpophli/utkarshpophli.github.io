import type { Metric } from "@/content/experience";

// Tiny charts that say what a metric means. Drawn with pathLength=100 so one
// dash value draws any of them; elements with data-draw are animated on scroll
// by the parent, and show fully drawn without JavaScript.
const stroke = "hsl(var(--hue) 80% var(--tint-l))";
const track = "hsl(var(--hue) 50% 50% / 0.22)";
const DOWN = "0,10 28,16 50,12 78,32 104,28 130,46 160,42 196,56";
const UP = "0,56 28,50 50,54 78,34 104,38 130,20 160,24 196,8";

export default function MetricViz({ m, id }: { m: Metric; id: string }) {
  if (m.viz === "ring") {
    return (
      <svg viewBox="0 0 72 72" className="size-16 shrink-0 -rotate-90" aria-hidden="true">
        <circle cx="36" cy="36" r="28" fill="none" stroke={track} strokeWidth="7" />
        <circle
          data-draw
          data-final={`${m.to} 100`}
          cx="36" cy="36" r="28" fill="none" stroke={stroke} strokeWidth="7" strokeLinecap="round"
          pathLength="100" strokeDasharray={`${m.to} 100`}
        />
      </svg>
    );
  }

  if (m.viz === "range") {
    const x = (v: number) => 10 + v * 1.8;
    return (
      <svg viewBox="0 0 200 52" className="h-14 w-full" aria-hidden="true">
        <line x1={x(0)} y1="34" x2={x(100)} y2="34" stroke={track} strokeWidth="6" strokeLinecap="round" />
        <line
          data-draw
          data-final="100 100"
          x1={x(m.from ?? 0)} y1="34" x2={x(m.to)} y2="34"
          stroke={stroke} strokeWidth="6" strokeLinecap="round" pathLength="100" strokeDasharray="100 100"
        />
        <circle cx={x(m.from ?? 0)} cy="34" r="6" fill="var(--bg-2)" stroke={stroke} strokeWidth="3" />
        <circle cx={x(m.to)} cy="34" r="6" fill={stroke} />
        <text x={x(m.from ?? 0)} y="16" textAnchor="middle" fontSize="12" fill="var(--muted)" fontFamily="var(--font-mono)">{m.from}%</text>
        <text x={x(m.to)} y="16" textAnchor="middle" fontSize="12" fill={stroke} fontFamily="var(--font-mono)">{m.to}%</text>
      </svg>
    );
  }

  const pts = m.viz === "down" ? DOWN : UP;
  const end = pts.split(" ").pop()!.split(",");
  const gid = `g-${id}`;
  return (
    <svg viewBox="0 0 200 64" className="h-14 w-full" preserveAspectRatio="none" aria-hidden="true">
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="hsl(var(--hue) 80% 55% / 0.28)" />
          <stop offset="1" stopColor="hsl(var(--hue) 80% 55% / 0)" />
        </linearGradient>
      </defs>
      <polygon points={`${pts} 196,64 0,64`} fill={`url(#${gid})`} />
      <polyline
        data-draw
        data-final="100 100"
        points={pts} fill="none" stroke={stroke} strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"
        pathLength="100" strokeDasharray="100 100" vectorEffect="non-scaling-stroke"
      />
      <circle cx={end[0]} cy={end[1]} r="4.5" fill={stroke} />
    </svg>
  );
}

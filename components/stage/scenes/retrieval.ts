import { arrow, disc, hexA, label, numberPlane, ring, seg, type Ctx } from "../draw";
import { gauss, mulberry32 } from "@/lib/rng";

// Papertrail: embedding space with a moving query vector and its nearest
// neighbours, which is retrieval in RAG.
const N = 150;
const K = 5;
const points: number[] = (() => {
  const r = mulberry32(11);
  const centers = [
    [-3.2, 1.7],
    [2.9, 2.1],
    [-1.6, -2.5],
    [3.3, -1.7],
  ];
  const out: number[] = [];
  for (let i = 0; i < N; i++) {
    const c = centers[i % 4];
    out.push(c[0] + gauss(r) * 0.85, c[1] + gauss(r) * 0.85);
  }
  return out;
})();

export function drawRetrieval(c: Ctx) {
  const { g, w, h, t, pal } = c;
  const unit = Math.min(w / 16, h / 9.5);
  const ox = w * 0.5;
  const oy = h * 0.5;
  const X = (x: number) => ox + x * unit;
  const Y = (y: number) => oy - y * unit;

  numberPlane(c, ox, oy, unit);

  const qx = 3.4 * Math.cos(t * 0.21);
  const qy = 2.2 * Math.sin(t * 0.33 + 1);

  const d: number[] = [];
  for (let i = 0; i < N; i++) d.push(Math.hypot(points[i * 2] - qx, points[i * 2 + 1] - qy));
  const near = d
    .map((v, i) => i)
    .sort((a, b) => d[a] - d[b])
    .slice(0, K);

  for (let i = 0; i < N; i++) {
    if (near.includes(i)) continue;
    disc(g, X(points[i * 2]), Y(points[i * 2 + 1]), 4.2, hexA(pal.ink, pal.dark ? 0.38 : 0.45));
  }

  ring(g, X(qx), Y(qy), d[near[K - 1]] * unit * 1.08, hexA(pal.teal, 0.8), 1.8, [7, 6]);
  for (const i of near) {
    seg(g, X(qx), Y(qy), X(points[i * 2]), Y(points[i * 2 + 1]), hexA(pal.teal, 0.7), 1.6, [4, 5]);
    disc(g, X(points[i * 2]), Y(points[i * 2 + 1]), 7, pal.teal);
  }

  arrow(g, ox, oy, X(qx), Y(qy), pal.gold, 3.2);
  disc(g, X(qx), Y(qy), 8, pal.yellow);
  label(g, "q", X(qx) + 14, Y(qy) - 12, pal.yellow, 28);
}

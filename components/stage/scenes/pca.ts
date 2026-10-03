import { arrow, disc, hexA, label, numberPlane, seg, type Ctx } from "../draw";
import { gauss, mulberry32 } from "@/lib/rng";

// ML project: a swinging candidate axis and the projection of every point onto
// it. The spread (variance) peaks when the axis lines up with PC1.
const pts: [number, number][] = (() => {
  const r = mulberry32(21);
  const a = (28 * Math.PI) / 180;
  return Array.from({ length: 90 }, () => {
    const u = gauss(r) * 1.9;
    const v = gauss(r) * 0.65;
    return [u * Math.cos(a) - v * Math.sin(a), u * Math.sin(a) + v * Math.cos(a)];
  });
})();

const pc1 = (() => {
  let sxx = 0;
  let syy = 0;
  let sxy = 0;
  for (const [x, y] of pts) {
    sxx += x * x;
    syy += y * y;
    sxy += x * y;
  }
  return 0.5 * Math.atan2(2 * sxy, sxx - syy);
})();

export function drawPca(c: Ctx) {
  const { g, w, h, t, pal } = c;
  const unit = Math.min(w / 22, h / 12);
  const ox = w * 0.5;
  const oy = h * 0.5;
  const P = (x: number, y: number): [number, number] => [ox + x * unit, oy - y * unit];

  numberPlane(c, ox, oy, unit, 0.7);

  const th = pc1 + 1.15 * Math.sin(t * 0.55);
  const dx = Math.cos(th);
  const dy = Math.sin(th);

  // the candidate axis
  const [ax0, ay0] = P(-dx * 9, -dy * 9);
  const [ax1, ay1] = P(dx * 9, dy * 9);
  seg(g, ax0, ay0, ax1, ay1, pal.blue, 3.5);

  let varSum = 0;
  for (const [x, y] of pts) {
    const proj = x * dx + y * dy;
    varSum += proj * proj;
    const [px, py] = P(x, y);
    const [qx, qy] = P(proj * dx, proj * dy);
    seg(g, px, py, qx, qy, hexA(pal.teal, 0.55), 1.3, [4, 4]);
  }
  for (const [x, y] of pts) {
    const [px, py] = P(x, y);
    disc(g, px, py, 5.5, hexA(pal.ink, pal.dark ? 0.6 : 0.7));
  }

  // the true principal axes
  const [ex, ey] = P(Math.cos(pc1) * 4.6, Math.sin(pc1) * 4.6);
  const [fx, fy] = P(-Math.sin(pc1) * 2.2, Math.cos(pc1) * 2.2);
  arrow(g, ox, oy, ex, ey, pal.gold, 4);
  arrow(g, ox, oy, fx, fy, pal.red, 4);
  label(g, "PC1", ex + 12, ey - 8, pal.gold, 30);
  label(g, "PC2", fx - 64, fy - 8, pal.red, 30);
  label(g, "Var = " + (varSum / pts.length).toFixed(2), w * 0.8, h * 0.16, pal.yellow, 30);
}

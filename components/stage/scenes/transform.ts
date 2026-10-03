import { arrow, hexA, label, numberPlane, seg, smooth, type Ctx } from "../draw";
import { BEAT } from "@/lib/sceneState";

// Work: the grid bends under a matrix, 3Blue1Brown style, with the basis
// vectors î and ĵ riding along. Scroll through the chapter applies it.
const A = [
  [1, 0.9],
  [-0.55, 1.15],
]; // columns are where î and ĵ land

export function drawTransform(c: Ctx) {
  const { g, w, h, t, pal, own } = c;
  const unit = Math.min(w / 17, h / 9);
  const ox = w * 0.5;
  const oy = h * 0.5;

  const m = smooth((own[BEAT.work] ?? 0) * 1.6) + 0.04 * Math.sin(t * 0.7);
  const a = 1 + (A[0][0] - 1) * m;
  const b = A[0][1] * m;
  const cc = A[1][0] * m;
  const d = 1 + (A[1][1] - 1) * m;
  // M * (x, y) = (a*x + b*y, cc*x + d*y)
  const P = (x: number, y: number): [number, number] => [
    ox + (a * x + b * y) * unit,
    oy - (cc * x + d * y) * unit,
  ];

  numberPlane(c, ox, oy, unit, 0.55);

  const R = 14;
  g.beginPath();
  for (let k = -R; k <= R; k++) {
    if (k === 0) continue;
    const [x0, y0] = P(k, -R);
    const [x1, y1] = P(k, R);
    g.moveTo(x0, y0);
    g.lineTo(x1, y1);
    const [x2, y2] = P(-R, k);
    const [x3, y3] = P(R, k);
    g.moveTo(x2, y2);
    g.lineTo(x3, y3);
  }
  g.strokeStyle = hexA(pal.blue, pal.dark ? 0.55 : 0.6);
  g.lineWidth = 1.6;
  g.stroke();

  const [ex, ey] = P(1, 0);
  const [jx, jy] = P(0, 1);
  const [sx, sy] = P(1, 1);
  g.beginPath();
  g.moveTo(ox, oy);
  g.lineTo(ex, ey);
  g.lineTo(sx, sy);
  g.lineTo(jx, jy);
  g.closePath();
  g.fillStyle = hexA(pal.yellow, 0.16);
  g.fill();
  g.strokeStyle = hexA(pal.yellow, 0.7);
  g.lineWidth = 1.6;
  g.stroke();

  seg(g, P(-R, 0)[0], P(-R, 0)[1], P(R, 0)[0], P(R, 0)[1], hexA(pal.ink, 0.5), 2);
  seg(g, P(0, -R)[0], P(0, -R)[1], P(0, R)[0], P(0, R)[1], hexA(pal.ink, 0.5), 2);
  arrow(g, ox, oy, ex, ey, pal.green, 4.2);
  arrow(g, ox, oy, jx, jy, pal.red, 4.2);
  label(g, "î", ex + 10, ey + 28, pal.green, 30);
  label(g, "ĵ", jx - 30, jy - 8, pal.red, 30);
}

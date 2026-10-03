import { arrow, curve, disc, easeOut, hexA, label, lerp, numberPlane, seg, type Ctx } from "../draw";

// Hero: gradient descent rolling down a loss curve, with the tangent line.
// Real gradient descent settles quickly, so runs are short and restart from six
// different points on the left of the curve (in view beside the portrait).
const f = (x: number) => 0.5 * Math.sin(0.9 * x) + 0.065 * x * x - 1.4;
const df = (x: number) => 0.45 * Math.cos(0.9 * x) + 0.13 * x;

const STARTS = [-6.4, 1.0, -5.0, 1.8, -3.6, 0.2];
const STEPS = 14; // gradient descent has settled by then
const SPEED = 7; // steps per second
const PAUSE = 0.7; // brief rest at the bottom before the next run
const SEG = STEPS / SPEED + PAUSE;

const paths: number[][] = STARTS.map((x0) => {
  const out: number[] = [];
  let x = x0;
  for (let i = 0; i < STEPS; i++) {
    out.push(x);
    x -= 0.6 * df(x);
  }
  return out;
});

const XS = Array.from({ length: 137 }, (_, i) => -6.8 + i * 0.1);

export function drawDescent(c: Ctx) {
  const { g, w, h, pal, t0 } = c;
  const unit = Math.min(h / 9, w / 18);
  const ox = w * 0.5;
  const oy = h * 0.5; // keeps the curve above the big name at the bottom
  const X = (x: number) => ox + x * unit;
  const Y = (y: number) => oy - y * unit;

  numberPlane(c, ox, oy, unit);

  const pts: number[] = [];
  for (const x of XS) pts.push(X(x), Y(f(x)));
  curve(g, pts, easeOut(t0 / 2.4), pal.blue, 3.2);

  if (t0 < 2.6) return;
  label(g, "f(x)", X(-6.6), Y(f(-6.6)) - 18, pal.blue, 26);

  const local = (t0 - 2.6) % (SEG * STARTS.length);
  const k = Math.floor(local / SEG);
  const path = paths[k];
  const pos = Math.min(STEPS - 1.001, (local - k * SEG) * SPEED);
  const i = Math.floor(pos);
  const x = lerp(path[i], path[i + 1], pos - i);

  for (let n = 1; n <= 14; n++) {
    const back = Math.max(0, pos - n * 1.4);
    const bi = Math.floor(back);
    const bx = lerp(path[bi], path[Math.min(STEPS - 1, bi + 1)], back - bi);
    disc(g, X(bx), Y(f(bx)), 4.2 - n * 0.22, hexA(pal.yellow, 0.5 - n * 0.032));
  }

  const slope = df(x);
  const half = 1.9;
  seg(g, X(x - half), Y(f(x) - slope * half), X(x + half), Y(f(x) + slope * half), pal.red, 2.6);
  arrow(g, X(x), Y(f(x)), X(x - Math.sign(slope) * 1.1), Y(f(x)), pal.gold, 2.6);
  disc(g, X(x), Y(f(x)), 8, pal.yellow);
}

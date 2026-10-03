import { curve, disc, hexA, label, numberPlane, ring, seg, type Ctx } from "../draw";

// Credentials and contact: the unit circle unrolling into a sine wave.
const SAMPLES = 260;

export function drawCircle(c: Ctx) {
  const { g, w, h, t, pal } = c;
  const R = Math.min(h / 8, w / 12);
  const cx = w * 0.78;
  const cy = h * 0.82; // along the bottom, clear of the headline
  const speed = 0.9;
  const th = t * speed;

  numberPlane(c, cx, cy, R / 2, 0.55);

  ring(g, cx, cy, R, pal.blue, 3);
  const px = cx + R * Math.cos(th);
  const py = cy - R * Math.sin(th);

  // Trace: the point's height over the last few seconds, flowing left.
  const trace: number[] = [];
  const x0 = cx - R - 40;
  const span = w * 0.2; // short, so it stays clear of the text column
  for (let i = 0; i <= SAMPLES; i++) {
    const age = (i / SAMPLES) * 3.4; // seconds back in time
    trace.push(x0 - (i / SAMPLES) * span, cy - R * Math.sin((t - age) * speed));
  }
  curve(g, trace, 1, pal.green, 3.2);

  seg(g, px, py, x0, py, hexA(pal.red, 0.7), 1.6, [5, 6]);
  seg(g, cx, cy, px, py, pal.gold, 3.2);
  seg(g, px, py, px, cy, hexA(pal.yellow, 0.8), 2);
  disc(g, px, py, 8, pal.red);
  label(g, "sin θ", cx - R - 40 - 20, cy - R - 22, pal.green, 28);
}

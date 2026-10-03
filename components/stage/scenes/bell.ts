import { hexA, label, seg, type Ctx } from "../draw";

// Credentials: samples pile up into a normal distribution (central limit),
// with the 1 and 2 sigma bands shaded under the curve.
const BINS = 27;
const LIM = 3.4;
const BW = (2 * LIM) / BINS;
const pdf = (x: number) => Math.exp(-0.5 * x * x) / Math.sqrt(2 * Math.PI);
const probs = Array.from({ length: BINS }, (_, i) => pdf(-LIM + (i + 0.5) * BW) * BW);
const MAXP = Math.max(...probs);
const TOTAL = 1200;

export function drawBell(c: Ctx) {
  const { g, w, h, t, pal } = c;
  const baseY = h * 0.9;
  const width = w * 0.74;
  const left = w * 0.13;
  const peak = h * 0.36;
  const X = (x: number) => left + ((x + LIM) / (2 * LIM)) * width;
  const Y = (v: number) => baseY - v * peak;

  const n = Math.min(TOTAL, ((t * 90) % (TOTAL + 260)));
  const barW = width / BINS;
  for (let i = 0; i < BINS; i++) {
    const v = (probs[i] * n) / (MAXP * TOTAL);
    g.fillStyle = hexA(pal.blue, 0.5);
    g.fillRect(left + i * barW + 2, Y(v), barW - 4, baseY - Y(v));
  }

  // sigma bands, then the curve
  const band = (k: number, a: number) => {
    g.beginPath();
    g.moveTo(X(-k), baseY);
    for (let x = -k; x <= k + 1e-9; x += 0.05) g.lineTo(X(x), Y(pdf(x) / pdf(0)));
    g.lineTo(X(k), baseY);
    g.closePath();
    g.fillStyle = hexA(pal.gold, a);
    g.fill();
  };
  band(2, 0.07);
  band(1, 0.1);

  g.beginPath();
  for (let x = -LIM; x <= LIM + 1e-9; x += 0.05) {
    const px = X(x);
    const py = Y(pdf(x) / pdf(0));
    if (x === -LIM) g.moveTo(px, py);
    else g.lineTo(px, py);
  }
  g.strokeStyle = pal.gold;
  g.lineWidth = 4;
  g.stroke();

  seg(g, left, baseY, left + width, baseY, hexA(pal.ink, 0.45), 2);
  for (const k of [-2, -1, 0, 1, 2]) {
    seg(g, X(k), baseY, X(k), baseY + 12, hexA(pal.ink, 0.5), 2);
    label(g, k === 0 ? "μ" : (k > 0 ? "+" : "") + k + "σ", X(k) - 14, baseY + 44, pal.ink, 26);
  }
}

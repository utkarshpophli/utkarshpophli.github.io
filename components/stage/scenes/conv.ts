import { hexA, label, seg, type Ctx } from "../draw";

// GLOW: a 3x3 kernel sweeps an "image" and builds a feature map, the way a
// vision model reads a screen.
const W = 10;
const H = 8;
const input: number[][] = Array.from({ length: H }, (_, y) =>
  Array.from({ length: W }, (_, x) => {
    const disc = Math.hypot(x - 3.2, y - 3.4) < 2.4 ? 1 : 0;
    const bar = Math.abs(x - y - 3.5) < 0.7 && x > 5 ? 1 : 0;
    return Math.max(disc, bar) * 0.9 + 0.05;
  }),
);
const K = [
  [-1, -1, -1],
  [-1, 8, -1],
  [-1, -1, -1],
];
const OW = W - 2;
const OH = H - 2;
const out: number[][] = Array.from({ length: OH }, (_, y) =>
  Array.from({ length: OW }, (_, x) => {
    let s = 0;
    for (let j = 0; j < 3; j++) for (let i = 0; i < 3; i++) s += input[y + j][x + i] * K[j][i];
    return Math.abs(s);
  }),
);
const maxOut = Math.max(...out.flat());

export function drawConv(c: Ctx) {
  const { g, w, h, t, pal } = c;
  const s = Math.min(w / 40, h / 22);
  const ix = w * 0.5;
  const iy = h * 0.93 - H * s;
  const ox = ix + W * s + s * 3;
  const oy = h * 0.93 - OH * s;

  const total = OW * OH;
  const p = Math.floor(t * 6) % (total + 6);
  const done = Math.min(p, total);
  const kx = Math.min(p, total - 1) % OW;
  const ky = Math.floor(Math.min(p, total - 1) / OW);

  // input cells
  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      g.fillStyle = hexA(pal.ink, 0.1 + input[y][x] * 0.5);
      g.fillRect(ix + x * s + 1, iy + y * s + 1, s - 2, s - 2);
    }
  }
  // feature map cells, filled as the kernel passes
  for (let y = 0; y < OH; y++) {
    for (let x = 0; x < OW; x++) {
      const n = y * OW + x;
      g.fillStyle = n < done ? hexA(pal.blue, 0.15 + 0.8 * (out[y][x] / maxOut)) : hexA(pal.ink, 0.07);
      g.fillRect(ox + x * s + 1, oy + y * s + 1, s - 2, s - 2);
    }
  }

  // kernel window and its output cell
  g.strokeStyle = pal.gold;
  g.lineWidth = 3.5;
  g.strokeRect(ix + kx * s, iy + ky * s, 3 * s, 3 * s);
  g.strokeStyle = pal.yellow;
  g.strokeRect(ox + kx * s, oy + ky * s, s, s);
  seg(g, ix + (kx + 1.5) * s, iy + (ky + 1.5) * s, ox + (kx + 0.5) * s, oy + (ky + 0.5) * s, hexA(pal.teal, 0.55), 1.6, [6, 6]);

  label(g, "image", ix, iy - 14, pal.ink, 26);
  label(g, "feature map", ox, oy - 14, pal.blue, 26);
}

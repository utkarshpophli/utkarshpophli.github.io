import type { Palette } from "./palette";

export type Ctx = {
  g: CanvasRenderingContext2D;
  w: number;
  h: number;
  t: number; // seconds since load
  t0: number; // seconds since the preloader lifted (0 until then)
  pal: Palette;
  own: number[]; // scroll progress through each chapter, 0..1
  active: number; // highlighted skill category, -1 = none
  small: boolean;
  mouse: { x: number; y: number }; // 0..1
};

export const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
export const smooth = (v: number) => {
  const t = clamp01(v);
  return t * t * (3 - 2 * t);
};
export const easeOut = (v: number) => 1 - Math.pow(1 - clamp01(v), 3);
export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

export const hexA = (hex: string, a: number) => {
  const n = parseInt(hex.slice(1), 16);
  return `rgba(${(n >> 16) & 255},${(n >> 8) & 255},${n & 255},${a})`;
};

export function seg(
  g: CanvasRenderingContext2D,
  x0: number,
  y0: number,
  x1: number,
  y1: number,
  color: string,
  width: number,
  dash: number[] = [],
) {
  g.beginPath();
  g.setLineDash(dash);
  g.moveTo(x0, y0);
  g.lineTo(x1, y1);
  g.strokeStyle = color;
  g.lineWidth = width;
  g.stroke();
  if (dash.length) g.setLineDash([]);
}

// Polyline from a flat [x0,y0,x1,y1,...] array, drawn up to `frac` of its
// length. This is Manim's "Create" animation.
export function curve(
  g: CanvasRenderingContext2D,
  pts: number[],
  frac: number,
  color: string,
  width: number,
) {
  const n = pts.length / 2;
  if (n < 2 || frac <= 0) return;
  const end = (n - 1) * Math.min(1, frac);
  const whole = Math.floor(end);
  g.beginPath();
  g.moveTo(pts[0], pts[1]);
  for (let i = 1; i <= whole; i++) g.lineTo(pts[i * 2], pts[i * 2 + 1]);
  const rest = end - whole;
  if (rest > 0 && whole < n - 1) {
    g.lineTo(
      lerp(pts[whole * 2], pts[(whole + 1) * 2], rest),
      lerp(pts[whole * 2 + 1], pts[(whole + 1) * 2 + 1], rest),
    );
  }
  g.strokeStyle = color;
  g.lineWidth = width;
  g.lineJoin = "round";
  g.lineCap = "round";
  g.stroke();
}

export function disc(g: CanvasRenderingContext2D, x: number, y: number, r: number, fill: string) {
  g.beginPath();
  g.arc(x, y, r, 0, Math.PI * 2);
  g.fillStyle = fill;
  g.fill();
}

export function ring(
  g: CanvasRenderingContext2D,
  x: number,
  y: number,
  r: number,
  color: string,
  width: number,
  dash: number[] = [],
) {
  g.beginPath();
  g.setLineDash(dash);
  g.arc(x, y, r, 0, Math.PI * 2);
  g.strokeStyle = color;
  g.lineWidth = width;
  g.stroke();
  if (dash.length) g.setLineDash([]);
}

export function arrow(
  g: CanvasRenderingContext2D,
  x0: number,
  y0: number,
  x1: number,
  y1: number,
  color: string,
  width: number,
) {
  const a = Math.atan2(y1 - y0, x1 - x0);
  const head = 7 + width * 2;
  seg(g, x0, y0, x1 - Math.cos(a) * head * 0.6, y1 - Math.sin(a) * head * 0.6, color, width);
  g.beginPath();
  g.moveTo(x1, y1);
  g.lineTo(x1 - head * Math.cos(a - 0.4), y1 - head * Math.sin(a - 0.4));
  g.lineTo(x1 - head * Math.cos(a + 0.4), y1 - head * Math.sin(a + 0.4));
  g.closePath();
  g.fillStyle = color;
  g.fill();
}

// Math labels use an italic serif, the way Manim's LaTeX text looks.
export function label(
  g: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  color: string,
  size = 24,
) {
  g.font = `italic ${size}px "Times New Roman", Georgia, serif`;
  g.fillStyle = color;
  g.fillText(text, x, y);
}

// Manim's NumberPlane: faint blue grid with brighter axes through (ox, oy).
export function numberPlane(c: Ctx, ox: number, oy: number, unit: number, alpha = 1) {
  const { g, w, h, pal } = c;
  g.beginPath();
  for (let x = ox - Math.ceil(ox / unit) * unit; x < w; x += unit) {
    g.moveTo(x, 0);
    g.lineTo(x, h);
  }
  for (let y = oy - Math.ceil(oy / unit) * unit; y < h; y += unit) {
    g.moveTo(0, y);
    g.lineTo(w, y);
  }
  g.strokeStyle = hexA(pal.blue, (pal.dark ? 0.13 : 0.2) * alpha);
  g.lineWidth = 1;
  g.stroke();
  seg(g, 0, oy, w, oy, hexA(pal.ink, 0.38 * alpha), 1.6);
  seg(g, ox, 0, ox, h, hexA(pal.ink, 0.38 * alpha), 1.6);
}

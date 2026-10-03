import { curve, hexA, label, numberPlane, seg, type Ctx } from "../draw";
import { BEAT } from "@/lib/sceneState";

// Journey: a square wave built from sine terms. Scrolling through the
// chapter adds terms and the fit tightens (signal processing, a Siemens nod).
const SAMPLES = 420;

export function drawFourier(c: Ctx) {
  const { g, w, h, t, pal, own } = c;
  const unit = Math.min(w / 18, h / 9);
  const oy = h * 0.9; // along the bottom edge, clear of the text
  const ox = w * 0.5;

  numberPlane(c, ox, oy, unit, 0.7);

  const terms = 1 + Math.floor((own[BEAT.journey] ?? 0) * 6) * 2; // 1,3,5,...13
  const shift = t * 0.5;
  const amp = unit * 0.85;

  const target: number[] = [];
  const sum: number[] = [];
  for (let i = 0; i <= SAMPLES; i++) {
    const px = (i / SAMPLES) * w;
    const x = (px - ox) / unit + shift;
    let y = 0;
    for (let k = 1; k <= terms; k += 2) y += Math.sin(k * x) / k;
    y *= 4 / Math.PI;
    sum.push(px, oy - y * amp);
    target.push(px, oy - Math.sign(Math.sin(x)) * amp);
  }

  // Dashed target square wave.
  g.setLineDash([9, 8]);
  curve(g, target, 1, hexA(pal.gold, 0.7), 2);
  g.setLineDash([]);
  curve(g, sum, 1, pal.blue, 3.4);

  seg(g, 0, oy - amp, w, oy - amp, hexA(pal.ink, 0.2), 1);
  seg(g, 0, oy + amp, w, oy + amp, hexA(pal.ink, 0.2), 1);
  label(g, `n = ${terms}`, w * 0.82, oy - amp - 18, pal.yellow, 28);
}

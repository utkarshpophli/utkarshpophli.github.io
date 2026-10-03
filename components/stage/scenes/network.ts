import { disc, hexA, ring, seg, type Ctx } from "../draw";

// Experience: a small network with signals travelling layer to layer, a
// nod to multi-agent pipelines.
const layers = [3, 5, 5, 4, 2];

export function drawNetwork(c: Ctx) {
  const { g, w, h, t, pal } = c;
  const colors = [pal.blue, pal.teal, pal.green, pal.gold, pal.red];
  const gap = Math.min(h * 0.17, 150); // tall enough to show above and below the cards

  const at = (l: number, i: number): [number, number] => [
    w * (0.12 + (0.76 * l) / (layers.length - 1)),
    h * 0.5 + (i - (layers[l] - 1) / 2) * gap,
  ];

  for (let l = 0; l < layers.length - 1; l++) {
    for (let i = 0; i < layers[l]; i++) {
      for (let j = 0; j < layers[l + 1]; j++) {
        const [x0, y0] = at(l, i);
        const [x1, y1] = at(l + 1, j);
        seg(g, x0, y0, x1, y1, hexA(colors[l], pal.dark ? 0.3 : 0.4), 1.4);

        const seed = ((l * 31 + i * 7 + j * 13) % 17) / 17;
        if (seed < 0.4) {
          const p = (t * 0.35 + seed * 3) % 1;
          disc(g, x0 + (x1 - x0) * p, y0 + (y1 - y0) * p, 3.6, pal.yellow);
        }
      }
    }
  }

  for (let l = 0; l < layers.length; l++) {
    for (let i = 0; i < layers[l]; i++) {
      const [x, y] = at(l, i);
      disc(g, x, y, 11, hexA(colors[l], 0.9));
      ring(g, x, y, 11, hexA(pal.ink, 0.55), 1.4);
    }
  }
}

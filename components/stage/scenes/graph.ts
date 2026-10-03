import { skillGroups } from "@/content/skills";
import { gauss, mulberry32 } from "@/lib/rng";
import { clamp01, type Ctx } from "../draw";

// Skills: a semantic graph. Every skill is a node, grouped into one cluster
// per category, each with its own hue and shades inside it. Related skills are
// linked, a few bridges join the clusters, and the active category lights up
// with signals travelling along its edges.
type Node = { x: number; y: number; z: number; cat: number; shade: number; real: boolean; label: string };
type Edge = { a: number; b: number; bridge: boolean; phase: number };

let built: { nodes: Node[]; edges: Edge[] } | null = null;

const RING_X = 5;
const RING_Y = 2.5;
const clusterAngle = (cat: number) => (cat / skillGroups.length) * Math.PI * 2 - Math.PI / 2;

// The camera pans so the active category sits in the free lower-right of the
// screen, clear of the heading, rail and chips.
const pan = { x: 0, y: 0 };
let lastT = 0;

function build() {
  if (built) return built;
  const r = mulberry32(5);
  const nodes: Node[] = [];
  const cats = skillGroups.length;

  skillGroups.forEach((grp, cat) => {
    const a = clusterAngle(cat);
    const cx = Math.cos(a) * RING_X;
    const cy = Math.sin(a) * RING_Y;
    const cz = Math.sin(cat * 1.7) * 1.6;

    // Real skills on a golden-angle spiral so labels stay apart.
    grp.skills.forEach((s, i) => {
      const rad = 0.52 * Math.sqrt(i + 0.7);
      const ang = i * 2.39996;
      nodes.push({
        x: cx + Math.cos(ang) * rad,
        y: cy + Math.sin(ang) * rad * 0.85,
        z: cz + gauss(r) * 0.35,
        cat,
        shade: i / Math.max(1, grp.skills.length - 1),
        real: true,
        label: s.name,
      });
    });
    // Small unlabeled nodes give the cluster body, like a memory graph.
    for (let i = 0; i < 12; i++) {
      nodes.push({
        x: cx + gauss(r) * 1.35,
        y: cy + gauss(r) * 1.15,
        z: cz + gauss(r) * 0.9,
        cat,
        shade: r(),
        real: false,
        label: "",
      });
    }
  });

  const dist = (i: number, j: number) =>
    Math.hypot(nodes[i].x - nodes[j].x, nodes[i].y - nodes[j].y, nodes[i].z - nodes[j].z);

  const seen = new Set<string>();
  const edges: Edge[] = [];
  const add = (a: number, b: number, bridge: boolean) => {
    const key = a < b ? `${a}-${b}` : `${b}-${a}`;
    if (a === b || seen.has(key)) return;
    seen.add(key);
    edges.push({ a, b, bridge, phase: r() });
  };

  // Each node links to its two nearest neighbours in the same cluster.
  nodes.forEach((n, i) => {
    const same = nodes
      .map((m, j) => j)
      .filter((j) => j !== i && nodes[j].cat === n.cat)
      .sort((p, q) => dist(i, p) - dist(i, q))
      .slice(0, 2);
    same.forEach((j) => add(i, j, false));
  });

  // Bridges: closest pairs between neighbouring clusters, plus a few across.
  const pairs: [number, number][] = [];
  for (let c = 0; c < cats; c++) pairs.push([c, (c + 1) % cats]);
  pairs.push([0, 3], [1, 4], [2, 5]);
  for (const [ca, cb] of pairs) {
    const cand: [number, number, number][] = [];
    nodes.forEach((n, i) => {
      if (n.cat !== ca || !n.real) return;
      nodes.forEach((m, j) => {
        if (m.cat === cb && m.real) cand.push([i, j, dist(i, j)]);
      });
    });
    cand.sort((p, q) => p[2] - q[2]);
    cand.slice(0, 2).forEach(([i, j]) => add(i, j, true));
  }

  built = { nodes, edges };
  return built;
}

export function drawGraph(c: Ctx) {
  const { g, w, h, t, pal, active, mouse } = c;
  const { nodes, edges } = build();
  const dark = pal.dark;

  const ry = Math.sin(t * 0.12) * 0.35 + (mouse.x - 0.5) * 0.5; // gentle sway, never edge-on
  const rx = -0.3 + (mouse.y - 0.5) * 0.25;
  const cr = Math.cos(ry);
  const sr = Math.sin(ry);
  const cX = Math.cos(rx);
  const sX = Math.sin(rx);
  const unit = Math.min(w / 18, h / 10);
  const ox = w * 0.52;
  const oy = h * 0.52;

  const dt = Math.min(0.1, Math.max(0, t - lastT));
  lastT = t;

  const n = nodes.length;
  const sx = new Float32Array(n);
  const sy = new Float32Array(n);
  const sp = new Float32Array(n);
  const sz = new Float32Array(n);
  for (let i = 0; i < n; i++) {
    const p = nodes[i];
    const x1 = p.x * cr + p.z * sr;
    const z1 = -p.x * sr + p.z * cr;
    const y1 = p.y * cX - z1 * sX;
    const z2 = p.y * sX + z1 * cX;
    const persp = 15 / (15 + z2);
    sx[i] = ox + x1 * unit * persp;
    sy[i] = oy + y1 * unit * persp;
    sp[i] = persp;
    sz[i] = z2;
  }

  // Where should the camera be? Centre of the active category's real nodes
  // goes to the lower right; with nothing active the graph rests centred.
  let tx = 0;
  let ty = 0;
  if (active >= 0) {
    let sumX = 0;
    let sumY = 0;
    let cnt = 0;
    for (let i = 0; i < n; i++) {
      if (nodes[i].cat === active && nodes[i].real) {
        sumX += sx[i];
        sumY += sy[i];
        cnt++;
      }
    }
    tx = w * 0.7 - sumX / cnt;
    ty = h * 0.7 - sumY / cnt;
  }
  const k = 1 - Math.exp(-dt * 3.5);
  pan.x += (tx - pan.x) * k;
  pan.y += (ty - pan.y) * k;
  for (let i = 0; i < n; i++) {
    sx[i] += pan.x;
    sy[i] += pan.y;
  }

  const hueOf = (cat: number) => skillGroups[cat].hue;
  // Shade runs light to deep inside a category; depth adds a second shade.
  const color = (cat: number, shade: number, persp: number, a: number) => {
    const depth = clamp01((persp - 0.8) / 0.45);
    const l = dark ? 52 + shade * 20 + depth * 8 : 30 + shade * 16 - depth * 4;
    const s = dark ? 72 : 78;
    return `hsla(${hueOf(cat)},${s}%,${l}%,${a})`;
  };
  const vis = (cat: number) => (active < 0 ? 0.78 : cat === active ? 1 : 0.13);

  // Edges first.
  g.lineCap = "round";
  for (const e of edges) {
    const A = nodes[e.a];
    const B = nodes[e.b];
    const hot = active >= 0 && (A.cat === active || B.cat === active);
    const v = e.bridge ? (active < 0 ? 0.4 : hot ? 0.6 : 0.05) : vis(A.cat);
    const depth = 0.55 + 0.45 * clamp01((sp[e.a] + sp[e.b] - 1.6) / 0.5);
    const grad = g.createLinearGradient(sx[e.a], sy[e.a], sx[e.b], sy[e.b]);
    grad.addColorStop(0, color(A.cat, 0.5, sp[e.a], v * depth * 0.75));
    grad.addColorStop(1, color(B.cat, 0.5, sp[e.b], v * depth * 0.75));
    g.beginPath();
    g.moveTo(sx[e.a], sy[e.a]);
    g.lineTo(sx[e.b], sy[e.b]);
    g.strokeStyle = grad;
    g.lineWidth = hot ? 1.8 : 1.1;
    g.stroke();
  }

  // Signals travelling along the active category's edges.
  if (active >= 0) {
    for (const e of edges) {
      if (nodes[e.a].cat !== active && nodes[e.b].cat !== active) continue;
      const p = (t * 0.45 + e.phase) % 1;
      const x = sx[e.a] + (sx[e.b] - sx[e.a]) * p;
      const y = sy[e.a] + (sy[e.b] - sy[e.a]) * p;
      g.beginPath();
      g.arc(x, y, 2.8, 0, Math.PI * 2);
      g.fillStyle = dark ? "rgba(255,255,255,0.95)" : "rgba(16,18,21,0.9)";
      g.fill();
    }
  }

  // Nodes, far to near.
  const order = Array.from({ length: n }, (_, i) => i).sort((a, b) => sz[b] - sz[a]);
  for (const i of order) {
    const p = nodes[i];
    const isActive = active === p.cat;
    const v = vis(p.cat);
    const depth = 0.5 + 0.5 * clamp01((sp[i] - 0.8) / 0.45);
    const r = (p.real ? 5.2 : 2.2) * sp[i] * (isActive && p.real ? 1.35 : 1);

    if (isActive && p.real) {
      g.beginPath();
      g.arc(sx[i], sy[i], r * 2.6, 0, Math.PI * 2);
      g.fillStyle = color(p.cat, p.shade, sp[i], 0.16);
      g.fill();
    }
    g.beginPath();
    g.arc(sx[i], sy[i], r, 0, Math.PI * 2);
    g.fillStyle = color(p.cat, p.shade, sp[i], Math.min(1, v * depth * (p.real ? 1.15 : 0.9)));
    g.fill();
  }

  // Labels for the active category only, so the graph stays calm.
  if (active >= 0) {
    g.font = '12.5px ui-monospace, "Geist Mono", monospace';
    for (const i of order) {
      const p = nodes[i];
      if (!p.real || p.cat !== active) continue;
      g.fillStyle = color(p.cat, 0.9, sp[i], 0.95);
      g.fillText(p.label, sx[i] + 11, sy[i] + 4);
    }
  }
}

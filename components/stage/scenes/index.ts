import type { Ctx } from "../draw";
import { drawBell } from "./bell";
import { drawCircle } from "./circle";
import { drawConv } from "./conv";
import { drawDescent } from "./descent";
import { drawFourier } from "./fourier";
import { drawGraph } from "./graph";
import { drawNetwork } from "./network";
import { drawPca } from "./pca";
import { drawRetrieval } from "./retrieval";
import { drawTransform } from "./transform";

// Index = scene id used by the beats in SceneDirector.
export const scenes: { draw: (c: Ctx) => void; alpha: number }[] = [
  { draw: drawDescent, alpha: 1 },
  { draw: drawNetwork, alpha: 0.7 },
  { draw: drawRetrieval, alpha: 0.6 },
  { draw: drawTransform, alpha: 0.85 },
  { draw: drawFourier, alpha: 0.55 },
  { draw: drawGraph, alpha: 1 },
  { draw: drawCircle, alpha: 0.8 },
  { draw: drawConv, alpha: 0.8 },
  { draw: drawPca, alpha: 0.7 },
  { draw: drawBell, alpha: 0.7 },
];

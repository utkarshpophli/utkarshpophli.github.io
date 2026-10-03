// Mutable on purpose: GSAP/scroll code writes these and the canvas frame loop
// reads them, so scrolling never causes a React re-render.
export const BEAT = { hero: 0, experience: 1, papertrail: 2, glow: 3, mlscratch: 4, work: 5, journey: 6, skills: 7 } as const;

export const sceneState = {
  a: 0, // scene fading out
  b: 0, // scene fading in
  mix: 0, // 0..1 from a to b
  active: -1, // highlighted skill category, -1 = none
  own: new Array<number>(10).fill(0), // scroll progress through each chapter
};

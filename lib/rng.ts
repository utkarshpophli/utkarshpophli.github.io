// Small seeded PRNG so generated layouts are identical on every visit.
export function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Roughly normal, range about -2.4..2.4.
export const gauss = (r: () => number) => (r() + r() + r() + r() - 2) * 1.2;

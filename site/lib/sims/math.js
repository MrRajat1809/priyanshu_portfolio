// Numerical helpers for the hero simulations: sampling, mixture densities,
// and the exact assignment used for optimal transport.

const TAU = Math.PI * 2;

export function gaussian() {
  let u = 0;
  let v = 0;
  while (u === 0) u = Math.random();
  while (v === 0) v = Math.random();
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(TAU * v);
}

// Sample n points from a Gaussian mixture. Components use fractions of the
// canvas (x, y) and spreads as fractions of width (sx) and height (sy).
// Returned points are fractions of the canvas, so they survive resizing.
export function sampleMixture(components, n) {
  const total = components.reduce((sum, c) => sum + c.w, 0);
  return Array.from({ length: n }, () => {
    let pick = Math.random() * total;
    const c = components.find((component) => (pick -= component.w) <= 0) || components[0];
    const u = gaussian();
    const v = gaussian();
    const cos = Math.cos(c.rot);
    const sin = Math.sin(c.rot);
    return {
      x: c.x + u * c.sx * cos - v * c.sy * sin,
      y: c.y + u * c.sx * sin + v * c.sy * cos,
      phase: Math.random() * TAU,
    };
  });
}

// Mixture density on a regular grid in pixel space, scaled to a peak of 1.
export function mixtureGrid(components, width, height, cell) {
  const nx = Math.ceil(width / cell) + 1;
  const ny = Math.ceil(height / cell) + 1;
  const stepX = width / (nx - 1);
  const stepY = height / (ny - 1);
  const field = new Float32Array(nx * ny);
  for (const c of components) {
    const cx = c.x * width;
    const cy = c.y * height;
    const sx = c.sx * width;
    const sy = c.sy * height;
    const cos = Math.cos(c.rot);
    const sin = Math.sin(c.rot);
    for (let j = 0; j < ny; j += 1) {
      const dy = j * stepY - cy;
      for (let i = 0; i < nx; i += 1) {
        const dx = i * stepX - cx;
        const u = (dx * cos + dy * sin) / sx;
        const v = (-dx * sin + dy * cos) / sy;
        const q = u * u + v * v;
        if (q < 18) field[j * nx + i] += c.w * Math.exp(-0.5 * q);
      }
    }
  }
  let max = 0;
  for (let k = 0; k < field.length; k += 1) max = Math.max(max, field[k]);
  if (max > 0) for (let k = 0; k < field.length; k += 1) field[k] /= max;
  return { field, nx, ny, stepX, stepY };
}

// Exact optimal assignment (Hungarian algorithm with potentials, O(n^3)).
// `cost` is a row-major n x n matrix; returns match[i] = column for row i.
// With uniform weights on equal-sized point sets, this is the discrete
// optimal transport plan for the given cost.
export function optimalAssignment(cost, n) {
  const u = new Float64Array(n + 1);
  const v = new Float64Array(n + 1);
  const p = new Int32Array(n + 1);
  const way = new Int32Array(n + 1);
  for (let i = 1; i <= n; i += 1) {
    p[0] = i;
    let j0 = 0;
    const minv = new Float64Array(n + 1).fill(Infinity);
    const used = new Uint8Array(n + 1);
    do {
      used[j0] = 1;
      const i0 = p[j0];
      let delta = Infinity;
      let j1 = 0;
      for (let j = 1; j <= n; j += 1) {
        if (used[j]) continue;
        const current = cost[(i0 - 1) * n + (j - 1)] - u[i0] - v[j];
        if (current < minv[j]) {
          minv[j] = current;
          way[j] = j0;
        }
        if (minv[j] < delta) {
          delta = minv[j];
          j1 = j;
        }
      }
      for (let j = 0; j <= n; j += 1) {
        if (used[j]) {
          u[p[j]] += delta;
          v[j] -= delta;
        } else {
          minv[j] -= delta;
        }
      }
      j0 = j1;
    } while (p[j0] !== 0);
    do {
      const j1 = way[j0];
      p[j0] = p[j1];
      j0 = j1;
    } while (j0);
  }
  const match = new Int32Array(n);
  for (let j = 1; j <= n; j += 1) match[p[j] - 1] = j - 1;
  return match;
}

export const easeInOut = (t) => (t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2);

export const clamp01 = (t) => Math.min(1, Math.max(0, t));

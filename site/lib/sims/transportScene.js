// Optimal transport scene for the hero panel. A source point cloud is matched
// to the reference cloud by the exact minimum-cost assignment (squared
// Euclidean cost) and each point moves along its matched path. Colours follow
// the ClinicalTensorSepsis figures: MIMIC-IV reference, CareVue and eICU.

import { traceContours } from './contours';
import { clamp01, easeInOut, mixtureGrid, optimalAssignment, sampleMixture } from './math';
import { mix, rgba } from './draw';

const REFERENCE_NAME = 'MIMIC-IV reference';
const REFERENCE_RGB = [74, 111, 227];
const REFERENCE_RGB_DARK = [125, 152, 245];
const REFERENCE_MIXTURE = [
  { x: 0.74, y: 0.4, sx: 0.09, sy: 0.14, rot: 0.6, w: 0.62 },
  { x: 0.78, y: 0.7, sx: 0.06, sy: 0.07, rot: -0.3, w: 0.38 },
];
const SOURCES = [
  { name: 'CareVue', rgb: [219, 67, 37] },
  { name: 'eICU', rgb: [85, 168, 104] },
];

const N = 72;
const CELL = 8;
const LEVELS = [
  { value: 0.14, dash: [1.5, 3.5], alpha: 0.45 },
  { value: 0.4, dash: [5, 4], alpha: 0.55 },
  { value: 0.72, dash: [], alpha: 0.65 },
];
// Timeline of one cycle, in seconds.
const T = { fadeIn: 0.8, plan: 2.2, move: 4.2, aligned: 7.2, fadeOut: 9.0, end: 9.8 };

function randomSourceMixture() {
  const cx = 0.22 + (Math.random() - 0.5) * 0.06;
  const cy = 0.46 + (Math.random() - 0.5) * 0.16;
  const tilt = (Math.random() - 0.5) * 1.6;
  return [
    { x: cx, y: cy, sx: 0.06 + Math.random() * 0.025, sy: 0.12 + Math.random() * 0.04, rot: tilt, w: 0.6 },
    {
      x: cx + (Math.random() - 0.3) * 0.1,
      y: cy + (Math.random() < 0.5 ? -1 : 1) * (0.2 + Math.random() * 0.06),
      sx: 0.05,
      sy: 0.06,
      rot: -tilt,
      w: 0.4,
    },
  ];
}

function contourLines(mixture, width, height) {
  const { field, nx, ny, stepX, stepY } = mixtureGrid(mixture, width, height, CELL);
  return LEVELS.map((level) => ({
    ...level,
    lines: traceContours(field, nx, ny, level.value)
      .filter((line) => line.length > 6)
      .map((line) => line.map(([gx, gy]) => [gx * stepX, gy * stepY])),
  }));
}

function strokeLines(context, lines, color) {
  context.strokeStyle = color;
  context.beginPath();
  for (const line of lines) {
    line.forEach(([x, y], index) => (index ? context.lineTo(x, y) : context.moveTo(x, y)));
  }
  context.stroke();
}

export function createTransportScene() {
  let width = 0;
  let height = 0;
  let cycle = -1;
  let scene = null;

  const buildContours = () => {
    if (!scene || !width) return;
    scene.referenceContours = contourLines(REFERENCE_MIXTURE, width, height);
    scene.sourceContours = contourLines(scene.sourceMixture, width, height);
  };

  return {
    id: 'transport',
    tab: 'Optimal transport',
    stages: ['Distributions', 'Coupling', 'Transport', 'Aligned'],
    duration: T.end,
    stillTime: 3.95,
    legend: null,
    caption: (subject) =>
      `Optimal transport, simulated live: ${subject} points are matched one-to-one with the reference sample so that the total squared distance is as small as possible, then moved along those paths. ClinicalTensorSepsis uses an unbalanced, clinically constrained variant to align CareVue and eICU representations with MIMIC-IV.`,

    stageAt(t) {
      if (t < T.plan) return 0;
      if (t < T.move) return 1;
      if (t < T.aligned) return 2;
      return 3;
    },

    resize(w, h) {
      width = w;
      height = h;
      buildContours();
    },

    start() {
      cycle += 1;
      const source = SOURCES[cycle % SOURCES.length];
      const sourceMixture = randomSourceMixture();
      const from = sampleMixture(sourceMixture, N);
      const to = sampleMixture(REFERENCE_MIXTURE, N);
      const cost = new Float64Array(N * N);
      for (let i = 0; i < N; i += 1) {
        for (let j = 0; j < N; j += 1) {
          const dx = (from[i].x - to[j].x) * (width || 1);
          const dy = (from[i].y - to[j].y) * (height || 1);
          cost[i * N + j] = dx * dx + dy * dy;
        }
      }
      scene = {
        source,
        sourceMixture,
        from,
        to,
        match: optimalAssignment(cost, N),
        // Lines are drawn in a top-to-bottom sweep so the matching reads in order.
        delay: from.map((p) => from.filter((q) => q.y < p.y).length / N),
      };
      buildContours();
      return source.name;
    },

    draw(context, t, wall, theme) {
      if (!scene || !width || !scene.referenceContours) return;
      const { source, from, to, match, delay } = scene;
      const reference = theme.dark ? REFERENCE_RGB_DARK : REFERENCE_RGB;
      const appear = clamp01(t / T.fadeIn);
      const vanish = 1 - clamp01((t - T.fadeOut) / (T.end - T.fadeOut));
      const travel = easeInOut(clamp01((t - T.move) / (T.aligned - T.move - 0.4)));
      const recolor = clamp01((t - T.aligned) / 0.8);
      const sourceShape = appear * (1 - clamp01((t - T.move) / 1.2));
      const wobble = (p, axis) => 1.1 * (axis ? Math.cos(wall * 0.8 + p.phase) : Math.sin(wall * 0.9 + p.phase));

      context.lineWidth = 1;
      context.lineJoin = 'round';
      context.lineCap = 'round';

      for (const level of scene.referenceContours) {
        context.setLineDash(level.dash);
        strokeLines(context, level.lines, rgba(reference, level.alpha * 0.8 * vanish));
      }
      if (sourceShape > 0) {
        for (const level of scene.sourceContours) {
          context.setLineDash(level.dash);
          strokeLines(context, level.lines, rgba(source.rgb, level.alpha * 0.8 * sourceShape));
        }
      }
      context.setLineDash([]);

      // Reference sample: open circles.
      context.strokeStyle = rgba(reference, (0.55 - 0.3 * recolor) * vanish);
      context.beginPath();
      for (const p of to) {
        const x = p.x * width + wobble(p, 0);
        const y = p.y * height + wobble(p, 1);
        context.moveTo(x + 2.4, y);
        context.arc(x, y, 2.4, 0, Math.PI * 2);
      }
      context.stroke();

      // Coupling: lines grow during the plan stage, then shrink behind each point.
      context.strokeStyle = rgba(theme.ink, 0.16 * appear);
      context.beginPath();
      for (let i = 0; i < N; i += 1) {
        const grow = clamp01((t - T.plan - delay[i]) / 0.6);
        if (grow <= 0 || travel >= 1) continue;
        const a = from[i];
        const b = to[match[i]];
        const reach = Math.max(grow, travel);
        context.moveTo((a.x + (b.x - a.x) * travel) * width, (a.y + (b.y - a.y) * travel) * height);
        context.lineTo((a.x + (b.x - a.x) * reach) * width, (a.y + (b.y - a.y) * reach) * height);
      }
      context.stroke();

      // Source points move along the displacement interpolation.
      context.fillStyle = rgba(mix(source.rgb, reference, recolor), 0.85 * appear * vanish);
      context.beginPath();
      for (let i = 0; i < N; i += 1) {
        const a = from[i];
        const b = to[match[i]];
        const x = (a.x + (b.x - a.x) * travel) * width + wobble(a, 0);
        const y = (a.y + (b.y - a.y) * travel) * height + wobble(a, 1);
        context.moveTo(x + 2.3, y);
        context.arc(x, y, 2.3, 0, Math.PI * 2);
      }
      context.fill();

      // Labels.
      context.font = '500 11px Inter, ui-sans-serif, system-ui, sans-serif';
      context.textAlign = 'center';
      const top = (points) => Math.min(...points.map((p) => p.y)) * height - 12;
      const bottom = (points) => Math.max(...points.map((p) => p.y)) * height + 20;
      const center = (points) => (points.reduce((sum, p) => sum + p.x, 0) / points.length) * width;
      if (sourceShape > 0) {
        context.fillStyle = rgba(source.rgb, sourceShape);
        context.fillText(source.name, center(from), Math.max(top(from), 14));
      }
      context.fillStyle = rgba(reference, 0.9 * vanish);
      context.fillText(REFERENCE_NAME, center(to), Math.min(bottom(to), height - 6));
    },
  };
}

// Gap-aware SAITS scene for the hero panel, following the procedure in the
// ClinicalTensorSepsis supplementary methods: observed hours are hidden with a
// point, 6-h block, or whole-channel mask during training; only naturally
// missing hours within follow-up are filled, each feature by its selected
// method; hours after follow-up and observed-only channels are never filled.
// Values are synthetic and reconstructions are schematic, not model output.

import { clamp01, gaussian } from './math';
import { rgba, shade } from './draw';

const HOURS = 24;
const FOLLOW_UP = 20; // hours 20 to 23 fall after follow-up in this example

// Provenance colours from the ClinicalTensorSepsis figure configuration.
const COLORS = {
  observed: [74, 111, 227],
  observedDark: [125, 152, 245],
  saits: [185, 160, 205],
  forward: [241, 180, 149],
  median: [243, 210, 102],
  unfilled: [200, 200, 200],
  unfilledDark: [110, 115, 120],
};

const CHANNELS = [
  { name: 'HR', method: 'saits', tag: 'SAITS' },
  { name: 'Lactate', method: 'forward', tag: 'Forward fill' },
  { name: 'Creatinine', method: 'saits', tag: 'SAITS' },
  { name: 'GCS motor', method: 'none', tag: 'Observed only', discrete: true },
];
const MODELED = [0, 1, 2];
const MEDIAN_LEVEL = 0.45;

const PATTERNS = ['point', 'block', 'channel'];
const PATTERN_LABEL = {
  point: 'Mask: 20% of observed points',
  block: 'Mask: one 6-h block',
  channel: 'Mask: whole channel',
};
const PATTERN_ERROR = { point: 0.045, block: 0.075, channel: 0.11 };

// Timeline of one cycle, in seconds.
const T = { fadeIn: 0.6, mask: 2.2, recon: 4.6, impute: 7.8, fadeOut: 11.6, end: 12.4 };

export const SAITS_LEGEND = [
  { label: 'Observed', swatch: 'dot', color: '#4A6FE3' },
  { label: 'Hidden target', swatch: 'dashed', color: '#4A6FE3' },
  { label: 'SAITS', swatch: 'dot', color: '#B9A0CD' },
  { label: 'Forward fill', swatch: 'dot', color: '#F1B495' },
  { label: 'Median', swatch: 'dot', color: '#F3D266' },
  { label: 'Unfilled', swatch: 'ring', color: '#BDBDBD' },
  { label: 'After follow-up', swatch: 'hatch' },
];

const pick = (items) => items[Math.floor(Math.random() * items.length)];
const randInt = (lo, hi) => lo + Math.floor(Math.random() * (hi - lo + 1));

function smoothTerms(count) {
  return Array.from({ length: count }, (_, k) => [
    1 / (k + 1),
    0.12 + k * 0.17 + Math.random() * 0.06,
    Math.random() * Math.PI * 2,
  ]);
}

const evaluate = (terms, h) => terms.reduce((sum, [a, f, p]) => sum + a * Math.sin(f * h + p), 0);

function makePatient() {
  const latent = smoothTerms(2);
  const channels = CHANNELS.map((channel, c) => {
    const own = smoothTerms(2);
    const sign = c === 2 ? 1 : c === 3 ? -1 : Math.random() < 0.5 ? 1 : -1;
    const raw = Array.from({ length: HOURS }, (_, h) => sign * evaluate(latent, h) + 0.5 * evaluate(own, h));
    const lo = Math.min(...raw);
    const hi = Math.max(...raw);
    let values = raw.map((v) => (v - lo) / (hi - lo || 1));
    if (channel.discrete) values = values.map((v) => Math.round(v * 4) / 4);
    return { values, observed: new Array(HOURS).fill(false) };
  });

  const hr = channels[0].observed;
  for (let h = 0; h < FOLLOW_UP; h += 1) hr[h] = Math.random() < 0.85;
  const gap = randInt(5, 12);
  for (let h = gap; h < gap + randInt(2, 3); h += 1) hr[h] = false;

  const lactateFirst = randInt(3, 5);
  [lactateFirst, lactateFirst + randInt(5, 7), lactateFirst + randInt(11, 13)]
    .filter((h) => h < FOLLOW_UP)
    .forEach((h) => (channels[1].observed[h] = true));

  [randInt(0, 2), randInt(8, 10), randInt(16, 18)].forEach((h) => (channels[2].observed[h] = true));

  const gcs = [1, 5, 9, 13, 17];
  gcs.splice(randInt(1, 4), 1);
  gcs.forEach((h) => (channels[3].observed[h] = true));

  return channels;
}

function chooseTargets(channels, pattern) {
  const eligible = [];
  MODELED.forEach((c) => channels[c].observed.forEach((seen, h) => seen && eligible.push({ c, h })));

  if (pattern === 'block') {
    const starts = [];
    for (let s = 0; s <= FOLLOW_UP - 6; s += 1) {
      const inside = eligible.filter((cell) => cell.h >= s && cell.h < s + 6);
      if (inside.length && inside.length < eligible.length) starts.push(s);
    }
    if (starts.length) {
      const start = pick(starts);
      return { block: start, targets: eligible.filter((cell) => cell.h >= start && cell.h < start + 6) };
    }
  }

  if (pattern === 'channel') {
    const weights = MODELED.map((c) => 1 / Math.sqrt(Math.max(channels[c].observed.filter(Boolean).length, 1)));
    let draw = Math.random() * weights.reduce((sum, w) => sum + w, 0);
    const channel = MODELED.find((_, k) => (draw -= weights[k]) <= 0) ?? MODELED[0];
    return { channel, targets: eligible.filter((cell) => cell.c === channel) };
  }

  const count = Math.max(1, Math.floor(eligible.length * 0.2));
  const shuffled = [...eligible];
  for (let i = shuffled.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return { targets: shuffled.slice(0, count) };
}

export function createSaitsScene() {
  let width = 0;
  let height = 0;
  let cycle = -1;
  let scene = null;

  const layout = () => {
    const left = 84;
    const right = 8;
    const top = 30;
    const bottom = 30;
    const plotW = Math.max(width - left - right, 10);
    const rowH = (height - top - bottom) / CHANNELS.length;
    const cellW = plotW / HOURS;
    return {
      left,
      top,
      plotW,
      rowH,
      cellW,
      x: (h) => left + (h + 0.5) * cellW,
      y: (c, v) => top + c * rowH + 8 + (1 - v) * (rowH - 16),
    };
  };

  return {
    id: 'saits',
    tab: 'SAITS imputation',
    stages: ['Observed', 'Training mask', 'Reconstruction', 'Imputation'],
    duration: T.end,
    stillTime: 10.6,
    legend: SAITS_LEGEND,
    caption: () =>
      'Gap-aware SAITS on a synthetic patient. In training, observed hours are hidden by a point, 6-hour block, or whole-channel mask and then reconstructed, and only those hidden targets are scored. In the released data, only naturally missing hours within follow-up are filled, each feature by its selected method; hours after follow-up and observed-only channels stay empty. Values and reconstructions are schematic.',

    stageAt(t) {
      if (t < T.mask) return 0;
      if (t < T.recon) return 1;
      if (t < T.impute) return 2;
      return 3;
    },

    resize(w, h) {
      width = w;
      height = h;
    },

    start() {
      cycle += 1;
      const pattern = PATTERNS[cycle % PATTERNS.length];
      const channels = makePatient();
      const { targets, block, channel } = chooseTargets(channels, pattern);
      const hidden = new Set(targets.map(({ c, h }) => `${c}:${h}`));

      const reconstructions = targets.map(({ c, h }, index) => {
        const truth = channels[c].values[h];
        const context = [];
        MODELED.forEach((k) =>
          channels[k].observed.forEach((seen, j) => {
            if (!seen || hidden.has(`${k}:${j}`)) return;
            const weight = Math.exp(-Math.abs(j - h) / 3) * (k === c ? 1 : 0.4);
            context.push({ c: k, h: j, weight });
          })
        );
        context.sort((a, b) => b.weight - a.weight);
        const top = context.slice(0, 4);
        const strongest = top.length ? top[0].weight : 1;
        return {
          c,
          h,
          truth,
          value: clamp01(truth + gaussian() * PATTERN_ERROR[pattern]),
          context: top.map((item) => ({ ...item, weight: item.weight / strongest })),
          stagger: targets.length > 1 ? index / (targets.length - 1) : 0,
        };
      });

      const fills = [];
      CHANNELS.forEach((spec, c) => {
        const { values, observed } = channels[c];
        const first = observed.findIndex(Boolean);
        let last = null;
        for (let h = 0; h < FOLLOW_UP; h += 1) {
          if (observed[h]) {
            last = values[h];
            continue;
          }
          if (spec.method === 'saits') {
            fills.push({ c, h, kind: 'saits', value: clamp01(values[h] + gaussian() * 0.035) });
          } else if (spec.method === 'forward') {
            const before = first === -1 || h < first;
            fills.push({ c, h, kind: before ? 'median' : 'forward', value: before ? MEDIAN_LEVEL : last });
          } else {
            fills.push({ c, h, kind: 'unfilled', value: 0.5 });
          }
        }
      });

      scene = { pattern, channels, hidden, block, channel, reconstructions, fills };
      return pattern;
    },

    draw(context, t, _wall, theme) {
      if (!scene || !width) return;
      const L = layout();
      const { channels, hidden, reconstructions, fills, pattern } = scene;
      const fade = clamp01(t / T.fadeIn) * (1 - clamp01((t - T.fadeOut) / (T.end - T.fadeOut)));
      const observedRgb = theme.dark ? COLORS.observedDark : COLORS.observed;
      const unfilledRgb = theme.dark ? COLORS.unfilledDark : COLORS.unfilled;
      const masking = clamp01((t - T.mask - 0.2) / 0.5) * (1 - clamp01((t - T.impute) / 0.5));
      const hideProgress = (stagger) =>
        clamp01((t - T.mask - 0.6 - stagger * 0.6) / 0.3) * (1 - clamp01((t - T.impute) / 0.5));
      const sweep = ((t - T.impute - 0.5) / 2.0) * FOLLOW_UP;
      const bottomY = L.top + CHANNELS.length * L.rowH;
      const followX = L.left + FOLLOW_UP * L.cellW;

      context.lineCap = 'round';
      context.lineJoin = 'round';
      context.font = '500 11px Inter, ui-sans-serif, system-ui, sans-serif';

      // Hours after follow-up: hatched, never filled.
      context.save();
      context.beginPath();
      context.rect(followX, L.top, L.left + L.plotW - followX, bottomY - L.top);
      context.clip();
      context.strokeStyle = rgba(theme.lineStrong, 0.7 * fade);
      context.lineWidth = 1;
      context.beginPath();
      for (let k = -height; k < width; k += 6) {
        context.moveTo(followX + k, bottomY);
        context.lineTo(followX + k + (bottomY - L.top), L.top);
      }
      context.stroke();
      context.restore();
      context.fillStyle = rgba(theme.muted, fade);
      context.font = '10px Inter, ui-sans-serif, system-ui, sans-serif';
      context.textAlign = 'right';
      context.fillText('After follow-up', L.left + L.plotW, L.top - 10);

      // Stage tag.
      context.textAlign = 'left';
      context.fillStyle = rgba(theme.ink, fade);
      context.font = '500 10.5px Inter, ui-sans-serif, system-ui, sans-serif';
      let tag = 'Hourly values from onset';
      if (t >= T.mask && t < T.impute) tag = PATTERN_LABEL[pattern];
      if (t >= T.impute) tag = 'Filled within follow-up';
      context.fillText(tag, L.left, L.top - 10);

      // Mask highlight for block and whole-channel patterns.
      if (masking > 0 && (scene.block !== undefined || scene.channel !== undefined)) {
        let x0 = L.left;
        let x1 = followX;
        let y0 = L.top;
        let y1 = L.top + MODELED.length * L.rowH;
        if (scene.block !== undefined) {
          x0 = L.left + scene.block * L.cellW;
          x1 = x0 + 6 * L.cellW;
        } else {
          y0 = L.top + scene.channel * L.rowH;
          y1 = y0 + L.rowH;
        }
        context.fillStyle = rgba(theme.accent, 0.07 * masking * fade);
        context.fillRect(x0, y0 + 2, x1 - x0, y1 - y0 - 4);
        context.setLineDash([4, 3]);
        context.strokeStyle = rgba(theme.accent, 0.55 * masking * fade);
        context.lineWidth = 1;
        context.strokeRect(x0 + 0.5, y0 + 2.5, x1 - x0 - 1, y1 - y0 - 5);
        context.setLineDash([]);
      }

      // Row labels, separators and the method tag chosen per feature.
      CHANNELS.forEach((spec, c) => {
        const rowTop = L.top + c * L.rowH;
        context.strokeStyle = rgba(theme.line, fade);
        context.lineWidth = 1;
        context.beginPath();
        context.moveTo(L.left, rowTop + L.rowH);
        context.lineTo(L.left + L.plotW, rowTop + L.rowH);
        context.stroke();

        context.textAlign = 'right';
        context.fillStyle = rgba(theme.ink, 0.85 * fade);
        context.font = '500 11px Inter, ui-sans-serif, system-ui, sans-serif';
        context.fillText(spec.name, L.left - 12, rowTop + L.rowH / 2 - 1);
        const tagAlpha = clamp01((t - T.impute - 0.2) / 0.6) * fade;
        if (tagAlpha > 0) {
          const tone =
            spec.method === 'none' ? theme.muted : shade(COLORS[spec.method === 'saits' ? 'saits' : 'forward'], 0.72);
          context.fillStyle = rgba(tone, tagAlpha);
          context.font = '10px Inter, ui-sans-serif, system-ui, sans-serif';
          context.fillText(spec.tag, L.left - 12, rowTop + L.rowH / 2 + 12);
        }
      });

      // Hour axis.
      context.textAlign = 'center';
      context.fillStyle = rgba(theme.muted, fade);
      context.font = '10px Inter, ui-sans-serif, system-ui, sans-serif';
      [0, 6, 12, 18, 23].forEach((h) => context.fillText(String(h), L.x(h), bottomY + 16));
      context.textAlign = 'right';
      context.fillText('Hour', L.left - 12, bottomY + 16);

      const isHidden = (c, h) => hidden.has(`${c}:${h}`);
      const reconOf = new Map(reconstructions.map((r) => [`${r.c}:${r.h}`, r]));

      // Lines joining adjacent observed hours.
      context.strokeStyle = rgba(theme.ink, 0.22 * fade);
      context.lineWidth = 1;
      context.beginPath();
      channels.forEach(({ values, observed }, c) => {
        for (let h = 0; h < HOURS - 1; h += 1) {
          if (!observed[h] || !observed[h + 1]) continue;
          const gone = (k) => isHidden(c, k) && hideProgress(reconOf.get(`${c}:${k}`).stagger) > 0.5;
          if (gone(h) || gone(h + 1)) continue;
          context.moveTo(L.x(h), L.y(c, values[h]));
          context.lineTo(L.x(h + 1), L.y(c, values[h + 1]));
        }
      });
      context.stroke();

      // Completed series behind the fill sweep.
      if (sweep > 0) {
        context.strokeStyle = rgba(theme.ink, 0.14 * fade);
        context.beginPath();
        channels.forEach(({ values, observed }, c) => {
          const method = CHANNELS[c].method;
          if (method === 'none') return;
          const filled = new Map(fills.filter((f) => f.c === c).map((f) => [f.h, f.value]));
          let lastY = null;
          for (let h = 0; h < Math.min(FOLLOW_UP, Math.floor(sweep) + 1); h += 1) {
            const v = observed[h] ? values[h] : filled.get(h);
            if (v === undefined) continue;
            const x = L.x(h);
            const y = L.y(c, v);
            if (lastY === null) {
              context.moveTo(x, y);
            } else {
              // Forward fill holds the previous value, so it is drawn as steps.
              if (method === 'forward') context.lineTo(x, lastY);
              context.lineTo(x, y);
            }
            lastY = y;
          }
        });
        context.stroke();
      }

      // Attention-style context arcs during reconstruction (schematic).
      const arcTone = shade(COLORS.saits, theme.dark ? 1 : 0.7);
      reconstructions.forEach((r) => {
        const arcAlpha =
          clamp01((t - T.recon - 0.1 - r.stagger * 0.5) / 0.4) * (1 - clamp01((t - T.recon - 1.9) / 0.6)) * fade;
        if (arcAlpha <= 0) return;
        const tx = L.x(r.h);
        const ty = L.y(r.c, r.truth);
        r.context.forEach((item) => {
          const sx = L.x(item.h);
          const sy = L.y(item.c, channels[item.c].values[item.h]);
          const lift = 18 + Math.abs(sx - tx) * 0.18;
          context.strokeStyle = rgba(arcTone, 0.55 * item.weight * arcAlpha);
          context.lineWidth = 0.6 + item.weight;
          context.beginPath();
          context.moveTo(sx, sy);
          context.quadraticCurveTo((sx + tx) / 2, Math.min(sy, ty) - lift, tx, ty);
          context.stroke();
        });
      });

      // Observed points, hidden targets and reconstructions.
      channels.forEach(({ values, observed }, c) => {
        observed.forEach((seen, h) => {
          if (!seen) return;
          const x = L.x(h);
          const y = L.y(c, values[h]);
          const r = reconOf.get(`${c}:${h}`);
          const hide = r ? hideProgress(r.stagger) : 0;
          if (hide < 1) {
            context.fillStyle = rgba(observedRgb, 0.9 * (1 - hide) * fade);
            context.beginPath();
            context.arc(x, y, 2.7, 0, Math.PI * 2);
            context.fill();
          }
          if (hide > 0) {
            context.setLineDash([2, 2]);
            context.strokeStyle = rgba(observedRgb, 0.85 * hide * fade);
            context.lineWidth = 1;
            context.beginPath();
            context.arc(x, y, 3.6, 0, Math.PI * 2);
            context.stroke();
            context.setLineDash([]);
          }
          if (r) {
            const shown =
              clamp01((t - T.recon - 0.9 - r.stagger * 0.5) / 0.4) * (1 - clamp01((t - T.impute) / 0.4)) * fade;
            if (shown > 0) {
              const py = L.y(c, r.value);
              context.strokeStyle = rgba(theme.ink, 0.45 * shown);
              context.lineWidth = 1;
              context.beginPath();
              context.moveTo(x, y);
              context.lineTo(x, py);
              context.stroke();
              context.fillStyle = rgba(COLORS.saits, shown);
              context.strokeStyle = rgba(shade(COLORS.saits, 0.7), shown);
              context.beginPath();
              context.arc(x, py, 2.8, 0, Math.PI * 2);
              context.fill();
              context.stroke();
            }
          }
        });
      });

      // Fill sweep: only naturally missing hours within follow-up.
      if (t >= T.impute) {
        if (sweep > 0 && sweep < FOLLOW_UP + 1) {
          const sx = L.left + Math.min(sweep, FOLLOW_UP) * L.cellW;
          context.strokeStyle = rgba(theme.ink, 0.18 * fade);
          context.lineWidth = 1;
          context.beginPath();
          context.moveTo(sx, L.top);
          context.lineTo(sx, bottomY);
          context.stroke();
        }
        fills.forEach((f) => {
          const shown = clamp01((sweep - f.h) / 1.2) * fade;
          if (shown <= 0) return;
          const x = L.x(f.h);
          if (f.kind === 'unfilled') {
            context.strokeStyle = rgba(unfilledRgb, shown);
            context.lineWidth = 1;
            context.beginPath();
            context.arc(x, L.y(f.c, 0.5), 2.2, 0, Math.PI * 2);
            context.stroke();
            return;
          }
          const base = COLORS[f.kind];
          context.fillStyle = rgba(base, shown);
          context.strokeStyle = rgba(shade(base, 0.72), shown);
          context.lineWidth = 1;
          context.beginPath();
          context.arc(x, L.y(f.c, f.value), 2.6, 0, Math.PI * 2);
          context.fill();
          context.stroke();
        });
      }
    },
  };
}

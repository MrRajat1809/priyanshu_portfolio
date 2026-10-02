// Small canvas helpers shared by the hero simulations.

export const rgba = (rgb, alpha) => `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${Math.max(0, Math.min(1, alpha))})`;

export const mix = (a, b, t) => a.map((value, k) => Math.round(value + (b[k] - value) * t));

export const shade = (rgb, factor) => rgb.map((value) => Math.round(value * factor));

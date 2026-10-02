// Marching-squares iso-contours of a scalar field sampled on a regular grid.
// Segments are chained into polylines so dash patterns run continuously.
// `field` holds nx * ny samples, row-major; points are returned in grid units.
export function traceContours(field, nx, ny, level) {
  const horizontal = (nx - 1) * ny;
  const edgeH = (i, j) => j * (nx - 1) + i;
  const edgeV = (i, j) => horizontal + j * nx + i;
  const value = (i, j) => field[j * nx + i];
  const points = new Map();
  const segA = [];
  const segB = [];

  const point = (edge, i, j, vertical) => {
    if (!points.has(edge)) {
      const a = value(i, j);
      const b = vertical ? value(i, j + 1) : value(i + 1, j);
      const t = (level - a) / (b - a);
      points.set(edge, vertical ? [i, j + t] : [i + t, j]);
    }
    return edge;
  };

  for (let j = 0; j < ny - 1; j += 1) {
    for (let i = 0; i < nx - 1; i += 1) {
      const tl = value(i, j);
      const tr = value(i + 1, j);
      const br = value(i + 1, j + 1);
      const bl = value(i, j + 1);
      const code = (tl > level ? 8 : 0) | (tr > level ? 4 : 0) | (br > level ? 2 : 0) | (bl > level ? 1 : 0);
      if (code === 0 || code === 15) continue;

      const top = () => point(edgeH(i, j), i, j, false);
      const bottom = () => point(edgeH(i, j + 1), i, j + 1, false);
      const left = () => point(edgeV(i, j), i, j, true);
      const right = () => point(edgeV(i + 1, j), i + 1, j, true);
      const add = (a, b) => {
        segA.push(a());
        segB.push(b());
      };
      const centerHigh = (tl + tr + br + bl) / 4 > level;

      switch (code) {
        case 1:
        case 14:
          add(left, bottom);
          break;
        case 2:
        case 13:
          add(bottom, right);
          break;
        case 3:
        case 12:
          add(left, right);
          break;
        case 4:
        case 11:
          add(top, right);
          break;
        case 6:
        case 9:
          add(top, bottom);
          break;
        case 7:
        case 8:
          add(top, left);
          break;
        case 5:
          if (centerHigh) {
            add(top, left);
            add(bottom, right);
          } else {
            add(left, bottom);
            add(top, right);
          }
          break;
        case 10:
          if (centerHigh) {
            add(top, right);
            add(left, bottom);
          } else {
            add(left, top);
            add(bottom, right);
          }
          break;
        default:
          break;
      }
    }
  }

  const adjacency = new Map();
  segA.forEach((a, k) => {
    for (const edge of [a, segB[k]]) {
      if (!adjacency.has(edge)) adjacency.set(edge, []);
      adjacency.get(edge).push(k);
    }
  });

  const used = new Uint8Array(segA.length);
  const lines = [];
  const extend = (from, out) => {
    let end = from;
    for (;;) {
      const next = adjacency.get(end).find((k) => !used[k]);
      if (next === undefined) return;
      used[next] = 1;
      end = segA[next] === end ? segB[next] : segA[next];
      out.push(end);
    }
  };
  for (let k = 0; k < segA.length; k += 1) {
    if (used[k]) continue;
    used[k] = 1;
    const forward = [segA[k], segB[k]];
    const backward = [];
    extend(segB[k], forward);
    extend(segA[k], backward);
    lines.push(
      backward
        .reverse()
        .concat(forward)
        .map((edge) => points.get(edge))
    );
  }
  return lines;
}

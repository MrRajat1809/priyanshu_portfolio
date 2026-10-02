import { useEffect, useMemo, useRef, useState } from 'react';

// Frame of data/sepsis_map.json (Equal Earth, Antarctica omitted).
const WIDTH = 960;
const HEIGHT = 421.8;
const LABELS = ['0 to <100', '100 to <250', '250 to <500', '500 to <750', '750 to 1,081'];

const fmt = (value) =>
  value.toLocaleString('en-US', { minimumFractionDigits: 1, maximumFractionDigits: 1 });

const binClass = (bin) => (bin === null ? 'bin-na' : `bin-${bin}`);

function Unit({ unit, index, className }) {
  if (unit.d) return <path d={unit.d} data-index={index} className={className} />;
  return <circle cx={unit.dot[0]} cy={unit.dot[1]} r={2.4} data-index={index} className={className} />;
}

function Tooltip({ unit, position }) {
  const flip = position.x > position.width - 236;
  const style = {
    left: flip ? undefined : position.x + 14,
    right: flip ? position.width - position.x + 14 : undefined,
    top: Math.max(position.y - 12, 0),
  };
  return (
    <div
      style={style}
      className="pointer-events-none absolute z-10 w-56 rounded border border-line bg-bg/95 px-3 py-2 text-xs shadow-sm"
    >
      <p className="font-medium text-ink">{unit.name}</p>
      {unit.value === null ? (
        <p className="mt-1 text-muted">No separate GBD 2017 estimate</p>
      ) : (
        <>
          <p className="num mt-1 text-ink">
            <span className="text-sm font-semibold">{fmt(unit.value)}</span> per 100,000
          </p>
          <p className="num text-muted">
            95% UI {fmt(unit.lower)}–{fmt(unit.upper)}
          </p>
        </>
      )}
    </div>
  );
}

export default function SepsisMap() {
  const [map, setMap] = useState(null);
  const [hovered, setHovered] = useState(null);
  const [position, setPosition] = useState(null);
  const [focusBin, setFocusBin] = useState(null);
  const [entered, setEntered] = useState(false);
  const frameRef = useRef(null);

  useEffect(() => {
    let alive = true;
    import('../../data/sepsis_map.json').then((mod) => {
      if (alive) setMap(mod.default);
    });
    return () => {
      alive = false;
    };
  }, []);

  // Classes fill in from lowest to highest burden the first time the map is seen.
  useEffect(() => {
    if (!map) return undefined;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setEntered(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25 }
    );
    observer.observe(frameRef.current);
    return () => observer.disconnect();
  }, [map]);

  // Country shapes only change with the legend highlight, not with the pointer.
  const shapes = useMemo(() => {
    if (!map) return null;
    return map.countries.map((unit, index) => {
      const dimmed = focusBin !== null && unit.bin !== focusBin ? ' is-dimmed' : '';
      return <Unit key={unit.id} unit={unit} index={index} className={`map-unit ${binClass(unit.bin)}${dimmed}`} />;
    });
  }, [map, focusBin]);

  const track = (event) => {
    const index = event.target.dataset ? event.target.dataset.index : undefined;
    if (index === undefined) {
      setHovered(null);
      return;
    }
    const rect = frameRef.current.getBoundingClientRect();
    setHovered(Number(index));
    setPosition({ x: event.clientX - rect.left, y: event.clientY - rect.top, width: rect.width });
  };

  const unit = map && hovered !== null ? map.countries[hovered] : null;

  return (
    <div>
      <div
        ref={frameRef}
        className="relative"
        style={{ aspectRatio: `${WIDTH} / ${HEIGHT}` }}
        onMouseLeave={() => setHovered(null)}
      >
        {shapes ? (
          <svg
            viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
            className={`h-full w-full ${entered ? 'map-enter' : 'map-wait'}`}
            role="img"
            aria-label="World map of age-standardized sepsis-related mortality by country in 2017. Rates are highest in sub-Saharan Africa."
            onMouseMove={track}
            onClick={track}
          >
            {shapes}
            {unit && (
              <Unit unit={unit} index={hovered} className={`map-unit is-hovered pointer-events-none ${binClass(unit.bin)}`} />
            )}
          </svg>
        ) : (
          <div className="h-full w-full rounded bg-surface" aria-hidden="true" />
        )}
        {unit && position && <Tooltip unit={unit} position={position} />}
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-muted">
        <span className="text-ink">Deaths per 100,000</span>
        {LABELS.map((label, bin) => (
          <button
            key={label}
            type="button"
            onMouseEnter={() => setFocusBin(bin)}
            onMouseLeave={() => setFocusBin(null)}
            onFocus={() => setFocusBin(bin)}
            onBlur={() => setFocusBin(null)}
            className="num inline-flex items-center gap-1.5 hover:text-ink"
            aria-label={`Highlight countries with ${label} deaths per 100,000`}
          >
            <span aria-hidden="true" className={`h-3 w-5 rounded-sm ${binClass(bin)}`} />
            {label}
          </button>
        ))}
        <span className="inline-flex items-center gap-1.5">
          <span aria-hidden="true" className="h-3 w-5 rounded-sm bin-na" />
          No separate estimate
        </span>
      </div>
    </div>
  );
}

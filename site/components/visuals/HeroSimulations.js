import { useEffect, useRef, useState } from 'react';
import { Pause, Play } from 'lucide-react';
import { createSaitsScene } from '../../lib/sims/saitsScene';
import { createTransportScene } from '../../lib/sims/transportScene';

// Live illustrations of two methods from ClinicalTensorSepsis. They alternate
// (SAITS, then optimal transport) until a visitor picks one with the tabs.
const ORDER = ['saits', 'transport'];
const FRAME_MS = 1000 / 45;
const EDGE_FADE = 'radial-gradient(ellipse 72% 70% at 50% 50%, #000 62%, transparent 100%)';

function readTheme(root) {
  const style = getComputedStyle(root);
  const channel = (name, fallback) => {
    const value = style.getPropertyValue(name).trim();
    return value ? value.split(/\s+/).map(Number) : fallback;
  };
  return {
    dark: root.classList.contains('dark'),
    ink: channel('--ink', [34, 34, 34]),
    muted: channel('--muted', [102, 102, 102]),
    line: channel('--line', [221, 221, 221]),
    lineStrong: channel('--line-strong', [187, 187, 187]),
    accent: channel('--accent', [183, 49, 46]),
  };
}

function Swatch({ item }) {
  const base = 'inline-block h-2.5 w-2.5 shrink-0 rounded-full';
  if (item.swatch === 'hatch') {
    return (
      <span
        aria-hidden="true"
        className="inline-block h-2.5 w-3.5 shrink-0 rounded-sm border border-line-strong"
        style={{
          backgroundImage: 'repeating-linear-gradient(135deg, rgb(var(--line-strong)) 0 1px, transparent 1px 4px)',
        }}
      />
    );
  }
  if (item.swatch === 'ring' || item.swatch === 'dashed') {
    return (
      <span
        aria-hidden="true"
        className={`${base} border ${item.swatch === 'dashed' ? 'border-dashed' : ''}`}
        style={{ borderColor: item.color }}
      />
    );
  }
  return <span aria-hidden="true" className={base} style={{ backgroundColor: item.color }} />;
}

export default function HeroSimulations({ className = '' }) {
  const canvasRef = useRef(null);
  const scenesRef = useRef(null);
  const controls = useRef({ toggle: () => {}, select: () => {} });
  if (!scenesRef.current) {
    scenesRef.current = { saits: createSaitsScene(), transport: createTransportScene() };
  }
  const scenes = scenesRef.current;

  const [view, setView] = useState({ id: ORDER[0], stage: 0, subject: '' });
  const [paused, setPaused] = useState(false);
  const [pinned, setPinned] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    const root = document.documentElement;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let width = 0;
    let height = 0;
    let theme = readTheme(root);
    let frame = 0;
    let last = 0;
    let lastNow = performance.now();
    let visible = true;
    let isPaused = reduceMotion;
    let isPinned = false;
    let activeId = ORDER[0];
    let scene = scenes[activeId];
    let clock = 0;
    let shownStage = -1;
    let subject = '';

    const report = () => {
      shownStage = scene.stageAt(clock);
      setView({ id: activeId, stage: shownStage, subject });
    };

    const begin = (id) => {
      activeId = id;
      scene = scenes[id];
      clock = isPaused ? scene.stillTime : 0;
      subject = scene.start() || '';
      canvas.style.maskImage = scene.id === 'transport' ? EDGE_FADE : 'none';
      canvas.style.webkitMaskImage = canvas.style.maskImage;
      report();
    };

    const draw = () => {
      if (!width) return;
      context.clearRect(0, 0, width, height);
      scene.draw(context, clock, performance.now() / 1000, theme);
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      Object.values(scenes).forEach((s) => s.resize(width, height));
    };

    const step = (now) => {
      const dt = Math.min((now - lastNow) / 1000, 0.1);
      lastNow = now;
      if (!isPaused) clock += dt;
      if (clock >= scene.duration) {
        const next = isPinned ? activeId : ORDER[(ORDER.indexOf(activeId) + 1) % ORDER.length];
        begin(next);
      } else if (scene.stageAt(clock) !== shownStage) {
        report();
      }
      draw();
    };

    const loop = (now) => {
      frame = 0;
      if (!visible || document.hidden || isPaused) return;
      if (now - last >= FRAME_MS) {
        last = now;
        step(now);
      }
      frame = requestAnimationFrame(loop);
    };

    const play = () => {
      if (!frame && !isPaused && visible && !document.hidden) {
        lastNow = performance.now();
        frame = requestAnimationFrame(loop);
      }
    };

    controls.current.toggle = () => {
      isPaused = !isPaused;
      setPaused(isPaused);
      if (isPaused) {
        cancelAnimationFrame(frame);
        frame = 0;
      } else {
        play();
      }
    };

    controls.current.select = (id) => {
      isPinned = true;
      setPinned(true);
      begin(id);
      draw();
    };

    resize();
    setPaused(isPaused);
    begin(activeId);
    draw();
    play();

    const resizeObserver = new ResizeObserver(() => {
      resize();
      draw();
    });
    resizeObserver.observe(canvas);

    const themeObserver = new MutationObserver(() => {
      theme = readTheme(root);
      draw();
    });
    themeObserver.observe(root, { attributes: true, attributeFilter: ['class'] });

    const visibility = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      play();
    });
    visibility.observe(canvas);

    const onVisibility = () => play();
    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      themeObserver.disconnect();
      visibility.disconnect();
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, [scenes]);

  const active = scenes[view.id];

  return (
    <figure className={className}>
      <div className="flex items-center justify-between gap-4 border-b border-line text-xs">
        <div role="tablist" aria-label="Simulation" className="flex gap-5">
          {ORDER.map((id) => {
            const selected = id === view.id;
            return (
              <button
                key={id}
                type="button"
                role="tab"
                id={`sim-tab-${id}`}
                aria-selected={selected}
                aria-controls="sim-panel"
                onClick={() => controls.current.select(id)}
                className={`-mb-px border-b-2 pb-2 pt-1 font-medium transition-colors ${
                  selected ? 'border-accent text-ink' : 'border-transparent text-muted hover:text-ink'
                }`}
              >
                {scenes[id].tab}
              </button>
            );
          })}
        </div>
        <div className="flex items-center gap-2 pb-1.5 text-muted">
          {!pinned && <span className="hidden sm:inline">Alternating</span>}
          <button
            type="button"
            onClick={() => controls.current.toggle()}
            className="rounded p-1 hover:bg-surface hover:text-ink"
            aria-label={paused ? 'Play animation' : 'Pause animation'}
            title={paused ? 'Play' : 'Pause'}
          >
            {paused ? <Play size={14} strokeWidth={1.75} /> : <Pause size={14} strokeWidth={1.75} />}
          </button>
        </div>
      </div>

      <div id="sim-panel" role="tabpanel" aria-labelledby={`sim-tab-${view.id}`}>
        <div className="relative mt-2 h-[20rem] sm:h-[22rem] lg:h-[25rem]">
          <canvas ref={canvasRef} aria-hidden="true" className="absolute inset-0 h-full w-full" />
        </div>

        <figcaption className="mt-3 text-xs text-muted">
          <ol className="flex flex-wrap gap-x-4 gap-y-1.5" aria-label="Animation stages">
            {active.stages.map((label, index) => (
              <li
                key={label}
                className={`inline-flex items-center gap-1.5 transition-colors ${index === view.stage ? 'text-ink' : ''}`}
                aria-current={index === view.stage ? 'step' : undefined}
              >
                <span
                  aria-hidden="true"
                  className={`h-1.5 w-1.5 rounded-full transition-colors ${
                    index === view.stage ? 'bg-accent' : 'bg-line-strong'
                  }`}
                />
                {label}
              </li>
            ))}
          </ol>

          {active.legend && (
            <ul className="mt-3 flex flex-wrap gap-x-3.5 gap-y-1.5" aria-label="Legend">
              {active.legend.map((item) => (
                <li key={item.label} className="inline-flex items-center gap-1.5">
                  <Swatch item={item} />
                  {item.label}
                </li>
              ))}
            </ul>
          )}

          <p className="mt-3 leading-relaxed">{active.caption(view.subject)}</p>
        </figcaption>
      </div>
    </figure>
  );
}

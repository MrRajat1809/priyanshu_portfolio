import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { projectPath, statusLabels } from '../lib/content';
import { asset } from '../lib/site';

// Status colours reuse the dataset palette from the figures.
const STATUS_TONE = {
  published: 'published',
  released: 'published',
  submitted: 'submitted',
  review: 'submitted',
  ongoing: 'ongoing',
  planned: 'planned',
};

export function StatusTag({ status }) {
  return (
    <span className="inline-flex items-center gap-1.5 whitespace-nowrap text-xs text-muted">
      <span
        aria-hidden="true"
        className="h-2 w-2 rounded-full"
        style={{ backgroundColor: `rgb(var(--status-${STATUS_TONE[status]}))` }}
      />
      {statusLabels[status]}
    </span>
  );
}

export function ExternalLink({ href, children, className = '' }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`link inline-flex items-center gap-0.5 ${className}`}
    >
      {children}
      <ArrowUpRight aria-hidden="true" size={14} strokeWidth={1.75} />
    </a>
  );
}

export function ProjectLink({ slug, children = 'Project page', className = '' }) {
  return (
    <Link
      href={projectPath(slug)}
      className={`group inline-flex items-center gap-1 font-medium text-ink hover:text-accent ${className}`}
    >
      {children}
      <ArrowRight
        aria-hidden="true"
        size={14}
        strokeWidth={1.75}
        className="transition-transform group-hover:translate-x-0.5"
      />
    </Link>
  );
}

// Fades content up once when it first enters the viewport. Without JavaScript
// the content is simply visible (see .js .reveal in globals.css).
export function Reveal({ as: Tag = 'div', delay = 0, className = '', style, children, ...rest }) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element || !('IntersectionObserver' in window)) {
      setShown(true);
      return undefined;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          observer.disconnect();
        }
      },
      { rootMargin: '0px 0px -6% 0px' }
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      className={`reveal ${shown ? 'is-shown' : ''} ${className}`}
      style={delay ? { ...style, transitionDelay: `${delay}ms` } : style}
      {...rest}
    >
      {children}
    </Tag>
  );
}

export function Section({ id, letter, title, children }) {
  return (
    <section id={id} className="border-t border-line">
      <div className="container-page py-20 sm:py-24">
        <Reveal as="h2" className="mb-10 flex items-baseline gap-3 text-3xl font-semibold tracking-tight sm:text-4xl">
          <span className="font-sans text-base font-normal text-muted">{letter}.</span>
          {title}
        </Reveal>
        {children}
      </div>
    </section>
  );
}

export function Eyebrow({ children }) {
  return <p className="text-xs font-medium uppercase tracking-[0.12em] text-muted">{children}</p>;
}

// A paper figure. With `to`, the image links to that page; otherwise it opens
// the full-size file.
export function Figure({ figure, to, className = '', priority = false }) {
  const image = (
    // Static export: next/image optimisation is disabled, so a plain img is used.
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={asset(figure.src)}
      width={figure.width}
      height={figure.height}
      alt={figure.alt}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      className="figure-img h-auto w-full rounded border border-line transition-shadow hover:shadow-[0_6px_24px_-12px_rgb(0_0_0/0.35)]"
    />
  );
  return (
    <figure className={className}>
      {to ? (
        <Link href={to} className="block">
          {image}
        </Link>
      ) : (
        <a href={asset(figure.src)} target="_blank" rel="noopener noreferrer" className="block" title="Open full size">
          {image}
        </a>
      )}
      <figcaption className="mt-3 text-xs leading-relaxed text-muted">
        <span className="font-medium text-ink">{figure.label}.</span> {figure.caption}
      </figcaption>
    </figure>
  );
}

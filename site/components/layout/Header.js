import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Menu, Monitor, Moon, Sun, X } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeProvider';
import { links, profile } from '../../lib/content';
import { asset } from '../../lib/site';

const NAV = [
  { id: 'research', label: 'Research' },
  { id: 'work', label: 'Work' },
  { id: 'publications', label: 'Publications' },
  { id: 'methods', label: 'Methods' },
  { id: 'about', label: 'About' },
  { id: 'contact', label: 'Contact' },
];

const THEME_CYCLE = {
  system: { next: 'light', Icon: Monitor, label: 'Theme: system' },
  light: { next: 'dark', Icon: Sun, label: 'Theme: light' },
  dark: { next: 'system', Icon: Moon, label: 'Theme: dark' },
};

function ThemeButton() {
  const { theme, setTheme } = useTheme();
  const { next, Icon, label } = THEME_CYCLE[theme] || THEME_CYCLE.system;
  return (
    <button
      type="button"
      onClick={() => setTheme(next)}
      className="rounded p-2 text-muted hover:bg-surface hover:text-ink"
      aria-label={`${label}. Switch to ${next}.`}
      title={label}
    >
      <Icon size={16} strokeWidth={1.75} />
    </button>
  );
}

// On the home page section links are in-page anchors; on project pages they
// lead back to the matching section of the home page.
export default function Header({ home = true }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!home) return undefined;
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && setActive(entry.target.id)),
      { rootMargin: '-40% 0px -55% 0px' }
    );
    NAV.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });
    return () => observer.disconnect();
  }, [home]);

  const sectionHref = (id) => (home ? `#${id}` : `/#${id}`);

  const linkClass = (id) =>
    active === id ? 'text-ink underline decoration-accent decoration-2' : 'text-muted hover:text-ink';

  return (
    <header
      className={`sticky top-0 z-40 border-b transition-colors ${
        scrolled ? 'border-line bg-bg/95 backdrop-blur' : 'border-transparent bg-bg'
      }`}
    >
      <div className="container-page flex h-16 items-center justify-between">
        <Link href={home ? '#top' : '/'} className="font-serif text-lg font-semibold tracking-tight">
          {profile.name}
        </Link>

        <nav aria-label="Sections" className="hidden items-center gap-6 text-sm md:flex">
          {NAV.map(({ id, label }) => (
            <Link key={id} href={sectionHref(id)} className={`underline-offset-[6px] ${linkClass(id)}`}>
              {label}
            </Link>
          ))}
          <a href={asset(links.cv)} className="text-muted hover:text-ink">
            CV
          </a>
          <ThemeButton />
        </nav>

        <div className="flex items-center gap-1 md:hidden">
          <ThemeButton />
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            className="rounded p-2 text-muted hover:bg-surface hover:text-ink"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? 'Close menu' : 'Open menu'}
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {open && (
        <nav id="mobile-nav" aria-label="Sections" className="border-t border-line bg-bg md:hidden">
          <ul className="container-page py-3 text-sm">
            {[...NAV, { id: 'cv', label: 'CV' }].map(({ id, label }) => (
              <li key={id}>
                {id === 'cv' ? (
                  <a href={asset(links.cv)} className={`block py-2 ${linkClass(id)}`}>
                    {label}
                  </a>
                ) : (
                  <Link href={sectionHref(id)} onClick={() => setOpen(false)} className={`block py-2 ${linkClass(id)}`}>
                    {label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}

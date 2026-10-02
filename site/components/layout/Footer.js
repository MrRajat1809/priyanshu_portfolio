import { burden, profile, updated } from '../../lib/content';

export default function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="container-page flex flex-col gap-3 py-8 text-xs text-muted sm:flex-row sm:justify-between">
        <p>
          © {updated.slice(-4)} {profile.name}. Updated {updated}.
        </p>
        <p className="sm:text-right">
          Map: GBD 2017 estimates, Rudd et al., Lancet 2020 ({burden.license}). Boundaries: Natural Earth.
        </p>
      </div>
    </footer>
  );
}

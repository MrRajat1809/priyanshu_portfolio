import { Download, Mail } from 'lucide-react';
import SepsisMap from '../visuals/SepsisMap';
import HeroSimulations from '../visuals/HeroSimulations';
import { ExternalLink, Eyebrow, Reveal } from '../ui';
import { burden, links, profile } from '../../lib/content';
import { asset } from '../../lib/site';

export default function Hero() {
  return (
    <section id="top">
      <div className="container-page grid gap-10 pb-16 pt-14 sm:pt-20 lg:grid-cols-12 lg:items-center lg:gap-12">
        <div className="lg:col-span-7">
          <Reveal>
            <Eyebrow>{profile.focus}</Eyebrow>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">{profile.name}</h1>
          </Reveal>

          <Reveal delay={120} className="mt-6 space-y-4 text-lg leading-relaxed">
            {profile.statement.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </Reveal>

          <Reveal delay={220}>
            <p className="mt-5 text-sm text-muted">{profile.affiliation}</p>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm">
              <a
                href={asset(links.cv)}
                className="inline-flex items-center gap-2 rounded border border-ink bg-bg px-4 py-2 font-medium hover:bg-ink hover:text-bg"
              >
                <Download aria-hidden="true" size={15} strokeWidth={1.75} />
                Curriculum vitae
              </a>
              <a href={`mailto:${profile.email}`} className="link inline-flex items-center gap-1.5">
                <Mail aria-hidden="true" size={15} strokeWidth={1.75} />
                {profile.email}
              </a>
              <ExternalLink href={links.github}>GitHub</ExternalLink>
              <ExternalLink href={links.orcid}>ORCID</ExternalLink>
              <ExternalLink href={links.linkedin}>LinkedIn</ExternalLink>
            </div>
          </Reveal>
        </div>

        <Reveal delay={300} className="lg:col-span-5">
          <HeroSimulations />
        </Reveal>
      </div>

      <div className="container-page pb-20">
        <figure className="border-t border-line pt-8">
          <Reveal className="mb-6 flex flex-wrap items-end justify-between gap-4">
            <div>
              <Eyebrow>Global context</Eyebrow>
              <h2 className="mt-2 font-sans text-lg font-medium">{burden.title}</h2>
              <p className="mt-1 text-sm text-muted">{burden.measure}</p>
            </div>
            <p className="max-w-sm text-sm text-muted">{burden.note}</p>
          </Reveal>

          <SepsisMap />

          <dl className="mt-10 grid grid-cols-2 gap-px overflow-hidden border-y border-line bg-line lg:grid-cols-4">
            {burden.stats.map((stat, index) => (
              <Reveal key={stat.label} delay={index * 90} className="bg-bg py-5 pr-4 lg:px-5 lg:first:pl-0">
                <dt className="sr-only">{stat.label}</dt>
                <dd>
                  <p className="num font-serif text-3xl font-semibold tracking-tight sm:text-4xl">{stat.value}</p>
                  <p className="mt-1 text-sm">{stat.label}</p>
                  <p className="num mt-1 text-xs text-muted">95% UI {stat.ui}</p>
                </dd>
              </Reveal>
            ))}
          </dl>

          <figcaption className="mt-5 max-w-4xl text-xs leading-relaxed text-muted">
            Source: {burden.citation}{' '}
            <a className="link" href={`https://doi.org/${burden.doi}`} target="_blank" rel="noopener noreferrer">
              doi:{burden.doi}
            </a>
            . Licensed {burden.license}. {burden.method}{' '}
            <a className="link" href={asset(burden.csv)}>
              Data (CSV)
            </a>
            {' · '}
            <a className="link" href={burden.script} target="_blank" rel="noopener noreferrer">
              Build script
            </a>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}

import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import SEO from '../../components/layout/SEO';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import { ExternalLink, Eyebrow, Figure, Reveal, StatusTag } from '../../components/ui';
import { projectPath, projects } from '../../lib/content';
import { readNotes } from '../../lib/notes';

export function getStaticPaths() {
  return { paths: projects.map(({ slug }) => ({ params: { slug } })), fallback: false };
}

export function getStaticProps({ params }) {
  return { props: { slug: params.slug, notes: readNotes(params.slug) } };
}

function Neighbour({ project, direction }) {
  if (!project) return <span />;
  const next = direction === 'next';
  return (
    <Link
      href={projectPath(project.slug)}
      className={`group flex flex-col gap-1 rounded border border-line p-5 hover:border-line-strong ${
        next ? 'text-right sm:col-start-2' : ''
      }`}
    >
      <span className={`inline-flex items-center gap-1.5 text-xs text-muted ${next ? 'justify-end' : ''}`}>
        {!next && <ArrowLeft aria-hidden="true" size={13} />}
        {next ? 'Next project' : 'Previous project'}
        {next && <ArrowRight aria-hidden="true" size={13} />}
      </span>
      <span className="font-serif text-lg font-semibold group-hover:text-accent">{project.title}</span>
    </Link>
  );
}

export default function ProjectPage({ slug, notes }) {
  const index = projects.findIndex((project) => project.slug === slug);
  const project = projects[index];

  return (
    <>
      <SEO title={project.title} description={project.summary[0]} path={projectPath(slug)} />
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:bg-bg focus:px-3 focus:py-2"
      >
        Skip to content
      </a>
      <Header home={false} />

      <main id="main">
        <article>
          <header className="container-page pb-12 pt-10 sm:pt-14">
            <nav aria-label="Breadcrumb" className="text-sm">
              <Link href="/#work" className="inline-flex items-center gap-1.5 text-muted hover:text-ink">
                <ArrowLeft aria-hidden="true" size={14} strokeWidth={1.75} />
                Selected work
              </Link>
            </nav>

            <Reveal className="mt-8">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                <StatusTag status={project.status} />
                <span className="text-xs text-muted">{project.venue}</span>
              </div>
              <h1 className="mt-4 max-w-4xl text-4xl font-semibold tracking-tight sm:text-5xl">{project.title}</h1>
              <p className="mt-3 max-w-3xl text-lg text-muted">{project.subtitle}</p>
              <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm">
                {project.links.map((link) => (
                  <ExternalLink key={link.href} href={link.href}>
                    {link.label}
                  </ExternalLink>
                ))}
              </div>
            </Reveal>
          </header>

          <section aria-labelledby="overview" className="border-t border-line">
            <div className="container-page grid gap-12 py-14 lg:grid-cols-12">
              <Reveal className="lg:col-span-7">
                <h2 id="overview" className="sr-only">
                  Overview
                </h2>
                <div className="space-y-4 text-lg leading-relaxed">
                  {project.summary.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
                <p className="mt-8 text-sm leading-relaxed text-muted">{project.methods.join(' · ')}</p>
              </Reveal>

              <Reveal delay={120} className="lg:col-span-5">
                <dl className="divide-y divide-line border-y border-line text-sm">
                  {project.facts.map(([term, value]) => (
                    <div key={term} className="grid grid-cols-5 gap-4 py-3">
                      <dt className="col-span-2 text-muted">{term}</dt>
                      <dd className="col-span-3">{value}</dd>
                    </div>
                  ))}
                </dl>
              </Reveal>
            </div>
          </section>

          <section aria-labelledby="figures" className="border-t border-line">
            <div className="container-page py-14">
              <h2 id="figures" className="sr-only">
                Figures
              </h2>
              <div className="space-y-16">
                {project.figures.map((figure, position) => (
                  <Reveal key={figure.src}>
                    <Figure figure={figure} priority={position === 0} />
                  </Reveal>
                ))}
              </div>
            </div>
          </section>

          {notes && (
            <section aria-labelledby="notes" className="border-t border-line">
              <div className="container-page py-16">
                <div className="mx-auto max-w-[68ch]">
                  {notes.title && <Eyebrow>Notes</Eyebrow>}
                  <h2 id="notes" className={`text-3xl font-semibold tracking-tight ${notes.title ? 'mt-3' : ''}`}>
                    {notes.title || 'Notes'}
                  </h2>
                  <p className="mt-2 text-sm text-muted">
                    {notes.updated ? `Updated ${notes.updated} · ` : ''}
                    {notes.minutes} min read
                  </p>
                  <div className="article mt-10" dangerouslySetInnerHTML={{ __html: notes.html }} />
                </div>
              </div>
            </section>
          )}
        </article>

        <nav aria-label="More projects" className="border-t border-line">
          <div className="container-page grid gap-4 py-12 sm:grid-cols-2">
            <Neighbour project={projects[index - 1]} direction="previous" />
            <Neighbour project={projects[index + 1]} direction="next" />
          </div>
        </nav>
      </main>

      <Footer />
    </>
  );
}

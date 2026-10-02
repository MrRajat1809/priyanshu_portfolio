import Link from 'next/link';
import { ExternalLink, Figure, ProjectLink, Reveal, Section, StatusTag } from '../ui';
import { projectPath, projects } from '../../lib/content';

function Feature({ project }) {
  const path = projectPath(project.slug);
  return (
    <Reveal as="article" id={project.slug} className="grid gap-10 lg:grid-cols-12">
      <div className="lg:col-span-5">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
          <StatusTag status={project.status} />
          <span className="text-xs text-muted">{project.venue}</span>
        </div>
        <h3 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">
          <Link href={path} className="hover:text-accent">
            {project.title}
          </Link>
        </h3>
        <p className="mt-1 text-muted">{project.subtitle}</p>

        <div className="mt-6 space-y-4 leading-relaxed">
          {project.summary.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>

        <dl className="mt-7 divide-y divide-line border-y border-line text-sm">
          {project.facts.map(([term, value]) => (
            <div key={term} className="grid grid-cols-5 gap-4 py-2.5">
              <dt className="col-span-2 text-muted">{term}</dt>
              <dd className="col-span-3">{value}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
          <ProjectLink slug={project.slug} />
          {project.links.map((link) => (
            <ExternalLink key={link.href} href={link.href}>
              {link.label}
            </ExternalLink>
          ))}
        </div>
      </div>

      <Figure figure={project.figures[0]} to={path} className="lg:col-span-7" />
    </Reveal>
  );
}

function Compact({ project, className = '' }) {
  return (
    <div className={className}>
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
        <StatusTag status={project.status} />
        <span className="text-xs text-muted">{project.venue}</span>
      </div>
      <h3 className="mt-3 text-xl font-semibold">
        <Link href={projectPath(project.slug)} className="hover:text-accent">
          {project.title}
        </Link>
      </h3>
      <p className="mt-1 text-sm text-muted">{project.subtitle}</p>
      <p className="mt-4 leading-relaxed">{project.summary[0]}</p>
      <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm">
        <ProjectLink slug={project.slug} />
        {project.links.map((link) => (
          <ExternalLink key={link.href} href={link.href}>
            {link.label}
          </ExternalLink>
        ))}
      </div>
    </div>
  );
}

export default function SelectedWork() {
  const featured = projects.filter((project) => project.tier === 'featured');
  const resources = projects.filter((project) => project.tier === 'resource');
  const other = projects.filter((project) => project.tier === 'other');

  return (
    <Section id="work" letter="B" title="Selected work">
      <div className="space-y-24">
        {featured.map((project) => (
          <Feature key={project.slug} project={project} />
        ))}
      </div>

      <Reveal className="mt-24 grid gap-12 border-t border-line pt-10 lg:grid-cols-12">
        {resources.map((project) => (
          <Compact key={project.slug} project={project} className="lg:col-span-7" />
        ))}

        <aside className="lg:col-span-5">
          <h3 className="font-sans text-xs font-medium uppercase tracking-[0.12em] text-muted">Other research</h3>
          <ul className="mt-4 space-y-5">
            {other.map((project) => (
              <li key={project.slug} className="text-sm">
                <Link href={projectPath(project.slug)} className="font-medium hover:text-accent">
                  {project.title}
                </Link>
                <p className="mt-1 leading-relaxed text-muted">{project.summary[0]}</p>
                <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1">
                  <StatusTag status={project.status} />
                  <span className="text-xs text-muted">{project.venue}</span>
                </div>
              </li>
            ))}
          </ul>
        </aside>
      </Reveal>
    </Section>
  );
}

import { ExternalLink, ProjectLink, Reveal, Section, StatusTag } from '../ui';
import { profile, publications } from '../../lib/content';

const SELF = 'Kumar P';

function Citation({ entry }) {
  return (
    <li className="grid gap-3 py-5 sm:grid-cols-12 sm:gap-6">
      <div className="sm:col-span-9">
        <p className="leading-relaxed">
          {entry.authors.map((author, index) => (
            <span key={author}>
              {index > 0 && ', '}
              {author === SELF ? <strong className="font-semibold">{author}</strong> : author}
            </span>
          ))}
          . {entry.title} <em>{entry.venue}</em>. {entry.details}
        </p>
        <div className="mt-2 flex flex-wrap gap-x-5 gap-y-1 text-sm">
          {entry.project && <ProjectLink slug={entry.project} />}
          {entry.doi && <ExternalLink href={`https://doi.org/${entry.doi}`}>doi:{entry.doi}</ExternalLink>}
          {entry.code && <ExternalLink href={entry.code}>Code</ExternalLink>}
        </div>
      </div>
      <div className="sm:col-span-3 sm:pt-1 sm:text-right">
        <StatusTag status={entry.status} />
      </div>
    </li>
  );
}

function Group({ title, entries }) {
  return (
    <Reveal>
      <h3 className="font-sans text-xs font-medium uppercase tracking-[0.12em] text-muted">{title}</h3>
      <ol className="mt-3 divide-y divide-line border-y border-line">
        {entries.map((entry) => (
          <Citation key={entry.title} entry={entry} />
        ))}
      </ol>
    </Reveal>
  );
}

export default function Publications() {
  return (
    <Section id="publications" letter="C" title="Publications">
      <div className="space-y-12">
        <Group title="Articles" entries={publications.articles} />
        <Group title="Datasets" entries={publications.datasets} />
      </div>
      <p className="mt-8 text-sm text-muted">
        ORCID{' '}
        <a className="link" href={`https://orcid.org/${profile.orcid}`} target="_blank" rel="noopener noreferrer">
          {profile.orcid}
        </a>
      </p>
    </Section>
  );
}

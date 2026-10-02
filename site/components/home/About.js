import { Reveal, Section } from '../ui';
import { about } from '../../lib/content';

function Timeline({ title, entries }) {
  return (
    <div>
      <h3 className="font-sans text-xs font-medium uppercase tracking-[0.12em] text-muted">{title}</h3>
      <ul className="mt-3 space-y-4">
        {entries.map((entry) => (
          <li key={entry.title} className="border-l border-line pl-4 text-sm">
            <p className="num text-xs text-muted">{entry.period}</p>
            <p className="mt-1 font-medium">{entry.title}</p>
            <p className="text-muted">{entry.org}</p>
            {entry.detail && <p className="mt-1 leading-relaxed text-muted">{entry.detail}</p>}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function About() {
  return (
    <Section id="about" letter="E" title="About">
      <div className="grid gap-14 lg:grid-cols-12">
        <Reveal className="lg:col-span-7">
          <div className="space-y-4 text-lg leading-relaxed">
            {about.bio.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          <h3 className="mt-12 font-sans text-xs font-medium uppercase tracking-[0.12em] text-muted">
            Working practice
          </h3>
          <ul className="mt-4 divide-y divide-line border-y border-line">
            {about.practice.map((item) => (
              <li key={item} className="py-3 text-sm leading-relaxed">
                {item}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={120} className="space-y-10 lg:col-span-5">
          <Timeline title="Education" entries={about.education} />
          <Timeline title="Research experience" entries={about.experience} />
          <Timeline title="Certification" entries={about.certification} />
        </Reveal>
      </div>
    </Section>
  );
}

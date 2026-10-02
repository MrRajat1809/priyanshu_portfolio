import { Download } from 'lucide-react';
import { ExternalLink, Reveal, Section } from '../ui';
import { links, profile } from '../../lib/content';
import { asset } from '../../lib/site';

export default function Contact() {
  return (
    <Section id="contact" letter="F" title="Contact">
      <Reveal>
        <p className="text-muted">Research correspondence</p>
        <a
          href={`mailto:${profile.email}`}
          className="mt-2 inline-block break-all font-serif text-2xl underline decoration-line-strong underline-offset-8 hover:decoration-accent sm:text-3xl"
        >
          {profile.email}
        </a>

        <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3 text-sm">
          <a href={asset(links.cv)} className="link inline-flex items-center gap-1.5">
            <Download aria-hidden="true" size={14} strokeWidth={1.75} />
            Curriculum vitae (PDF)
          </a>
          <ExternalLink href={links.github}>GitHub · MrRajat1809</ExternalLink>
          <ExternalLink href={links.orcid}>ORCID · {profile.orcid}</ExternalLink>
          <ExternalLink href={links.linkedin}>LinkedIn</ExternalLink>
        </div>
      </Reveal>
    </Section>
  );
}

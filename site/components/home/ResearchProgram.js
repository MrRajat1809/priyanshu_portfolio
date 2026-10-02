import { Reveal, Section, StatusTag } from '../ui';
import { program } from '../../lib/content';

export default function ResearchProgram() {
  return (
    <Section id="research" letter="A" title="Research program">
      <Reveal as="p" className="max-w-3xl text-lg leading-relaxed">
        {program.intro}
      </Reveal>

      <ol className="mt-12 grid gap-px overflow-hidden rounded border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
        {program.stages.map((stage, index) => (
          <li key={stage.scale} className="bg-bg">
            <Reveal delay={index * 110} className="flex h-full flex-col p-6">
              <div className="flex items-center justify-between gap-3">
                <span className="text-xs font-medium uppercase tracking-[0.12em] text-muted">
                  {index + 1}. {stage.scale}
                </span>
                <StatusTag status={stage.status} />
              </div>
              <h3 className="mt-4 text-xl font-semibold">{stage.title}</h3>
              <ul className="mt-4 space-y-2.5 text-sm leading-relaxed text-muted">
                {stage.items.map((item) => (
                  <li key={item} className="border-l border-line pl-3">
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          </li>
        ))}
      </ol>
    </Section>
  );
}

import { Reveal, Section } from '../ui';
import { methods } from '../../lib/content';

export default function Methods() {
  return (
    <Section id="methods" letter="D" title="Methods and tools">
      <div className="grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
        {methods.map((group, index) => (
          <Reveal key={group.area} delay={(index % 3) * 90} className="border-t border-line pt-4">
            <h3 className="font-sans text-base font-medium">{group.area}</h3>
            <ul className="mt-3 space-y-1.5 text-sm text-muted">
              {group.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

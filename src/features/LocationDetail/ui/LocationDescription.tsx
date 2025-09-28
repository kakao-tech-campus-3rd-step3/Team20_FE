import type { LocationDescriptionProps } from '../model/types';

export function LocationDescription({ description, quickFacts }: LocationDescriptionProps) {
  return (
    <section className="bg-brand-primary">
      <article className="p-8 rounded-16 shadow-custom-light">
        {quickFacts?.length ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {quickFacts.map((fact) => (
              <p key={fact.label} className="font-semibold text-body-small text-text-secondary">
                {fact.label}: {fact.value}
              </p>
            ))}
          </div>
        ) : null}

        <p className="text-body leading-26 text-text-primary whitespace-pre-line">{description}</p>
      </article>
    </section>
  );
}

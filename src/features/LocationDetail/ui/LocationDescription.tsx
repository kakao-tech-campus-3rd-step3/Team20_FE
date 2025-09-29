import type { LocationDescriptionProps } from '../model/types';

export function LocationDescription({ description, quickFacts }: LocationDescriptionProps) {
  return (
    <section>
      <article className="mx-auto max-w-[800px] p-8 rounded-16 shadow-custom-light">
        {quickFacts?.length ? (
          <div className="grid grid-cols-1 md:grid-rows-3 gap-4 mb-16">
            {quickFacts.map((fact) => (
              <p key={fact.label} className="font-semibold text-body-small text-text-secondary">
                {fact.label}: {fact.value}
              </p>
            ))}
          </div>
        ) : null}
        <h1 className="text-heading-1 font-bold">장소 설명</h1>
        <p className="text-body leading-26 text-text-primary whitespace-pre-line">{description}</p>
      </article>
    </section>
  );
}

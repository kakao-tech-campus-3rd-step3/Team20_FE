'use client';

import { useLocationDetail } from '@/entities/location/api/queryfn';

interface LocationDescriptionProps {
  locationId: string;
}

export function LocationDescription({ locationId }: LocationDescriptionProps) {
  const { data: location, isLoading, isError } = useLocationDetail(locationId);

  if (isLoading) {
    return (
      <section>
        <article className="mx-auto max-w-[800px] p-8 rounded-16 shadow-custom-light">
          <div className="text-[var(--color-text-secondary)]">로딩 중...</div>
        </article>
      </section>
    );
  }

  if (isError || !location) {
    return (
      <section>
        <article className="mx-auto max-w-[800px] p-8 rounded-16 shadow-custom-light">
          <div className="text-[var(--color-text-secondary)]">위치 정보를 불러올 수 없습니다.</div>
        </article>
      </section>
    );
  }

  const description = location.description || '설명이 없습니다.';
  const quickFacts = location.quickFacts || [];
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

'use client';

import { messages } from '../../model/messages';
import { useState } from 'react';
import { CitySelector } from '../CitySelector/CitySelector';
import { MapPreview } from '../MapPreview/MapPreview';
import { SpotCard } from '../SpotCard/SpotCard';
import { cities } from '../../model/types';
import Link from 'next/link';

export function SpotPreview() {
  const [selected, setSelected] = useState<(typeof cities)[number]>('All');

  return (
    <section className="py-[var(--spacing-8)]">
      <div className="mb-[var(--spacing-4)] flex items-center justify-between">
        <h2 className="text-heading-4 text-[var(--color-text-primary)]">
          {messages.mapSectionTitle}
        </h2>
        <CitySelector
          cities={cities}
          selected={selected}
          onSelect={(city) => setSelected(city as (typeof cities)[number])}
        />
      </div>

      <div className="rounded-2xl border border-[var(--color-border-primary)] bg-[var(--color-background-primary)] overflow-hidden shadow-[var(--shadow-card)]">
        <div className="grid md:grid-cols-[1.2fr_1fr]">
          <MapPreview city={selected} />
          <SpotCard />
        </div>
      </div>

      <div className="mt-[var(--spacing-4)] text-right">
        <Link
          href="/map"
          className="text-link text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"
        >
          {messages.openFullMap}
        </Link>
      </div>
    </section>
  );
}

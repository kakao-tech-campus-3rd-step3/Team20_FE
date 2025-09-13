import { messages } from '../model/messages';
import { useState } from 'react';
import { CitySelector } from './CitySelector';
import { MapPreview } from './MapPreview';
import { SpotCard } from './SpotCard';
import { cities } from '../model/types';
import { Link } from 'react-router-dom';

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
          to="/map"
          className="text-link text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"
        >
          {messages.openFullMap}
        </Link>
      </div>
    </section>
  );
}

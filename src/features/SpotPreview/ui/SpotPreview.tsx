import { messages } from '../model/messages';
import { useState } from 'react';
import { CitySelector } from './CitySelector';
import { MapPreview } from './MapPreview';
import { SpotCard } from './SpotCard';
import { cities } from '../model/types';

export function SpotPreview() {
  const [selected, setSelected] = useState<(typeof cities)[number]>('All');

  return (
    <section className="py-10">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold">{messages.mapSectionTitle}</h2>
        <CitySelector
          cities={cities}
          selected={selected}
          onSelect={(city) => setSelected(city as (typeof cities)[number])}
        />
      </div>

      <div className="rounded-2xl border overflow-hidden">
        <div className="grid md:grid-cols-[1.2fr_1fr]">
          <MapPreview city={selected} />
          <SpotCard />
        </div>
      </div>

      <div className="mt-4 text-right">
        <a href="/map" className="text-sm underline text-gray-700 hover:text-gray-900">
          {messages.openFullMap}
        </a>
      </div>
    </section>
  );
}

'use client';

import type { CitySelectorProps } from '../../model/types';

export function CitySelector({ cities, selected, onSelect }: CitySelectorProps) {
  return (
    <div className="flex gap-[var(--spacing-2)]">
      {cities.map((city) => (
        <button
          key={city}
          onClick={() => onSelect(city)}
          className={`px-[var(--spacing-button-padding-x)] py-[var(--spacing-button-padding-y)] rounded-full text-button transition duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-border-focus)] ${
            selected === city
              ? 'bg-[var(--color-brand-secondary)] text-[var(--color-text-inverse)] shadow-[var(--shadow-button)] hover:shadow-[var(--shadow-button-hover)]'
              : 'border border-[var(--color-border-primary)] bg-[var(--color-background-primary)] text-[var(--color-text-primary)] hover:bg-[var(--color-background-secondary)]'
          }`}
        >
          {city}
        </button>
      ))}
    </div>
  );
}

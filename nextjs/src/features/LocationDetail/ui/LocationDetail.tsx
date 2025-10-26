'use client';

import { LocationHero } from './LocationHero';
import { LocationDescription } from './LocationDescription';
import { LocationRelatedContents } from './LocationRelatedContents';

interface LocationDetailProps {
  locationId: string;
}

export function LocationDetail({ locationId }: LocationDetailProps) {
  return (
    <div className="min-h-screen bg-[var(--color-background-primary)]">
      <LocationHero locationId={locationId} />
      <div className="max-w-7xl mx-auto px-[var(--spacing-4)] py-[var(--spacing-8)]">
        <LocationDescription locationId={locationId} />
        <LocationRelatedContents locationId={locationId} />
      </div>
    </div>
  );
}

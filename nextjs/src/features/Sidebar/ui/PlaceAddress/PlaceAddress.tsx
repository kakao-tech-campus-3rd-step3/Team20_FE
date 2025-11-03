import { MapPin } from 'lucide-react';

export function PlaceAddress({ address }: { address: string }) {
  return (
    <div className="flex items-center text-[var(--color-text-secondary)] text-body-small mb-[var(--spacing-2)]">
      <MapPin className="w-3 h-3 mr-[var(--spacing-1)] flex-shrink-0 text-[var(--color-text-tertiary)]" />
      <span className="truncate">{address}</span>
    </div>
  );
}

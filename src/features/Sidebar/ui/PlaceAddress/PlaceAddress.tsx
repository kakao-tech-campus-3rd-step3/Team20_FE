import { MapPin } from 'lucide-react';

export function PlaceAddress({ address }: { address: string }) {
  return (
    <div className="flex items-center text-(--color-text-secondary) text-body-small mb-(--spacing-2)">
      <MapPin className="w-3 h-3 mr-(--spacing-1) flex-shrink-0 text-(--color-text-tertiary)" />
      <span className="truncate">{address}</span>
    </div>
  );
}

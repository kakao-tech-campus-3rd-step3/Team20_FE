import { PlaceCard } from '@/features/Sidebar/ui/PlaceCard';
import type { PlaceListProps } from '@/features/Sidebar/model/types';
import { MOCK_PLACES } from '@/__mocks__/mockPlace';

export function PlaceList({ places = MOCK_PLACES, className }: PlaceListProps) {
  return (
    <div className={'divide-y divide-gray-100 ' + (className ?? '')}>
      {places.map((place, index) => (
        <PlaceCard
          key={place.id}
          name={place.name}
          address={place.address}
          tags={place.tags}
          rating={place.rating}
          thumbnailUrl={place.thumbnailUrl}
          badgeNumber={index + 1}
        />
      ))}
    </div>
  );
}

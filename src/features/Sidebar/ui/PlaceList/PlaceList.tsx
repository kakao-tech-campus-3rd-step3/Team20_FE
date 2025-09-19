import { PlaceCard } from '../PlaceCard/PlaceCard';
import type { PlaceListProps } from '../../model/types';

export function PlaceList({ places = [], className }: PlaceListProps) {
  return (
    <div className={['divide-y divide-(--color-border-primary)', className ?? ''].join(' ')}>
      {places.map((place, index) => (
        <PlaceCard
          key={place.locationId}
          name={place.name}
          address={place.address}
          description={place.description}
          locationImage={place.locationImage}
          latitude={place.latitude}
          longitude={place.longitude}
          relatedContents={place.relatedContents}
          badgeNumber={index + 1}
        />
      ))}
    </div>
  );
}

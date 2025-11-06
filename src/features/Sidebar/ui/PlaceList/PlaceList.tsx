import { PlaceCard } from '../PlaceCard/PlaceCard';
import { usePlaceListScroll } from '../../model/hooks/usePlaceListScroll';
import type { PlaceListProps } from '../../model/types';
import { ROUTE_BUTTON_TEXT } from '@/features/RoutePlanning/model/messages';
import { cn } from '@/shared/lib';

export function PlaceList({
  places = [],
  className,
  onPlaceClick,
  onAddToRoute,
  routePlaces = [],
  selectedPlace,
}: PlaceListProps) {
  const { setItemRef } = usePlaceListScroll(selectedPlace, places);
  return (
    <div className={cn('divide-y divide-(--color-border-primary)', className)}>
      {places.map((place, index) => {
        const isInRoute = routePlaces.some(
          (routePlace) => routePlace.locationId === place.locationId,
        );
        const isSelected = selectedPlace?.locationId === place.locationId;
        const uniqueKey = String(place.locationId ?? `place-${index}`);

        return (
          <div key={uniqueKey} ref={setItemRef(uniqueKey)}>
            <PlaceCard
              name={place.name}
              address={place.address}
              description={place.description}
              locationImage={place.imageUrl[0]}
              latitude={place.latitude}
              longitude={place.longitude}
              relatedContents={place.relatedContents}
              badgeNumber={index + 1}
              onClick={() => onPlaceClick?.(place)}
              isInRoute={isInRoute}
            />
            {isSelected && onAddToRoute && (
              <div className="p-(--spacing-4) bg-(--color-background-secondary) border-b border-(--color-border-primary)">
                <button
                  onClick={() => onAddToRoute(place)}
                  className={cn(
                    'w-full flex items-center justify-center gap-(--spacing-2)',
                    'px-(--spacing-4) py-(--spacing-3) rounded-lg text-sm font-medium',
                    'transition-all duration-200 shadow-(--shadow-button)',
                    'hover:shadow-(--shadow-button-hover)',
                    isInRoute
                      ? 'bg-(--color-semantic-success)/10 text-(--color-semantic-success) border border-(--color-semantic-success)/20'
                      : 'bg-(--color-brand-secondary) text-(--color-text-inverse) hover:bg-(--color-brand-tertiary)',
                  )}
                >
                  {isInRoute ? (
                    <>
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {ROUTE_BUTTON_TEXT.ADDED_TO_ROUTE}
                    </>
                  ) : (
                    <>
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                        />
                      </svg>
                      {ROUTE_BUTTON_TEXT.ADD_TO_ROUTE}
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

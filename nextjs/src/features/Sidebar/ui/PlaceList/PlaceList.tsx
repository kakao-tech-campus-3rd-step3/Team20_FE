import { PlaceCard } from '../PlaceCard/PlaceCard';
import type { PlaceListProps } from '../../model/types';
import { ROUTE_BUTTON_TEXT } from '../../model/messages';

export function PlaceList({
  places = [],
  className,
  onPlaceClick,
  onAddToRoute,
  routePlaces = [],
  selectedPlace,
}: PlaceListProps) {
  return (
    <div
      className={['divide-y divide-[var(--color-border-primary)]', className].filter(Boolean).join(' ')}
    >
      {places.map((place, index) => {
        const isInRoute = routePlaces.some(
          (routePlace) => routePlace.locationId === place.locationId,
        );
        const isSelected = selectedPlace?.locationId === place.locationId;

        return (
          <div key={place.locationId}>
            <PlaceCard
              name={place.name}
              address={place.address}
              description={place.description}
              locationImage={place.imageUrl && place.imageUrl.length > 0 ? place.imageUrl[0] : place.locationImage}
              latitude={place.latitude}
              longitude={place.longitude}
              relatedContents={place.relatedContents}
              badgeNumber={index + 1}
              onClick={() => onPlaceClick?.(place)}
              isInRoute={isInRoute}
            />
            {isSelected && onAddToRoute && (
              <div className="p-[var(--spacing-4)] bg-[var(--color-background-secondary)] border-b border-[var(--color-border-primary)]">
                <button
                  onClick={() => onAddToRoute(place)}
                  className={[
                    'w-full flex items-center justify-center gap-[var(--spacing-2)]',
                    'px-[var(--spacing-4)] py-[var(--spacing-3)] rounded-lg text-sm font-medium',
                    'transition-all duration-200 shadow-[var(--shadow-button)]',
                    'hover:shadow-[var(--shadow-button-hover)]',
                    isInRoute
                      ? 'bg-[var(--color-semantic-success)]/10 text-[var(--color-semantic-success)] border border-[var(--color-semantic-success)]/20'
                      : 'bg-[var(--color-brand-secondary)] text-[var(--color-text-inverse)] hover:bg-[var(--color-brand-tertiary)]',
                  ].join(' ')}
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

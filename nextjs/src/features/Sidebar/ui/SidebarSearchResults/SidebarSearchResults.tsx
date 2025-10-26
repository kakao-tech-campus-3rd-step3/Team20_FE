import { PlaceList } from '../PlaceList/PlaceList';
import type { SidebarSearchResultsProps } from '../../model/types';
import { SIDEBAR_SEARCH_RESULTS } from '../../model/messages';

export function SidebarSearchResults({
  searchQuery,
  places,
  onPlaceClick,
  onAddToRoute,
  routePlaces = [],
  selectedPlace,
}: SidebarSearchResultsProps) {
  if (places.length === 0) {
    return (
      <div className="p-(--spacing-4)">
        <div className="text-center py-(--spacing-8)">
          <div className="w-12 h-12 mx-auto mb-(--spacing-3) bg-(--color-background-secondary) rounded-full flex items-center justify-center">
            <span className="text-xl">🔍</span>
          </div>
          <h3 className="text-heading-6 text-(--color-text-primary) mb-(--spacing-2)">
            &quot;{searchQuery}&quot; {SIDEBAR_SEARCH_RESULTS.NO_RESULTS_TITLE}
          </h3>
          <p className="text-body text-(--color-text-secondary)">
            {SIDEBAR_SEARCH_RESULTS.NO_RESULTS_DESCRIPTION}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-(--spacing-4)">
      <div className="p-(--spacing-4) border-b border-(--color-border-primary)">
        <h3 className="text-heading-6 text-(--color-text-primary) mb-1">
          &quot;{searchQuery}&quot; {SIDEBAR_SEARCH_RESULTS.NO_RESULTS_TITLE}
        </h3>
        <p className="text-caption text-(--color-text-secondary)">
          {places.length}
          {SIDEBAR_SEARCH_RESULTS.RESULTS_COUNT}
        </p>
      </div>
      <PlaceList
        places={places}
        onPlaceClick={onPlaceClick}
        onAddToRoute={onAddToRoute}
        routePlaces={routePlaces}
        selectedPlace={selectedPlace}
      />
    </div>
  );
}

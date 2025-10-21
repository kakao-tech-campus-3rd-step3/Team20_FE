import { PlaceList } from '../PlaceList/PlaceList';
import { SidebarSearch } from '../SidebarSearch/SidebarSearch';
import { SidebarEmptyState } from '../SidebarEmptyState/SidebarEmptyState';
import { SidebarSearchResults } from '../SidebarSearchResults/SidebarSearchResults';
import { SidebarLoadingState } from '../SidebarLoadingState/SidebarLoadingState';
import { SidebarErrorState } from '../SidebarErrorState/SidebarErrorState';
import type { SidebarProps } from '../../model/types';
import { SIDEBAR_TITLES, formatFoundCount } from '../../model/messages';
import { useSidebar } from '../../model/hooks/useSidebar';
import { useBreakpoints } from '@/shared/hooks/useMediaQuery';
import { cn } from '@/shared/lib';

export function Sidebar({
  className,
  contentId,
  onSearchPlacesChange,
  onPlaceClick,
  onAddToRoute,
  routePlaces = [],
  selectedPlace,
  searchPlaces,
}: SidebarProps) {
  const { isLaptop } = useBreakpoints();
  const {
    contentDetail,
    places: internalPlaces,
    isLoading,
    error,
    isEmpty,
    isSearching,
    handleSearchPlacesChange,
    handleSearchStateChange,
  } = useSidebar({
    contentId,
    onSearchPlacesChange,
  });

  const displayPlaces = searchPlaces && searchPlaces.length > 0 ? searchPlaces : internalPlaces;
  const isExternalSearch = searchPlaces && searchPlaces.length > 0;
  const finalIsSearching = isExternalSearch ? true : isSearching;
  const finalIsEmpty = isExternalSearch ? false : isEmpty;

  return (
    <aside
      className={cn(
        'w-full overflow-hidden h-full',
        isLaptop && 'lg:w-96 lg:flex-shrink-0',
        className,
      )}
    >
      <div
        className={cn(
          'w-full bg-(--color-background-primary) shadow-(--shadow-card) rounded-r-2xl overflow-hidden h-full flex flex-col',
          isLaptop && 'lg:w-96 border-r border-(--color-border-primary)',
        )}
      >
        {isLaptop && (
          <>
            <div className="p-(--spacing-6) bg-gradient-to-r from-(--color-brand-secondary) to-(--color-brand-tertiary) text-(--color-text-inverse)">
              <h2 className="text-heading-4 mb-(--spacing-2)">
                {contentDetail?.title
                  ? `${contentDetail.title} 촬영지`
                  : SIDEBAR_TITLES.HEADER_TITLE}
              </h2>
              <p className="text-body-small text-(--color-gray-100)">
                {finalIsEmpty
                  ? SIDEBAR_TITLES.SEARCH_SUBTITLE
                  : formatFoundCount(displayPlaces.length)}
              </p>
            </div>

            <SidebarSearch
              onPlacesChange={handleSearchPlacesChange}
              onSearchStateChange={handleSearchStateChange}
            />
          </>
        )}
        <div className="flex-1 overflow-y-auto">
          {finalIsSearching ? (
            <SidebarSearchResults
              places={displayPlaces}
              onPlaceClick={onPlaceClick}
              onAddToRoute={onAddToRoute}
              routePlaces={routePlaces}
              selectedPlace={selectedPlace}
            />
          ) : finalIsEmpty ? (
            <SidebarEmptyState
              onPlacesChange={handleSearchPlacesChange}
              onSearchStateChange={handleSearchStateChange}
            />
          ) : isLoading ? (
            <SidebarLoadingState />
          ) : error ? (
            <SidebarErrorState />
          ) : (
            <PlaceList
              places={displayPlaces}
              onPlaceClick={onPlaceClick}
              onAddToRoute={onAddToRoute}
              routePlaces={routePlaces}
              selectedPlace={selectedPlace}
            />
          )}
        </div>
      </div>
    </aside>
  );
}

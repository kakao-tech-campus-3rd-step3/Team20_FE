import { PlaceList } from '../PlaceList/PlaceList';
import { SidebarSearch } from '../SidebarSearch/SidebarSearch';
import { SidebarEmptyState } from '../SidebarEmptyState/SidebarEmptyState';
import { SidebarSearchResults } from '../SidebarSearchResults/SidebarSearchResults';
import { SidebarLoadingState } from '../SidebarLoadingState/SidebarLoadingState';
import { SidebarErrorState } from '../SidebarErrorState/SidebarErrorState';
import type { SidebarProps } from '../../model/types';
import {
  SIDEBAR_TITLES,
  formatFoundCount,
  formatLocations,
  formatAvgRating,
  formatDuration,
} from '../../model/messages';
import { DEFAULT_AVG_RATING, DEFAULT_DURATION_RANGE } from '../../model/constants';
import { useSidebar } from '../../model/hooks/useSidebar';

export function Sidebar({
  className,
  contentId,
  onSearchPlacesChange,
  onPlaceClick,
  onAddToRoute,
  routePlaces = [],
  selectedPlace,
}: SidebarProps) {
  const {
    contentDetail,
    places: displayPlaces,
    isLoading,
    error,
    isEmpty,
    isSearching,
    searchQuery,
    handleSearchPlacesChange,
    handleSearchStateChange,
    handleContentClick,
  } = useSidebar({
    contentId,
    onSearchPlacesChange,
  });

  return (
    <aside
      className={['w-full lg:w-96 lg:flex-shrink-0 overflow-hidden h-full', className ?? ''].join(
        ' ',
      )}
    >
      <div className="w-full lg:w-96 bg-(--color-background-primary) shadow-(--shadow-card) rounded-r-2xl overflow-hidden h-full flex flex-col border-r border-(--color-border-primary)">
        <div className="p-(--spacing-6) bg-gradient-to-r from-(--color-brand-secondary) to-(--color-brand-tertiary) text-(--color-text-inverse)">
          <h2 className="text-heading-4 mb-(--spacing-2)">
            {contentDetail?.title ? `${contentDetail.title} 촬영지` : SIDEBAR_TITLES.HEADER_TITLE}
          </h2>
          <p className="text-body-small text-(--color-gray-100)">
            {isEmpty ? SIDEBAR_TITLES.SEARCH_SUBTITLE : formatFoundCount(displayPlaces.length)}
          </p>
        </div>

        <SidebarSearch
          onPlacesChange={handleSearchPlacesChange}
          onSearchStateChange={handleSearchStateChange}
        />
        <div className="flex-1 overflow-y-auto">
          {isSearching ? (
            <SidebarSearchResults
              searchQuery={searchQuery}
              places={displayPlaces}
              onPlaceClick={onPlaceClick}
              onAddToRoute={onAddToRoute}
              routePlaces={routePlaces}
              selectedPlace={selectedPlace}
            />
          ) : isEmpty ? (
            <SidebarEmptyState
              onContentClick={handleContentClick}
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

        <div className="p-(--spacing-4) bg-(--color-background-secondary) border-t border-(--color-border-primary)">
          <div className="text-center">
            <p className="text-caption text-(--color-text-secondary) mb-(--spacing-2)">
              {contentDetail?.title
                ? `🎬 ${contentDetail.title} 촬영지 탐방`
                : isEmpty
                  ? SIDEBAR_TITLES.HEADER_TITLE
                  : SIDEBAR_TITLES.FOOTER_TITLE}
            </p>
            {!isEmpty && (
              <div className="flex items-center justify-center gap-(--spacing-4) text-caption text-(--color-text-tertiary)">
                <span>{formatLocations(displayPlaces.length)}</span>
                <span>{formatAvgRating(DEFAULT_AVG_RATING)}</span>
                <span>{formatDuration(DEFAULT_DURATION_RANGE)}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </aside>
  );
}

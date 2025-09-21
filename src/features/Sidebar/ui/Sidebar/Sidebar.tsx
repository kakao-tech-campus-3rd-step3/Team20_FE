import { useState } from 'react';
import { PlaceList } from '../PlaceList/PlaceList';
import { SidebarSearch } from '../SidebarSearch/SidebarSearch';
import { SidebarEmptyState } from '../SidebarEmptyState/SidebarEmptyState';
import { SidebarSearchResults } from '../SidebarSearchResults/SidebarSearchResults';
import { SidebarLoadingState } from '../SidebarLoadingState/SidebarLoadingState';
import { SidebarErrorState } from '../SidebarErrorState/SidebarErrorState';
import type { SidebarProps, Place } from '../../model/types';
import {
  SIDEBAR_TITLES,
  formatFoundCount,
  formatLocations,
  formatAvgRating,
  formatDuration,
} from '../../model/messages';
import { DEFAULT_AVG_RATING, DEFAULT_DURATION_RANGE } from '../../model/constants';
import { useSidebarData } from '../../model/hooks';

export function Sidebar({ className, contentId, onSearchPlacesChange }: SidebarProps) {
  const { contentDetail, places, isLoading, error } = useSidebarData(contentId);
  const [searchPlaces, setSearchPlaces] = useState<Place[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const isEmpty = !contentId;

  // 검색 중이면 검색 결과를, 아니면 기존 places를 사용
  const displayPlaces = isSearching ? searchPlaces : places;

  const handleSearchPlacesChange = (places: Place[]) => {
    setSearchPlaces(places);
    onSearchPlacesChange?.(places);
  };

  const handleSearchStateChange = (searching: boolean, query: string) => {
    setIsSearching(searching);
    setSearchQuery(query);
  };

  return (
    <aside
      className={['w-full lg:w-96 lg:flex-shrink-0 overflow-hidden h-full', className ?? ''].join(
        ' ',
      )}
    >
      <div className="w-full lg:w-96 bg-(--color-background-primary) shadow-(--shadow-card) rounded-r-2xl overflow-hidden h-full flex flex-col border-r border-(--color-border-primary)">
        <div className="p-(--spacing-6) bg-gradient-to-r from-(--color-brand-secondary) to-(--color-brand-tertiary) text-(--color-text-inverse)">
          <h2 className="text-heading-4 mb-(--spacing-2)">
            {contentDetail?.title
              ? `${contentDetail.title} 촬영지`
              : isEmpty
                ? '촬영지 검색'
                : SIDEBAR_TITLES.HEADER_TITLE}
          </h2>
          <p className="text-body-small text-(--color-gray-100)">
            {isEmpty ? '촬영지를 검색해보세요' : formatFoundCount(displayPlaces.length)}
          </p>
        </div>

        <SidebarSearch
          onPlacesChange={handleSearchPlacesChange}
          onSearchStateChange={handleSearchStateChange}
        />
        <div className="flex-1 overflow-y-auto">
          {isSearching ? (
            <SidebarSearchResults searchQuery={searchQuery} places={displayPlaces} />
          ) : isEmpty ? (
            <SidebarEmptyState />
          ) : isLoading ? (
            <SidebarLoadingState />
          ) : error ? (
            <SidebarErrorState />
          ) : (
            <PlaceList places={displayPlaces} />
          )}
        </div>

        <div className="p-(--spacing-4) bg-(--color-background-secondary) border-t border-(--color-border-primary)">
          <div className="text-center">
            <p className="text-caption text-(--color-text-secondary) mb-(--spacing-2)">
              {contentDetail?.title
                ? `🎬 ${contentDetail.title} 촬영지 탐방`
                : isEmpty
                  ? '🔍 원하는 촬영지를 검색해보세요'
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

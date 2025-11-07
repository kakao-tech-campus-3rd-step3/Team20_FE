import { useState } from 'react';
import { useSidebarData } from './useSidebarData';
import type { Place } from '../types';

interface UseSidebarOptions {
  contentId?: string;
  onSearchPlacesChange?: (places: Place[]) => void;
}

export function useSidebar(options: UseSidebarOptions = {}) {
  const { contentId, onSearchPlacesChange } = options;
  const { contentDetail, places, isLoading, error } = useSidebarData(contentId);

  const [searchPlaces, setSearchPlaces] = useState<Place[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const isEmpty = !contentId;
  const displayPlaces = isSearching ? searchPlaces : places;

  const handleSearchPlacesChange = (places: Place[]) => {
    setSearchPlaces(places);
    onSearchPlacesChange?.(places);
  };

  const handleSearchStateChange = (searching: boolean, query: string) => {
    setIsSearching(searching);
    setSearchQuery(query);
  };

  return {
    contentDetail,
    places: displayPlaces,
    isLoading,
    error,
    isEmpty,
    isSearching,
    searchQuery,
    handleSearchPlacesChange,
    handleSearchStateChange,
  };
}


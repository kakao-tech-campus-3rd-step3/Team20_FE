import { useState, useEffect } from 'react';
import { getPopularContents, searchContents } from '@/entities/content/api/contentApi';
import { getPlacesFromContents } from '../utils';
import type { PopularContent } from '@/entities/content/model/types';
import type { Place } from '../types';

interface UsePopularContentsOptions {
  onPlacesChange?: (places: Place[]) => void;
  onSearchStateChange?: (isSearching: boolean, query: string) => void;
}

export function usePopularContents(options: UsePopularContentsOptions = {}) {
  const { onPlacesChange, onSearchStateChange } = options;
  const [popularContents, setPopularContents] = useState<PopularContent[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPopularContents = async () => {
      try {
        const contents = await getPopularContents();
        setPopularContents(contents.slice(0, 5));
      } catch {
        setPopularContents([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPopularContents();
  }, []);

  const handleContentClick = async (contentTitle: string) => {
    onSearchStateChange?.(true, contentTitle);

    try {
      const contents = await searchContents(contentTitle);

      if (contents && contents.length > 0) {
        const allPlaces = await getPlacesFromContents(contents);
        onPlacesChange?.(allPlaces);
      } else {
        onPlacesChange?.([]);
      }
    } catch {
      onPlacesChange?.([]);
    }
  };

  return {
    popularContents,
    isLoading,
    handleContentClick,
  };
}

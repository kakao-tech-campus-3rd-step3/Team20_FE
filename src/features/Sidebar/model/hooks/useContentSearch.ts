import { useState, useCallback, useRef } from 'react';
import { getContentLocations, searchContents } from '@/entities/content/api/contentApi';
import { convertLocationsToPlaces } from '../utils';
import type { Place, UseContentSearchOptions } from '../types';
import type { ContentDetail } from '@/entities/content/model/types';

export function useContentSearch(options: UseContentSearchOptions = {}) {
  const { debounceMs = 300, onPlacesChange } = options;
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const debounceTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // 검색된 콘텐츠들의 장소 정보를 가져오는 함수
  const getPlacesFromContents = useCallback(async (contents: ContentDetail[]): Promise<Place[]> => {
    const allPlaces: Place[] = [];

    for (const content of contents) {
      try {
        const locations = await getContentLocations(content.contentId.toString());
        const places = await convertLocationsToPlaces(locations);
        allPlaces.push(...places);
      } catch (error) {
        console.warn(`장소를 찾는 것에 실패했습니다. ${content.contentId}:`, error);
      }
    }

    return allPlaces;
  }, []);

  const clearResults = useCallback(() => {
    onPlacesChange?.([]);
  }, [onPlacesChange]);

  const searchContentsAndPlaces = useCallback(
    async (query: string) => {
      if (!query.trim()) {
        clearResults();
        return;
      }

      setIsLoading(true);
      setIsError(false);
      setSearchQuery(query);

      try {
        const contents = await searchContents(query);

        if (!contents || contents.length === 0) {
          clearResults();
          return;
        }

        const places = await getPlacesFromContents(contents);
        onPlacesChange?.(places);
      } catch {
        setIsError(true);
        clearResults();
      } finally {
        setIsLoading(false);
      }
    },
    [getPlacesFromContents, clearResults, onPlacesChange],
  );

  const handleSearch = useCallback(
    (query: string) => {
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }

      debounceTimeoutRef.current = setTimeout(() => {
        searchContentsAndPlaces(query);
      }, debounceMs);
    },
    [searchContentsAndPlaces, debounceMs],
  );

  const clearSearch = useCallback(() => {
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }

    setSearchQuery('');
    setIsError(false);
    clearResults();
  }, [clearResults]);

  return {
    isLoading,
    isError,
    searchQuery,
    handleSearch,
    clearSearch,
  };
}

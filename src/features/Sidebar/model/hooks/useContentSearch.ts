import { useState, useCallback, useRef } from 'react';
import { searchContents } from '@/entities/content/api/contentApi';
import { getPlacesFromContents } from '../utils';
import type { UseContentSearchOptions } from '../types';

export function useContentSearch(options: UseContentSearchOptions = {}) {
  const { debounceMs = 300, onPlacesChange } = options;
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const debounceTimeoutRef = useRef<NodeJS.Timeout | null>(null);

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
    [clearResults, onPlacesChange],
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

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

  const handleSearch = useCallback(
    (query: string) => {
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }

      debounceTimeoutRef.current = setTimeout(async () => {
        if (!query.trim()) {
          onPlacesChange?.([]);
          return;
        }

        setIsLoading(true);
        setIsError(false);
        setSearchQuery(query);

        try {
          const contents = await searchContents(query);

          if (!contents || contents.length === 0) {
            onPlacesChange?.([]);
            return;
          }

          const places = await getPlacesFromContents(contents);
          onPlacesChange?.(places);
        } catch {
          setIsError(true);
          onPlacesChange?.([]);
        } finally {
          setIsLoading(false);
        }
      }, debounceMs);
    },
    [debounceMs, onPlacesChange],
  );

  const clearSearch = useCallback(() => {
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }

    setSearchQuery('');
    setIsError(false);
    onPlacesChange?.([]);
  }, [onPlacesChange]);

  return {
    isLoading,
    isError,
    searchQuery,
    handleSearch,
    clearSearch,
  };
}

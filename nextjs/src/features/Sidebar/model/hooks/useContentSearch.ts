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

  // handleSearch 함수가 매 렌더링마다 새로 생성되는 것을 방지하여
  // 불필요한 자식 컴포넌트의 리렌더링을 막기 위해 useCallback을 사용합니다.
  // debounceMs나 onPlacesChange가 변경될 때만 함수가 재생성됩니다.
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

  // clearSearch 함수가 매 렌더링마다 새로 생성되는 것을 방지하여
  // 불필요한 자식 컴포넌트의 리렌더링을 막기 위해 useCallback을 사용합니다.
  // onPlacesChange가 변경될 때만 함수가 재생성됩니다.
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


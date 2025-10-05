import { useState, useCallback } from 'react';
import { useContentSearch } from './useContentSearch';
import type { Place } from '../types';

export function useSearchInput(
  onPlacesChange?: (places: Place[]) => void,
  onSearchStateChange?: (isSearching: boolean, query: string) => void,
) {
  const [inputValue, setInputValue] = useState('');

  const { isLoading, isError, searchQuery, handleSearch, clearSearch } = useContentSearch({
    onPlacesChange,
  });

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setInputValue(value);
      handleSearch(value);
      onSearchStateChange?.(value.trim().length > 0, value);
    },
    [handleSearch, onSearchStateChange],
  );

  const handleClearSearch = useCallback(() => {
    setInputValue('');
    clearSearch();
    onSearchStateChange?.(false, '');
  }, [clearSearch, onSearchStateChange]);

  return {
    inputValue,
    isLoading,
    isError,
    searchQuery,
    handleInputChange,
    handleClearSearch,
  };
}

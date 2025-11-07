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

  // handleInputChange 함수가 매 렌더링마다 새로 생성되는 것을 방지하여
  // 불필요한 자식 컴포넌트의 리렌더링을 막기 위해 useCallback을 사용합니다.
  // handleSearch나 onSearchStateChange가 변경될 때만 함수가 재생성됩니다.
  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setInputValue(value);
      handleSearch(value);
      onSearchStateChange?.(value.trim().length > 0, value);
    },
    [handleSearch, onSearchStateChange],
  );

  // handleClearSearch 함수가 매 렌더링마다 새로 생성되는 것을 방지하여
  // 불필요한 자식 컴포넌트의 리렌더링을 막기 위해 useCallback을 사용합니다.
  // clearSearch나 onSearchStateChange가 변경될 때만 함수가 재생성됩니다.
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
    handleSearch,
  };
}


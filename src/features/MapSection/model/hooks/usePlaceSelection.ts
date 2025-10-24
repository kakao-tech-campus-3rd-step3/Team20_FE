import { useState, useCallback } from 'react';
import type { Place } from '@/features/Sidebar/model/types';

interface UsePlaceSelectionProps {
  onPlaceClick: (place: Place) => void;
}

/**
 * 장소 선택 관련 상태와 핸들러를 관리하는 훅
 */
export function usePlaceSelection({ onPlaceClick }: UsePlaceSelectionProps) {
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);

  const handlePlaceSelect = useCallback(
    (place: Place) => {
      setSelectedPlace(place);
      onPlaceClick(place);
    },
    [onPlaceClick],
  );

  return {
    selectedPlace,
    setSelectedPlace,
    handlePlaceSelect,
  };
}

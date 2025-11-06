import { useCallback } from 'react';
import type { KakaoMap } from '../types';
import type { Place } from '@/features/Sidebar/model/types';
import { closeGlobalOverlay, createAndShowOverlay } from '../utils';
import { useBreakpoints } from '@/shared/hooks/useMediaQuery';

export function usePlaceClick(
  mapRef: React.MutableRefObject<KakaoMap | null>,
  onAddToRoute?: (place: Place) => void,
) {
  const { isLaptop } = useBreakpoints();

  const handlePlaceClick = useCallback(
    (place: Place) => {
      const map = mapRef.current;
      if (!map) return;

      createAndShowOverlay(map, place, isLaptop, onAddToRoute, false);
    },
    [mapRef, isLaptop, onAddToRoute],
  );

  return { handlePlaceClick, closeOverlay: closeGlobalOverlay };
}

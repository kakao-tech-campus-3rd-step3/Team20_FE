import { useCallback } from 'react';
import type { KakaoMap, KakaoCustomOverlay } from '../types';
import type { Place } from '@/features/Sidebar/model/types';
import { createMapOverlay, createLatLng, closeGlobalOverlay, setGlobalOverlay } from '../utils';

// 전역 오버레이 관리
declare global {
  var globalOverlayRef: KakaoCustomOverlay | null;
}

// 전역 변수 초기화
if (typeof globalThis !== 'undefined') {
  globalThis.globalOverlayRef = null;
}

/**
 * PlaceCard 클릭 시 overlay 표시를 담당하는 훅
 */
export function usePlaceClick(mapRef: React.MutableRefObject<KakaoMap | null>) {
  const closeOverlay = () => {
    closeGlobalOverlay();
  };

  const handlePlaceClick = useCallback(
    (place: Place) => {
      const map = mapRef.current;
      if (!map) return;

      try {
        closeGlobalOverlay();
        const position = createLatLng(place.latitude, place.longitude);
        const overlay = createMapOverlay(map, place, position, closeGlobalOverlay);
        setGlobalOverlay(overlay);
      } catch (e) {
        console.error('Failed to show place overlay:', e);
      }
    },
    [mapRef],
  );

  return { handlePlaceClick, closeOverlay };
}

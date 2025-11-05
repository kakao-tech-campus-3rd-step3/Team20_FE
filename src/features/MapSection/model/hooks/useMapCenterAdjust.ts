import { useEffect, useRef, type RefObject } from 'react';
import { KOREA_BOUNDS } from '../constants';
import { createLatLng } from '../utils';
import type { KakaoMap } from '../types';
import { useBreakpoints } from '@/shared/hooks/useMediaQuery';

interface UseMapCenterAdjustProps {
  mapRef: RefObject<KakaoMap | null>;
}

const KOREA_CENTER = {
  lat: (KOREA_BOUNDS.north + KOREA_BOUNDS.south) / 2,
  lng: (KOREA_BOUNDS.east + KOREA_BOUNDS.west) / 2,
};

export function useMapCenterAdjust({ mapRef }: UseMapCenterAdjustProps) {
  const { isLaptop } = useBreakpoints();
  const dragListenerRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    const map = mapRef.current;
    if (!map || !window.kakao?.maps) return;

    const setKoreaCenter = () => {
      map.setLevel(13);
      const centerLatLng = createLatLng(KOREA_CENTER.lat, KOREA_CENTER.lng);
      map.setCenter(centerLatLng);
    };

    const checkBounds = () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const center = (map as any).getCenter();
      const lat = center.getLat();
      const lng = center.getLng();

      if (
        lat < KOREA_BOUNDS.south ||
        lat > KOREA_BOUNDS.north ||
        lng < KOREA_BOUNDS.west ||
        lng > KOREA_BOUNDS.east
      ) {
        const centerLatLng = createLatLng(KOREA_CENTER.lat, KOREA_CENTER.lng);
        map.setCenter(centerLatLng);
      }
    };

    const handleResize = () => {
      setTimeout(setKoreaCenter, 100);
    };

    if (dragListenerRef.current) {
      dragListenerRef.current();
    }

    if (window.kakao?.maps?.event) {
      window.kakao.maps.event.addListener(map, 'dragend', checkBounds);
      dragListenerRef.current = () => {
        if (window.kakao?.maps?.event) {
          window.kakao.maps.event.removeListener(map, 'dragend', checkBounds);
        }
      };
    }

    setTimeout(setKoreaCenter, 100);

    window.addEventListener('resize', handleResize);

    return () => {
      if (dragListenerRef.current) {
        dragListenerRef.current();
      }
      window.removeEventListener('resize', handleResize);
    };
  }, [mapRef, isLaptop]);
}

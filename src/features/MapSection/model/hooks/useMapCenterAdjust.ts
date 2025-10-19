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
      try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const center = (map as any).getCenter();
        const lat = center.getLat();
        const lng = center.getLng();

        // 범위를 벗어나면 중심으로 되돌리기
        if (
          lat < KOREA_BOUNDS.south ||
          lat > KOREA_BOUNDS.north ||
          lng < KOREA_BOUNDS.west ||
          lng > KOREA_BOUNDS.east
        ) {
          const centerLatLng = createLatLng(KOREA_CENTER.lat, KOREA_CENTER.lng);
          map.setCenter(centerLatLng);
          console.log('드래그 범위 초과, 중심으로 되돌림');
        }
      } catch (error) {
        console.error('드래그 범위 체크 실패:', error);
      }
    };

    const handleResize = () => {
      setTimeout(setKoreaCenter, 100);
    };

    // 기존 리스너 제거
    if (dragListenerRef.current) {
      dragListenerRef.current();
    }

    // 새 리스너 등록
    if (window.kakao?.maps?.event) {
      window.kakao.maps.event.addListener(map, 'dragend', checkBounds);
      dragListenerRef.current = () => {
        if (window.kakao?.maps?.event) {
          window.kakao.maps.event.removeListener(map, 'dragend', checkBounds);
        }
      };
    }

    // isLaptop 상태 변화 시 중심점 재설정
    setTimeout(setKoreaCenter, 100);

    window.addEventListener('resize', handleResize);

    return () => {
      if (dragListenerRef.current) {
        dragListenerRef.current();
      }
      window.removeEventListener('resize', handleResize);
    };
  }, [mapRef, isLaptop]); // isLaptop 상태 변화에 대응
}

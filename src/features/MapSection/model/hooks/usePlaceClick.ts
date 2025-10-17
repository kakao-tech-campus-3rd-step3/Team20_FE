import { useCallback } from 'react';
import type { KakaoMap } from '../types';
import type { Place } from '@/features/Sidebar/model/types';
import { closeGlobalOverlay, createAndShowOverlay } from '../utils';
import { useBreakpoints } from '@/shared/hooks/useMediaQuery';

/**
 * PlaceCard 클릭 시 overlay 표시를 담당하는 훅
 */
export function usePlaceClick(mapRef: React.MutableRefObject<KakaoMap | null>) {
  const { isLaptop } = useBreakpoints();

  // handlePlaceClick 함수가 매 렌더링마다 새로 생성되는 것을 방지하여
  // 불필요한 자식 컴포넌트의 리렌더링을 막기 위해 useCallback을 사용합니다.
  // mapRef가 변경될 때만 함수가 재생성됩니다.
  const handlePlaceClick = useCallback(
    (place: Place) => {
      const map = mapRef.current;
      if (!map) return;

      createAndShowOverlay(map, place, isLaptop);
    },
    [mapRef, isLaptop],
  );

  return { handlePlaceClick, closeOverlay: closeGlobalOverlay };
}

import { useEffect, useRef } from 'react';
import { toast } from 'react-toastify';
import type { KakaoMap, KakaoMarker, KakaoPolyline } from '../types';
import type { RoutePlace } from '@/features/RoutePlanning/model/types';
import {
  createLatLng,
  clearMarkers,
  createNumberedMarkerImage,
  clearPolylines,
  closeGlobalOverlay,
  createAndShowOverlay,
  getKakaoMaps,
} from '../utils';
import { POLYLINE_CONFIG } from '../constants';
import { useBreakpoints } from '@/shared/hooks/useMediaQuery';

/**
 * 동선 마커를 순서와 함께 표시하고 마커 간 연결선을 그리는 훅
 */
export function useRouteMarkers(
  routePlaces: RoutePlace[],
  mapRef: React.MutableRefObject<KakaoMap | null>,
  onPlaceClick?: (place: RoutePlace) => void,
) {
  const { isLaptop } = useBreakpoints();
  const routeMarkersRef = useRef<KakaoMarker[]>([]);
  const routePolylinesRef = useRef<KakaoPolyline[]>([]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    try {
      routeMarkersRef.current = clearMarkers(routeMarkersRef.current);
      routePolylinesRef.current = clearPolylines(routePolylinesRef.current);

      if (routePlaces.length === 0) return;

      const maps = getKakaoMaps();

      const sortedPlaces = routePlaces.slice().sort((a, b) => a.order - b.order);

      // 마커 생성
      const newRouteMarkers = sortedPlaces.map((place) => {
        const position = createLatLng(place.latitude, place.longitude);
        const markerImage = createNumberedMarkerImage(place.order);

        const marker = new maps.Marker({
          position,
          image: markerImage,
        });

        marker.setMap(map);

        // 동선 마커 클릭 이벤트 추가
        maps.event.addListener(marker, 'click', () => {
          onPlaceClick?.(place);
          createAndShowOverlay(map, place, isLaptop);
        });

        return marker;
      });

      routeMarkersRef.current = newRouteMarkers;

      // 연결선 그리기 (2개 이상의 장소가 있을 때)
      if (sortedPlaces.length >= 2) {
        const path = sortedPlaces.map((place) => createLatLng(place.latitude, place.longitude));

        const polyline = new maps.Polyline({
          path,
          strokeColor: POLYLINE_CONFIG.STROKE_COLOR,
          strokeWeight: POLYLINE_CONFIG.STROKE_WEIGHT,
          strokeOpacity: POLYLINE_CONFIG.STROKE_OPACITY,
        });

        polyline.setMap(map);
        routePolylinesRef.current = [polyline];
      }
    } catch (e) {
      console.error('Failed to update route markers:', e);
      toast.error('동선 마커 표시 실패');
    }

    return () => {
      routeMarkersRef.current = clearMarkers(routeMarkersRef.current);
      routePolylinesRef.current = clearPolylines(routePolylinesRef.current);
      closeGlobalOverlay();
    };
  }, [routePlaces, mapRef, onPlaceClick, isLaptop]);
}

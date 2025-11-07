import { useEffect, useRef } from 'react';
import { toast } from 'react-toastify';
import type { KakaoMap, KakaoMarker, KakaoPolyline } from '../types';
import type { RoutePlace } from '@/features/RoutePlanning/model/types';
import type { Place } from '@/features/Sidebar/model/types';
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

export function useRouteMarkers(
  routePlaces: RoutePlace[],
  mapRef: React.MutableRefObject<KakaoMap | null>,
  onPlaceClick?: (place: RoutePlace) => void,
  onAddToRoute?: (place: Place | RoutePlace) => void,
) {
  const { isLaptop } = useBreakpoints();
  const routeMarkersRef = useRef<KakaoMarker[]>([]);
  const routePolylinesRef = useRef<KakaoPolyline[]>([]);
  const onPlaceClickRef = useRef<typeof onPlaceClick | undefined>(onPlaceClick);
  const onAddToRouteRef = useRef<typeof onAddToRoute | undefined>(onAddToRoute);

  onPlaceClickRef.current = onPlaceClick;
  onAddToRouteRef.current = onAddToRoute;

  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    try {
      routeMarkersRef.current = clearMarkers(routeMarkersRef.current);
      routePolylinesRef.current = clearPolylines(routePolylinesRef.current);

      if (routePlaces.length === 0) return;

      const maps = getKakaoMaps();

      const sortedPlaces = routePlaces.slice().sort((a, b) => a.order - b.order);

      const newRouteMarkers = sortedPlaces.map((place) => {
        const position = createLatLng(place.latitude, place.longitude);
        const markerImage = createNumberedMarkerImage(place.order);

        const marker = new maps.Marker({
          position,
          image: markerImage,
        });

        marker.setMap(map);

        maps.event.addListener(marker, 'click', () => {
          onPlaceClickRef.current?.(place);
          createAndShowOverlay(map, place, isLaptop, onAddToRouteRef.current, true);
        });

        return marker;
      });

      routeMarkersRef.current = newRouteMarkers;

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
    } catch {
      toast.error('동선 마커 표시 실패');
    }

    return () => {
      routeMarkersRef.current = clearMarkers(routeMarkersRef.current);
      routePolylinesRef.current = clearPolylines(routePolylinesRef.current);
      closeGlobalOverlay();
    };
  }, [routePlaces, mapRef, isLaptop]);
}

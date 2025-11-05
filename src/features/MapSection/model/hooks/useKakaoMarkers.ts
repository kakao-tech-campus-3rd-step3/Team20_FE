import { useEffect, useRef } from 'react';
import { toast } from 'react-toastify';
import type { KakaoMap, KakaoMarker } from '../types';
import type { Place } from '@/features/Sidebar/model/types';
import type { RoutePlace } from '@/features/RoutePlanning/model/types';
import {
  createLatLng,
  clearMarkers,
  closeGlobalOverlay,
  createAndShowOverlay,
  getKakaoMaps,
} from '../utils';
import { useBreakpoints } from '@/shared/hooks/useMediaQuery';

export function useKakaoMarkers(
  places: Place[],
  mapRef: React.MutableRefObject<KakaoMap | null>,
  routePlaces: RoutePlace[] = [],
  onPlaceClick?: (place: Place) => void,
  onAddToRoute?: (place: Place) => void,
) {
  const { isLaptop } = useBreakpoints();
  const markersRef = useRef<KakaoMarker[]>([]);
  const onPlaceClickRef = useRef<typeof onPlaceClick | undefined>(onPlaceClick);
  const onAddToRouteRef = useRef<typeof onAddToRoute | undefined>(onAddToRoute);

  onPlaceClickRef.current = onPlaceClick;
  onAddToRouteRef.current = onAddToRoute;

  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    try {
      markersRef.current = clearMarkers(markersRef.current);

      const routePlaceIds = new Set(routePlaces.map((place) => place.locationId));
      const validPlaces = (places ?? []).filter(
        (p) =>
          Number.isFinite(p.latitude) &&
          Number.isFinite(p.longitude) &&
          !routePlaceIds.has(p.locationId),
      );

      if (validPlaces.length === 0) return;

      const maps = getKakaoMaps();

      const newMarkers = validPlaces.map((place) => {
        const position = createLatLng(place.latitude, place.longitude);
        const marker = new maps.Marker({ position });
        marker.setMap(map);

        maps.event.addListener(marker, 'click', () => {
          onPlaceClickRef.current?.(place);
          const isInRoute = routePlaceIds.has(place.locationId);
          createAndShowOverlay(map, place, isLaptop, onAddToRouteRef.current, isInRoute);
        });

        return marker;
      });

      markersRef.current = newMarkers;
    } catch {
      toast.error('마커 표시 실패');
    }

    return () => {
      markersRef.current = clearMarkers(markersRef.current);
      closeGlobalOverlay();
    };
  }, [places, mapRef, routePlaces, isLaptop]);
}

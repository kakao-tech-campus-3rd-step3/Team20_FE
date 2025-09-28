import { useEffect, useRef, useCallback } from 'react';
import type { MapOptions, KakaoMap, KakaoMarker, KakaoCustomOverlay } from './types';
import type { Place } from '@/features/Sidebar/model/types';
import type { RoutePlace } from '@/features/RoutePlanning/model/types';
import { createMapOverlay, createLatLng, clearMarkers, createNumberedMarkerImage } from './utils';
import { MAP_DEFAULTS, SDK_CONFIG } from './constants';
import { ERROR_MESSAGES } from './messages';

/**
 * Kakao 지도의 생성/옵션 반영/정리를 담당하는 훅
 */
export function useKakaoMap(options?: MapOptions) {
  const {
    center = MAP_DEFAULTS.center,
    level = MAP_DEFAULTS.level,
    draggable = MAP_DEFAULTS.draggable,
    scrollwheel = MAP_DEFAULTS.scrollwheel,
  } = options ?? {};

  const containerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<KakaoMap | null>(null);

  useEffect(() => {
    if (mapRef.current) return;

    let cancelled = false;
    let createdContainer: HTMLElement | null = null;

    const waitUntilReady = () =>
      new Promise<void>((resolve, reject) => {
        const start = Date.now();
        const timer = window.setInterval(() => {
          if (cancelled) {
            window.clearInterval(timer);
            return;
          }
          if (window.kakao?.maps?.Map) {
            window.clearInterval(timer);
            resolve();
          } else if (Date.now() - start > SDK_CONFIG.timeout) {
            window.clearInterval(timer);
            reject(new Error(ERROR_MESSAGES.sdkTimeout));
          }
        }, SDK_CONFIG.checkInterval);
      });

    (async () => {
      try {
        await waitUntilReady();

        const maps = window.kakao?.maps;
        const containerEl = containerRef.current;
        if (cancelled || !maps || !containerEl) return;

        createdContainer = containerEl;

        const centerLatLng = createLatLng(center.lat, center.lng);
        const map = new maps.Map(containerEl, { center: centerLatLng, level });

        map.setDraggable(draggable);
        map.setZoomable(scrollwheel);

        mapRef.current = map;
      } catch (e) {
        console.error(ERROR_MESSAGES.mapInitFailed, e);
      }
    })();

    return () => {
      cancelled = true;
      if (createdContainer) createdContainer.innerHTML = '';
      mapRef.current = null;
    };
  }, [center.lat, center.lng, level, draggable, scrollwheel]);

  useEffect(() => {
    const maps = window.kakao?.maps;
    const map = mapRef.current;
    if (!maps || !map) return;

    const centerLatLng = createLatLng(center.lat, center.lng);
    map.setCenter(centerLatLng);
    map.setLevel(level);
    map.setDraggable(draggable);
    map.setZoomable(scrollwheel);
  }, [center.lat, center.lng, level, draggable, scrollwheel]);

  return { containerRef, mapRef };
}

/**
 * 검색 결과 마커를 표시하는 훅 (동선에 추가된 장소 제외)
 */
export function useKakaoMarkers(
  places: Place[],
  mapRef: React.MutableRefObject<KakaoMap | null>,
  routePlaces: RoutePlace[] = [],
) {
  const markersRef = useRef<KakaoMarker[]>([]);

  useEffect(() => {
    const maps = window.kakao?.maps;
    const map = mapRef.current;
    if (!maps || !map) return;

    markersRef.current = clearMarkers(markersRef.current);

    const routePlaceIds = new Set(routePlaces.map((place) => place.locationId));
    const validPlaces = (places ?? []).filter(
      (p) =>
        Number.isFinite(p.latitude) &&
        Number.isFinite(p.longitude) &&
        !routePlaceIds.has(p.locationId),
    );

    if (validPlaces.length === 0) return;

    const newMarkers = validPlaces.map((place) => {
      const position = createLatLng(place.latitude, place.longitude);
      const marker = new maps.Marker({ position });
      marker.setMap(map);
      return marker;
    });

    markersRef.current = newMarkers;

    const first = validPlaces[0];
    if (first) {
      const center = createLatLng(first.latitude, first.longitude);
      map.setCenter(center);
    }

    return () => {
      markersRef.current = clearMarkers(markersRef.current);
    };
  }, [places, mapRef, routePlaces]);
}

/**
 * PlaceCard 클릭 시 overlay 표시를 담당하는 훅
 */
export function usePlaceClick(mapRef: React.MutableRefObject<KakaoMap | null>) {
  const overlayRef = useRef<KakaoCustomOverlay | null>(null);

  const closeOverlay = useCallback(() => {
    if (overlayRef.current) {
      overlayRef.current.setMap(null);
      overlayRef.current = null;
    }
  }, []);

  const handlePlaceClick = useCallback(
    (place: Place) => {
      const maps = window.kakao?.maps;
      const map = mapRef.current;
      if (!maps || !map) return;

      closeOverlay();

      const position = createLatLng(place.latitude, place.longitude);
      const overlay = createMapOverlay(map, place, position, closeOverlay);
      overlayRef.current = overlay;
    },
    [mapRef, closeOverlay],
  );

  return { handlePlaceClick, closeOverlay };
}

/**
 * 동선 마커를 순서와 함께 표시하는 훅
 */
export function useRouteMarkers(
  routePlaces: RoutePlace[],
  mapRef: React.MutableRefObject<KakaoMap | null>,
) {
  const routeMarkersRef = useRef<KakaoMarker[]>([]);

  useEffect(() => {
    const maps = window.kakao?.maps;
    const map = mapRef.current;
    if (!maps || !map) return;

    routeMarkersRef.current = clearMarkers(routeMarkersRef.current);

    if (routePlaces.length === 0) return;

    const sortedPlaces = [...routePlaces].sort((a, b) => a.order - b.order);

    const newRouteMarkers = sortedPlaces.map((place) => {
      const position = createLatLng(place.latitude, place.longitude);
      const markerImage = createNumberedMarkerImage(place.order);

      const marker = new maps.Marker({
        position,
        image: markerImage,
      });

      marker.setMap(map);
      return marker;
    });

    routeMarkersRef.current = newRouteMarkers;

    return () => {
      routeMarkersRef.current = clearMarkers(routeMarkersRef.current);
    };
  }, [routePlaces, mapRef]);
}

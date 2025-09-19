import { useEffect, useRef } from 'react';
import type { MapOptions, KakaoMap, KakaoMarker, KakaoCustomOverlay } from './types';
import type { Place } from '@/features/Sidebar/model/types';
import { createMapOverlay } from './utils';
import { MAP_DEFAULTS, SDK_CONFIG } from './constants';
import { ERROR_MESSAGES } from './messages';

// 유틸리티 함수들
const createLatLng = (lat: number, lng: number) => {
  const maps = window.kakao?.maps;
  if (!maps) throw new Error(ERROR_MESSAGES.sdkNotReady);
  return new maps.LatLng(lat, lng);
};

const clearMarkers = (markers: KakaoMarker[]) => {
  markers.forEach((m) => m.setMap(null));
  return [];
};

const clearOverlay = (overlay: KakaoCustomOverlay | null) => {
  if (overlay) {
    overlay.setMap(null);
  }
  return null;
};

/**
 * Kakao 지도의 생성/옵션 반영/정리를 담당하는 훅
 *
 * 동작:
 *  1) 최초 마운트 시 SDK 준비를 기다린 후, containerRef.current에 kakao.maps.Map 인스턴스 생성
 *  2) center/level/draggable/scrollwheel 옵션이 바뀌면 기존 인스턴스에 즉시 반영
 *  3) 언마운트 시 컨테이너를 비우고 레퍼런스를 해제하여 깨끗하게 정리
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

  // --- 1) SDK 준비 → 지도 1회 생성 -----------------------------------------
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

  // --- 2) 옵션 변경 반영 -----------------------------------------------------
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
 * 촬영지 배열(places)을 받아 카카오 지도에 마커를 표시/정리하는 훅
 */
export function useKakaoMarkers(places: Place[], mapRef: React.MutableRefObject<KakaoMap | null>) {
  const markersRef = useRef<KakaoMarker[]>([]);
  const overlayRef = useRef<KakaoCustomOverlay | null>(null);

  useEffect(() => {
    const maps = window.kakao?.maps;
    const map = mapRef.current;
    if (!maps || !map) return;

    // 기존 마커와 오버레이 제거
    markersRef.current = clearMarkers(markersRef.current);
    overlayRef.current = clearOverlay(overlayRef.current);

    const validPlaces = (places ?? []).filter(
      (p) => Number.isFinite(p.latitude) && Number.isFinite(p.longitude),
    );
    if (validPlaces.length === 0) return;

    // 새로운 마커 생성 및 클릭 이벤트 추가
    const newMarkers = validPlaces.map((place) => {
      const position = createLatLng(place.latitude, place.longitude);
      const marker = new maps.Marker({ position });
      marker.setMap(map);

      // 마커 클릭 이벤트 추가
      maps.event.addListener(marker, 'click', () => {
        // 기존 오버레이 제거
        overlayRef.current = clearOverlay(overlayRef.current);

        // 새 오버레이 생성
        const overlay = createMapOverlay(map, place, position, () => {
          overlayRef.current = clearOverlay(overlayRef.current);
        });

        overlayRef.current = overlay;
      });

      return marker;
    });

    markersRef.current = newMarkers;

    // 첫 장소 기준으로 지도 중심 이동 (선택)
    const first = validPlaces[0];
    if (first) {
      const center = createLatLng(first.latitude, first.longitude);
      map.setCenter(center);
    }

    return () => {
      markersRef.current = clearMarkers(markersRef.current);
      overlayRef.current = clearOverlay(overlayRef.current);
    };
  }, [places, mapRef]);
}

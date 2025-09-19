import { useEffect, useRef } from 'react';
import type { MapOptions, KakaoMap, KakaoMarker } from './types';
import type { Place } from '@/features/Sidebar/model/types';

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
    center = { lat: 37.5665, lng: 126.978 },
    level = 5,
    draggable = true,
    scrollwheel = true,
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
          } else if (Date.now() - start > 15000) {
            window.clearInterval(timer);
            reject(new Error('Kakao SDK not ready (15s timeout).'));
          }
        }, 100);
      });

    (async () => {
      try {
        await waitUntilReady();

        const maps = window.kakao?.maps;
        const containerEl = containerRef.current;
        if (cancelled || !maps || !containerEl) return;

        createdContainer = containerEl;

        const centerLatLng = new maps.LatLng(center.lat, center.lng);
        const map = new maps.Map(containerEl, { center: centerLatLng, level });

        map.setDraggable(draggable);
        map.setZoomable(scrollwheel);

        mapRef.current = map;
      } catch (e) {
        console.error('Kakao map init failed. Check JS key / domain / HTTPS / CSP.', e);
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

    const centerLatLng = new maps.LatLng(center.lat, center.lng);
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

  useEffect(() => {
    const maps = window.kakao?.maps;
    const map = mapRef.current;
    if (!maps || !map) return;

    // 기존 마커 제거
    markersRef.current.forEach((m) => m.setMap(null));
    markersRef.current = [];

    const validPlaces = (places ?? []).filter(
      (p) => Number.isFinite(p.latitude) && Number.isFinite(p.longitude),
    );
    if (validPlaces.length === 0) return;

    // 새로운 마커 생성
    const newMarkers = validPlaces.map((p) => {
      const position = new maps.LatLng(p.latitude, p.longitude);
      const marker = new maps.Marker({ position });
      marker.setMap(map);
      return marker;
    });

    markersRef.current = newMarkers;

    // 첫 장소 기준으로 지도 중심 이동 (선택)
    const first = validPlaces[0];
    if (first) {
      const center = new maps.LatLng(first.latitude, first.longitude);
      map.setCenter(center);
    }

    return () => {
      markersRef.current.forEach((m) => m.setMap(null));
      markersRef.current = [];
    };
  }, [places, mapRef]);
}

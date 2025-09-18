import { useEffect, useRef } from 'react';
import type { MapOptions, KakaoMap } from './types';

export function useKakaoSdkReady(timeoutMs = 15000) {
  const readyRef = useRef(false);

  useEffect(() => {
    let cancelled = false;
    const start = Date.now();
    const timer = window.setInterval(() => {
      if (cancelled) return;
      if (window.kakao?.maps?.Map) {
        readyRef.current = true;
        window.clearInterval(timer);
      } else if (Date.now() - start > timeoutMs) {
        console.error('Kakao SDK not ready (timeout).');
        window.clearInterval(timer);
      }
    }, 100);

    return () => {
      cancelled = true;
      window.clearInterval(timer);
    };
  }, [timeoutMs]);

  return readyRef; // .current === true 이면 준비 완료
}

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

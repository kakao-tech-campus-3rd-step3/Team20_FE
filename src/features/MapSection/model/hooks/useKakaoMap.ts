import { useEffect, useRef } from 'react';
import { toast } from 'react-toastify';
import type { MapOptions, KakaoMap } from '../types';
import { createLatLng } from '../utils';
import { MAP_DEFAULTS, SDK_CONFIG } from '../constants';
import { ERROR_MESSAGES } from '../messages';

/**
 * Kakao 지도의 생성/옵션 반영/정리를 담당하는 훅
 */
export function useKakaoMap(options?: MapOptions) {
  const {
    center = MAP_DEFAULTS.center,
    level = MAP_DEFAULTS.level,
    draggable = MAP_DEFAULTS.draggable,
    scrollwheel = MAP_DEFAULTS.scrollwheel,
    disableDoubleClickZoom = MAP_DEFAULTS.disableDoubleClickZoom,
  } = options ?? {};

  const containerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<KakaoMap | null>(null);
  const wheelHandlerRef = useRef<((e: WheelEvent) => void) | null>(null);

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
        const map = new maps.Map(containerEl, {
          center: centerLatLng,
          level,
          draggable: draggable,
          scrollwheel: scrollwheel,
          disableDoubleClickZoom: disableDoubleClickZoom,
        });

        // Ctrl + 휠 브라우저 확대 방지
        const mapContainer = map.getNode();
        const handleWheel = (e: WheelEvent) => {
          if (e.ctrlKey) {
            e.preventDefault();
          }
        };

        wheelHandlerRef.current = handleWheel;
        mapContainer.addEventListener('wheel', handleWheel, { passive: false });

        mapRef.current = map;
      } catch (error) {
        console.error('카카오맵 초기화 실패:', error);
        toast.error('카카오맵 로딩 실패, 페이지 새로고침 해보세요');
      }
    })();

    return () => {
      cancelled = true;
      if (createdContainer) {
        createdContainer.innerHTML = '';
        // 이벤트 리스너 정리
        const mapContainer = mapRef.current?.getNode();
        if (mapContainer && wheelHandlerRef.current) {
          mapContainer.removeEventListener('wheel', wheelHandlerRef.current);
        }
      }
      mapRef.current = null;
      wheelHandlerRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // 마운트 시에만 실행 - props 변경 시에는 두 번째 useEffect에서 처리

  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    try {
      const centerLatLng = createLatLng(center.lat, center.lng);
      map.setCenter(centerLatLng);
      map.setLevel(level);
      map.setDraggable(draggable);
      map.setZoomable(scrollwheel);
    } catch (error) {
      console.error('카카오맵 옵션 업데이트 실패:', error);
      toast.error('지도 설정 업데이트 실패');
    }
  }, [center.lat, center.lng, level, draggable, scrollwheel]);

  return { containerRef, mapRef };
}

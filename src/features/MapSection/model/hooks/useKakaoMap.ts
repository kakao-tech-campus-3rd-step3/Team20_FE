import { useEffect, useRef } from 'react';
import { toast } from 'react-toastify';
import type { MapOptions, KakaoMap } from '../types';
import { createLatLng } from '../utils';
import { MAP_DEFAULTS, SDK_CONFIG } from '../constants';
import { ERROR_MESSAGES } from '../messages';
import { useBreakpoints } from '@/shared/hooks/useMediaQuery';

export function useKakaoMap(options?: MapOptions) {
  const { isLaptop } = useBreakpoints();

  const {
    center = MAP_DEFAULTS.center,
    level = MAP_DEFAULTS.level,
    scrollwheel = MAP_DEFAULTS.scrollwheel,
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
          draggable: true,
          scrollwheel: true,
          disableDoubleClickZoom: false,
        });

        const mapContainer = map.getNode();
        const handleWheel = (e: WheelEvent) => {
          if (e.ctrlKey) {
            e.preventDefault();
          }
        };

        wheelHandlerRef.current = handleWheel;
        mapContainer.addEventListener('wheel', handleWheel, { passive: false });

        mapRef.current = map;
      } catch {
        toast.error('카카오맵 로딩 실패, 페이지 새로고침 해보세요');
      }
    })();

    return () => {
      cancelled = true;
      if (createdContainer) {
        createdContainer.innerHTML = '';
        const mapContainer = mapRef.current?.getNode();
        if (mapContainer && wheelHandlerRef.current) {
          mapContainer.removeEventListener('wheel', wheelHandlerRef.current);
        }
      }
      mapRef.current = null;
      wheelHandlerRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    try {
      map.setLevel(level);
      map.setDraggable(true);
      map.setZoomable(true);
    } catch {
      toast.error('지도 설정 업데이트 실패');
    }
  }, [level, isLaptop, scrollwheel]);

  return { containerRef, mapRef };
}

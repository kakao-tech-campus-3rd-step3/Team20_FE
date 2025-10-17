import { useEffect, useLayoutEffect } from 'react';
import type { RefObject } from 'react';

interface UseMapResizeProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  mapRef: RefObject<any>;
  containerRef: RefObject<HTMLDivElement | null>;
  isMobileOrTablet: boolean;
  isLaptop: boolean;
}

export function useMapResize({
  mapRef,
  containerRef,
  isMobileOrTablet,
  isLaptop,
}: UseMapResizeProps) {
  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container || !window.kakao?.maps) return;

    if (mapRef.current) {
      container.innerHTML = '';
    }

    const newMap = new window.kakao.maps.Map(container, {
      center: new window.kakao.maps.LatLng(35.8, 127.5),
      level: 13,
      draggable: false,
      scrollwheel: false,
      disableDoubleClickZoom: true,
    });

    mapRef.current = newMap;
  }, [isMobileOrTablet, isLaptop, mapRef, containerRef]);

  useEffect(() => {
    const el = containerRef.current;
    const map = mapRef.current;
    if (!el || !map || !window.kakao?.maps) return;

    const ro = new ResizeObserver(() => {
      try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const center = (map as any).getCenter();
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (window.kakao!.maps!.event as any).trigger(map, 'resize');
        map.setCenter(center);
      } catch {
        // Failed to resize map
      }
    });

    ro.observe(el);
    return () => ro.disconnect();
  }, [mapRef, containerRef]);
}

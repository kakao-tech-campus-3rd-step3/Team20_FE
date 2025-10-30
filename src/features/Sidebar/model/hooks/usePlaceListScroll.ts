import { useEffect, useRef } from 'react';
import type { Place } from '../../model/types';

export function usePlaceListScroll(selectedPlace?: Place | null, places: Place[] = []) {
  const itemRefs = useRef<Record<string, HTMLDivElement | null>>({});

  useEffect(() => {
    if (!selectedPlace) return;
    const key = selectedPlace.locationId || `place-0`;
    const el = itemRefs.current[key];
    if (!el) return;

    let container: HTMLElement | null = el.parentElement;
    while (container && container !== document.body) {
      const style = window.getComputedStyle(container);
      const overflowY = style.overflowY;
      if (overflowY === 'auto' || overflowY === 'scroll') break;
      container = container.parentElement;
    }

    if (container) {
      const elRect = el.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();
      const offset = elRect.top - containerRect.top + container.scrollTop;
      container.scrollTo({ top: Math.max(offset - 8, 0), behavior: 'smooth' });
    }
  }, [selectedPlace, selectedPlace?.locationId, places.length]);

  const setItemRef = (key: string) => (el: HTMLDivElement | null) => {
    itemRefs.current[key] = el;
  };

  return { setItemRef };
}

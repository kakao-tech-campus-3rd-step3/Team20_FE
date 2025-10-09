import { useCallback } from 'react';
import type { RoutePlace } from '../types';

export function useRouteDragHandlers() {
  // createRouteSidebarHandlers 함수가 매 렌더링마다 새로 생성되는 것을 방지하여
  // 불필요한 자식 컴포넌트의 리렌더링을 막기 위해 useCallback을 사용합니다.
  // 의존성이 없으므로 한 번만 생성된 후에 재사용됩니다.
  const createRouteSidebarHandlers = useCallback(
    (places: RoutePlace[], onReorderPlaces?: (places: RoutePlace[]) => void) => {
      const handleDragStart = (place: RoutePlace) => (e: React.DragEvent) => {
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/plain', place.locationId.toString());
      };

      const handleDrop = (targetPlace: RoutePlace) => (e: React.DragEvent) => {
        e.preventDefault();
        const draggedPlaceId = Number(e.dataTransfer.getData('text/plain'));
        if (draggedPlaceId !== targetPlace.locationId) {
          const draggedIndex = places.findIndex((p) => p.locationId === draggedPlaceId);
          const targetIndex = places.findIndex((p) => p.locationId === targetPlace.locationId);

          if (draggedIndex !== -1 && targetIndex !== -1) {
            const newPlaces = [...places];
            const [draggedItem] = newPlaces.splice(draggedIndex, 1);
            newPlaces.splice(targetIndex, 0, draggedItem);
            onReorderPlaces?.(newPlaces);
          }
        }
      };

      return {
        handleDragStart,
        handleDrop,
      };
    },
    [],
  );

  return {
    createRouteSidebarHandlers,
  };
}

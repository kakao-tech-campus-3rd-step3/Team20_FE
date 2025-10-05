import { useCallback } from 'react';
import type { RoutePlace } from '../types';

export function useRouteDragHandlers() {
  const createRouteSidebarHandlers = useCallback(
    (places: RoutePlace[], onReorderPlaces?: (places: RoutePlace[]) => void) => {
      const handleDragStart = (place: RoutePlace) => (e: React.DragEvent) => {
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/plain', place.locationId.toString());
      };

      const handleDrop = (targetPlace: RoutePlace) => (e: React.DragEvent) => {
        e.preventDefault();
        const draggedPlaceId = parseInt(e.dataTransfer.getData('text/plain'));
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

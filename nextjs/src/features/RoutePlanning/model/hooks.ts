'use client';

import { useState, useCallback } from 'react';
import type { Place } from '@/features/Sidebar/model/types';
import type { RoutePlace, RoutePlanningState } from './types';

export function useRoutePlanning() {
  const [state, setState] = useState<RoutePlanningState>({
    places: [],
  });

  const addPlace = useCallback((place: Place) => {
    setState((prev) => {
      const isAlreadyAdded = prev.places.some((p) => p.locationId === place.locationId);
      if (isAlreadyAdded) return prev;

      const newPlace: RoutePlace = {
        ...place,
        order: prev.places.length + 1,
      };

      return {
        ...prev,
        places: [...prev.places, newPlace],
      };
    });
  }, []);

  const removePlace = useCallback((placeId: number) => {
    setState((prev) => {
      const newPlaces = prev.places
        .filter((place) => place.locationId !== placeId)
        .map((place, index) => ({ ...place, order: index + 1 }));

      return {
        ...prev,
        places: newPlaces,
      };
    });
  }, []);

  const reorderPlaces = useCallback((places: RoutePlace[]) => {
    setState((prev) => ({
      ...prev,
      places: places.map((place, index) => ({ ...place, order: index + 1 })),
    }));
  }, []);

  const saveRoute = useCallback(() => {
    const routeInfo = {
      places: state.places,
      totalPlaces: state.places.length,
      createdAt: new Date().toISOString(),
    };

    alert(`저장된 동선 정보:\n${JSON.stringify(routeInfo, null, 2)}`);

    setState((prev) => ({
      ...prev,
      places: [],
    }));
  }, [state.places]);

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
    places: state.places,
    addPlace,
    removePlace,
    reorderPlaces,
    saveRoute,
    createRouteSidebarHandlers,
  };
}

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

  const createPlaceCardHandlers = useCallback(
    (place: RoutePlace, setIsDragOver: (value: boolean) => void) => {
      const handleRemove = (e: React.MouseEvent) => {
        e.stopPropagation();
        removePlace(place.locationId);
      };

      const handleDragStart = (e: React.DragEvent) => {
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/plain', place.locationId.toString());
      };

      const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
        setIsDragOver(true);
      };

      const handleDragLeave = () => {
        setIsDragOver(false);
      };

      const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragOver(false);
        const draggedPlaceId = parseInt(e.dataTransfer.getData('text/plain'));
        if (draggedPlaceId !== place.locationId) {
          setState((currentState) => {
            const draggedIndex = currentState.places.findIndex(
              (p) => p.locationId === draggedPlaceId,
            );
            const targetIndex = currentState.places.findIndex(
              (p) => p.locationId === place.locationId,
            );

            if (draggedIndex !== -1 && targetIndex !== -1) {
              const newPlaces = [...currentState.places];
              const [draggedItem] = newPlaces.splice(draggedIndex, 1);
              newPlaces.splice(targetIndex, 0, draggedItem);

              return {
                ...currentState,
                places: newPlaces.map((place, index) => ({ ...place, order: index + 1 })),
              };
            }
            return currentState;
          });
        }
      };

      return {
        handleRemove,
        handleDragStart,
        handleDragOver,
        handleDragLeave,
        handleDrop,
      };
    },
    [removePlace],
  );

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

  const createPlaceCardEventHandlers = useCallback((setIsDragOver: (value: boolean) => void) => {
    const handleDragOver = (e: React.DragEvent, onDragOver?: (e: React.DragEvent) => void) => {
      e.preventDefault();
      e.dataTransfer.dropEffect = 'move';
      setIsDragOver(true);
      onDragOver?.(e);
    };

    const handleDragLeave = (onDragLeave?: () => void) => {
      setIsDragOver(false);
      onDragLeave?.();
    };

    const handleDrop = (e: React.DragEvent, onDrop?: (e: React.DragEvent) => void) => {
      e.preventDefault();
      setIsDragOver(false);
      onDrop?.(e);
    };

    return {
      handleDragOver,
      handleDragLeave,
      handleDrop,
    };
  }, []);

  return {
    places: state.places,
    addPlace,
    removePlace,
    reorderPlaces,
    saveRoute,
    createPlaceCardHandlers,
    createRouteSidebarHandlers,
    createPlaceCardEventHandlers,
  };
}

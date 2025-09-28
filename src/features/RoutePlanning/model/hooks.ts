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

  const saveRoute = useCallback(() => {
    const routeInfo = {
      places: state.places,
      totalPlaces: state.places.length,
      createdAt: new Date().toISOString(),
    };

    alert(`저장된 동선 정보:\n${JSON.stringify(routeInfo, null, 2)}`);
    console.log('저장된 동선 정보:', routeInfo);

    setState((prev) => ({
      ...prev,
      places: [],
    }));
  }, [state.places]);

  return {
    places: state.places,
    addPlace,
    removePlace,
    saveRoute,
  };
}

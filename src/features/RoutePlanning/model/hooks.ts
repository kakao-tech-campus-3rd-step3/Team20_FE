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

  return {
    places: state.places,
    addPlace,
  };
}

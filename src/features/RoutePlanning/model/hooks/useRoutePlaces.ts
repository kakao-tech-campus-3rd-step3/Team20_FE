import { useCallback } from 'react';
import type { Place } from '@/features/Sidebar/model/types';
import type { RoutePlace, RoutePlanningState } from '../types';

const recalculateOrder = (places: RoutePlace[]): RoutePlace[] => {
  return places.map((place, index) => ({ ...place, order: index + 1 }));
};

export function useRoutePlaces(
  _state: RoutePlanningState,
  setState: React.Dispatch<React.SetStateAction<RoutePlanningState>>,
) {
  const addPlace = useCallback(
    (place: Place) => {
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
    },
    [setState],
  );

  const removePlace = useCallback(
    (placeId: number) => {
      setState((prev) => {
        const filteredPlaces = prev.places.filter((place) => place.locationId !== placeId);
        const newPlaces = recalculateOrder(filteredPlaces);

        return {
          ...prev,
          places: newPlaces,
        };
      });
    },
    [setState],
  );

  const reorderPlaces = useCallback(
    (places: RoutePlace[]) => {
      setState((prev) => ({
        ...prev,
        places: recalculateOrder(places),
      }));
    },
    [setState],
  );

  return {
    addPlace,
    removePlace,
    reorderPlaces,
  };
}

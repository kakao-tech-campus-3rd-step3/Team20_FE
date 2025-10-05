import { useCallback } from 'react';
import type { RoutePlanningState, RoutePlace } from '../types';
import { useCreateItinerary } from '@/entities/itinerary/api/queryfn';

export function useRouteSave(setState: React.Dispatch<React.SetStateAction<RoutePlanningState>>) {
  const createItineraryMutation = useCreateItinerary();

  const saveRoute = useCallback(
    async (title: string, description: string, places: RoutePlace[]) => {
      const apiRequest = {
        title,
        description,
        locations: places.map((place, index) => ({
          locationId: place.locationId,
          visitOrder: index + 1,
        })),
      };

      await createItineraryMutation.mutateAsync(apiRequest);

      setState((prev) => ({
        ...prev,
        places: [],
      }));
    },
    [createItineraryMutation, setState],
  );

  return {
    saveRoute,
  };
}

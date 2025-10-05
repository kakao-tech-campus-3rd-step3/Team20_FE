import { useCallback } from 'react';
import type { RoutePlanningState, RoutePlace } from '../types';

export function useRouteSave(
  _state: RoutePlanningState,
  setState: React.Dispatch<React.SetStateAction<RoutePlanningState>>,
) {
  const saveRoute = useCallback(
    (title: string, description: string, places: RoutePlace[]) => {
      const routeInfo = {
        title,
        description,
        places,
        totalPlaces: places.length,
        createdAt: new Date().toISOString(),
      };

      console.log('동선 저장:', routeInfo);

      setState((prev) => ({
        ...prev,
        places: [],
      }));
    },
    [setState],
  );

  return {
    saveRoute,
  };
}

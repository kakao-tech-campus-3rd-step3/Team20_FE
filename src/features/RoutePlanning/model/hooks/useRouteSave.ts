import { useCallback } from 'react';
import type { RoutePlanningState, RoutePlace } from '../types';
import { useCreateItinerary } from '@/entities/itinerary/api/queryfn';

export function useRouteSave(setState: React.Dispatch<React.SetStateAction<RoutePlanningState>>) {
  const createItineraryMutation = useCreateItinerary();

  // saveRoute 함수가 매 렌더링마다 새로 생성되는 것을 방지하여
  // 불필요한 자식 컴포넌트의 리렌더링을 막기 위해 useCallback을 사용합니다.
  // createItineraryMutation이나 setState가 변경될 때만 함수가 재생성됩니다.
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

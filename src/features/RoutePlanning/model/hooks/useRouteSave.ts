import { useCallback } from 'react';
import type { RoutePlanningState, RoutePlace } from '../types';
import { useCreateItinerary, useUpdateItinerary } from '@/entities/itinerary/api/queryfn';

export function useRouteSave(
  setState: React.Dispatch<React.SetStateAction<RoutePlanningState>>,
  itineraryId?: string,
) {
  const createItineraryMutation = useCreateItinerary();
  const updateItineraryMutation = useUpdateItinerary();

  // saveRoute 함수가 매 렌더링마다 새로 생성되는 것을 방지하여
  // 불필요한 자식 컴포넌트의 리렌더링을 막기 위해 useCallback을 사용합니다.
  // createItineraryMutation, updateItineraryMutation이나 setState가 변경될 때만 함수가 재생성됩니다.
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

      // itineraryId가 있으면 수정, 없으면 생성
      if (itineraryId) {
        await updateItineraryMutation.mutateAsync({ itineraryId, data: apiRequest });
      } else {
        await createItineraryMutation.mutateAsync(apiRequest);
      }

      setState((prev) => ({
        ...prev,
        places: [],
      }));
    },
    [createItineraryMutation, updateItineraryMutation, setState, itineraryId],
  );

  return {
    saveRoute,
    isUpdating: !!itineraryId,
  };
}

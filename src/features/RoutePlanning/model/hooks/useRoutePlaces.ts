import { useCallback } from 'react';
import type { Place } from '@/features/Sidebar/model/types';
import type { RoutePlace, RoutePlanningState } from '../types';

const recalculateOrder = (places: RoutePlace[]): RoutePlace[] => {
  return places.map((place, index) => ({ ...place, order: index + 1 }));
};

export function useRoutePlaces(setState: React.Dispatch<React.SetStateAction<RoutePlanningState>>) {
  // addPlace 함수가 매 렌더링마다 새로 생성되는 것을 방지하여
  // 불필요한 자식 컴포넌트의 리렌더링을 막기 위해 useCallback을 사용합니다.
  // setState가 변경될 때만 함수가 재생성됩니다.
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

  // removePlace 함수가 매 렌더링마다 새로 생성되는 것을 방지하여
  // 불필요한 자식 컴포넌트의 리렌더링을 막기 위해 useCallback을 사용합니다.
  // setState가 변경될 때만 함수가 재생성됩니다.
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

  // reorderPlaces 함수가 매 렌더링마다 새로 생성되는 것을 방지하여
  // 불필요한 자식 컴포넌트의 리렌더링을 막기 위해 useCallback을 사용합니다.
  // setState가 변경될 때만 함수가 재생성됩니다.
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

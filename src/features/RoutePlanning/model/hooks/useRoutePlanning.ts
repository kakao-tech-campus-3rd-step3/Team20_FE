import { useState } from 'react';
import type { RoutePlanningState } from '../types';
import { useRoutePlaces } from './useRoutePlaces';
import { useRouteDragHandlers } from './useRouteDragHandlers';
import { useRouteSave } from './useRouteSave';

export function useRoutePlanning() {
  const [state, setState] = useState<RoutePlanningState>({
    places: [],
  });

  const { addPlace, removePlace, reorderPlaces } = useRoutePlaces(setState);
  const { createRouteSidebarHandlers } = useRouteDragHandlers();
  const { saveRoute } = useRouteSave(setState);

  return {
    places: state.places,
    addPlace,
    removePlace,
    reorderPlaces,
    saveRoute: (title: string, description: string) => saveRoute(title, description, state.places),
    createRouteSidebarHandlers,
  };
}

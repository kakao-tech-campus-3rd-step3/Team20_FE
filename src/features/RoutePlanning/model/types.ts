import type { Place } from '@/features/Sidebar/model/types';

export type RoutePlace = Place & {
  order: number;
};

export type RoutePlanningState = {
  places: RoutePlace[];
};

export type RouteSidebarProps = {
  className?: string;
  places: RoutePlace[];
  onRemovePlace: (placeId: number) => void;
  onReorderPlaces: () => void;
  onSaveRoute: () => void;
};

export type RoutePlaceCardProps = {
  place: RoutePlace;
  onRemove: (placeId: number) => void;
  className?: string;
};

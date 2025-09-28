import type { Place } from '@/features/Sidebar/model/types';

export type RoutePlace = Place & {
  order: number;
};

export type RoutePlanningState = {
  places: RoutePlace[];
};

export type DragHandlers = {
  handleDragStart: (place: RoutePlace) => (e: React.DragEvent) => void;
  handleDrop: (place: RoutePlace) => (e: React.DragEvent) => void;
};

export type RouteSidebarProps = {
  className?: string;
  places: RoutePlace[];
  onSaveRoute: () => void;
  onRemovePlace?: (placeId: number) => void;
  onReorderPlaces?: (places: RoutePlace[]) => void;
  createRouteSidebarHandlers: (
    places: RoutePlace[],
    onReorderPlaces?: (places: RoutePlace[]) => void,
  ) => DragHandlers;
};

export type RoutePlaceCardProps = {
  place: RoutePlace;
  className?: string;
  onRemove: (e: React.MouseEvent) => void;
  onDragStart: (e: React.DragEvent) => void;
  onDragOver?: (e: React.DragEvent) => void;
  onDragLeave?: () => void;
  onDrop: (e: React.DragEvent) => void;
};

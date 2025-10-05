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

export type WithPlaces = {
  places: RoutePlace[];
};

export type RouteSidebarProps = WithPlaces & {
  className?: string;
  onSaveRoute: (title: string, description: string, places: RoutePlace[]) => void;
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
  onRemove: () => void;
  onDragStart: (e: React.DragEvent) => void;
  onDragOver?: (e: React.DragEvent) => void;
  onDragLeave?: () => void;
  onDrop: (e: React.DragEvent) => void;
};

export type SaveRouteModalProps = WithPlaces & {
  isOpen: boolean;
  onClose: () => void;
  onSave?: (title: string, description: string, places: RoutePlace[]) => void;
};

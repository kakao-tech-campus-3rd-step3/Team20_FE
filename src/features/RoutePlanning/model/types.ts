import type { Place } from '@/features/Sidebar/model/types';

export type RoutePlace = Place & {
  order: number;
};

export type RoutePlanningState = {
  places: RoutePlace[];
};

export type WithPlaces = {
  places: RoutePlace[];
};

export type SaveRouteHandler = (title: string, description: string, places: RoutePlace[]) => void;

export type RouteSidebarProps = WithPlaces & {
  className?: string;
  onSaveRoute: SaveRouteHandler;
  onRemovePlace?: (placeId: number) => void;
  onReorderPlaces?: (places: RoutePlace[]) => void;
  createRouteSidebarHandlers: (
    places: RoutePlace[],
    onReorderPlaces?: (places: RoutePlace[]) => void,
  ) => {
    handleDragStart: (place: RoutePlace) => (e: React.DragEvent) => void;
    handleDrop: (place: RoutePlace) => (e: React.DragEvent) => void;
  };
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
  onSave?: SaveRouteHandler;
};

export type UseSaveRouteFormOptions = {
  onSave?: SaveRouteHandler;
  onClose?: () => void;
};

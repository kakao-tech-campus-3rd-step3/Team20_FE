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
  isUpdating?: boolean;
};

export type RoutePlaceCardProps = {
  place: RoutePlace;
  className?: string;
  onRemove: () => void;
};

export type SaveRouteModalProps = WithPlaces & {
  isOpen: boolean;
  onClose: () => void;
  onSave?: SaveRouteHandler;
  onSuccess?: () => void;
  isUpdating?: boolean;
};

export type UseSaveRouteFormOptions = {
  onSave?: SaveRouteHandler;
  onClose?: () => void;
  onSuccess?: () => void;
};

export interface SaveSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

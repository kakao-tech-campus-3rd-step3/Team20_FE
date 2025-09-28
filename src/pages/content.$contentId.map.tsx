import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { Sidebar } from '@/features/Sidebar';
import { RouteSidebar } from '@/features/RoutePlanning';
import { MapContainer } from '@/features/MapSection/ui/MapContainer/MapContainer';
import {
  useKakaoMap,
  useKakaoMarkers,
  usePlaceClick,
  useRouteMarkers,
} from '@/features/MapSection/model/hooks';
import { useRoutePlanning } from '@/features/RoutePlanning/model/hooks';
import type { Place } from '@/features/Sidebar/model/types';

export const Route = createFileRoute('/content/$contentId/map')({
  component: ContentPlaceMapPage,
});

function ContentPlaceMapPage() {
  const { contentId } = Route.useParams() as { contentId: string };
  const [searchPlaces, setSearchPlaces] = useState<Place[]>([]);
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
  const mapHook = useKakaoMap();
  const { handlePlaceClick, closeOverlay } = usePlaceClick(mapHook.mapRef);
  const {
    places: routePlaces,
    addPlace,
    removePlace,
    reorderPlaces,
    saveRoute,
  } = useRoutePlanning();

  useKakaoMarkers(searchPlaces, mapHook.mapRef, routePlaces);
  useRouteMarkers(routePlaces, mapHook.mapRef);

  const handlePlaceSelect = (place: Place) => {
    setSelectedPlace(place);
    handlePlaceClick(place);
  };

  const handleAddToRoute = (place: Place) => {
    addPlace(place);
    closeOverlay();
  };

  return (
    <div className="h-screen flex flex-col">
      <div className="flex flex-1 overflow-hidden">
        <Sidebar
          className="w-96 shrink-0 h-full min-h-0"
          contentId={contentId}
          onSearchPlacesChange={setSearchPlaces}
          onPlaceClick={handlePlaceSelect}
          onAddToRoute={handleAddToRoute}
          routePlaces={routePlaces}
          selectedPlace={selectedPlace}
        />
        <MapContainer containerRef={mapHook.containerRef} className="flex-1 h-full min-h-0" />
        <RouteSidebar
          className="w-96 shrink-0 h-full min-h-0"
          places={routePlaces}
          onSaveRoute={saveRoute}
          onRemovePlace={removePlace}
          onReorderPlaces={reorderPlaces}
        />
      </div>
    </div>
  );
}

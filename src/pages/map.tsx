import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { Sidebar } from '@/features/Sidebar';
import { RouteSidebar } from '@/features/RoutePlanning';
import { MapContainer } from '@/features/MapSection/ui/MapContainer/MapContainer';
import { useKakaoMap, useKakaoMarkers, usePlaceClick } from '@/features/MapSection/model/hooks';
import { useRoutePlanning } from '@/features/RoutePlanning/model/hooks';
import type { Place } from '@/features/Sidebar/model/types';

export const Route = createFileRoute('/map')({
  component: MapPage,
});

function MapPage() {
  const [searchPlaces, setSearchPlaces] = useState<Place[]>([]);
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
  const mapHook = useKakaoMap();
  const { handlePlaceClick } = usePlaceClick(mapHook.mapRef);
  const { places: routePlaces, addPlace, removePlace, saveRoute } = useRoutePlanning();

  useKakaoMarkers(searchPlaces, mapHook.mapRef);

  const handlePlaceSelect = (place: Place) => {
    setSelectedPlace(place);
    handlePlaceClick(place);
  };

  return (
    <div className="h-screen flex flex-col">
      <div className="flex flex-1 overflow-hidden">
        <Sidebar
          className="w-96 shrink-0 h-full min-h-0"
          onSearchPlacesChange={setSearchPlaces}
          onPlaceClick={handlePlaceSelect}
          onAddToRoute={addPlace}
          routePlaces={routePlaces}
          selectedPlace={selectedPlace}
        />
        <MapContainer containerRef={mapHook.containerRef} className="flex-1 h-full min-h-0" />
        <RouteSidebar
          className="w-96 shrink-0 h-full min-h-0"
          places={routePlaces}
          onRemovePlace={removePlace}
          onSaveRoute={saveRoute}
        />
      </div>
    </div>
  );
}

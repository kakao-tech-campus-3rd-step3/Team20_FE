import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { Sidebar } from '@/features/Sidebar';
import { RouteSidebar } from '@/features/RoutePlanning';
import { MapContainer } from '@/features/MapSection/ui/MapContainer/MapContainer';
import { useKakaoMap } from '@/features/MapSection/model/hooks/useKakaoMap';
import { useKakaoMarkers } from '@/features/MapSection/model/hooks/useKakaoMarkers';
import { usePlaceClick } from '@/features/MapSection/model/hooks/usePlaceClick';
import { useRouteMarkers } from '@/features/MapSection/model/hooks/useRouteMarkers';
import { useRoutePlanning } from '@/features/RoutePlanning/model/hooks/useRoutePlanning';
import { useMapResize } from '@/features/MapSection/model/hooks/useMapResize';
import { usePlaceSelection } from '@/features/MapSection/model/hooks/usePlaceSelection';
import { useBreakpoints } from '@/shared/hooks/useMediaQuery';
import type { Place } from '@/features/Sidebar/model/types';

export const Route = createFileRoute('/map')({
  component: MapPage,
});

function MapPage() {
  const [searchPlaces, setSearchPlaces] = useState<Place[]>([]);
  const { isMobileOrTablet, isLaptop } = useBreakpoints();
  const mapHook = useKakaoMap();
  const { handlePlaceClick, closeOverlay } = usePlaceClick(mapHook.mapRef);
  const {
    places: routePlaces,
    addPlace,
    removePlace,
    reorderPlaces,
    saveRoute,
    createRouteSidebarHandlers,
  } = useRoutePlanning();
  const { selectedPlace, handlePlaceSelect } = usePlaceSelection({
    onPlaceClick: handlePlaceClick,
  });

  useMapResize({
    mapRef: mapHook.mapRef,
    containerRef: mapHook.containerRef,
    isMobileOrTablet,
    isLaptop,
  });
  useKakaoMarkers(searchPlaces, mapHook.mapRef, routePlaces, handlePlaceSelect);
  useRouteMarkers(routePlaces, mapHook.mapRef, handlePlaceSelect);

  const handleAddToRoute = (place: Place) => {
    addPlace(place);
    closeOverlay();
  };

  return (
    <div className="h-screen flex flex-col">
      <div className="flex flex-1 overflow-hidden">
        {isLaptop ? (
          <>
            <Sidebar
              className="w-96 shrink-0 h-full min-h-0"
              onSearchPlacesChange={setSearchPlaces}
              onPlaceClick={handlePlaceSelect}
              onAddToRoute={handleAddToRoute}
              routePlaces={routePlaces}
              selectedPlace={selectedPlace}
            />
            <MapContainer
              key="desktop"
              containerRef={mapHook.containerRef}
              className="flex-1 h-full min-h-0"
            />
            <RouteSidebar
              className="w-96 shrink-0 h-full min-h-0"
              places={routePlaces}
              onSaveRoute={saveRoute}
              onRemovePlace={removePlace}
              onReorderPlaces={reorderPlaces}
              createRouteSidebarHandlers={createRouteSidebarHandlers}
            />
          </>
        ) : (
          <MapContainer
            key="mobile"
            containerRef={mapHook.containerRef}
            className="flex-1 h-full min-h-0 w-full"
          />
        )}
      </div>
    </div>
  );
}

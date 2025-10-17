import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { Sidebar } from '@/features/Sidebar';
import { SidebarSearch } from '@/features/Sidebar/ui/SidebarSearch/SidebarSearch';
import { RouteSidebar } from '@/features/RoutePlanning';
import { MapContainer } from '@/features/MapSection';
import { MobileBottomButtons } from '@/features/MapSection/ui/MobileControls/MobileBottomButtons';
import type { MobileBottomSection } from '@/features/MapSection/model/types';
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
  const [mobileBottomSection, setMobileBottomSection] = useState<MobileBottomSection>(null);
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
          <div className="relative flex-1 h-full min-h-0 w-full">
            <MapContainer
              key="mobile"
              containerRef={mapHook.containerRef}
              className="absolute inset-0 w-full h-full min-h-screen"
            />
            <div className="absolute top-0 left-0 right-0 z-10 bg-white/95 backdrop-blur-sm border-b border-gray-200 px-2 py-1 shadow-sm">
              <div className="scale-90 origin-top">
                <SidebarSearch
                  onPlacesChange={setSearchPlaces}
                  onSearchStateChange={() => {
                    // Search state changed
                  }}
                />
              </div>
            </div>

            <MobileBottomButtons
              activeSection={mobileBottomSection}
              onSectionChange={setMobileBottomSection}
              routePlacesCount={routePlaces.length}
            />
          </div>
        )}
      </div>
    </div>
  );
}

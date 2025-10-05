import { createFileRoute } from '@tanstack/react-router';
import { useState, useCallback } from 'react';
import { Sidebar } from '@/features/Sidebar';
import { RouteSidebar } from '@/features/RoutePlanning';
import { MapContainer } from '@/features/MapSection/ui/MapContainer/MapContainer';
import { useKakaoMap } from '@/features/MapSection/model/hooks/useKakaoMap';
import { useKakaoMarkers } from '@/features/MapSection/model/hooks/useKakaoMarkers';
import { usePlaceClick } from '@/features/MapSection/model/hooks/usePlaceClick';
import { useRouteMarkers } from '@/features/MapSection/model/hooks/useRouteMarkers';
import { useRoutePlanning } from '@/features/RoutePlanning/model/hooks';
import { useSidebarData } from '@/features/Sidebar/model/hooks/useSidebarData';
import type { Place } from '@/features/Sidebar/model/types';

export const Route = createFileRoute('/content/$contentId/map')({
  component: ContentPlaceMapPage,
});

function ContentPlaceMapPage() {
  const { contentId } = Route.useParams() as { contentId: string };
  const [searchPlaces, setSearchPlaces] = useState<Place[]>([]);
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
  const { places: contentPlaces } = useSidebarData(contentId);
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

  const handlePlaceSelect = useCallback(
    (place: Place) => {
      setSelectedPlace(place);
      handlePlaceClick(place);
    },
    [handlePlaceClick],
  );

  // 검색 중이면 검색 결과를, 아니면 콘텐츠의 기본 촬영지들을 표시
  const displayPlaces = searchPlaces.length > 0 ? searchPlaces : contentPlaces;

  useKakaoMarkers(displayPlaces, mapHook.mapRef, routePlaces, handlePlaceSelect);
  useRouteMarkers(routePlaces, mapHook.mapRef, handlePlaceSelect);

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
          createRouteSidebarHandlers={createRouteSidebarHandlers}
        />
      </div>
    </div>
  );
}

import { createFileRoute } from '@tanstack/react-router';
import { useState, useCallback } from 'react';
import { Sidebar } from '@/features/Sidebar';
import { SidebarSearch } from '@/features/Sidebar/ui/SidebarSearch/SidebarSearch';
import { CloseButton } from '@/features/Sidebar/ui/CloseButton/CloseButton';
import { RouteSidebar } from '@/features/RoutePlanning';
import { MapContainer } from '@/features/MapSection';
import { MobileBottomButtons } from '@/features/MapSection/ui/MobileBottomButtons/MobileBottomButtons';
import type { MobileBottomSection } from '@/features/MapSection/model/types';
import {
  MOBILE_SIDEBAR_STYLES,
  MOBILE_SEARCH_BAR_STYLES,
} from '@/features/MapSection/model/constants';
import {
  useKakaoMap,
  useKakaoMarkers,
  usePlaceClick,
  useRouteMarkers,
  useMapResize,
  useMapCenterAdjust,
} from '@/features/MapSection/model/hooks';
import { useRoutePlanning } from '@/features/RoutePlanning/model/hooks/useRoutePlanning';
import { useSidebarData } from '@/features/Sidebar/model/hooks/useSidebarData';
import { useBreakpoints } from '@/shared/hooks/useMediaQuery';
import { DRAG_STYLES } from '@/features/RoutePlanning/model/constants';
import type { Place } from '@/features/Sidebar/model/types';

export const Route = createFileRoute('/content/$contentId/map')({
  component: ContentPlaceMapPage,
});

function ContentPlaceMapPage() {
  const { contentId } = Route.useParams() as { contentId: string };
  const [searchPlaces, setSearchPlaces] = useState<Place[]>([]);
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
  const [mobileBottomSection, setMobileBottomSection] = useState<MobileBottomSection>(null);
  const { isLaptop } = useBreakpoints();
  const { places: contentPlaces } = useSidebarData(contentId);
  const mapHook = useKakaoMap();
  const { handlePlaceClick, closeOverlay } = usePlaceClick(mapHook.mapRef);
  const {
    places: routePlaces,
    addPlace,
    removePlace,
    reorderPlaces,
    saveRoute,
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

  useMapResize({
    mapRef: mapHook.mapRef,
    containerRef: mapHook.containerRef,
    isLaptop,
  });
  useMapCenterAdjust({ mapRef: mapHook.mapRef });

  const handleAddToRoute = (place: Place) => {
    addPlace(place);
    closeOverlay();
  };

  useKakaoMarkers(displayPlaces, mapHook.mapRef, routePlaces, handlePlaceSelect, handleAddToRoute);
  useRouteMarkers(routePlaces, mapHook.mapRef, handlePlaceSelect, handleAddToRoute);

  return (
    <div className="h-screen flex flex-col">
      <div className="flex flex-1 overflow-hidden">
        {isLaptop ? (
          <>
            <Sidebar
              className="w-96 shrink-0 h-full min-h-0"
              contentId={contentId}
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
            />
          </>
        ) : (
          <div className="relative flex-1 h-full min-h-0 w-full">
            <MapContainer
              key="mobile"
              containerRef={mapHook.containerRef}
              className="absolute inset-0 w-full h-full"
            />
            <div className={MOBILE_SEARCH_BAR_STYLES.CONTAINER}>
              <div className={MOBILE_SEARCH_BAR_STYLES.WRAPPER}>
                <SidebarSearch onPlacesChange={setSearchPlaces} onSearchStateChange={() => {}} />
              </div>
            </div>

            <MobileBottomButtons
              activeSection={mobileBottomSection}
              onSectionChange={setMobileBottomSection}
              routePlacesCount={routePlaces.length}
            />

            {/* 모바일 검색 Sidebar */}
            {mobileBottomSection === 'search' && (
              <div className={MOBILE_SIDEBAR_STYLES.CONTAINER}>
                <div className={MOBILE_SIDEBAR_STYLES.HEADER}>
                  <h3 className={MOBILE_SIDEBAR_STYLES.TITLE}>검색 결과</h3>
                  <CloseButton onClick={() => setMobileBottomSection(null)} />
                </div>

                <div className={MOBILE_SIDEBAR_STYLES.CONTENT}>
                  <Sidebar
                    className="w-full h-full"
                    contentId={contentId}
                    onSearchPlacesChange={setSearchPlaces}
                    onPlaceClick={handlePlaceSelect}
                    onAddToRoute={handleAddToRoute}
                    routePlaces={routePlaces}
                    selectedPlace={selectedPlace}
                    searchPlaces={searchPlaces}
                  />
                </div>
              </div>
            )}

            {/* 모바일 동선 Sidebar */}
            {mobileBottomSection === 'route' && (
              <div className={MOBILE_SIDEBAR_STYLES.CONTAINER}>
                <div className={MOBILE_SIDEBAR_STYLES.HEADER}>
                  <h3 className={MOBILE_SIDEBAR_STYLES.TITLE}>동선 관리</h3>
                  <CloseButton onClick={() => setMobileBottomSection(null)} />
                </div>

                <div className={MOBILE_SIDEBAR_STYLES.CONTENT} style={DRAG_STYLES.CONTAINER}>
                  <RouteSidebar
                    className="w-full h-full"
                    places={routePlaces}
                    onSaveRoute={saveRoute}
                    onRemovePlace={removePlace}
                    onReorderPlaces={reorderPlaces}
                  />
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

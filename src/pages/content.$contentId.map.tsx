import { createFileRoute } from '@tanstack/react-router';
import { useState, useCallback, useEffect } from 'react';
import { Sidebar, convertItineraryLocationsToRoutePlaces } from '@/features/Sidebar';
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
import { useItineraryDetail } from '@/entities/itinerary/api/queryfn';

export const Route = createFileRoute('/content/$contentId/map')({
  component: ContentPlaceMapPage,
  validateSearch: (search: Record<string, unknown>) => {
    return {
      itineraryId: (search.itineraryId as string) || undefined,
    };
  },
});

function ContentPlaceMapPage() {
  const { contentId } = Route.useParams() as { contentId: string };
  const { itineraryId } = Route.useSearch();
  console.log('🔍 ContentPlaceMapPage - itineraryId:', itineraryId);
  const [searchPlaces, setSearchPlaces] = useState<Place[]>([]);
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
  const [mobileBottomSection, setMobileBottomSection] = useState<MobileBottomSection>(null);
  const [hasUserToggledBottom, setHasUserToggledBottom] = useState(false);
  const { isLaptop } = useBreakpoints();
  const { places: contentPlaces, error: sidebarError } = useSidebarData(contentId);
  const mapHook = useKakaoMap();
  const { handlePlaceClick, closeOverlay } = usePlaceClick(mapHook.mapRef);
  const {
    places: routePlaces,
    addPlace,
    removePlace,
    reorderPlaces,
    saveRoute,
  } = useRoutePlanning();
  const { data: itineraryDetail, isSuccess } = useItineraryDetail(itineraryId || '');
  console.log('📦 itineraryDetail:', itineraryDetail, 'isSuccess:', isSuccess);
  const [isItineraryLoaded, setIsItineraryLoaded] = useState(false);

  const handlePlaceSelect = useCallback(
    (place: Place) => {
      setSelectedPlace(place);
      handlePlaceClick(place);
    },
    [handlePlaceClick],
  );

  // 검색 중이면 검색 결과를, 아니면 콘텐츠의 기본 촬영지들을 표시
  const displayPlaces = searchPlaces.length > 0 ? searchPlaces : contentPlaces;

  // 저장된 동선 로드
  useEffect(() => {
    if (isSuccess && itineraryDetail?.locations && !isItineraryLoaded) {
      console.log('✅ 동선 로드 시작:', itineraryDetail);
      const loadItinerary = async () => {
        try {
          const routePlacesData = await convertItineraryLocationsToRoutePlaces(
            itineraryDetail.locations,
          );
          console.log('✅ 변환된 동선 데이터:', routePlacesData);
          routePlacesData.forEach((place) => {
            console.log('✅ 장소 추가:', place);
            addPlace(place);
          });
          setIsItineraryLoaded(true);
          console.log('✅ 동선 로드 완료!');
        } catch (error) {
          console.error('❌ 동선 로드 실패:', error);
        }
      };
      loadItinerary();
    }
  }, [isSuccess, itineraryDetail, isItineraryLoaded, addPlace]);

  useMapResize({
    mapRef: mapHook.mapRef,
    containerRef: mapHook.containerRef,
    isLaptop,
  });
  useMapCenterAdjust({ mapRef: mapHook.mapRef });

  // 모바일에서 장소 로딩 에러 시 자동으로 검색 결과 패널 1회 열기
  useEffect(() => {
    if (!isLaptop && sidebarError && !hasUserToggledBottom && mobileBottomSection !== 'search') {
      setMobileBottomSection('search');
    }
  }, [isLaptop, sidebarError, hasUserToggledBottom, mobileBottomSection]);

  const handleMobileSectionChange = (section: MobileBottomSection) => {
    setHasUserToggledBottom(true);
    setMobileBottomSection(section);
  };

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
              onSectionChange={handleMobileSectionChange}
              routePlacesCount={routePlaces.length}
            />

            {/* 모바일 검색 Sidebar */}
            {mobileBottomSection === 'search' && (
              <div className={MOBILE_SIDEBAR_STYLES.CONTAINER}>
                <div className={MOBILE_SIDEBAR_STYLES.HEADER}>
                  <h3 className={MOBILE_SIDEBAR_STYLES.TITLE}>검색 결과</h3>
                  <CloseButton onClick={() => handleMobileSectionChange(null)} />
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
                  <CloseButton onClick={() => handleMobileSectionChange(null)} />
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

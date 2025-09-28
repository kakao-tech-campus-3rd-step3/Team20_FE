import { Sidebar } from '@/features/Sidebar';
import { MapContainer } from '@/features/MapSection/ui/MapContainer/MapContainer';
import { useKakaoMap, useKakaoMarkers } from '@/features/MapSection/model/hooks';
import { usePlaceClick } from '@/features/MapSection/model/hooks';
import { useParams } from 'react-router-dom';
import { useSidebarData } from '@/features/Sidebar/model/hooks';

export default function ContentPlaceMapPage() {
  const { contentId } = useParams<{ contentId: string }>();
  const { places } = useSidebarData(contentId);
  const mapHook = useKakaoMap();
  const { handlePlaceClick } = usePlaceClick(mapHook.mapRef);

  useKakaoMarkers(places, mapHook.mapRef);

  return (
    <div className="h-screen flex flex-col">
      <div className="flex flex-1 overflow-hidden">
        <Sidebar
          className="w-96 shrink-0 h-full min-h-0"
          contentId={contentId}
          onPlaceClick={handlePlaceClick}
        />
        <MapContainer containerRef={mapHook.containerRef} className="flex-1 h-full min-h-0" />
      </div>
    </div>
  );
}

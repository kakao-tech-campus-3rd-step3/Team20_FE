import { useState } from 'react';
import { Sidebar } from '@/features/Sidebar';
import { MapContainer } from '@/features/MapSection/ui/MapContainer/MapContainer';
import { useKakaoMap, useKakaoMarkers } from '@/features/MapSection/model/hooks';
import { usePlaceClick } from '@/features/MapSection/model/hooks';
import type { Place } from '@/features/Sidebar/model/types';

export default function MapPage() {
  const [searchPlaces, setSearchPlaces] = useState<Place[]>([]);
  const mapHook = useKakaoMap();
  const { handlePlaceClick } = usePlaceClick(mapHook.mapRef);

  useKakaoMarkers(searchPlaces, mapHook.mapRef);

  return (
    <div className="h-screen flex flex-col">
      <div className="flex flex-1 overflow-hidden">
        <Sidebar
          className="w-96 shrink-0 h-full min-h-0"
          onSearchPlacesChange={setSearchPlaces}
          onPlaceClick={handlePlaceClick}
        />
        <MapContainer containerRef={mapHook.containerRef} className="flex-1 h-full min-h-0" />
      </div>
    </div>
  );
}

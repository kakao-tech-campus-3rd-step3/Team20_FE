import { Sidebar } from '@/features/Sidebar';
import { MapContainer } from '@/features/MapSection/ui/MapContainer/MapContainer';
import { useKakaoMap } from '@/features/MapSection/model/hooks';

export default function ContentPlaceMapPage() {
  const { containerRef } = useKakaoMap();

  return (
    <div className="h-screen flex flex-col">
      <div className="flex flex-1 overflow-hidden">
        <Sidebar className="w-96 shrink-0 h-full min-h-0" />
        <MapContainer containerRef={containerRef} className="flex-1 h-full min-h-0" />
      </div>
    </div>
  );
}

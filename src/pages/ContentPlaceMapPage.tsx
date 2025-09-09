import { Sidebar } from '@/features/Sidebar';
import { MapContainer } from '@/features/MapSection';

export default function ContentPlaceMapPage() {
  return (
    <div className="h-screen flex flex-col">
      <div className="flex flex-1 overflow-hidden">
        <Sidebar className="w-96 shrink-0 h-full min-h-0" />
        <MapContainer className="flex-1 h-full min-h-0" />
      </div>
    </div>
  );
}

import { MapPin, Map } from 'lucide-react';
import type { ContentOverviewActionButtonsProps } from '../model/types';
import { messages } from '../model/messages';

export function ContentOverviewActionButtons({
  onLocationViewClick,
  onMapViewClick,
}: ContentOverviewActionButtonsProps) {
  return (
    <div className="absolute bottom-8 left-0 right-0 z-10 px-6">
      <div className="max-w-2xl mx-auto">
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={onLocationViewClick}
            className="
              flex items-center justify-center gap-3 px-8 py-4 
              bg-white font-semibold rounded-xl"
          >
            <MapPin className="w-5 h-5" />
            {messages.locationView}
          </button>

          <button
            onClick={onMapViewClick}
            className="
              flex items-center justify-center gap-3 px-8 py-4 
              bg-white/15 text-white font-semibold rounded-xl 
              border border-white/30"
          >
            <Map className="w-5 h-5" />
            {messages.mapView}
          </button>
        </div>
      </div>
    </div>
  );
}

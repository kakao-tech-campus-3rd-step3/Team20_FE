import { MapPin, Map } from 'lucide-react';
import { IconButton } from '@/shared/ui';
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
          <IconButton
            Icon={MapPin}
            shape="pill"
            size="lg"
            className="bg-white text-black font-semibold px-8 py-4 hover:bg-gray-50"
            onClick={onLocationViewClick}
          >
            {messages.locationView}
          </IconButton>

          <IconButton
            Icon={Map}
            shape="pill"
            size="lg"
            className="bg-white/15 text-white font-semibold px-8 py-4 border border-white/30 hover:bg-white/25"
            onClick={onMapViewClick}
          >
            {messages.mapView}
          </IconButton>
        </div>
      </div>
    </div>
  );
}

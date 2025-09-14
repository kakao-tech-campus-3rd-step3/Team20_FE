import { MapPin, Map } from 'lucide-react';
import { IconButton } from '@/shared/ui';
import type { ContentOverviewActionButtonsProps } from '../model/types';
import { messages } from '../model/messages';

export function ContentOverviewActionButtons({
  onLocationViewClick,
  onMapViewClick,
}: ContentOverviewActionButtonsProps) {
  return (
    <div className="absolute bottom-8 left-0 right-0 z-[--z-elevated] px-[--spacing-6]">
      <div className="max-w-2xl mx-auto">
        <div className="flex flex-col sm:flex-row gap-[--spacing-4] justify-center">
          <IconButton
            Icon={MapPin}
            shape="pill"
            size="lg"
            className="bg-[--color-background-primary] text-[--color-text-primary] text-button-large px-[--spacing-8] py-[--spacing-4] hover:bg-[--color-background-secondary] shadow-[--shadow-button] hover:shadow-[--shadow-button-hover] transition-all duration-200"
            onClick={onLocationViewClick}
          >
            {messages.locationView}
          </IconButton>

          <IconButton
            Icon={Map}
            shape="pill"
            size="lg"
            className="bg-white/15 text-[--color-text-inverse] text-button-large px-[--spacing-8] py-[--spacing-4] border border-white/30 hover:bg-white/25 shadow-[--shadow-button] hover:shadow-[--shadow-button-hover] transition-all duration-200"
            onClick={onMapViewClick}
          >
            {messages.mapView}
          </IconButton>
        </div>
      </div>
    </div>
  );
}

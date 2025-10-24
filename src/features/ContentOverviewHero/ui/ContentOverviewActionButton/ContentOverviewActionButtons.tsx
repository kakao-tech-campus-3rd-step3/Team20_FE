import { Map } from 'lucide-react';
import { IconButton } from '@/shared/ui';
import type { ContentOverviewActionButtonsProps } from '../../model/types';
import { messages } from '../../model/messages';

export function ContentOverviewActionButtons({
  onMapViewClick,
}: ContentOverviewActionButtonsProps) {
  return (
    <div className="px-[--spacing-6] py-[--spacing-8]">
      <div className="max-w-2xl mx-auto">
        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <IconButton
            Icon={Map}
            shape="pill"
            size="lg"
            className="bg-[--color-brand-tertiary] text-[--color-text-inverse] text-button-large px-[--spacing-8] py-[--spacing-4] border border-white/30 hover:bg-white/25 shadow-[--shadow-button] hover:shadow-[--shadow-button-hover] transition-all duration-200"
            onClick={onMapViewClick}
          >
            {messages.mapView}
          </IconButton>
        </div>
      </div>
    </div>
  );
}

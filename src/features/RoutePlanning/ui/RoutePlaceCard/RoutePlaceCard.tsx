import { GripVertical, Trash2 } from 'lucide-react';
import { useState } from 'react';
import type { RoutePlaceCardProps } from '../../model/types';
import { ROUTE_SIDEBAR_BUTTONS } from '@/features/Sidebar/model/messages';
import { ROUTE_CARD_STYLES } from '@/features/Sidebar/model/constants';
import { PlaceThumbnail } from '@/features/Sidebar/ui/PlaceThumbnail/PlaceThumbnail';
import { PlaceAddress } from '@/features/Sidebar/ui/PlaceAddress/PlaceAddress';
import { useRoutePlanning } from '../../model/hooks';

export function RoutePlaceCard({
  place,
  className,
  onRemove,
  onDragStart,
  onDragOver,
  onDragLeave,
  onDrop,
}: RoutePlaceCardProps) {
  const [isDragOver, setIsDragOver] = useState(false);
  const { createPlaceCardEventHandlers } = useRoutePlanning();
  const { handleDragOver, handleDragLeave, handleDrop } =
    createPlaceCardEventHandlers(setIsDragOver);

  return (
    <div
      draggable
      onDragStart={onDragStart}
      onDragOver={(e) => handleDragOver(e, onDragOver)}
      onDragLeave={() => handleDragLeave(onDragLeave)}
      onDrop={(e) => handleDrop(e, onDrop)}
      className={[
        'p-(--spacing-4) border border-(--color-border-primary) rounded-lg bg-(--color-background-primary)',
        'hover:bg-(--color-background-secondary) transition-colors cursor-move',
        isDragOver && 'border-(--color-brand-primary) bg-(--color-brand-primary)/5',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <div className="flex items-start gap-(--spacing-3)">
        <div className="flex items-center gap-(--spacing-2) mt-1">
          <GripVertical className={ROUTE_CARD_STYLES.DRAG_HANDLE} />
          <span className={ROUTE_CARD_STYLES.ORDER_BADGE}>{place.order}</span>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start gap-(--spacing-3)">
            <div className="flex-shrink-0">
              <PlaceThumbnail locationImage={place.locationImage} name={place.name} />
            </div>

            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-medium text-(--color-text-primary) mb-1 truncate">
                {place.name}
              </h4>
              <PlaceAddress address={place.address} />
            </div>
          </div>
        </div>

        <button
          onClick={onRemove}
          className={ROUTE_CARD_STYLES.REMOVE_BUTTON}
          title={ROUTE_SIDEBAR_BUTTONS.REMOVE}
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

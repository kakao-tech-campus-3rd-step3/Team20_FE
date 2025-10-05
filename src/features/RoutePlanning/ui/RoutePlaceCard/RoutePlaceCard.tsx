import { GripVertical, Trash2 } from 'lucide-react';
import { useState } from 'react';
import type { RoutePlaceCardProps } from '../../model/types';
import { ROUTE_SIDEBAR_BUTTONS } from '../../model/messages';
import { PlaceThumbnail } from '@/features/Sidebar/ui/PlaceThumbnail/PlaceThumbnail';
import { PlaceAddress } from '@/features/Sidebar/ui/PlaceAddress/PlaceAddress';

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

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setIsDragOver(true);
    onDragOver?.(e);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
    onDragLeave?.();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    onDrop?.(e);
  };

  return (
    <div
      draggable
      onDragStart={onDragStart}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
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
          <GripVertical className="w-4 h-4 text-(--color-text-tertiary) cursor-grab" />
          <span className="text-caption-bold text-(--color-text-inverse) bg-(--color-brand-primary) rounded-full w-5 h-5 flex items-center justify-center">
            {place.order}
          </span>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start gap-(--spacing-3)">
            <div className="flex-shrink-0">
              <PlaceThumbnail locationImage={place.locationImage} name={place.name} />
            </div>

            <div className="flex-1 min-w-0">
              <h4 className="text-body-small font-medium text-(--color-text-primary) mb-1 truncate">
                {place.name}
              </h4>
              <PlaceAddress address={place.address} />
            </div>
          </div>
        </div>

        <button
          onClick={onRemove}
          className="p-(--spacing-1) text-(--color-text-tertiary) hover:text-(--color-semantic-error) transition-colors"
          title={ROUTE_SIDEBAR_BUTTONS.REMOVE}
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

import { GripVertical, Trash2 } from 'lucide-react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import type { RoutePlaceCardProps } from '../../model/types';
import { ROUTE_SIDEBAR_BUTTONS } from '../../model/messages';
import { PlaceThumbnail } from '@/features/Sidebar/ui/PlaceThumbnail/PlaceThumbnail';
import { PlaceAddress } from '@/features/Sidebar/ui/PlaceAddress/PlaceAddress';

export function RoutePlaceCard({ place, className, onRemove }: RoutePlaceCardProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: place.locationId,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={{
        ...style,
        touchAction: 'none',
        userSelect: 'none',
        WebkitUserSelect: 'none',
        WebkitTouchCallout: 'none',
      }}
      className={[
        'p-(--spacing-4) border border-(--color-border-primary) rounded-lg bg-(--color-background-primary)',
        'hover:bg-(--color-background-secondary) transition-colors cursor-move',
        isDragging && 'opacity-50 scale-105 shadow-lg z-50',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...attributes}
    >
      <div className="flex items-start gap-(--spacing-3)">
        <div className="flex items-center gap-(--spacing-2) mt-1">
          <div {...listeners} className="p-2 -m-2 cursor-grab active:cursor-grabbing">
            <GripVertical className="w-4 h-4 text-(--color-text-tertiary)" />
          </div>
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

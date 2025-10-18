import { Camera } from 'lucide-react';
import type { PlaceCardProps } from '../../model/types';
import {
  PLACE_CARD_DEFAULT,
  PLACE_LABELS,
  PLACE_CARD_LABELS as CARD_LABELS,
} from '../../model/messages';
import { PlaceThumbnail } from '../PlaceThumbnail/PlaceThumbnail';
import { PlaceAddress } from '../PlaceAddress/PlaceAddress';
import { cn } from '@/shared/lib';

export function PlaceCard({
  locationImage,
  name = PLACE_CARD_DEFAULT.NAME,
  address = PLACE_CARD_DEFAULT.ADDRESS,
  description = '',
  relatedContents = [],
  latitude,
  longitude,
  onClick,
  className,
  badgeNumber,
}: PlaceCardProps) {
  return (
    <div
      role="button"
      onClick={onClick}
      className={cn(
        'p-(--spacing-4) cursor-pointer transition-all hover:bg-(--color-background-tertiary)',
        className,
      )}
    >
      <div className="flex gap-(--spacing-4)">
        <PlaceThumbnail locationImage={locationImage} name={name} badgeNumber={badgeNumber} />
        <div className="flex-1 min-w-0">
          <h3 className="text-heading-5 text-(--color-text-primary) mb-(--spacing-1) truncate">
            {name}
          </h3>
          <PlaceAddress address={address} />
          <div className="bg-(--color-brand-primary)/10 rounded-lg p-(--spacing-2) mb-(--spacing-2)">
            <div className="flex items-center gap-(--spacing-1) mb-(--spacing-1)">
              <Camera className="w-3 h-3 text-(--color-brand-secondary)" />
              <span className="text-caption-bold text-(--color-brand-secondary)">
                {PLACE_LABELS.SCENE}
              </span>
            </div>
            <p className="text-caption text-(--color-brand-secondary) line-clamp-2">
              {description}
            </p>
          </div>
          {relatedContents.length > 0 && (
            <div className="mt-2">
              <p className="text-caption text-(--color-text-secondary) mb-1">
                {CARD_LABELS.RELATED_CONTENTS}:{' '}
                {relatedContents.map((content) => content.title).join(', ')}
              </p>
            </div>
          )}
          {latitude !== undefined && longitude !== undefined && (
            <div className="mt-2">
              <p className="text-caption text-(--color-text-tertiary)">
                {CARD_LABELS.LOCATION}: {latitude.toFixed(4)}, {longitude.toFixed(4)}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

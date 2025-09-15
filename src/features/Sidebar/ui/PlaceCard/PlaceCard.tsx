import { Camera } from 'lucide-react';
import type { PlaceCardProps } from '../../model/types';
import { PLACE_CARD_DEFAULT, PLACE_LABELS } from '../../model/messages';
import { PlaceThumbnail } from '../PlaceThumbnail/PlaceThumbnail';
import { PlaceAddress } from '../PlaceAddress/PlaceAddress';
import { PlaceSimpleInfo } from '../PlaceSimpleInfo/PlaceSimpleInfo';
import { PlaceTagList } from '../PlaceTagList/PlaceTagList';

export function PlaceCard({
  thumbnailUrl,
  name = PLACE_CARD_DEFAULT.NAME,
  address = PLACE_CARD_DEFAULT.ADDRESS,
  tags = PLACE_CARD_DEFAULT.TAGS,
  rating = PLACE_CARD_DEFAULT.RATING,
  onClick,
  className,
  badgeNumber,
}: PlaceCardProps) {
  return (
    <div
      role="button"
      onClick={onClick}
      className={[
        'p-(--spacing-4) border-b border-(--color-border-primary) cursor-pointer transition-all hover:bg-(--color-background-tertiary)',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <div className="flex gap-(--spacing-4)">
        <PlaceThumbnail thumbnailUrl={thumbnailUrl} name={name} badgeNumber={badgeNumber} />
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
              {tags.slice(0, 2).join(', ')}
            </p>
          </div>
          <PlaceSimpleInfo rating={rating} />
          <PlaceTagList tags={tags} />
        </div>
      </div>
    </div>
  );
}

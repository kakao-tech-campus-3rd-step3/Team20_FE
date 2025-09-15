import { Camera } from 'lucide-react';
import type { ThumbnailProps } from '../../model/types';

export function PlaceThumbnail({ thumbnailUrl, name, badgeNumber }: ThumbnailProps) {
  return (
    <div className="relative flex-shrink-0">
      <div className="w-16 h-16 rounded-xl overflow-hidden bg-(--color-gray-100) border border-(--color-border-secondary)">
        {thumbnailUrl ? (
          <img
            alt={name}
            src={thumbnailUrl}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full grid place-items-center text-(--color-text-tertiary)">
            <Camera size={20} className="opacity-70" />
          </div>
        )}
      </div>

      {typeof badgeNumber === 'number' && (
        <div className="absolute -top-2 -left-2 w-6 h-6 bg-gradient-to-r from-(--color-brand-secondary) to-(--color-brand-tertiary) rounded-full flex items-center justify-center text-(--color-text-inverse) text-caption-bold shadow-(--shadow-brand-md)">
          {badgeNumber}
        </div>
      )}
    </div>
  );
}

import { Camera } from 'lucide-react';
import type { ThumbnailProps } from '../model/types';

export function PlaceThumbnail({ thumbnailUrl, name, badgeNumber }: ThumbnailProps) {
  return (
    <div className="relative flex-shrink-0">
      <div className="w-16 h-16 rounded-xl overflow-hidden bg-gray-100 border border-gray-200">
        {thumbnailUrl ? (
          <img
            alt={name}
            src={thumbnailUrl}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full grid place-items-center text-gray-400">
            <Camera size={20} className="opacity-70" />
          </div>
        )}
      </div>

      {typeof badgeNumber === 'number' && (
        <div className="absolute -top-2 -left-2 w-6 h-6 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
          {badgeNumber}
        </div>
      )}
    </div>
  );
}

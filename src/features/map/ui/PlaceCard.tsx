import React from 'react';
import { Camera } from 'lucide-react';
import { PLACE_CARD_DEFAULT, type PlaceCardProps } from '@/features/map/model/types';
import { Thumbnail } from '@/features/map/ui/Thumbnail';
import { Address } from '@/features/map/ui/Address';
import { MetaInfo } from '@/features/map/ui/MetaInfo';
import { TagList } from '@/features/map/ui/TagList';

export const PlaceCard: React.FC<PlaceCardProps> = ({
  thumbnailUrl,
  name = PLACE_CARD_DEFAULT.NAME,
  address = PLACE_CARD_DEFAULT.ADDRESS,
  tags = PLACE_CARD_DEFAULT.TAGS,
  rating = PLACE_CARD_DEFAULT.RATING,
  onClick,
  className,
  badgeNumber,
}) => {
  return (
    <div
      role="button"
      onClick={onClick}
      className={[
        'p-4 border-b border-gray-100 cursor-pointer transition-all hover:bg-gray-50',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <div className="flex space-x-4">
        <Thumbnail thumbnailUrl={thumbnailUrl} name={name} badgeNumber={badgeNumber} />
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-gray-900 mb-1 truncate">{name}</h3>
          <Address address={address} />
          <div className="bg-purple-50 rounded-lg p-2 mb-2">
            <div className="flex items-center space-x-1 mb-1">
              <Camera className="w-3 h-3 text-purple-600" />
              <span className="text-xs font-medium text-purple-700">촬영 장면</span>
            </div>
            <p className="text-xs text-purple-600 line-clamp-2">
              {tags.slice(0, 2).join(', ')}
            </p>
          </div>
          <MetaInfo rating={rating} />
          <TagList tags={tags} />
        </div>
      </div>
    </div>
  );
};

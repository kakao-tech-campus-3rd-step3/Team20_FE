import { ArrowLeft, Share2, Heart } from 'lucide-react';
import { IconButton } from '@/shared/ui';
import type { ContentOverviewIconGroupProps } from '../../model/types';

export function ContentOverviewIconGroup({
  onBackClick,
  onShareClick,
  onLikeClick,
  isLiked = false,
}: ContentOverviewIconGroupProps) {
  return (
    <div className="absolute top-0 left-0 right-0 z-[--z-elevated] p-[--spacing-4] pt-safe">
      <div className="flex justify-between items-center">
        <IconButton
          Icon={ArrowLeft}
          shape="circle"
          className="bg-[--color-gray-900]/30 hover:bg-[--color-gray-900]/50 backdrop-blur-sm shadow-[--shadow-button]"
          onClick={onBackClick}
        />

        <div className="flex gap-[--spacing-2]">
          <IconButton
            Icon={Share2}
            shape="circle"
            className="bg-[--color-gray-900]/30 hover:bg-[--color-gray-900]/50 backdrop-blur-sm shadow-[--shadow-button]"
            onClick={onShareClick}
          />
          <IconButton
            Icon={Heart}
            shape="circle"
            className={`bg-[--color-gray-900]/30 hover:bg-[--color-gray-900]/50 backdrop-blur-sm shadow-[--shadow-button] ${
              isLiked
                ? '[&_svg]:text-[--color-semantic-error] [&_svg]:fill-[--color-semantic-error]'
                : ''
            }`}
            onClick={onLikeClick}
          />
        </div>
      </div>
    </div>
  );
}

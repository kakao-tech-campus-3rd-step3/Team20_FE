import { ArrowLeft, Share2, Heart } from 'lucide-react';
import { IconButton } from '@/shared/ui';
import type { ContentOverviewIconGroupProps } from '../model/types';

// 1주차엔 레이아웃만 잡기로 했으므로 구조만 잡기(핸들러 기능 동작 안함, hooks도 정의안함)
export function ContentOverviewIconGroup({
  onBackClick,
  onShareClick,
  onLikeClick,
  isLiked = false,
}: ContentOverviewIconGroupProps) {
  return (
    <div className="absolute top-0 left-0 right-0 z-10 p-4 safe-area-top">
      <div className="flex justify-between items-center">
        <IconButton
          Icon={ArrowLeft}
          shape="circle"
          className="bg-black/30 hover:bg-black/50 backdrop-blur-sm"
          onClick={onBackClick}
        />

        <div className="flex gap-2">
          <IconButton
            Icon={Share2}
            shape="circle"
            className="bg-black/30 hover:bg-black/50 backdrop-blur-sm"
            onClick={onShareClick}
          />
          <IconButton
            Icon={Heart}
            shape="circle"
            className={`bg-black/30 hover:bg-black/50 backdrop-blur-sm ${
              isLiked ? '[&_svg]:text-red-500 [&_svg]:fill-red-500' : ''
            }`}
            onClick={onLikeClick}
          />
        </div>
      </div>
    </div>
  );
}

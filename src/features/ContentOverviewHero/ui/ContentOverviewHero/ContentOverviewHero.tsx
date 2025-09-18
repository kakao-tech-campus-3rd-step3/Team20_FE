import { contentHero } from '@/__mocks__/contentHero';
import { ContentOverviewIconGroup } from '../ContentOverviewIconGroup/ContentOverviewIconGroup';
import { ContentOverviewInfo } from '../ContentOverviewInfo/ContentOverviewInfo';
import { ContentOverviewActionButtons } from '../ContentOverviewActionButton/ContentOverviewActionButtons';
import type { ContentOverviewHeroProps } from '../../model/types';

export function ContentOverviewHero({
  title = contentHero.title,
  category = contentHero.category,
  description = contentHero.description,
  imageUrl = contentHero.imageUrl,
  countOfLocations = contentHero.countOfLocations,
  isLiked = false,
}: ContentOverviewHeroProps) {
  return (
    <div className="relative h-screen-safe w-full overflow-hidden">
      {/* 배경 이미지 */}
      <div className="absolute inset-0">
        <img src={imageUrl} alt={title} className="w-full h-full object-cover" />
        {/* 그라데이션 오버레이 */}
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-gray-0)] to-[var(--color-gray-800)]" />
      </div>

      {/* 상단 아이콘 그룹 */}
      <ContentOverviewIconGroup isLiked={isLiked} />

      {/* 콘텐츠 정보 */}
      <ContentOverviewInfo
        title={title}
        category={category}
        description={description}
        countOfLocations={countOfLocations}
      />

      {/* 하단 액션 버튼들 */}
      <ContentOverviewActionButtons />
    </div>
  );
}

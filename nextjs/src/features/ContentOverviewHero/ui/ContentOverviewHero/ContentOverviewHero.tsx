import { contentHero } from '@/__mocks__/contentHero';
import { ContentOverviewIconGroup } from '../ContentOverviewIconGroup/ContentOverviewIconGroup';
import { ContentOverviewInfo } from '../ContentOverviewInfo/ContentOverviewInfo';
import { ContentOverviewActionButtons } from '../ContentOverviewActionButton/ContentOverviewActionButtons';
import type { ContentDetail, ContentLocation } from '@/entities/content/model/types';
import Image from 'next/image';

interface ContentOverviewHeroProps {
  contentDetail: ContentDetail;
  contentLocations: ContentLocation[];
  description?: string;
  isLiked?: boolean;
}

export function ContentOverviewHero({
  contentDetail,
  contentLocations,
  description = contentHero.description,
  isLiked = false,
}: ContentOverviewHeroProps) {
  return (
    <div className="relative h-screen-safe w-full overflow-hidden">
      {/* 배경 이미지 */}
      <div className="absolute inset-0">
        <Image 
          src={contentDetail.posterImageUrl} 
          alt={contentDetail.title} 
          fill
          className="object-cover" 
          priority
        />
        {/* 그라데이션 오버레이 */}
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-gray-0)] to-[var(--color-gray-800)]" />
      </div>

      {/* 상단 아이콘 그룹 */}
      <ContentOverviewIconGroup isLiked={isLiked} />

      {/* 콘텐츠 정보 */}
      <ContentOverviewInfo
        title={contentDetail.title}
        category={contentDetail.category}
        description={description}
        countOfLocations={contentLocations.length}
      />

      {/* 하단 액션 버튼들 */}
      <ContentOverviewActionButtons />
    </div>
  );
}

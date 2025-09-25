import { contentHero } from '@/__mocks__/contentHero';
import { ContentOverviewIconGroup } from '../ContentOverviewIconGroup/ContentOverviewIconGroup';
import { ContentOverviewInfo } from '../ContentOverviewInfo/ContentOverviewInfo';
import { ContentOverviewActionButtons } from '../ContentOverviewActionButton/ContentOverviewActionButtons';
import type { ContentOverviewHeroProps } from '../../model/types';
import { useContentDetail } from '@/entities/content/api/queryfn';
import { useParams } from 'react-router-dom';
import { getContentLocations } from '@/entities/content/api/contentApi';
import { useSuspenseQuery } from '@tanstack/react-query';

export function ContentOverviewHero({
  description = contentHero.description,
  isLiked = false,
}: ContentOverviewHeroProps) {
  const { id } = useParams();

  const { data } = useContentDetail(id ?? '');

  const { data: contentLocations = [] } = useSuspenseQuery({
    queryKey: ['content-locations', id],
    queryFn: () => getContentLocations(id ?? ''),
  });
  return (
    <div className="relative h-screen-safe w-full overflow-hidden">
      {/* 배경 이미지 */}
      <div className="absolute inset-0">
        <img src={data.posterImageUrl} alt={data.title} className="w-full h-full object-cover" />
        {/* 그라데이션 오버레이 */}
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-gray-0)] to-[var(--color-gray-800)]" />
      </div>

      {/* 상단 아이콘 그룹 */}
      <ContentOverviewIconGroup isLiked={isLiked} />

      {/* 콘텐츠 정보 */}
      <ContentOverviewInfo
        title={data.title}
        category={data.category}
        description={description}
        countOfLocations={contentLocations.length}
      />

      {/* 하단 액션 버튼들 */}
      <ContentOverviewActionButtons />
    </div>
  );
}

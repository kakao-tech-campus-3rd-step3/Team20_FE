import { contentHero } from '@/__mocks__/contentHero';

import { ContentOverviewInfo } from '../ContentOverviewInfo/ContentOverviewInfo';
import { ContentOverviewActionButtons } from '../ContentOverviewActionButton/ContentOverviewActionButtons';
import type { ContentOverviewHeroProps } from '../../model/types';
import { useContentDetail } from '@/entities/content/api/queryfn';
import { getContentLocations } from '@/entities/content/api/contentApi';
import { useSuspenseQuery } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';

export function ContentOverviewHero({
  contentId,
  description = contentHero.description,
}: ContentOverviewHeroProps) {
  const { data } = useContentDetail(contentId);

  const { data: contentLocations = [] } = useSuspenseQuery({
    queryKey: ['content-locations', contentId],
    queryFn: () => getContentLocations(contentId),
  });

  const navigate = useNavigate();

  const handleMapViewClick = () => {
    navigate({ to: `/content/${contentId}/map` });
  };
  return (
    <section className="bg-gradient-to-t from-(--color-gray-800) to-(--color-gray-900)">
      <div className="mx-auto max-w-7xl px-[--spacing-4] sm:px-[--spacing-6] lg:px-[--spacing-8]">
        {/* 이미지 */}
        <div className="relative h-[32rem] md:h-[48rem] rounded-2xl overflow-hidden">
          <img
            src={data.posterImageUrl}
            alt={data.title}
            className="absolute inset-0 w-full h-full object-cover object-center rounded-2xl"
          />
        </div>

        {/* 콘텐츠 정보 */}
        <div className="text-gray-900 ">
          <ContentOverviewInfo
            title={data.title}
            category={data.category}
            description={description}
            countOfLocations={contentLocations.length}
          />
        </div>

        {/* 하단 액션 버튼들 */}
        <div>
          <ContentOverviewActionButtons onMapViewClick={handleMapViewClick} />
        </div>
      </div>
    </section>
  );
}

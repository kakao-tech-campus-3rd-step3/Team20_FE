'use client';

import { useRouter } from 'next/navigation';
import { ContentOverviewInfo } from '../ContentOverviewInfo/ContentOverviewInfo';
import { ContentOverviewActionButtons } from '../ContentOverviewActionButton/ContentOverviewActionButtons';
import type { ContentDetail } from '@/entities/content/model/types';

interface ContentOverviewHeroClientProps {
  contentDetail: ContentDetail;
  contentLocationsCount: number;
  description?: string;
}

export function ContentOverviewHeroClient({
  contentDetail,
  contentLocationsCount,
  description = '',
}: ContentOverviewHeroClientProps) {
  const router = useRouter();

  const handleMapViewClick = () => {
    router.push(`/content/${contentDetail.contentId}/map`);
  };

  return (
    <section className="bg-gradient-to-t from-(--color-gray-800) to-(--color-gray-900)">
      <div className="mx-auto max-w-7xl px-[--spacing-4] sm:px-[--spacing-6] lg:px-[--spacing-8]">
        <div className="relative h-[40rem] md:h-[56rem] lg:h-[64rem] rounded-2xl overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={contentDetail.posterImageUrl}
            alt={contentDetail.title}
            className="absolute inset-0 w-full h-full object-contain rounded-2xl"
          />
        </div>

        <div className="text-gray-900 ">
          <ContentOverviewInfo
            title={contentDetail.title}
            category={contentDetail.category}
            description={description}
            countOfLocations={contentLocationsCount}
          />
        </div>
        <div>
          <ContentOverviewActionButtons onMapViewClick={handleMapViewClick} />
        </div>
      </div>
    </section>
  );
}

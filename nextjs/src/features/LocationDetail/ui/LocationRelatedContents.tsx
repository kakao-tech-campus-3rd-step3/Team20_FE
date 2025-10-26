'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useRelatedContentDetails } from '@/entities/content/api/queryfn';
import { useLocationDetail } from '@/entities/location/api/queryfn';

interface LocationRelatedContentsProps {
  locationId: string;
}

export function LocationRelatedContents({ locationId }: LocationRelatedContentsProps) {
  const { data: location, isLoading, isError } = useLocationDetail(locationId);
  
  const list = location?.relatedContents ?? [];
  const ids = list.map((c) => c.contentId.toString());
  const { data } = useRelatedContentDetails(ids);
  
  if (isLoading) {
    return (
      <section className="mx-auto max-w-[800px] p-6 rounded-16 shadow-custom-light">
        <div className="text-[var(--color-text-secondary)]">로딩 중...</div>
      </section>
    );
  }

  if (isError || !location) {
    return (
      <section className="mx-auto max-w-[800px] p-6 rounded-16 shadow-custom-light">
        <div className="text-[var(--color-text-secondary)]">위치 정보를 불러올 수 없습니다.</div>
      </section>
    );
  }

  if (!list.length) {
    return null;
  }

  const byId = new Map(data?.map((d) => [d.contentId, d]));

  return (
    <section className="mx-auto max-w-[800px] p-6 rounded-16 shadow-custom-light">
      <h2 className="text-heading-1 font-bold mb-12">관련 콘텐츠</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-rows-1 gap-12">
        {list.map((content) => {
          const detail = byId?.get(content.contentId);
          const title = detail?.title ?? content.title;
          const category = detail?.category ?? content.category;
          const image = detail?.posterImageUrl;

          return (
            <RelatedContentCard
              key={content.contentId}
              contentId={content.contentId}
              title={title}
              category={category}
              image={image}
            />
          );
        })}
      </div>
    </section>
  );
}

function RelatedContentCard({
  contentId,
  title,
  category,
  image,
}: {
  contentId: number;
  title: string;
  category: string;
  image?: string;
}) {
  return (
    <Link href={`/content/${contentId}`} className="group block">
      <div className="rounded-2xl overflow-hidden rounded-16 bg-white shadow-custom-light hover:shadow-custom-medium transition-transform duration-200 group-hover:-translate-y-4">
        <div className="relative w-full h-80 bg-gray-100">
          {image ? (
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover object-center transition-transform duration-200 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 400px"
            />
          ) : (
            <div className="flex items-center justify-center w-full h-full text-gray-400 text-14">
              이미지 없음
            </div>
          )}
        </div>
        <div className="bg-brand-tertiary/70 p-12">
          <div className="text-16 font-medium line-clamp-1">{title}</div>
          <div className="text-14 mt-6">{category}</div>
        </div>
      </div>
    </Link>
  );
}

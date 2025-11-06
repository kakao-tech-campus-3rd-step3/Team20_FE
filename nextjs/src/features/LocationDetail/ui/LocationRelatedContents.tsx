'use client';

import Link from 'next/link';
import { useRelatedContentDetails } from '@/entities/content/api/queryfn';
import type { RelatedContent } from '@/entities/location';
import type { LocationRelatedContentsProps } from '../model/types';

export function LocationRelatedContents({ relatedContents }: LocationRelatedContentsProps) {
  const list = relatedContents ?? [];
  const ids = list.map((c) => c.contentId.toString());
  const { data } = useRelatedContentDetails(ids);

  if (!list.length) {
    return null;
  }

  const byId = new Map(data?.map((d) => [d.contentId, d]));

  return (
    <section className="max-w-6xl mx-auto">
      <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-xl border border-white/20">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 flex items-center">
          <div className="w-1 h-8 bg-gradient-to-b from-purple-500 to-pink-600 rounded-full mr-4"></div>
          관련 콘텐츠
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
  category: RelatedContent['category'];
  image?: string;
}) {
  return (
    <Link href={`/content/${contentId}`} className="group block">
      <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group-hover:-translate-y-2 border border-gray-100">
        <div className="aspect-[4/3] relative overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
          {image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={image?.trim()}
              alt={title}
              className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-110"
            />
          ) : (
            <div className="flex items-center justify-center w-full h-full text-gray-400 text-sm">
              <div className="text-center">
                <div className="text-4xl mb-2">🎬</div>
                <div>이미지 없음</div>
              </div>
            </div>
          )}

          {/* Category Badge */}
          <div className="absolute top-3 left-3">
            <span className="bg-black/70 text-white text-xs px-3 py-1 rounded-full backdrop-blur-sm">
              {category}
            </span>
          </div>

          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* View More Indicator */}
          <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
            <div className="bg-white/90 text-gray-800 text-xs px-2 py-1 rounded-full backdrop-blur-sm">
              자세히 보기 →
            </div>
          </div>
        </div>

        <div className="p-6">
          <h3 className="font-semibold text-gray-800 text-lg leading-tight line-clamp-2 group-hover:text-blue-600 transition-colors duration-200">
            {title}
          </h3>
          <p className="text-sm text-gray-500 mt-2 capitalize">{category}</p>
        </div>
      </div>
    </Link>
  );
}

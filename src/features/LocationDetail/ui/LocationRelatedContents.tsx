import { Link } from '@tanstack/react-router';
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
  category: RelatedContent['category'];
  image?: string;
}) {
  return (
    <Link to="/content/$id" params={{ id: contentId.toString() }} className="group block">
      <div className="rounded-2xl overflow-hidden rounded-16 bg-white shadow-custom-light hover:shadow-custom-medium transition-transform duration-200 group-hover:-translate-y-4">
        <div className="w-full h-80 bg-gray-100">
          {image ? (
            <img
              src={image}
              alt={title}
              className="w-full h-full object-cover object-center transition-transform duration-200 group-hover:scale-105"
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

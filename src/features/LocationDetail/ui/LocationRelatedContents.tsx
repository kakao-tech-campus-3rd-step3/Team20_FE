import { Link } from '@tanstack/react-router';
import { useContentDetail } from '@/entities/content/api/queryfn';
import type { RelatedContent } from '@/entities/location';
import type { LocationRelatedContentsProps } from '../model/types';

export function LocationRelatedContents({ relatedContents }: LocationRelatedContentsProps) {
  if (!relatedContents?.length) {
    return null;
  }

  return (
    <section className="p-6 rounded-16 shadow-custom-light bg-brand-primary">
      <h2 className="text-heading-1 font-bold mb-12">관련 콘텐츠</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-12">
        {relatedContents.map((content) => (
          <RelatedContentCard key={content.contentId} content={content} />
        ))}
      </div>
    </section>
  );
}

function RelatedContentCard({ content }: { content: RelatedContent }) {
  const { data } = useContentDetail(content.contentId.toString());
  const title = data?.title ?? content.title;
  const category = data?.category ?? content.category;
  const image = data?.posterImageUrl;

  return (
    <Link to="/content/$id" params={{ id: content.contentId.toString() }} className="group block">
      <div className="rounded-2xl overflow-hidden rounded-16 bg-white shadow-custom-light hover:shadow-custom-medium transition-transform duration-200 group-hover:-translate-y-4">
        <div className="w-full h-100 bg-gray-100">
          {image ? (
            <img
              src={image}
              alt={title}
              className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105"
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

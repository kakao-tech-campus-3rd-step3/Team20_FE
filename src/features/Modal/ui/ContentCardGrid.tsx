import { ContentCard } from './ContentCard';
import type { ContentCardGridProps } from '../model/types';

export function ContentCardGrid({ contents }: ContentCardGridProps) {
  if (contents.length === 0) {
    return <div className="text-center py-8 text-gray-500">표시할 콘텐츠가 없습니다.</div>;
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
      {contents.map((content) => (
        <ContentCard key={content.contentId} content={content} />
      ))}
    </div>
  );
}

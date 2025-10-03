import { ContentCard } from './ContentCard';
import type { ContentCardGridProps } from '../model/types';

export function ContentCardGrid({ contents }: ContentCardGridProps) {
  if (contents.length === 0) {
    return (
      <div className="text-center py-(--spacing-8) text-(--color-text-secondary)">
        표시할 콘텐츠가 없습니다.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {contents.map((content) => (
        <ContentCard key={content.contentId} content={content} />
      ))}
    </div>
  );
}

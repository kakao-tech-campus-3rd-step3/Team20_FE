import { messages } from '../../model/messages';
import { PosterCard } from '../PosterCard/PosterCard';
import { Link } from 'react-router-dom';
import { usePopularContents } from '@/entities/content/api/queryfn';
import type { PopularContent } from '@/entities/content/model/types';

export function PopularCarousel() {
  const {
    data = [],
    isLoading,
    isError,
  } = usePopularContents() as {
    data: PopularContent[];
    isLoading: boolean;
    isError: boolean;
  };

  return (
    <section className="py-[var(--spacing-8)]">
      <div className="flex items-center justify-between mb-[var(--spacing-4)]">
        <h2 className="text-heading-4 text-[var(--color-text-primary)]">{messages.popularNow}</h2>
        <Link to="/trending" className="text-link text-[var(--color-text-secondary)]">
          {messages.seeAll}
        </Link>
      </div>

      {isLoading && (
        <div className="flex gap-[var(--spacing-4)] overflow-x-auto pb-[var(--spacing-2)] snap-x snap-mandatory">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="min-w-[220px] snap-start rounded-xl border border-[var(--color-border-primary)] p-[var(--spacing-4)] bg-[var(--color-background-primary)] animate-pulse"
            >
              <div className="aspect-[3/4] rounded-lg bg-[var(--color-gray-100)]" />
              <div className="h-4 mt-[var(--spacing-4)] bg-[var(--color-gray-100)] rounded" />
              <div className="h-3 mt-[var(--spacing-2)] bg-[var(--color-gray-100)] rounded w-1/2" />
            </div>
          ))}
        </div>
      )}

      {isError && (
        <p className="text-[var(--color-text-secondary)] text-sm">
          데이터를 불러오는 중 오류가 발생했어요. 잠시 후 다시 시도해주세요.
        </p>
      )}

      {!isLoading && !isError && data.length === 0 && (
        <p className="text-[var(--color-text-secondary)] text-sm">표시할 인기 콘텐츠가 없어요.</p>
      )}

      {!isLoading && !isError && data.length > 0 && (
        <div className="flex gap-[var(--spacing-4)] overflow-x-auto pb-[var(--spacing-2)] snap-x snap-mandatory">
          {data.map((content) => (
            <PosterCard key={content.contentId} {...content} />
          ))}
        </div>
      )}
    </section>
  );
}

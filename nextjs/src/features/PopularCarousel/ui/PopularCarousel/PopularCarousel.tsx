import { messages } from '../../model/messages';
import { PosterCard } from '../PosterCard/PosterCard';
import Link from 'next/link';
import type { PopularContent } from '@/entities/content/model/types';

interface PopularCarouselProps {
  initialData?: PopularContent[];
}

export function PopularCarousel({ initialData = [] }: PopularCarouselProps) {
  return (
    <section className="py-[var(--spacing-8)]">
      <div className="flex items-center justify-between mb-[var(--spacing-4)]">
        <h2 className="text-heading-4 text-[var(--color-text-primary)]">{messages.popularNow}</h2>
        <Link href="/" className="text-link text-[var(--color-text-secondary)]">
          {messages.seeAll}
        </Link>
      </div>

      {initialData.length === 0 ? (
        <p className="text-[var(--color-text-secondary)] text-sm">표시할 인기 콘텐츠가 없어요.</p>
      ) : (
        <div className="flex gap-[var(--spacing-4)] overflow-x-auto pb-[var(--spacing-2)] snap-x snap-mandatory">
          {initialData.map((content, index) => (
            <PosterCard key={content.contentId} {...content} rank={index + 1} />
          ))}
        </div>
      )}
    </section>
  );
}

import type { PopularContent } from '@/entities/content/model/types';
import { Link } from 'react-router-dom';

interface PosterCardProps extends PopularContent {
  rank: number;
}

export function PosterCard({ contentId, title, posterImageUrl, rank }: PosterCardProps) {
  return (
    <article className="min-w-[220px] snap-start rounded-xl border border-[var(--color-border-primary)] p-[var(--spacing-4)] bg-[var(--color-background-primary)] hover:shadow-[var(--shadow-card)] transition duration-200 relative">
      <Link to={`/content/${contentId}`} className="block">
        <div className="aspect-[3/4] rounded-lg bg-gradient-to-br from-[var(--color-gray-100)] to-[var(--color-gray-200)] grid place-items-center text-[var(--color-text-secondary)] text-sm relative">
          <span className="absolute top-2 left-2 z-10 inline-flex items-center justify-center w-8 h-8 rounded-full bg-[var(--color-background-primary)]/80 backdrop-blur text-[var(--color-text-primary)] text-sm font-semibold border border-[var(--color-border-primary)]">
            {rank}
          </span>
          <img
            src={posterImageUrl}
            alt={title}
            className="aspect-[3/4] w-full h-auto rounded-lg object-cover bg-gradient-to-br from-[var(--color-gray-100)] to-[var(--color-gray-200)]"
          />
        </div>
        <h3
          className="mt-[var(--spacing-4)] font-medium line-clamp-2 text-[var(--color-text-primary)]"
          title={title}
        >
          {title}
        </h3>
      </Link>
    </article>
  );
}

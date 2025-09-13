import type { PosterCardProps } from '../model/type';
import { Link } from 'react-router-dom';

export function PosterCard({ id, title, year, spots }: PosterCardProps) {
  return (
    <article className="min-w-[220px] snap-start rounded-xl border border-[var(--color-border-primary)] p-[var(--spacing-4)] bg-[var(--color-background-primary)] hover:shadow-[var(--shadow-card)] transition duration-200">
      <Link to={`/content/${id}`} className="block">
        <div className="aspect-[3/4] rounded-lg bg-gradient-to-br from-[var(--color-gray-100)] to-[var(--color-gray-200)] grid place-items-center text-[var(--color-text-secondary)] text-sm">
          Poster
        </div>
        <h3
          className="mt-[var(--spacing-4)] font-medium line-clamp-2 text-[var(--color-text-primary)]"
          title={title}
        >
          {title}
        </h3>
        <p className="text-xs text-[var(--color-text-secondary)]">{year}</p>
        <p className="text-sm text-[var(--color-text-primary)] mt-[var(--spacing-2)]">
          {spots} spots
        </p>
      </Link>
    </article>
  );
}

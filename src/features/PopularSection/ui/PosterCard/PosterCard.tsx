import type { PopularContent } from '@/entities/content/model/types';
import { Link } from '@tanstack/react-router';

type PosterCardProps = PopularContent;

export function PosterCard({ contentId, title, posterImageUrl }: PosterCardProps) {
  return (
    <article className="group  border border-[var(--color-border-primary)] overflow-hidden bg-[var(--color-background-primary)] shadow-[var(--shadow-card)] transition-transform duration-300 will-change-transform relative hover:-translate-y-0.5">
      <Link to="/content/$id" params={{ id: String(contentId) }} className="block">
        <div className="aspect-[3/4] overflow-hidden relative bg-gradient-to-br from-[var(--color-gray-100)] to-[var(--color-gray-200)]">
          <img
            src={posterImageUrl}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
          />
          <div className="pointer-events-none absolute inset-0 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        </div>
      </Link>
      <div className="p-[var(--spacing-3)] bg-brand-primary/50">
        <h3 className="mt-2 text-heading-4 text-[var(--color-text-primary)] line-clamp-2 ">
          {title}
        </h3>
      </div>
    </article>
  );
}

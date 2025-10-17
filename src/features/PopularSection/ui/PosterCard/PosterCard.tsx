import type { PopularContent } from '@/entities/content/model/types';
import { Link } from '@tanstack/react-router';

type PosterCardProps = PopularContent;

export function PosterCard({ contentId, title, posterImageUrl }: PosterCardProps) {
  return (
    <article className="group border border-[var(--color-border-primary)] overflow-hidden bg-[var(--color-background-primary)] shadow-lg hover:shadow-2xl transition-all duration-300 will-change-transform relative hover:-translate-y-2 rounded-2xl">
      <Link to="/content/$id" params={{ id: String(contentId) }} className="block">
        <div className="aspect-[3/4] overflow-hidden relative bg-gradient-to-br from-[var(--color-gray-100)] to-[var(--color-gray-200)]">
          <img
            src={posterImageUrl}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
          />
          {/* 호버 시 오버레이 */}
          <div className="pointer-events-none absolute inset-0 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

          {/* 플레이 버튼 오버레이 */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
            <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30">
              <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>

          {/* 상단 그라데이션 */}
          <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
      </Link>

      <div className="p-4 bg-gradient-to-b from-[var(--color-background-primary)] to-[var(--color-background-secondary)]">
        <h3 className="text-heading-5 md:text-heading-4 text-[--color-text-primary] line-clamp-2 font-semibold leading-tight group-hover:text-[--color-brand-secondary] transition-colors duration-300">
          {title}
        </h3>

        {/* 하단 액션 영역 */}
        <div className="mt-3 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="flex items-center gap-2 text-sm text-[--color-text-tertiary]">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
            <span>인기 콘텐츠</span>
          </div>
          <div className="w-2 h-2 bg-[--color-brand-secondary] rounded-full animate-pulse" />
        </div>
      </div>
    </article>
  );
}

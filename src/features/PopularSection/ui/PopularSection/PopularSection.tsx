import { messages } from '../../model/messages';
import { PosterCard } from '../PosterCard/PosterCard';

import { usePopularContents } from '@/entities/content/api/queryfn';
import type { PopularContent } from '@/entities/content/model/types';

export function PopularSection() {
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
    <section className="relative py-[var(--spacing-20)] px-[var(--spacing-container-padding)] md:px-[var(--spacing-container-padding-tablet)] lg:px-[var(--spacing-container-padding-desktop)] pb-[var(--spacing-20)] overflow-hidden">
      {/* 배경 효과 */}
      <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-brand-primary)]/3 via-transparent to-[var(--color-brand-secondary)]/5 pointer-events-none" />

      <div className="relative">
        {/* 섹션 헤더 */}
        <div className="text-center mb-[var(--spacing-16)]">
          <div className="flex items-center justify-center gap-3 mb-[var(--spacing-4)]">
            <div className="w-3 h-3 bg-[var(--color-brand-secondary)] rounded-full animate-pulse" />
            <h2 className="text-heading-2 md:text-heading-1 text-[--color-text-primary] font-bold">
              {messages.popularNow}
            </h2>
            <div
              className="w-3 h-3 bg-[var(--color-brand-primary)] rounded-full animate-pulse"
              style={{ animationDelay: '0.5s' }}
            />
          </div>
          <p className="text-body-large text-[--color-text-secondary] max-w-2xl mx-auto">
            지금 가장 인기 있는 드라마와 영화를 만나보세요
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-[var(--color-brand-secondary)] to-[var(--color-brand-primary)] rounded-full mx-auto mt-[var(--spacing-4)]" />
        </div>

        {isLoading && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {Array.from({ length: 10 }).map((_, i) => (
              <div
                key={i}
                className="rounded-2xl border border-[var(--color-border-primary)] p-4 bg-[var(--color-background-primary)] animate-pulse shadow-lg"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className="aspect-[3/4] rounded-xl bg-gradient-to-br from-[var(--color-gray-100)] to-[var(--color-gray-200)]" />
                <div className="h-6 mt-4 bg-gradient-to-r from-[var(--color-gray-100)] to-[var(--color-gray-200)] rounded-lg w-3/4" />
                <div className="h-4 mt-2 bg-gradient-to-r from-[var(--color-gray-100)] to-[var(--color-gray-200)] rounded-lg w-1/2" />
              </div>
            ))}
          </div>
        )}

        {isError && (
          <div className="text-center py-[var(--spacing-16)]">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[var(--color-brand-secondary)]/10 flex items-center justify-center">
              <svg
                className="w-8 h-8 text-[var(--color-brand-secondary)]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <p className="text-[var(--color-text-secondary)] text-lg">
              데이터를 불러오는 중 오류가 발생했어요.
            </p>
            <p className="text-[var(--color-text-tertiary)] text-sm mt-2">
              잠시 후 다시 시도해주세요.
            </p>
          </div>
        )}

        {!isLoading && !isError && data.length === 0 && (
          <div className="text-center py-[var(--spacing-16)]">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[var(--color-brand-primary)]/10 flex items-center justify-center">
              <svg
                className="w-8 h-8 text-[var(--color-brand-primary)]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                />
              </svg>
            </div>
            <p className="text-[var(--color-text-secondary)] text-lg">
              표시할 인기 콘텐츠가 없어요.
            </p>
          </div>
        )}

        {!isLoading && !isError && data.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {data.map((content, index) => (
              <div
                key={content.contentId}
                className="animate-fadeInUp"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <PosterCard {...content} />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

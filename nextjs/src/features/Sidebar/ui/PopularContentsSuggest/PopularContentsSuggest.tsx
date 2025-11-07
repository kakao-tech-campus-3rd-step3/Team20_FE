'use client';

import { usePopularContents } from '../../model/hooks/usePopularContents';
import type { PopularContentsSuggestProps } from '../../model/types';

export function PopularContentsSuggest({
  onPlacesChange,
  onSearchStateChange,
}: PopularContentsSuggestProps) {
  const { popularContents, isLoading, handleContentClick } = usePopularContents({
    onPlacesChange,
    onSearchStateChange,
  });

  return (
    <div className="text-left">
      <h4 className="text-body-small text-[var(--color-text-primary)] mb-[var(--spacing-3)] font-medium">
        💡 인기 콘텐츠로 검색해보세요
      </h4>
      {isLoading ? (
        <div className="space-y-[var(--spacing-2)]">
          {[...Array(3)].map((_, index) => (
            <div
              key={index}
              className="h-8 bg-[var(--color-background-secondary)] rounded animate-pulse"
            ></div>
          ))}
        </div>
      ) : (
        <div className="space-y-[var(--spacing-2)]">
          {popularContents.map((content) => (
            <button
              key={content.contentId}
              onClick={() => handleContentClick(content.title || '')}
              className="w-full flex items-center gap-[var(--spacing-2)] p-[var(--spacing-2)] text-left text-body-small text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-background-secondary)] rounded-lg transition-colors"
            >
              <span className="w-2 h-2 bg-[var(--color-brand-primary)] rounded-full flex-shrink-0"></span>
              <span className="truncate">{content.title}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

import { SIDEBAR_EMPTY_STATE } from '../../model/messages';
import { usePopularContents } from '../../model/hooks/usePopularContents';
import type { Place } from '../../model/types';

interface SidebarEmptyStateProps {
  onPlacesChange?: (places: Place[]) => void;
  onSearchStateChange?: (isSearching: boolean, query: string) => void;
}

export function SidebarEmptyState({ onPlacesChange, onSearchStateChange }: SidebarEmptyStateProps) {
  const { popularContents, isLoading, handleContentClick } = usePopularContents({
    onPlacesChange,
    onSearchStateChange,
  });

  return (
    <div className="p-(--spacing-6) text-center">
      <div className="mb-(--spacing-4)">
        <div className="w-16 h-16 mx-auto mb-(--spacing-3) bg-(--color-background-secondary) rounded-full flex items-center justify-center">
          <span className="text-2xl">🎬</span>
        </div>
        <h3 className="text-heading-6 text-(--color-text-primary) mb-(--spacing-2)">
          {SIDEBAR_EMPTY_STATE.TITLE}
        </h3>
        <p className="text-body text-(--color-text-secondary) mb-(--spacing-4)">
          {SIDEBAR_EMPTY_STATE.DESCRIPTION}
        </p>
        <div className="text-left">
          <h4 className="text-body-small text-(--color-text-primary) mb-(--spacing-3) font-medium">
            💡 인기 콘텐츠로 검색해보세요
          </h4>
          {isLoading ? (
            <div className="space-y-(--spacing-2)">
              {[...Array(3)].map((_, index) => (
                <div
                  key={index}
                  className="h-8 bg-(--color-background-secondary) rounded animate-pulse"
                ></div>
              ))}
            </div>
          ) : (
            <div className="space-y-(--spacing-2)">
              {popularContents.map((content) => (
                <button
                  key={content.contentId}
                  onClick={() => {
                    handleContentClick(content.title || '');
                  }}
                  className="w-full flex items-center gap-(--spacing-2) p-(--spacing-2) text-left text-body-small text-(--color-text-secondary) hover:text-(--color-text-primary) hover:bg-(--color-background-secondary) rounded-lg transition-colors"
                >
                  <span className="w-2 h-2 bg-(--color-brand-primary) rounded-full flex-shrink-0"></span>
                  <span className="truncate">{content.title}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

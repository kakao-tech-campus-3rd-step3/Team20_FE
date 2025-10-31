import { SIDEBAR_EMPTY_STATE } from '../../model/messages';
import type { PopularContentsSuggestProps } from '../../model/types';
import { PopularContentsSuggest } from '../PopularContentsSuggest/PopularContentsSuggest';

type SidebarEmptyStateProps = PopularContentsSuggestProps;

export function SidebarEmptyState({ onPlacesChange, onSearchStateChange }: SidebarEmptyStateProps) {
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
        <PopularContentsSuggest
          onPlacesChange={onPlacesChange}
          onSearchStateChange={onSearchStateChange}
        />
      </div>
    </div>
  );
}

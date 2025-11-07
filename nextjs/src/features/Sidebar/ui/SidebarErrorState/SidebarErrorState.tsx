import { SIDEBAR_STATUS_TEXT } from '../../model/messages';
import type { PopularContentsSuggestProps } from '../../model/types';
import { PopularContentsSuggest } from '../PopularContentsSuggest/PopularContentsSuggest';

type SidebarErrorStateProps = PopularContentsSuggestProps;

export function SidebarErrorState({ onPlacesChange, onSearchStateChange }: SidebarErrorStateProps) {
  return (
    <div className="p-[var(--spacing-6)] text-center">
      <div className="mb-[var(--spacing-4)]">
        <div className="w-16 h-16 mx-auto mb-[var(--spacing-3)] bg-[var(--color-background-secondary)] rounded-full flex items-center justify-center">
          <span className="text-2xl">⚠️</span>
        </div>
        <p className="text-body text-[var(--color-text-error)] mb-[var(--spacing-4)]">
          {SIDEBAR_STATUS_TEXT.ERROR}
        </p>
        <PopularContentsSuggest
          onPlacesChange={onPlacesChange}
          onSearchStateChange={onSearchStateChange}
        />
      </div>
    </div>
  );
}

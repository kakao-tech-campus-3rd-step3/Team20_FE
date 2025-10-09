import { Search, X } from 'lucide-react';
import type { SidebarSearchProps } from '../../model/types';
import { SIDEBAR_SEARCH_TEXT } from '../../model/messages';
import { useSearchInput } from '../../model/hooks/useSearchInput';

export function SidebarSearch({
  className,
  onPlacesChange,
  onSearchStateChange,
}: SidebarSearchProps) {
  const { inputValue, searchQuery, handleInputChange, handleClearSearch } = useSearchInput(
    onPlacesChange,
    onSearchStateChange,
  );

  return (
    <div
      className={['p-(--spacing-4) border-b border-(--color-border-primary)', className ?? ''].join(
        ' ',
      )}
    >
      <div className="relative">
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder={SIDEBAR_SEARCH_TEXT.PLACEHOLDER}
          className="
            w-full pl-10 pr-10 py-(--spacing-3)
            border border-(--color-border-primary) rounded-xl
            bg-(--color-background-primary)
            text-body text-(--color-text-primary)
            placeholder:text-(--color-text-tertiary)
            focus:outline-none focus-visible:ring-2 focus-visible:ring-(--color-border-focus) focus:border-transparent
            shadow-(--shadow-inset)
          "
        />
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-(--color-text-tertiary)" />
        {inputValue && (
          <button
            onClick={handleClearSearch}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-(--color-text-tertiary) hover:text-(--color-text-secondary)"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      <div className="mt-(--spacing-2) text-caption text-(--color-text-secondary)">
        {searchQuery ? (
          <p className="text-(--color-text-primary)">
            "{searchQuery}" {SIDEBAR_SEARCH_TEXT.COMPLETED}
          </p>
        ) : (
          <p>{SIDEBAR_SEARCH_TEXT.TIP}</p>
        )}
      </div>
    </div>
  );
}

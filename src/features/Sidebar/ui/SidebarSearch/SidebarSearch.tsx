import { Search, X } from 'lucide-react';
import type { SidebarSearchProps } from '../../model/types';
import { SIDEBAR_SEARCH_TEXT } from '../../model/messages';
import { useSearchInput } from '../../model/hooks/useSearchInput';
import { useBreakpoints } from '@/shared/hooks/useMediaQuery';
import { SIDEBAR_SEARCH_CLASSES, SIDEBAR_SEARCH_CONDITIONAL_CLASSES } from '../../model/constants';

export function SidebarSearch({
  className,
  onPlacesChange,
  onSearchStateChange,
}: SidebarSearchProps) {
  const { isLaptop } = useBreakpoints();
  const { inputValue, searchQuery, handleInputChange, handleClearSearch } = useSearchInput(
    onPlacesChange,
    onSearchStateChange,
  );

  return (
    <div
      className={[
        SIDEBAR_SEARCH_CLASSES.CONTAINER,
        isLaptop && SIDEBAR_SEARCH_CONDITIONAL_CLASSES.DESKTOP_ONLY.BORDER_BOTTOM,
        className ?? '',
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <div className="relative">
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder={SIDEBAR_SEARCH_TEXT.PLACEHOLDER}
          className={SIDEBAR_SEARCH_CLASSES.INPUT}
        />
        <Search className={SIDEBAR_SEARCH_CLASSES.SEARCH_ICON} />
        {inputValue && (
          <button onClick={handleClearSearch} className={SIDEBAR_SEARCH_CLASSES.CLEAR_BUTTON}>
            <X className={SIDEBAR_SEARCH_CLASSES.CLEAR_ICON} />
          </button>
        )}
      </div>

      {isLaptop && (
        <div className={SIDEBAR_SEARCH_CLASSES.BOTTOM_SECTION}>
          {searchQuery ? (
            <p className={SIDEBAR_SEARCH_CLASSES.QUERY_TEXT}>
              "{searchQuery}" {SIDEBAR_SEARCH_TEXT.COMPLETED}
            </p>
          ) : (
            <p>{SIDEBAR_SEARCH_TEXT.TIP}</p>
          )}
        </div>
      )}
    </div>
  );
}

import { Search, Route as RouteIcon } from 'lucide-react';
import type { MobileBottomButtonsProps } from '../../model/types';
import { MOBILE_BUTTON_STYLES, BUTTON_VARIANTS } from '../../model/constants';

export function MobileBottomButtons({
  activeSection,
  onSectionChange,
  routePlacesCount,
}: MobileBottomButtonsProps) {
  return (
    <div className={MOBILE_BUTTON_STYLES.CONTAINER}>
      <button
        onClick={() => onSectionChange(activeSection === 'search' ? null : 'search')}
        className={`${MOBILE_BUTTON_STYLES.BUTTON_BASE} ${
          activeSection === 'search' ? BUTTON_VARIANTS.ACTIVE : BUTTON_VARIANTS.INACTIVE
        }`}
      >
        <Search className={MOBILE_BUTTON_STYLES.ICON} />
        <span className={MOBILE_BUTTON_STYLES.TEXT}>검색</span>
      </button>

      <button
        onClick={() => onSectionChange(activeSection === 'route' ? null : 'route')}
        className={`${MOBILE_BUTTON_STYLES.BUTTON_BASE} ${
          activeSection === 'route' ? BUTTON_VARIANTS.ACTIVE : BUTTON_VARIANTS.INACTIVE
        }`}
      >
        <RouteIcon className={MOBILE_BUTTON_STYLES.ICON} />
        <span className={MOBILE_BUTTON_STYLES.TEXT}>동선</span>
        {routePlacesCount > 0 && (
          <span className={MOBILE_BUTTON_STYLES.BADGE}>{routePlacesCount}</span>
        )}
      </button>
    </div>
  );
}

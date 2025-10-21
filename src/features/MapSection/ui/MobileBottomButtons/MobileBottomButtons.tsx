import { Search, Route as RouteIcon } from 'lucide-react';
import type { MobileBottomButtonsProps } from '../../model/types';
import { MOBILE_BUTTON_STYLES, BUTTON_VARIANTS } from '../../model/constants';

export function MobileBottomButtons({
  activeSection,
  onSectionChange,
  routePlacesCount,
}: MobileBottomButtonsProps) {
  const getButtonClass = (section: 'search' | 'route') =>
    `${MOBILE_BUTTON_STYLES.BUTTON_BASE} ${
      activeSection === section ? BUTTON_VARIANTS.ACTIVE : BUTTON_VARIANTS.INACTIVE
    }`;

  return (
    <div className={MOBILE_BUTTON_STYLES.CONTAINER}>
      <button
        onClick={() => onSectionChange(activeSection === 'search' ? null : 'search')}
        className={getButtonClass('search')}
      >
        <Search className={MOBILE_BUTTON_STYLES.ICON} />
        <span className={MOBILE_BUTTON_STYLES.TEXT}>검색 결과</span>
      </button>

      <button
        onClick={() => onSectionChange(activeSection === 'route' ? null : 'route')}
        className={getButtonClass('route')}
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

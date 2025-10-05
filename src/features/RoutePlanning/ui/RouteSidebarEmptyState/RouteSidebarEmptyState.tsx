import { ROUTE_SIDEBAR_TITLES, ROUTE_SIDEBAR_ICONS } from '@/features/Sidebar/model/messages';
import { SIDEBAR_DIMENSIONS } from '@/features/Sidebar/model/constants';

export function RouteSidebarEmptyState() {
  return (
    <div className="p-(--spacing-6) text-center">
      <div
        className={`${SIDEBAR_DIMENSIONS.ICON_SIZE} mx-auto mb-(--spacing-4) bg-(--color-background-secondary) rounded-full flex items-center justify-center`}
      >
        <span className="text-2xl">{ROUTE_SIDEBAR_ICONS.MAP}</span>
      </div>
      <h3 className="text-heading-6 text-(--color-text-primary) mb-(--spacing-2)">
        {ROUTE_SIDEBAR_TITLES.EMPTY_TITLE}
      </h3>
      <p className="text-body text-(--color-text-secondary) leading-relaxed">
        {ROUTE_SIDEBAR_TITLES.EMPTY_DESCRIPTION}
      </p>
    </div>
  );
}

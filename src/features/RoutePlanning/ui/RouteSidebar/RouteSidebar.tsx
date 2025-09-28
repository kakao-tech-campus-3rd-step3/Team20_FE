import { RoutePlaceCard } from '../RoutePlaceCard/RoutePlaceCard';
import { RouteSidebarEmptyState } from '../RouteSidebarEmptyState/RouteSidebarEmptyState';
import type { RouteSidebarProps } from '../../model/types';
import {
  ROUTE_SIDEBAR_TITLES,
  ROUTE_SIDEBAR_BUTTONS,
  ROUTE_SIDEBAR_ICONS,
  formatRouteCount,
  formatLocations,
} from '@/features/Sidebar/model/messages';
import { SIDEBAR_DIMENSIONS } from '@/features/Sidebar/model/constants';

export function RouteSidebar({
  className,
  places,
  onRemovePlace,
  onSaveRoute,
}: Omit<RouteSidebarProps, 'onReorderPlaces'>) {
  const isEmpty = places.length === 0;

  return (
    <aside
      className={[
        SIDEBAR_DIMENSIONS.WIDTH_RESPONSIVE,
        'lg:flex-shrink-0 overflow-hidden h-full',
        className ?? '',
      ].join(' ')}
    >
      <div
        className={`${SIDEBAR_DIMENSIONS.WIDTH_RESPONSIVE} bg-(--color-background-primary) shadow-(--shadow-card) rounded-l-2xl overflow-hidden h-full flex flex-col border-l border-(--color-border-primary)`}
      >
        <div className="p-(--spacing-6) bg-gradient-to-r from-(--color-brand-secondary) to-(--color-brand-tertiary) text-(--color-text-inverse)">
          <h2 className="text-heading-4 mb-(--spacing-2)">{ROUTE_SIDEBAR_TITLES.HEADER_TITLE}</h2>
          <p className="text-body-small text-(--color-gray-100)">
            {isEmpty ? ROUTE_SIDEBAR_TITLES.SUBTITLE : formatRouteCount(places.length)}
          </p>
        </div>

        <div className="flex-1 overflow-y-auto">
          {isEmpty ? (
            <RouteSidebarEmptyState />
          ) : (
            <div className="p-(--spacing-4) space-y-(--spacing-3)">
              {places
                .sort((a, b) => a.order - b.order)
                .map((place) => (
                  <RoutePlaceCard key={place.locationId} place={place} onRemove={onRemovePlace} />
                ))}
            </div>
          )}
        </div>

        {!isEmpty && (
          <div className="p-(--spacing-4) bg-(--color-background-secondary) border-t border-(--color-border-primary)">
            <div className="space-y-(--spacing-3)">
              <div className="text-center">
                <p className="text-caption text-(--color-text-secondary) mb-(--spacing-2)">
                  {ROUTE_SIDEBAR_TITLES.FOOTER_TITLE}
                </p>
                <div className="flex items-center justify-center gap-(--spacing-4) text-caption text-(--color-text-tertiary)">
                  <span>{formatLocations(places.length)}</span>
                  <span>⏱️ 예상 소요시간</span>
                </div>
              </div>

              <button
                onClick={onSaveRoute}
                className="w-full flex items-center justify-center gap-(--spacing-2) px-(--spacing-4) py-(--spacing-3) rounded-lg text-sm font-medium bg-(--color-brand-primary) text-(--color-text-inverse) hover:bg-(--color-brand-secondary) transition-colors shadow-(--shadow-button) hover:shadow-(--shadow-button-hover)"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d={ROUTE_SIDEBAR_ICONS.SAVE}
                  />
                </svg>
                {ROUTE_SIDEBAR_BUTTONS.SAVE_ROUTE}
              </button>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}

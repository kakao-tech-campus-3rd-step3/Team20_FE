import { PlaceList } from '../PlaceList/PlaceList';
import { SidebarSearch } from '../SidebarSearch/SidebarSearch';
import type { SidebarProps } from '../../model/types';
import {
  SIDEBAR_TITLES,
  formatFoundCount,
  formatLocations,
  formatAvgRating,
  formatDuration,
} from '../../model/messages';
import {
  DEFAULT_RESULT_COUNT,
  DEFAULT_AVG_RATING,
  DEFAULT_DURATION_RANGE,
} from '../../model/constants';

export function Sidebar({ className }: SidebarProps) {
  return (
    <aside
      className={['w-full lg:w-96 lg:flex-shrink-0 overflow-hidden h-full', className ?? ''].join(
        ' ',
      )}
    >
      <div className="w-full lg:w-96 bg-(--color-background-primary) shadow-(--shadow-card) rounded-r-2xl overflow-hidden h-full flex flex-col border-r border-(--color-border-primary)">
        <div className="p-(--spacing-6) bg-gradient-to-r from-(--color-brand-secondary) to-(--color-brand-tertiary) text-(--color-text-inverse)">
          <h2 className="text-heading-4 mb-(--spacing-2)">{SIDEBAR_TITLES.HEADER_TITLE}</h2>
          <p className="text-body-small text-(--color-gray-100)">
            {formatFoundCount(DEFAULT_RESULT_COUNT)}
          </p>
        </div>

        <SidebarSearch />
        <div className="flex-1 overflow-y-auto">
          <PlaceList />
        </div>

        <div className="p-(--spacing-4) bg-(--color-background-secondary) border-t border-(--color-border-primary)">
          <div className="text-center">
            <p className="text-caption text-(--color-text-secondary) mb-(--spacing-2)">
              {SIDEBAR_TITLES.FOOTER_TITLE}
            </p>
            <div className="flex items-center justify-center gap-(--spacing-4) text-caption text-(--color-text-tertiary)">
              <span>{formatLocations(DEFAULT_RESULT_COUNT)}</span>
              <span>{formatAvgRating(DEFAULT_AVG_RATING)}</span>
              <span>{formatDuration(DEFAULT_DURATION_RANGE)}</span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}

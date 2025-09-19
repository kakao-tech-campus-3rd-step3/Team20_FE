import { PlaceList } from '../PlaceList/PlaceList';
import { SidebarSearch } from '../SidebarSearch/SidebarSearch';
import type { SidebarProps } from '../../model/types';
import {
  SIDEBAR_TITLES,
  SIDEBAR_STATUS_TEXT,
  formatFoundCount,
  formatLocations,
  formatAvgRating,
  formatDuration,
} from '../../model/messages';
import { DEFAULT_AVG_RATING, DEFAULT_DURATION_RANGE } from '../../model/constants';
import { useSidebarData } from '../../model/hooks';

export function Sidebar({ className, contentId }: SidebarProps) {
  const { contentDetail, places, isLoading, error } = useSidebarData(contentId);

  return (
    <aside
      className={['w-full lg:w-96 lg:flex-shrink-0 overflow-hidden h-full', className ?? ''].join(
        ' ',
      )}
    >
      <div className="w-full lg:w-96 bg-(--color-background-primary) shadow-(--shadow-card) rounded-r-2xl overflow-hidden h-full flex flex-col border-r border-(--color-border-primary)">
        <div className="p-(--spacing-6) bg-gradient-to-r from-(--color-brand-secondary) to-(--color-brand-tertiary) text-(--color-text-inverse)">
          <h2 className="text-heading-4 mb-(--spacing-2)">
            {contentDetail?.title ? `${contentDetail.title} 촬영지` : SIDEBAR_TITLES.HEADER_TITLE}
          </h2>
          <p className="text-body-small text-(--color-gray-100)">
            {formatFoundCount(places.length)}
          </p>
        </div>

        <SidebarSearch />
        <div className="flex-1 overflow-y-auto">
          {isLoading ? (
            <div className="p-4 text-center text-(--color-text-secondary)">
              {SIDEBAR_STATUS_TEXT.LOADING}
            </div>
          ) : error ? (
            <div className="p-4 text-center text-(--color-text-error)">
              {SIDEBAR_STATUS_TEXT.ERROR}
            </div>
          ) : (
            <PlaceList places={places} />
          )}
        </div>

        <div className="p-(--spacing-4) bg-(--color-background-secondary) border-t border-(--color-border-primary)">
          <div className="text-center">
            <p className="text-caption text-(--color-text-secondary) mb-(--spacing-2)">
              {contentDetail?.title
                ? `🎬 ${contentDetail.title} 촬영지 탐방`
                : SIDEBAR_TITLES.FOOTER_TITLE}
            </p>
            <div className="flex items-center justify-center gap-(--spacing-4) text-caption text-(--color-text-tertiary)">
              <span>{formatLocations(places.length)}</span>
              <span>{formatAvgRating(DEFAULT_AVG_RATING)}</span>
              <span>{formatDuration(DEFAULT_DURATION_RANGE)}</span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}

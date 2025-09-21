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

  const isEmpty = !contentId;

  return (
    <aside
      className={['w-full lg:w-96 lg:flex-shrink-0 overflow-hidden h-full', className ?? ''].join(
        ' ',
      )}
    >
      <div className="w-full lg:w-96 bg-(--color-background-primary) shadow-(--shadow-card) rounded-r-2xl overflow-hidden h-full flex flex-col border-r border-(--color-border-primary)">
        <div className="p-(--spacing-6) bg-gradient-to-r from-(--color-brand-secondary) to-(--color-brand-tertiary) text-(--color-text-inverse)">
          <h2 className="text-heading-4 mb-(--spacing-2)">
            {contentDetail?.title
              ? `${contentDetail.title} 촬영지`
              : isEmpty
                ? '촬영지 검색'
                : SIDEBAR_TITLES.HEADER_TITLE}
          </h2>
          <p className="text-body-small text-(--color-gray-100)">
            {isEmpty ? '촬영지를 검색해보세요' : formatFoundCount(places.length)}
          </p>
        </div>

        <SidebarSearch />
        <div className="flex-1 overflow-y-auto">
          {isEmpty ? (
            <div className="p-(--spacing-6) text-center">
              <div className="mb-(--spacing-4)">
                <div className="w-16 h-16 mx-auto mb-(--spacing-3) bg-(--color-background-secondary) rounded-full flex items-center justify-center">
                  <span className="text-2xl">🎬</span>
                </div>
                <h3 className="text-heading-6 text-(--color-text-primary) mb-(--spacing-2)">
                  촬영지를 검색해보세요
                </h3>
                <p className="text-body text-(--color-text-secondary) mb-(--spacing-4)">
                  드라마, 영화, 예능 프로그램의 촬영지를 검색하고 지도에서 확인해보세요.
                </p>
                <div className="space-y-2 text-left">
                  <div className="flex items-center gap-2 text-caption text-(--color-text-tertiary)">
                    <span className="w-2 h-2 bg-(--color-brand-primary) rounded-full"></span>
                    <span>드라마명으로 검색 (예: 오징어게임)</span>
                  </div>
                  <div className="flex items-center gap-2 text-caption text-(--color-text-tertiary)">
                    <span className="w-2 h-2 bg-(--color-brand-primary) rounded-full"></span>
                    <span>장소명으로 검색 (예: 더현대)</span>
                  </div>
                  <div className="flex items-center gap-2 text-caption text-(--color-text-tertiary)">
                    <span className="w-2 h-2 bg-(--color-brand-primary) rounded-full"></span>
                    <span>지역명으로 검색 (예: 강남구)</span>
                  </div>
                </div>
              </div>
            </div>
          ) : isLoading ? (
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
                : isEmpty
                  ? '🔍 원하는 촬영지를 검색해보세요'
                  : SIDEBAR_TITLES.FOOTER_TITLE}
            </p>
            {!isEmpty && (
              <div className="flex items-center justify-center gap-(--spacing-4) text-caption text-(--color-text-tertiary)">
                <span>{formatLocations(places.length)}</span>
                <span>{formatAvgRating(DEFAULT_AVG_RATING)}</span>
                <span>{formatDuration(DEFAULT_DURATION_RANGE)}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </aside>
  );
}

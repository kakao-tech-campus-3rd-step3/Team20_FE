import { PlaceList } from './PlaceList';
import { SidebarSearch } from './SidebarSearch';
import type { SidebarProps } from '../model/types';
import {
  SIDEBAR_TITLES,
  formatFoundCount,
  formatLocations,
  formatAvgRating,
  formatDuration,
} from '../model/messages';
import {
  DEFAULT_RESULT_COUNT,
  DEFAULT_AVG_RATING,
  DEFAULT_DURATION_RANGE,
} from '../model/constants';

export function Sidebar({ className }: SidebarProps) {
  return (
    <aside
      className={'w-full lg:w-96 lg:flex-shrink-0 overflow-hidden h-full ' + (className ?? '')}
    >
      <div className="w-full lg:w-96 bg-white shadow-xl rounded-r-2xl overflow-hidden h-full flex flex-col border-r border-gray-200">
        <div className="p-6 bg-gradient-to-r from-purple-600 to-pink-600 text-white">
          <h2 className="text-xl font-bold mb-2">{SIDEBAR_TITLES.HEADER_TITLE}</h2>
          <p className="text-purple-100 text-sm">{formatFoundCount(DEFAULT_RESULT_COUNT)}</p>
        </div>

        <SidebarSearch />
        <div className="flex-1 overflow-y-auto">
          <PlaceList />
        </div>
        <div className="p-4 bg-gray-50 border-t border-gray-200">
          <div className="text-center">
            <p className="text-xs text-gray-500 mb-2">{SIDEBAR_TITLES.FOOTER_TITLE}</p>
            <div className="flex items-center justify-center space-x-4 text-xs text-gray-400">
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

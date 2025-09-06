import { PlaceList } from './PlaceList';
import { SidebarSearch } from './SidebarSearch';
import type { SidebarProps } from '../model/types';
import { SIDEBAR_TEXT } from '../model/constants';

export function Sidebar({ className }: SidebarProps) {
  return (
    <aside
      className={'w-full lg:w-96 lg:flex-shrink-0 overflow-hidden h-full ' + (className ?? '')}
    >
      <div className="w-full lg:w-96 bg-white shadow-xl rounded-r-2xl overflow-hidden h-full flex flex-col border-r border-gray-200">
        <div className="p-6 bg-gradient-to-r from-purple-600 to-pink-600 text-white">
          <h2 className="text-xl font-bold mb-2">{SIDEBAR_TEXT.HEADER_TITLE}</h2>
          <p className="text-purple-100 text-sm">{SIDEBAR_TEXT.HEADER_SUBTITLE}</p>
        </div>

        <SidebarSearch />
        <div className="flex-1 overflow-y-auto">
          <PlaceList />
        </div>
        <div className="p-4 bg-gray-50 border-t border-gray-200">
          <div className="text-center">
            <p className="text-xs text-gray-500 mb-2">{SIDEBAR_TEXT.FOOTER_TITLE}</p>
            <div className="flex items-center justify-center space-x-4 text-xs text-gray-400">
              <span>{SIDEBAR_TEXT.FOOTER_LOCATIONS}</span>
              <span>{SIDEBAR_TEXT.FOOTER_RATING}</span>
              <span>{SIDEBAR_TEXT.FOOTER_DURATION}</span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}

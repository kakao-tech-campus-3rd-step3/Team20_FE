import { Search } from 'lucide-react';
import type { SidebarSearchProps } from '../model/types';
import { SIDEBAR_SEARCH_TEXT } from '../model/messages';

export function SidebarSearch({ className }: SidebarSearchProps) {
  return (
    <div className={('p-4 border-b border-gray-200 ' + (className ?? '')).trim()}>
      <div className="relative">
        <input
          type="text"
          placeholder={SIDEBAR_SEARCH_TEXT.PLACEHOLDER}
          className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
        />
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
      </div>
      <p className="mt-2 text-xs text-gray-500">{SIDEBAR_SEARCH_TEXT.TIP}</p>
    </div>
  );
}

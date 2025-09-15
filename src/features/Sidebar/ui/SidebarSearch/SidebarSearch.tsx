import { Search } from 'lucide-react';
import type { SidebarSearchProps } from '../../model/types';
import { SIDEBAR_SEARCH_TEXT } from '../../model/messages';

export function SidebarSearch({ className }: SidebarSearchProps) {
  return (
    <div className={['p-(--spacing-4) border-b border-(--color-border-primary)', className ?? ''].join(' ')}>
      <div className="relative">
        <input
          type="text"
          placeholder={SIDEBAR_SEARCH_TEXT.PLACEHOLDER}
          className="
            w-full pl-10 pr-(--spacing-4) py-(--spacing-3)
            border border-(--color-border-primary) rounded-xl
            bg-(--color-background-primary)
            text-body text-(--color-text-primary)
            placeholder:text-(--color-text-tertiary)
            focus:outline-none focus-visible:ring-2 focus-visible:ring-(--color-border-focus) focus:border-transparent
            shadow-(--shadow-inset)
          "
        />
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-(--color-text-tertiary)" />
      </div>
      <p className="mt-(--spacing-2) text-caption text-(--color-text-secondary)">{SIDEBAR_SEARCH_TEXT.TIP}</p>
    </div>
  );
}

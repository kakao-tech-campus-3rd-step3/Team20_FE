import { IconButton } from '@/features/hh/ui/IconButton';
import { MENU } from '@/features/hh/model/utils';
import type { NavMenuProps } from '@/features/hh/model/types';

export function NavMenu({ active, onSelect }: NavMenuProps) {
  return (
    <nav aria-label="주요 메뉴" className="hidden md:flex items-center space-x-3">
      {MENU.map(({ key, label, Icon }) => (
        <IconButton
          key={key}
          Icon={Icon}
          shape="pill"
          size="md"
          variant="soft"
          active={key === active}
          aria-current={key === active ? 'page' : undefined}
          onClick={() => onSelect?.(key)}
        >
          {label}
        </IconButton>
      ))}
    </nav>
  );
}

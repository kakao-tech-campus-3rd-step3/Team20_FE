import Link from 'next/link';
import { IconButton } from '@/shared/ui';
import { MENU } from '../../model/utils';
import { navRouteMap } from '../../model/constants';
import type { NavMenuProps, NavKey } from '../../model/types';
import { useActiveNavKey } from '../../model/hooks';

export function NavMenu({ active: controlledActive, onSelect }: NavMenuProps) {
  const autoActive = useActiveNavKey();
  const activeKey = controlledActive ?? autoActive;

  const handleNavClick = (key: NavKey) => {
    onSelect?.(key);
  };

  return (
    <nav aria-label="주요 메뉴" className="hidden md:flex items-center gap-(--spacing-4)">
      {MENU.map(({ key, label, Icon }) => {
        const routeOptions = navRouteMap[key];
        return (
          <Link key={key} href={routeOptions.href}>
            <IconButton
              Icon={Icon}
              shape="pill"
              size="md"
              variant="soft"
              active={key === activeKey}
              aria-current={key === activeKey ? 'page' : undefined}
              onClick={() => handleNavClick(key)}
            >
              {label}
            </IconButton>
          </Link>
        );
      })}
    </nav>
  );
}

import { useNavigate } from '@tanstack/react-router';
import { IconButton } from '@/shared/ui';
import { MENU } from '../../model/utils';
import { navRouteMap } from '../../model/constants';
import type { NavMenuProps, NavKey } from '../../model/types';
import { useActiveNavKey } from '../../model/hooks';

export function NavMenu({ active: controlledActive, onSelect }: NavMenuProps) {
  const navigate = useNavigate();

  const autoActive = useActiveNavKey();
  const activeKey = controlledActive ?? autoActive;

  const handleNavClick = (key: NavKey) => {
    const routeOptions = navRouteMap[key];
    navigate(routeOptions);
    onSelect?.(key);
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
  };

  return (
    <nav aria-label="주요 메뉴" className="hidden md:flex items-center gap-(--spacing-4)">
      {MENU.map(({ key, label, Icon }) => (
        <IconButton
          key={key}
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
      ))}
    </nav>
  );
}

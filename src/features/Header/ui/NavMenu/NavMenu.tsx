import { IconButton } from '@/shared/ui';
import type { NavMenuProps } from '../../model/types';
import { useActiveNavKey } from '../../model/hooks';
import { useNavMenu } from '../../model/useNavMenu';

export function NavMenu({ active: controlledActive, onSelect }: NavMenuProps) {
  const autoActive = useActiveNavKey();
  const activeKey = controlledActive ?? autoActive;
  const { menuItems, handleNavClick } = useNavMenu(onSelect);

  return (
    <nav aria-label="주요 메뉴" className="hidden md:flex items-center gap-(--spacing-4)">
      {menuItems.map(({ key, label, Icon }) => (
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

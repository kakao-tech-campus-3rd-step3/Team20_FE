import { IconButton } from '@/shared/ui';
import { MENU } from '../../model/utils';
import type { NavMenuProps } from '../../model/types';
import { useResolvedActiveKey, useNavActions } from '../../model/hooks';

export function NavMenu({ active: controlledActive, onSelect }: NavMenuProps) {
  const activeKey = useResolvedActiveKey(controlledActive);
  const { onItemClick } = useNavActions(onSelect);

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
          onClick={() => onItemClick(key)}
        >
          {label}
        </IconButton>
      ))}
    </nav>
  );
}

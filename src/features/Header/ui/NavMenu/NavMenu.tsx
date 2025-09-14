import { useNavigate } from 'react-router-dom';
import { IconButton } from '@/shared/ui';
import { MENU } from '../../model/utils';
import { keyToPath } from '../../model/constants';
import type { NavMenuProps, NavKey } from '../../model/types';
import { useActiveNavKey } from '../../model/hooks';

export function NavMenu({ active: controlledActive, onSelect }: NavMenuProps) {
  const navigate = useNavigate();

  // location 기반 자동 활성 키
  const autoActive = useActiveNavKey(keyToPath);

  // 외부에서 active를 주면 우선(제어 모드), 아니면 자동(비제어 모드)
  const activeKey = controlledActive ?? autoActive;

  const handleNavClick = (key: NavKey) => {
    navigate(keyToPath[key]);
    onSelect?.(key);
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

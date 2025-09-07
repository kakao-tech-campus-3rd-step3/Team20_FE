import { useNavigate } from 'react-router-dom';
import { IconButton } from '@/shared/ui/IconButton';
import { MENU } from '../model/utils';
import { keyToPath } from '../model/constants';
import type { NavMenuProps } from '../model/types';

export function NavMenu({ active, onSelect }: NavMenuProps) {
  // 테스트용으로 간단하게 만든 로직. 추후에 은수님이 hooks폴더로 이동해서 자세히 만들어주세요!
  const navigate = useNavigate();

  const handleNavClick = (key: string) => {
    navigate(keyToPath[key as keyof typeof keyToPath]);
    onSelect?.(key as any);
  };

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
          onClick={() => handleNavClick(key)}
        >
          {label}
        </IconButton>
      ))}
    </nav>
  );
}

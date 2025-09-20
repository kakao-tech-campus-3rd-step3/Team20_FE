import { Menu, X } from 'lucide-react';
import { IconButton } from '@/shared/ui';
import type { HamburgerMenuProps } from '../../model/types';

export function HamburgerMenu({ isOpen, onToggle, 'aria-label': ariaLabel }: HamburgerMenuProps) {
  return (
    <IconButton
      Icon={isOpen ? X : Menu}
      variant="ghost"
      shape="circle"
      size="md"
      onClick={onToggle}
      aria-label={ariaLabel || (isOpen ? '메뉴 닫기' : '메뉴 열기')}
      aria-expanded={isOpen}
    />
  );
}

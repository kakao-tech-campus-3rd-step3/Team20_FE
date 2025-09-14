import { Brand } from '../Brand/Brand';
import { NavMenu } from '../NavMenu/NavMenu';
import { ProfileButton } from '../ProfileButton/ProfileButton';
import type { NavMenuProps } from '../../model/types';

export function Header({ active, onSelect }: NavMenuProps) {
  return (
    <header className="bg-(--color-background)/90 backdrop-blur-md shadow-(--shadow-brand-md) border-b border-(--color-border) sticky top-0 z-(--z-sticky)">
      <div className="max-w-7xl mx-auto px-container-padding sm:px-container-padding-tablet lg:px-container-padding-desktop lg:px-(--spacing-8)">
        <div className="flex justify-between items-center h-(--spacing-20)">
          <Brand />
          <NavMenu active={active} onSelect={onSelect} />
          <ProfileButton />
        </div>
      </div>
    </header>
  );
}

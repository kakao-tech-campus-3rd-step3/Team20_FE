import { Brand } from './Brand';
import { NavMenu } from './NavMenu';
import { ProfileButton } from './ProfileButton';
import type { NavMenuProps } from '../model/types';

export function Header({ active, onSelect }: NavMenuProps) {
  return (
    <header className="bg-background/90 backdrop-blur-md shadow-brand-md border-b border-border sticky top-0 z-[var(--z-sticky)]">
      <div className="max-w-7xl mx-auto px-[var(--spacing-4)] sm:px-[var(--spacing-6)] lg:px-[var(--spacing-8)]">
        <div className="flex justify-between items-center h-[var(--spacing-20)]">
          <Brand />
          <NavMenu active={active} onSelect={onSelect} />
          <ProfileButton />
        </div>
      </div>
    </header>
  );
}

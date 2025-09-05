import { Brand } from '@/features/Header/ui/Brand';
import { NavMenu } from '@/features/Header/ui/NavMenu';
import { ProfileButton } from '@/features/Header/ui/ProfileButton';
import type { NavMenuProps } from '@/features/Header/model/types';

export function Header({ active, onSelect }: NavMenuProps) {
  return (
    <header className="bg-white/90 backdrop-blur-md shadow-lg border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Brand />
          <NavMenu active={active} onSelect={onSelect} />
          <ProfileButton />
        </div>
      </div>
    </header>
  );
}

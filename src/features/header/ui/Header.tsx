import { Brand } from './Brand';
import { NavMenu, type NavKey } from './NavMenu';
import { ProfileButton } from './ProfileButton';
import { useLocation, useNavigate } from 'react-router-dom';

const pathToKey = (p: string): NavKey => {
  if (p.startsWith('/map')) return 'map';
  if (p.startsWith('/saved')) return 'saved';
  return 'home';
};

const keyToPath: Record<NavKey, string> = {
  home: '/',
  map: '/map',
  saved: '/saved',
};

export function Header() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const active = pathToKey(pathname);

  return (
    <header className="bg-white/90 backdrop-blur-md shadow-lg border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Brand />
          <NavMenu
            active={active}
            onSelect={(key) => navigate(keyToPath[key])}
          />
          <ProfileButton />
        </div>
      </div>
    </header>
  );
}

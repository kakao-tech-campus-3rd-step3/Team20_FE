import { User, LogOut } from 'lucide-react';
import { useNavigate } from '@tanstack/react-router';
import { IconButton } from '@/shared/ui';
import { useAuth } from '@/app/providers/useAuth';

export function ProfileButton() {
  const { isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();

  const handleClick = async () => {
    if (isLoggedIn) {
      await logout();
      navigate({ to: '/' });
    } else {
      navigate({ to: '/auth/login' });
    }
  };

  return (
    <IconButton
      Icon={isLoggedIn ? LogOut : User}
      variant="gradient"
      shape="circle"
      size="md"
      aria-label={isLoggedIn ? '로그아웃' : '로그인'}
      onClick={handleClick}
    />
  );
}

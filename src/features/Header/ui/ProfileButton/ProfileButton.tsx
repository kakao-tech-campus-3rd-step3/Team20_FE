import { User } from 'lucide-react';
import { useNavigate } from '@tanstack/react-router';
import { IconButton } from '@/shared/ui';
import { useAuth } from '@/shared/lib/auth';

export function ProfileButton() {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  const handleClick = () => {
    if (isLoggedIn) {
      navigate({ to: '/mypage' });
    } else {
      navigate({ to: '/auth/login' });
    }
  };

  return (
    <IconButton
      Icon={User}
      variant="gradient"
      shape="circle"
      size="md"
      aria-label={isLoggedIn ? '마이페이지' : '로그인'}
      onClick={handleClick}
    />
  );
}

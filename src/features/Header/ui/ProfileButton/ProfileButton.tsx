import { User } from 'lucide-react';
import { Link } from '@tanstack/react-router';
import { IconButton } from '@/shared/ui';

export function ProfileButton() {
  return (
    <Link to="/not-found" aria-label="프로필 페이지로 이동">
      <IconButton Icon={User} variant="gradient" shape="circle" size="md" aria-label="프로필" />
    </Link>
  );
}

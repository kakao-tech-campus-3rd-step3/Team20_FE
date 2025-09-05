import { User } from 'lucide-react';
import { IconButton } from '@/features/Header/ui/IconButton';

export function ProfileButton() {
  return <IconButton Icon={User} variant="gradient" shape="circle" size="md" aria-label="프로필" />;
}

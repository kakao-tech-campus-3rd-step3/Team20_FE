'use client';

import { User } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { IconButton } from '@/shared/ui';
import { useAuth } from '@/shared/lib/auth';

export function ProfileButton() {
  const { isLoggedIn, isLoading } = useAuth();
  const router = useRouter();

  const handleClick = () => {
    // 로딩 중일 때는 클릭 무시
    if (isLoading) return;
    
    if (isLoggedIn) {
      router.push('/mypage');
    } else {
      router.push('/auth/login');
    }
  };

  return (
    <IconButton
      Icon={User}
      variant="gradient"
      shape="circle"
      size="md"
      aria-label={isLoading ? '로딩 중...' : isLoggedIn ? '마이페이지' : '로그인'}
      onClick={handleClick}
      disabled={isLoading}
    />
  );
}

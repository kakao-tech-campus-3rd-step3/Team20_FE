'use client';

import { MyPage } from '@/features/UserInfo';
import { useAuth } from '@/shared/lib/auth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function MyPagePage() {
  const { isLoggedIn, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // 로딩이 완료되고 로그인되지 않은 상태라면 로그인 페이지로 리다이렉트
    if (!isLoading && !isLoggedIn) {
      router.push('/login');
    }
  }, [isLoggedIn, isLoading, router]);

  // 로딩 중이거나 로그인되지 않은 상태
  if (isLoading) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[var(--color-brand-primary)] mx-auto mb-4"></div>
            <p className="text-[var(--color-text-secondary)]">로딩 중...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!isLoggedIn) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <p className="text-[var(--color-text-secondary)]">로그인이 필요합니다.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <MyPage />
    </div>
  );
}

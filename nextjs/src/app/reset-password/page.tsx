'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, Suspense } from 'react';

function RedirectContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token') || '';

  useEffect(() => {
    const targetUrl = token ? `/auth/reset-password?token=${token}` : '/auth/reset-password';
    router.replace(targetUrl);
  }, [router, token]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 flex items-center justify-center">
      <div className="text-center">
        <p className="text-gray-600">비밀번호 재설정 중...</p>
      </div>
    </div>
  );
}

export default function RedirectToResetPassword() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 flex items-center justify-center">
          <div className="text-center">
            <p className="text-gray-600">로딩 중...</p>
          </div>
        </div>
      }
    >
      <RedirectContent />
    </Suspense>
  );
}


'use client';

import { PasswordResetForm } from '@/features/auth';
import { useAuth } from '@/shared/lib/auth';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, Suspense } from 'react';
import type { Metadata } from 'next';

// 메타데이터는 별도 파일로 분리하거나 generateMetadata 사용 필요
// export const metadata: Metadata = {
//   title: '비밀번호 재설정 - K-SPOT',
//   description: 'K-SPOT 계정의 비밀번호를 재설정하세요',
// };

function ResetPasswordContent() {
  const { isLoggedIn, isLoading } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token') || '';

  useEffect(() => {
    // 로그인한 사용자는 마이페이지로 리다이렉트
    if (!isLoading && isLoggedIn) {
      router.replace('/mypage');
    }
  }, [isLoggedIn, isLoading, router]);

  // 로딩 중
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">로딩 중...</p>
        </div>
      </div>
    );
  }

  // 이미 로그인한 사용자
  if (isLoggedIn) {
    return null; // 리다이렉트 중이므로 아무것도 렌더링하지 않음
  }

  if (!token) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 flex flex-col justify-center py-16 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-12 px-8 shadow-2xl rounded-3xl border border-gray-100">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900">유효하지 않은 링크</h2>
              <p className="mt-2 text-sm text-gray-600">
                비밀번호 재설정 링크가 유효하지 않습니다.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 flex flex-col justify-center py-16 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-4xl">
        <div className="bg-white py-16 px-12 shadow-2xl rounded-3xl border border-gray-100">
          <PasswordResetForm token={token} />
        </div>
      </div>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">로딩 중...</p>
        </div>
      </div>
    }>
      <ResetPasswordContent />
    </Suspense>
  );
}
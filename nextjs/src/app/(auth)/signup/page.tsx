'use client';

import { SignupForm } from '@/features/auth/ui/SignupForm';
import { useAuth } from '@/shared/lib/auth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function SignupPage() {
  const { isLoggedIn, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // 이미 로그인한 사용자는 마이페이지로 리다이렉트
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
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 flex flex-col justify-center py-16 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-4xl">
        <div className="bg-white py-16 px-12 shadow-2xl rounded-3xl border border-gray-100">
          <SignupForm />
        </div>
      </div>
    </div>
  );
}
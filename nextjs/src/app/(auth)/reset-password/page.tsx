import { PasswordResetForm } from '@/features/auth';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '비밀번호 재설정 - K-SPOT',
  description: 'K-SPOT 계정의 비밀번호를 재설정하세요',
};

interface ResetPasswordPageProps {
  searchParams: Promise<{ token?: string }>;
}

export default async function ResetPasswordPage({ searchParams }: ResetPasswordPageProps) {
  const { token } = await searchParams;

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
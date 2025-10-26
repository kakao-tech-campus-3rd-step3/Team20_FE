import { LoginForm } from '@/features/auth/ui/LoginForm';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '로그인 - K-SPOT',
  description: 'K-SPOT에 로그인하여 개인화된 여행 계획을 만들어보세요',
};

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 flex flex-col justify-center py-16 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-4xl">
        <div className="bg-white py-16 px-12 shadow-2xl rounded-3xl border border-gray-100">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}

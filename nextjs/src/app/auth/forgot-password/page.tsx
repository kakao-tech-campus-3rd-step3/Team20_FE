import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '비밀번호 찾기',
  description: 'K-SPOT 계정의 비밀번호를 재설정하세요',
};

export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 flex flex-col justify-center py-16 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-4xl">
        <div className="bg-white py-16 px-12 shadow-2xl rounded-3xl border border-gray-100">
          <div className="text-center">
            <h2
              className="text-3xl font-bold text-gray-900 mb-4"
              style={{ fontFamily: 'Fredoka, sans-serif' }}
            >
              비밀번호 재설정
            </h2>
            <p className="text-gray-600 mb-8">비밀번호 재설정 기능은 현재 개발 중입니다.</p>
            <div className="text-center">
              <a
                href="/auth/login"
                className="text-base text-purple-600 hover:text-purple-500 font-semibold transition-colors"
                style={{ fontFamily: 'Fredoka, sans-serif' }}
              >
                로그인으로 돌아가기
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


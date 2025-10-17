import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useState } from 'react';
import { Mail, Loader2 } from 'lucide-react';
import { resendVerificationEmailApi } from '@/entities/auth';
import { toast } from 'react-toastify';

export const Route = createFileRoute('/auth/signup-success')({
  component: SignupSuccessPage,
  validateSearch: (search: Record<string, unknown>) => {
    return {
      email: (search.email as string) || '',
    };
  },
});

function SignupSuccessPage() {
  const navigate = useNavigate();
  const { email } = Route.useSearch();
  const [isResending, setIsResending] = useState(false);

  const handleResendEmail = async () => {
    if (!email) {
      toast.error('이메일 정보가 없습니다.');
      return;
    }

    setIsResending(true);
    try {
      await resendVerificationEmailApi({ email });
      toast.success('인증 메일이 재전송되었습니다.');
    } catch (error) {
      console.error('Email resend error:', error);
      toast.error('인증 메일 재전송에 실패했습니다.');
    } finally {
      setIsResending(false);
    }
  };

  const handleGoToHome = () => {
    navigate({ to: '/' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 flex flex-col justify-center py-16 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-12 px-8 shadow-2xl rounded-3xl border border-gray-100">
          <div className="text-center">
            <Mail className="mx-auto h-16 w-16 text-purple-600" />
            <h2 className="mt-6 text-2xl font-bold text-gray-900">회원가입 완료!</h2>
            <p className="mt-2 text-sm text-gray-600">
              인증 메일이 발송되었습니다.
              <br />
              이메일을 확인하여 인증을 완료해주세요.
            </p>

            {email && (
              <div className="mt-4 p-3 bg-purple-50 rounded-lg">
                <p className="text-sm font-medium text-purple-900">{email}</p>
              </div>
            )}

            <div className="mt-6 text-xs text-gray-500 space-y-1">
              <p>• 메일이 도착하지 않았다면 스팸함을 확인해주세요.</p>
              <p>• 인증 링크는 24시간 동안 유효합니다.</p>
            </div>

            <div className="mt-8 space-y-3">
              <button
                onClick={handleResendEmail}
                disabled={isResending || !email}
                className="w-full flex justify-center items-center gap-2 py-3 px-4 border border-purple-600 rounded-lg shadow-sm text-sm font-medium text-purple-600 bg-white hover:bg-purple-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isResending ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    재전송 중...
                  </>
                ) : (
                  '인증 메일 재전송'
                )}
              </button>

              <button
                onClick={handleGoToHome}
                className="w-full flex justify-center py-3 px-4 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors"
              >
                홈으로 가기
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

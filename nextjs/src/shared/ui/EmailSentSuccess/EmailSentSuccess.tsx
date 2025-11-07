'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Mail, Loader2 } from 'lucide-react';
import { toast } from 'react-toastify';

interface EmailSentSuccessProps {
  email: string;
  title?: string;
  onResend?: (email: string) => Promise<void>;
  showResendButton?: boolean;
  resendButtonText?: string;
  homeButtonText?: string;
}

export const EmailSentSuccess = ({
  email,
  title = '이메일 발송 완료!',
  onResend,
  showResendButton = true,
  resendButtonText = '인증 메일 재전송',
  homeButtonText = '홈으로 가기',
}: EmailSentSuccessProps) => {
  const router = useRouter();
  const [isResending, setIsResending] = useState(false);

  const handleResendEmail = async () => {
    if (!email) {
      toast.error('이메일 정보가 없습니다.');
      return;
    }

    if (!onResend) {
      toast.error('재전송 기능을 사용할 수 없습니다.');
      return;
    }

    setIsResending(true);
    try {
      await onResend(email);
      toast.success('이메일이 재전송되었습니다.');
    } catch (error) {
      console.error('Email resend error:', error);
      toast.error('이메일 재전송에 실패했습니다.');
    } finally {
      setIsResending(false);
    }
  };

  const handleGoToHome = () => {
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 flex flex-col justify-center py-16 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-12 px-8 shadow-2xl rounded-3xl border border-gray-100">
          <div className="text-center">
            <Mail className="mx-auto h-16 w-16 text-purple-600" />
            <h2 className="mt-6 text-2xl font-bold text-gray-900">{title}</h2>
        
            {email && (
              <div className="mt-4 p-3 bg-purple-50 rounded-lg">
                <p className="text-sm font-medium text-purple-900">{email}</p>
              </div>
            )}

            <div className="mt-6 text-xs text-gray-500 space-y-1">
              <p>• 메일이 도착하지 않았다면 스팸함을 확인해주세요.</p>
              <p>• 링크는 15분 동안 유효합니다.</p>
            </div>

            <div className="mt-8 space-y-3">
              {showResendButton && onResend && (
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
                    resendButtonText
                  )}
                </button>
              )}

              <button
                onClick={handleGoToHome}
                className="w-full flex justify-center py-3 px-4 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors"
              >
                {homeButtonText}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { verifyEmailApi } from '@/entities/auth';
import { CheckCircle, XCircle, Loader2 } from 'lucide-react';

export const Route = createFileRoute('/verified-email')({
    component: VerifyEmailPage,
    validateSearch: (search: Record<string, unknown>) => {
        return {
            token: (search.token as string) || '',
        };
    },
});

function VerifyEmailPage() {
    const navigate = useNavigate();
    const { token } = Route.useSearch();
    const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
    const [message, setMessage] = useState('');

    useEffect(() => {
        const verifyEmail = async () => {
            if (!token) {
                setStatus('error');
                setMessage('유효하지 않은 인증 링크입니다.');
                return;
            }

            try {
                const response = await verifyEmailApi(token);
                setStatus('success');
                setMessage(response.message || '이메일 인증이 완료되었습니다.');
            } catch (error) {
                setStatus('error');
                if (error instanceof Error) {
                    setMessage(error.message || '이메일 인증에 실패했습니다.');
                } else {
                    setMessage('이메일 인증에 실패했습니다.');
                }
            }
        };

        verifyEmail();
    }, [token]);

    const handleGoToLogin = () => {
        navigate({ to: '/auth/login' });
    };

    const handleGoToHome = () => {
        navigate({ to: '/' });
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 flex flex-col justify-center py-16 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-12 px-8 shadow-2xl rounded-3xl border border-gray-100">
                    <div className="text-center">
                        {status === 'loading' && (
                            <>
                                <Loader2 className="mx-auto h-16 w-16 text-purple-600 animate-spin" />
                                <h2 className="mt-6 text-2xl font-bold text-gray-900">이메일 인증 중...</h2>
                                <p className="mt-2 text-sm text-gray-600">잠시만 기다려주세요.</p>
                            </>
                        )}

                        {status === 'success' && (
                            <>
                                <CheckCircle className="mx-auto h-16 w-16 text-green-600" />
                                <h2 className="mt-6 text-2xl font-bold text-gray-900">인증 완료!</h2>
                                <p className="mt-2 text-sm text-gray-600">{message}</p>
                                <div className="mt-8 space-y-3">
                                    <button
                                        onClick={handleGoToLogin}
                                        className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors"
                                    >
                                        로그인하기
                                    </button>
                                    <button
                                        onClick={handleGoToHome}
                                        className="w-full flex justify-center py-3 px-4 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors"
                                    >
                                        홈으로 가기
                                    </button>
                                </div>
                            </>
                        )}

                        {status === 'error' && (
                            <>
                                <XCircle className="mx-auto h-16 w-16 text-red-600" />
                                <h2 className="mt-6 text-2xl font-bold text-gray-900">인증 실패</h2>
                                <p className="mt-2 text-sm text-gray-600">{message}</p>
                                <div className="mt-8 space-y-3">
                                    <button
                                        onClick={handleGoToHome}
                                        className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors"
                                    >
                                        홈으로 가기
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

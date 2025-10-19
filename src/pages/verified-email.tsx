import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { verifyEmailApi } from '@/entities/auth';
import { CheckCircle, XCircle, Loader2 } from 'lucide-react';
import axios from 'axios';

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
        // URL 경로 확인: /verified-email/reset-password 형태면 비밀번호 재설정 페이지로 리다이렉트
        const currentPath = window.location.pathname;
        if (currentPath.includes('/reset-password') && token) {
            console.log('🔄 비밀번호 재설정 페이지로 리다이렉트:', token);
            navigate({ to: '/auth/reset-password', search: { token } });
            return;
        }

        const verifyEmail = async () => {
            if (!token) {
                setStatus('error');
                setMessage('유효하지 않은 인증 링크입니다.');
                return;
            }

            try {
                const response = await verifyEmailApi(token);
                console.log('✅ Verification success:', response);
                setStatus('success');
                setMessage(response.message || '이메일 인증이 완료되었습니다.');
            } catch (error) {
                console.error('❌ Verification error:', error);
                
                // Axios 에러 처리
                if (axios.isAxiosError(error)) {
                    const statusCode = error.response?.status;
                    const serverMessage = error.response?.data?.message;
                    
                    // 409 Conflict - 이미 인증된 경우 → 성공으로 처리
                    if (statusCode === 409) {
                        console.log('ℹ️ Already verified - treating as success');
                        setStatus('success');
                        setMessage('이미 인증이 완료된 계정입니다. 바로 로그인하실 수 있습니다.');
                        return;
                    }
                    
                    // 나머지는 에러로 처리
                    setStatus('error');
                    // 400 Bad Request - 잘못된 토큰
                    if (statusCode === 400) {
                        setMessage(serverMessage || '유효하지 않은 인증 링크입니다.');
                    }
                    // 404 Not Found - 토큰을 찾을 수 없음
                    else if (statusCode === 404) {
                        setMessage(serverMessage || '인증 정보를 찾을 수 없습니다. 인증 메일을 다시 요청해주세요.');
                    }
                    // 410 Gone - 토큰 만료
                    else if (statusCode === 410) {
                        setMessage(serverMessage || '인증 링크가 만료되었습니다. 인증 메일을 다시 요청해주세요.');
                    }
                    // 기타 에러
                    else {
                        setMessage(serverMessage || '이메일 인증에 실패했습니다. 잠시 후 다시 시도해주세요.');
                    }
                } else if (error instanceof Error) {
                    setMessage(error.message || '이메일 인증에 실패했습니다.');
                } else {
                    setMessage('이메일 인증에 실패했습니다.');
                }
            }
        };

        verifyEmail();
    }, [token, navigate]);

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

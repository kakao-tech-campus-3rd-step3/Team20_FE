'use client';

import { Suspense } from 'react';
import { useEmailVerification } from '@/features/auth';
import { EmailVerificationStatus } from '@/features/auth';
import { useSearchParams } from 'next/navigation';

function VerifyEmailContent() {
    const searchParams = useSearchParams();
    const token = searchParams.get('token') || '';
    const { status, message, goToLogin, goToHome } = useEmailVerification(token);

    return (
        <EmailVerificationStatus
            status={status}
            message={message}
            onGoToLogin={goToLogin}
            onGoToHome={goToHome}
        />
    );
}

export default function VerifyEmailPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 flex items-center justify-center">
                <div className="text-center">
                    <p className="text-gray-600">로딩 중...</p>
                </div>
            </div>
        }>
            <VerifyEmailContent />
        </Suspense>
    );
}
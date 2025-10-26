import { resendVerificationEmailApi } from '@/entities/auth';
import { EmailSentSuccess } from '@/shared/ui';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '회원가입 완료 - K-SPOT',
  description: '이메일 인증 메일이 발송되었습니다',
};

interface SignupSuccessPageProps {
  searchParams: Promise<{ email?: string }>;
}

export default async function SignupSuccessPage({ searchParams }: SignupSuccessPageProps) {
  const { email = '' } = await searchParams;

  const handleResendEmail = async (email: string) => {
    'use server';
    await resendVerificationEmailApi({ email });
  };

  return (
    <EmailSentSuccess
      email={email}
      title="이메일 발송 완료!"
      onResend={handleResendEmail}
      showResendButton={true}
      resendButtonText="인증 메일 재전송"
    />
  );
}
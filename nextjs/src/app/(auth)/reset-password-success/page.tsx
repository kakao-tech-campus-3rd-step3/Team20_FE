import { requestPasswordResetApi } from '@/entities/auth';
import { EmailSentSuccess } from '@/shared/ui';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '비밀번호 재설정 메일 발송 완료 - K-SPOT',
  description: '비밀번호 재설정 메일이 발송되었습니다',
};

interface ResetPasswordSuccessPageProps {
  searchParams: Promise<{ email?: string }>;
}

export default async function ResetPasswordSuccessPage({ searchParams }: ResetPasswordSuccessPageProps) {
  const { email = '' } = await searchParams;

  const handleResendEmail = async (email: string) => {
    'use server';
    await requestPasswordResetApi({ email });
  };

  return (
    <EmailSentSuccess
      email={email}
      title="비밀번호 재설정 메일 발송 완료!"
      onResend={handleResendEmail}
      showResendButton={true}
      resendButtonText="재설정 메일 재전송"
    />
  );
}
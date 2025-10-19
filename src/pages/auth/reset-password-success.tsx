import { createFileRoute } from '@tanstack/react-router';
import { requestPasswordResetApi } from '@/entities/auth';
import { EmailSentSuccess } from '@/shared/ui';

type ResetPasswordSuccessSearch = {
  email: string;
};

export const Route = createFileRoute('/auth/reset-password-success')({
  component: ResetPasswordSuccessPage,
  validateSearch: (search: Record<string, unknown>): ResetPasswordSuccessSearch => {
    return {
      email: (search.email as string) || '',
    };
  },
});

function ResetPasswordSuccessPage() {
  const { email } = Route.useSearch() as ResetPasswordSuccessSearch;

  const handleResendEmail = async (email: string) => {
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

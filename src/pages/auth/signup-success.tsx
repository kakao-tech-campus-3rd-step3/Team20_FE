import { createFileRoute, redirect } from '@tanstack/react-router';
import { resendVerificationEmailApi } from '@/entities/auth';
import { EmailSentSuccess } from '@/shared/ui';

type SignupSuccessSearch = {
  email: string;
};

export const Route = createFileRoute('/auth/signup-success')({
  component: SignupSuccessPage,
  beforeLoad: async ({ context }) => {
    if (context.auth.isLoggedIn) {
      throw redirect({ to: '/mypage' });
    }
  },
  validateSearch: (search: Record<string, unknown>): SignupSuccessSearch => {
    return {
      email: (search.email as string) || '',
    };
  },
});

function SignupSuccessPage() {
  const { email } = Route.useSearch() as SignupSuccessSearch;

  const handleResendEmail = async (email: string) => {
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

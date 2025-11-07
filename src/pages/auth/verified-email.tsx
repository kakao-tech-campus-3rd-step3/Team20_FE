import { createFileRoute } from '@tanstack/react-router';
import { useEmailVerification } from '@/features/auth';
import { EmailVerificationStatus } from '@/features/auth';

export const Route = createFileRoute('/auth/verified-email')({
  component: VerifyEmailPage,
  validateSearch: (search: Record<string, unknown>) => {
    return {
      token: (search.token as string) || '',
    };
  },
});

function VerifyEmailPage() {
  const { token } = Route.useSearch();
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

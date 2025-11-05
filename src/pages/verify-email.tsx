import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useEffect } from 'react';

type VerifyEmailSearch = {
  token: string;
};

export const Route = createFileRoute('/verify-email')({
  component: RedirectToVerifiedEmail,
  validateSearch: (search: Record<string, unknown>): VerifyEmailSearch => {
    return {
      token: (search.token as string) || '',
    };
  },
});

function RedirectToVerifiedEmail() {
  const navigate = useNavigate();
  const { token } = Route.useSearch() as VerifyEmailSearch;

  useEffect(() => {
    navigate({
      to: '/auth/verified-email',
      search: { token },
      replace: true,
    });
  }, [navigate, token]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 flex items-center justify-center">
      <div className="text-center">
        <p className="text-gray-600">이메일 인증 중...</p>
      </div>
    </div>
  );
}

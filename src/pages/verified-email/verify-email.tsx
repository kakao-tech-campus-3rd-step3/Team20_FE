import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useEffect } from 'react';

type VerifyEmailSearch = {
  token: string;
};

export const Route = createFileRoute('/verified-email/verify-email')({
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
    console.log('🔄 Redirecting with token:', token);
    // 올바른 경로로 리다이렉트
    navigate({
      to: '/verified-email',
      search: { token },
      replace: true, // 히스토리에 남기지 않음
    });
  }, [navigate, token]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 flex items-center justify-center">
      <div className="text-center">
        <p className="text-gray-600">리다이렉트 중...</p>
      </div>
    </div>
  );
}

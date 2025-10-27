import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useEffect } from 'react';

type ResetPasswordSearch = {
  token: string;
};

export const Route = createFileRoute('/reset-password')({
  component: RedirectToResetPassword,
  validateSearch: (search: Record<string, unknown>): ResetPasswordSearch => {
    return {
      token: (search.token as string) || '',
    };
  },
});

function RedirectToResetPassword() {
  const navigate = useNavigate();
  const { token } = Route.useSearch() as ResetPasswordSearch;

  useEffect(() => {
    navigate({
      to: '/auth/reset-password',
      search: { token },
      replace: true,
    });
  }, [navigate, token]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 flex items-center justify-center">
      <div className="text-center">
        <p className="text-gray-600">비밀번호 재설정 중...</p>
      </div>
    </div>
  );
}

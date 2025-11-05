import { Suspense } from 'react';
import { createFileRoute, redirect } from '@tanstack/react-router';
import { ErrorBoundary } from '@/shared/ui';
import { MyPage } from '../features/UserInfo';
import { messages } from '../features/UserInfo/model/messages';

export const Route = createFileRoute('/mypage')({
  component: MyPageComponent,
  beforeLoad: async ({ context }) => {
    if (!context.auth.isLoggedIn) {
      throw redirect({ to: '/auth/login' });
    }
  },
});

function MyPageComponent() {
  return (
    <ErrorBoundary>
      <Suspense
        fallback={
          <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex items-center justify-center">
            <div className="text-center">
              <div className="w-12 h-12 border-4 border-brand-primary/30 border-t-brand-secondary rounded-full animate-spin mx-auto mb-4"></div>
              <div className="text-gray-600 text-lg font-light">{messages.loading}</div>
            </div>
          </div>
        }
      >
        <MyPage />
      </Suspense>
    </ErrorBoundary>
  );
}

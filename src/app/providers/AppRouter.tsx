import { createRouter, RouterProvider } from '@tanstack/react-router';
import { useAuth } from '@/shared/lib/auth';
import { routeTree } from '../../routeTree.gen';

const router = createRouter({
  routeTree,
  context: {
    auth: undefined!,
  },
});

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export function AppRouter() {
  const auth = useAuth();

  // 인증 상태 로딩 중일 때는 빈 화면 표시
  if (auth.isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-pink-50">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-purple-600 border-r-transparent"></div>
          <p className="mt-4 text-sm text-gray-600">로딩 중...</p>
        </div>
      </div>
    );
  }

  return <RouterProvider router={router} context={{ auth }} />;
}

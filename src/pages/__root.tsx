import { createRootRouteWithContext, Outlet } from '@tanstack/react-router';
import { GlobalLayout } from '@/app/layout/GlobalLayout';
import { NotFoundPage } from './not-found';
import type { AuthContextType } from '@/shared/lib/auth/AuthContext';

interface RouterContext {
  auth: AuthContextType;
}

export const Route = createRootRouteWithContext<RouterContext>()({
  component: () => (
    <GlobalLayout>
      <Outlet />
      {process.env.NODE_ENV === 'development' && (
        <div id="router-devtools">{/* 개발환경 : TanStack Router DevTools 전용 디버깅 도구 */}</div>
      )}
    </GlobalLayout>
  ),
  notFoundComponent: NotFoundPage,
});

import { createRootRoute, Outlet } from '@tanstack/react-router';
import { GlobalLayout } from '@/app/layout/GlobalLayout';
import { NotFoundPage } from './not-found';

export const Route = createRootRoute({
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

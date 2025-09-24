import { createRootRoute, Outlet } from '@tanstack/react-router';
import { GlobalLayout } from '@/app/layout/GlobalLayout';

export const Route = createRootRoute({
  component: () => (
    <GlobalLayout>
      <Outlet />
      {process.env.NODE_ENV === 'development' && (
        <div id="router-devtools">
          {/* TanStack Router DevTools will be loaded here in development */}
        </div>
      )}
    </GlobalLayout>
  ),
});

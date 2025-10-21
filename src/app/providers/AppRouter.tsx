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

  return <RouterProvider router={router} context={{ auth }} />;
}

import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import { HomePage } from '@/pages/HomePage';
import { ContentDetailPage } from '@/pages/ContentDetailPage';
import ContentPlaceMapPage from '@/pages/ContentPlaceMapPage';
import { ROUTES } from '@/shared/config/routes';
import { GlobalLayout } from '../layout/GlobalLayout';

const router = createBrowserRouter([
  {
    element: <GlobalLayout />,
    children: [
      {
        path: ROUTES.HOME,
        element: <HomePage />,
      },
      {
        path: ROUTES.CONTENT_DETAIL,
        element: <ContentDetailPage />,
      },
      {
        path: ROUTES.MAP,
        element: <Navigate to="/map/1" replace />,
      },
      {
        path: ROUTES.MAP_WITH_CONTENT,
        element: <ContentPlaceMapPage />,
      },
    ],
  },
]);

export function AppRouter() {
  return <RouterProvider router={router} />;
}

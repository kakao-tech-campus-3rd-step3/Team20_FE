import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { HomePage } from '@/pages/HomePage';
import { ContentDetailPage } from '@/pages/ContentDetailPage';
import ContentPlaceMapPage from '@/pages/ContentPlaceMapPage';
import { StyleTestPage } from '@/pages/StyleTestPage';
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
        element: <ContentPlaceMapPage />,
      },
      {
        path: ROUTES.STYLE_TEST,
        element: <StyleTestPage />,
      },
    ],
  },
]);

export function AppRouter() {
  return <RouterProvider router={router} />;
}

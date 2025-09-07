import { createBrowserRouter } from 'react-router-dom';
import { HomePage } from '@/pages/HomePage';
import { ContentDetailPage } from '@/pages/ContentDetailPage';
import ContentPlaceMapPage from '@/pages/ContentPlaceMapPage';
import { ROUTES } from '@/shared/config/routes';
import { createElement } from 'react';

export const router = createBrowserRouter([
  {
    path: ROUTES.HOME,
    element: createElement(HomePage),
  },
  {
    path: ROUTES.CONTENT_DETAIL,
    element: createElement(ContentDetailPage),
  },
  {
    path: ROUTES.MAP,
    element: createElement(ContentPlaceMapPage),
  },
]);

import type { Decorator } from '@storybook/react';
import React, { useMemo } from 'react';
import {
  createRouter,
  createMemoryHistory,
  RouterProvider,
  createRootRoute,
  createRoute,
} from '@tanstack/react-router';
import type { RouterStoryParameters } from './router-types';

const createMockRouteTree = (StoryComponent: React.ComponentType) => {
  // Root Route 생성
  const rootRoute = createRootRoute({
    component: () => (
      <div data-testid="storybook-router-wrapper">
        <StoryComponent />
      </div>
    ),
  });

  // 하위 라우트들 생성
  const indexRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/',
    component: () => (
      <div data-testid="storybook-router-wrapper">
        <StoryComponent />
      </div>
    ),
  });

  const contentRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/content/$id',
    component: () => (
      <div data-testid="storybook-router-wrapper">
        <StoryComponent />
      </div>
    ),
  });

  const locationRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/location/$id',
    component: () => (
      <div data-testid="storybook-router-wrapper">
        <StoryComponent />
      </div>
    ),
  });

  const contentMapRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/content/$contentId/map',
    component: () => (
      <div data-testid="storybook-router-wrapper">
        <StoryComponent />
      </div>
    ),
  });

  const mapRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/map',
    component: () => (
      <div data-testid="storybook-router-wrapper">
        <StoryComponent />
      </div>
    ),
  });

  // Route Tree 생성
  return rootRoute.addChildren([
    indexRoute,
    contentRoute,
    locationRoute,
    contentMapRoute,
    mapRoute,
  ]);
};

export const withTanstackRouter: Decorator = (Story, context) => {
  const parameters: RouterStoryParameters = context.parameters;
  const routerConfig = parameters.router || {};

  // 기본 설정
  const { initialEntries = ['/'], initialIndex = 0 } = routerConfig;

  // Router만 감싸는 Provider 컴포넌트 (QueryClient는 withApi에서 제공)
  const RouterWrapper = () => {
    const router = useMemo(() => {
      // Memory History 생성
      const memoryHistory = createMemoryHistory({
        initialEntries,
        initialIndex,
      });

      // Mock Router 생성
      return createRouter({
        routeTree: createMockRouteTree(Story),
        history: memoryHistory,
        context: {},
      });
    }, []);

    return <RouterProvider router={router} />;
  };

  return <RouterWrapper />;
};

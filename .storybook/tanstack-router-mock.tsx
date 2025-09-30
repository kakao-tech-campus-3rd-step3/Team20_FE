import type { Decorator } from '@storybook/react';
import React, { useMemo } from 'react';
import {
  createRouter,
  createMemoryHistory,
  RouterProvider,
  createRootRoute,
  createRoute,
  Outlet,
} from '@tanstack/react-router';
import type { RouterStoryParameters } from './router-types';

const createMockRouteTree = (StoryComponent: React.ComponentType) => {
  // Root Route 생성 - Outlet을 사용하여 중첩 라우팅 지원
  const rootRoute = createRootRoute({
    component: () => (
      <div data-testid="storybook-router-wrapper">
        <Outlet />
      </div>
    ),
  });

  // StoryComponent를 감싸는 래퍼 컴포넌트
  const StoryWrapper = () => (
    <div data-testid="storybook-story-component">
      <StoryComponent />
    </div>
  );

  // 기본 인덱스 라우트
  const indexRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/',
    component: StoryWrapper,
  });

  // 콘텐츠 상세 라우트
  const contentRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/content/$id',
    component: StoryWrapper,
  });

  // 위치 상세 라우트
  const locationRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/location/$id',
    component: StoryWrapper,
  });

  // 콘텐츠 맵 라우트
  const contentMapRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/content/$contentId/map',
    component: StoryWrapper,
  });

  // 맵 라우트
  const mapRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/map',
    component: StoryWrapper,
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
  const { initialEntries = ['/'], initialIndex = 0, context: routerContext = {} } = routerConfig;

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
        context: routerContext,
      });
    }, [initialEntries, initialIndex, Story, routerContext]);

    return <RouterProvider router={router} />;
  };

  return <RouterWrapper />;
};

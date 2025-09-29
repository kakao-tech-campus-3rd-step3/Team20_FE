import type { Preview } from '@storybook/react';
import '../src/index.css';
import { withTanstackRouter } from './tanstack-router-mock';
import { withApi } from './api-decorator';
import { initializeMsw } from './msw-setup';

// MSW 초기화 (Storybook 시작 시 한 번만 실행)
initializeMsw();

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: 'todo',
    },

    // TanStack Router 기본 설정
    router: {
      initialEntries: ['/'],
      initialIndex: 0,
    },

    // MSW + TanStack Query 기본 설정
    api: {
      scenario: 'default',
      showDevtools: false,
    },
  },
  decorators: [
    withApi, // API Mock 및 TanStack Query 설정 (먼저 적용)
    withTanstackRouter, // 라우터 설정 (나중에 적용)
  ],
};

export default preview;

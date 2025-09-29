import type { Preview } from '@storybook/react';
import '../src/index.css';
import { withTanstackRouter } from './tanstack-router-mock';

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
  },
  decorators: [withTanstackRouter],
};

export default preview;

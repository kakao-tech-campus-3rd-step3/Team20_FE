import type { Preview } from '@storybook/nextjs';
import '../src/app/globals.css';
import { WithApi } from './api-decorator.js';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#ffffff' },
        { name: 'dark', value: '#0f172a' },
      ],
    },
    // API Mock 설정
    api: {
      scenario: 'default',
      showDevtools: false,
    },
  },
  decorators: [
    WithApi, // API Mock 및 TanStack Query 설정
  ],
};

export default preview;

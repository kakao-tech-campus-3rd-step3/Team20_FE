import { setupWorker } from 'msw/browser';
import { handlers } from './msw-handlers';

export const worker = setupWorker(...handlers);

export const initializeMsw = async () => {
  if (typeof window !== 'undefined') {
    try {
      await worker.start({
        onUnhandledRequest: 'bypass', // 처리되지 않은 요청은 통과
        serviceWorker: {
          url: '/mockServiceWorker.js', // MSW Service Worker 파일 경로
        },
      });

      console.log('🎭 MSW가 성공적으로 시작되었습니다');
    } catch (error) {
      console.error('❌ MSW 시작 중 오류 발생:', error);
    }
  }
};

export const updateHandlers = (newHandlers: any[]) => {
  worker.use(...newHandlers);
};

export const mswHelpers = {
  resetHandlers: () => {
    worker.resetHandlers(...handlers);
  },

  clearHandlers: () => {
    worker.resetHandlers();
  },

  addHandlers: (newHandlers: any[]) => {
    worker.use(...newHandlers);
  },

  getStatus: () => {
    return worker.listHandlers().length > 0 ? 'active' : 'inactive';
  },
};

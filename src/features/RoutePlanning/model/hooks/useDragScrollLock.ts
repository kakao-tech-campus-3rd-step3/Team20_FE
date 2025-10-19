import { useCallback } from 'react';

export function useDragScrollLock() {
  const lockScroll = useCallback(() => {
    document.body.style.overflow = 'hidden';
    document.body.style.touchAction = 'none';
  }, []);

  const unlockScroll = useCallback(() => {
    document.body.style.overflow = '';
    document.body.style.touchAction = '';
  }, []);

  return { lockScroll, unlockScroll };
}
